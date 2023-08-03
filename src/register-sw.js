import { devLog } from "./utils/utils";

/**
 * Registers the service worker if it's supported by the browser.
 */
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then((registration) => {
          devLog('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((error) => {
          devLog(`ServiceWorker registration failed with ${error}`)
        });
    });
  }
  
}