require(["task/my-rtm"], function() {
    //This function is called when scripts/modules/uc/uc.js is loaded.
    //If uc.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the uc argument will hold
    //the module value for "scripts/modules/uc/uc".
});