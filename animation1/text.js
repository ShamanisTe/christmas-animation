(function(w){
    w.app = w.app || {};
    
    var FRENCHKKINGCAKEMONTH = 0;

    var CHRISTMASMONTH = 11;
    var CHRISTMASDAY = 25;

    var ONEDAYTS = 1000 * 60 * 60 * 24;

    var now, newYearCounter;

    var canvasSelector;

    var calcDateBeforeChristmas = function(){
        var chritmas = new Date(now.getFullYear(), CHRISTMASMONTH, CHRISTMASDAY);
        var tsdiff = chritmas - now;
        var daydiff = Math.ceil(tsdiff / ONEDAYTS);

        return daydiff;
    };

    var initText = function(obj){
        var canvasEffectFn;
        now = new Date();
        newYearCounter = new Date(now.getFullYear() + 1 ,0, 1);

        if(now.getMonth() === FRENCHKKINGCAKEMONTH){
            frenchKingCakeMessage();
            canvasEffectFn = w.app.initConfetti;
        } else {
            christmasMessage();
            canvasEffectFn = w.app.initSnow;
        }

        if(obj && obj.canvasSelector){
            canvasEffectFn(obj.canvasSelector);
        }

    };

    var frenchKingCakeMessage = function(){
        var christmasTextEl = document.querySelector(".christmasText");
        christmasTextEl.innerHTML = "Bonne année " + now.getFullYear() + " <br>et excellente galette des rois !";
    };
    var christmasMessage = function(){
        var diff = calcDateBeforeChristmas();
            
        if(diff > 0){
            var dateBeforeChristmasEl = document.querySelector(".date-before-christmas");
            dateBeforeChristmasEl.innerHTML = "J - " + calcDateBeforeChristmas();
        } else if(diff < 0){
            var christmasTextEl = document.querySelector(".christmasText");
            christmasTextEl.innerHTML = "Joyeuses fêtes de fin d'année et <br>Bonne année " + (newYearCounter.getFullYear())  + " !";
            
            // todo remove counter container
            // todo move this another place
            // Init counter before new year to launch confetti
            w.app.initCounter(newYearCounter, function finish(){
                w.app.stopSnow();
                w.app.initScene();
            });
        } else {
            var divs = document.querySelectorAll(".christmasText .christmasDayToRemove");
            for(var i = 0, c = divs.length; i<c;i++){
                divs[i].remove();
            }
        }
    };

    w.app.initText = initText;
    
})(window);
