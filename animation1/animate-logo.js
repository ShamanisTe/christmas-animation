(function(w){
    w.app = w.app || {};
    
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
        var animationDuration = range(7,10);

        if(!logoEl.style.animation || logoEl.style.animation.indexOf(animationToPlay) === -1){
            logoEl.style.animation = animationToPlay + " " + (animationDuration + "s");
            
            timeoutFnLogo = setTimeout(animateLogo, (range(15, 30) + animationDuration)  * 1000);
        } else {
            animateLogo();
        }
    
    };
    
    var range = function(min, max){
        return Math.floor(Math.random() * (max-min) + min);
    }

    w.app.animateLogo = animateLogo;
    
})(window);
