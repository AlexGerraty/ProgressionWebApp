// Get the 'Install' button from the DOM
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  butInstall.classList.toggle('hidden', false);
});
// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Retrieve the deferred prompt event
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  // Show the install prompt
  promptEvent.prompt();
  // Clear the deferred prompt to ensure it can only be used once
  window.deferredPrompt = null;
  // Hide the install button after the prompt is shown
  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferredPrompt after the app is installed
  window.deferredPrompt = null;
});