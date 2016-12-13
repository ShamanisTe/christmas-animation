(function(w){
    w.app = w.app || {};
    
    var debounceFn = null;
    var init = function(){
        w.app.WIDTH = document.body.offsetWidth;
        w.app.HEIGHT = document.body.offsetHeight;
        if(debounceFn){
            clearTimeout(debounceFn);
        }
        debounceFn = setTimeout(function(){
            w.app.initStars();
            w.app.initSnow();
            w.app.initCloudParallax();
        }, 250);
        
    };

    var startEvent = "DOMContentLoaded";
    if(window.cordova){
        startEvent = "deviceready";
    }
    document.addEventListener(startEvent, init, false);
    
    window.onresize = function(){
        init();
    };
})(window);
