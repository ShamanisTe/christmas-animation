(function(w){
    w.app = w.app || {};
    
    
    var intervalFnText = null;

    var debounceFn = null;
    var init = function(){
        w.app.WIDTH = document.body.offsetWidth;
        w.app.HEIGHT = document.body.offsetHeight;
        if(debounceFn){
            clearTimeout(debounceFn);
        }
        debounceFn = setTimeout(function(){
            w.app.animateLogo();
            
            //w.app.initSnow(".snow");
            //w.app.initConfetti(".snow");
            w.app.initText({
                canvasSelector: ".snow"
            });
            if(intervalFnText){
                clearInterval(intervalFnText);
            }
            intervalFnText = setInterval(w.app.initText, 3600 * 1000 * 3);
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
    w.app.initScene = init;

})(window);
