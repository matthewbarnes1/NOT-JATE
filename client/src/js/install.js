const butInstall = document.getElementById("buttonInstall");

// Function to handle the 'beforeinstallprompt' event
const handleBeforeInstallPrompt = (event) => {
    // Store the triggered event
    window.deferredPrompt = event;

    // Remove the hidden class (or adjust according to your styling method)
    butInstall.classList.remove('hidden');
};

// Function to handle the button click to prompt the user for installation
const handleInstallClick = async () => {
    const promptEvent = window.deferredPrompt;

    // If there's no prompt event, don't proceed
    if (!promptEvent) {
        return;
    }

    // Show the install prompt
    promptEvent.prompt();

    // Handle the user's response to the prompt
    const choiceResult = await promptEvent.userChoice;
    if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
    } else {
        console.log('User dismissed the A2HS prompt');
    }

    // Reset the deferred prompt variable since it can only be used once
    window.deferredPrompt = null;

    // Hide the install button (or adjust according to your styling method)
    butInstall.classList.add('hidden');
};

// Function to handle the 'appinstalled' event
const handleAppInstalled = (event) => {
    console.log('PWA was installed');

    // Clear the deferred prompt variable
    window.deferredPrompt = null;
};

// Event listeners
window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
butInstall.addEventListener('click', handleInstallClick);
window.addEventListener('appinstalled', handleAppInstalled);
