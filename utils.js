let Promise = require('es6-promise').Promise;

export function get(url){
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

export function getRandomArbitrary(min, max){
    return Math.random() * (max -min) +min;
}

export function getRandomIntArbitrary(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

export function removeEntityByName(name,scene) {
    let selectedObject = scene.getObjectByName(name);
    if(selectedObject){
        scene.remove( selectedObject );
    }
}

