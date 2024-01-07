// Define a class to manage visitor data
class VisitorManager {
  // Store visitor data in localStorage
  private static STORAGE_KEY = 'visitorData';

  // Get visitor data from localStorage or initialize an empty object
  private static getVisitorData(): { [key: string]: any } {
    const storedData = localStorage.getItem(VisitorManager.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  }

  // Save visitor data to localStorage
  private static saveVisitorData(data: { [key: string]: any }): void {
    localStorage.setItem(VisitorManager.STORAGE_KEY, JSON.stringify(data));
  }

  // Get or create a unique visitor ID
  private static getVisitorId(): string {
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
      visitorId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('visitorId', visitorId);
    }
    return visitorId;
  }

  // Update visitor data with new information
  public static updateVisitorData(): void {
    const visitorData = VisitorManager.getVisitorData();
    const visitorId = VisitorManager.getVisitorId();

    // Check if the visitor has been here before
    if (!visitorData[visitorId]) {
      visitorData[visitorId] = {
        firstVisit: new Date().toLocaleString(),
        visits: 0,
        location: '',
      };
    }

    // Update visit count
    visitorData[visitorId].visits++;

    // Get user's location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          visitorData[visitorId].location = `Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}`;
          VisitorManager.saveVisitorData(visitorData);
        },
        (error) => {
          console.error('Geolocation error:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}

// Call updateVisitorData on page load
VisitorManager.updateVisitorData();
