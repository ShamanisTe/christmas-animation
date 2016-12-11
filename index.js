(function(w){
    w.app = w.app || {};
    
    
    var intervalFnText = null;
    var timeoutFnLogo = null;

    var animations = {
        "logo":[
            "droid", 
            "apple"
        ],
        "droid": [
            "droid-top-right-corner",
            "droid-top-left-corner",
            "droid-bottom-left-corner",
            "droid-bottom",
            "droid-top"    
        ],
        "apple":[
            "apple-bottom-left-corner",
            "apple-top-right-corner",
        ]
    };

    var animateLogo = function(){
        if(timeoutFnLogo){
            clearTimeout(timeoutFnLogo);
        }
        var logoToAnimate = animations.logo[range(0, animations.logo.length)];
        
        var logoEl = document.querySelector('.' + logoToAnimate);
        
        var animationToPlayPosition = range(0, animations[logoToAnimate].length);
        var animationToPlay = animations[logoToAnimate][animationToPlayPosition];
        var animationDuration = range(7,12);

        if(!logoEl.style.animation || logoEl.style.animation.indexOf(animationToPlay) === -1){
            logoEl.style.animation = animationToPlay + " " + (animationDuration + "s");
            
            timeoutFnLogo = setTimeout(animateLogo, (range(10, 20) + animationDuration)  * 1000);
        } else {
            animateLogo();
        }
    
    };
    var range = function(min, max){
        return Math.floor(Math.random() * (max-min) + min);
    }
    w.app.animateLogo = animateLogo;
    

    
    var init = function(){
        w.app.WIDTH = document.body.offsetWidth;
        w.app.HEIGHT = document.body.offsetHeight;

        w.app.animateLogo();
        w.app.initSnow();
        w.app.initText();
        if(intervalFnText){
            clearInterval(intervalFnText);
        }
        intervalFnText = setInterval(w.app.initText, 3600 * 1000 * 2);
    };

    window.onresize = function(){
        init();
    };

    init();
    
})(window);
