// Function to get browser information
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';

    if (ua.indexOf('Chrome') !== -1) browser = 'Google Chrome';
    else if (ua.indexOf('Firefox') !== -1) browser = 'Mozilla Firefox';
    else if (ua.indexOf('Safari') !== -1) browser = 'Safari';
    else if (ua.indexOf('Edge') !== -1) browser = 'Microsoft Edge';
    else if (ua.indexOf('Opera') !== -1) browser = 'Opera';
    else if (ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident/') !== -1) browser = 'Internet Explorer';

    return browser;
}

// Function to get operating system information
function getOperatingSystem() {
    const platform = navigator.platform;
    let os = 'Unknown';

    if (platform.indexOf('Win') !== -1) os = 'Windows';
    else if (platform.indexOf('Mac') !== -1) os = 'MacOS';
    else if (platform.indexOf('Linux') !== -1) os = 'Linux';
    else if (platform.indexOf('iPhone') !== -1 || platform.indexOf('iPad') !== -1) os = 'iOS';
    else if (platform.indexOf('Android') !== -1) os = 'Android';

    return os;
}

// Function to get screen resolution
function getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}`;
}

// Function to get IP address
async function getIPAddress() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'Unknown';
}

// Function to log visitor information
async function logVisitorInfo() {
    const browser = getBrowserInfo();
    const os = getOperatingSystem();
    const screenResolution = getScreenResolution();
    const ipAddress = await getIPAddress();

    console.log('Visitor Information:');
    console.log(`Browser: ${browser}`);
    console.log(`Operating System: ${os}`);
    console.log(`Screen Resolution: ${screenResolution}`);
    console.log(`IP Address: ${ipAddress}`);
}

// Log visitor information when the page loads
window.addEventListener('load', logVisitorInfo);
