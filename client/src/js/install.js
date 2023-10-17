const butInstall = document.getElementById('buttonInstall');

butInstall.style.display = 'none';

let deferredPrompt; 

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  
  if (!deferredPrompt) {
    console.error("Tried to install before 'beforeinstallprompt' event was captured.");
    return;
  }

//   butInstall.style.display = 'none';
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`👍 User response to the install prompt: ${outcome}`);
  deferredPrompt = null;
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  butInstall.style.display = 'none';
});
