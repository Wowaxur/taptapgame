/* eslint-disable no-restricted-globals */

let interval;

self.onmessage = function (event) {
    if (event.data === 'start') {
        interval = setInterval(() => {
            self.postMessage('recoverEnergy');
        }, 5000);
    } else if (event.data === 'stop') {
        clearInterval(interval);
    }
};