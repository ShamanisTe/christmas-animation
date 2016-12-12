(function(w){
    w.app = w.app || {};
    
    var CHRISTMASMONTH = 11;
    var CHRISTMASDAY = 25;
    var ONEDAYTS = 1000 * 60 * 60 * 24;



    var calcDateBeforeChristmas = function(){
        var now = new Date();
        var chritmas = new Date(now.getFullYear(), CHRISTMASMONTH, CHRISTMASDAY);
        var tsdiff = chritmas - now;
        var daydiff = Math.ceil(tsdiff / ONEDAYTS);

        return daydiff;
    };

    var initText = function(){
        var diff = calcDateBeforeChristmas();
        
        if(diff > 0){
            var dateBeforeChristmasEl = document.querySelector(".date-before-christmas");
            dateBeforeChristmasEl.innerHTML = "J - " + calcDateBeforeChristmas();
        } else if(diff < 0){
            var christmasTextEl = document.querySelector(".christmasText");
            christmasTextEl.innerHTML = "Joyeuses fêtes de fin d'année et <br>Bonne année " + (new Date().getFullYear() + 1)  + " !";
        } else {
            var divs = document.querySelectorAll(".christmasText .christmasDayToRemove");
            for(var i = 0, c = divs.length; i<c;i++){
                divs[i].remove();
            }
        }
    };

    w.app.initText = initText;
    
})(window);
