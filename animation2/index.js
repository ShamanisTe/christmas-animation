(function(w){
    w.app = w.app || {};


    /**********/
    var cloudParallax = function(){
        moveCloud1();
        moveCloud2();
    };

    var calcStartEndX = function(direction){
        var startX, endX;

        if("left" === direction){
            startX = w.app.WIDTH;
            endX = 0;
            direction = "right";
        } else if("right" === direction){
            startX = 0;
            endX = w.app.WIDTH;
            direction = "left";
        }
        return {
            startX: startX,
            endX: endX,
            direction: direction
        }
    };
    var moveCloud1Direction = "right";
    var moveCloud1 = function(){
        var props = calcStartEndX(moveCloud1Direction);
        moveCloud1Direction = props.direction;

        var cloud = document.querySelector('.cloud-1');
        var cloudAnimate = cloud.animate([
            {transform: 'translate3d(' + props.startX + 'px, 0, 0)'},
            {transform: 'translate3d(' + props.endX + 'px, 0, 0)'}
        ], 2 * 60 * 1000);
        cloudAnimate.addEventListener('finish', moveCloud1);
    };
    var moveCloud2Direction = "left";
    var moveCloud2 = function(){
        var props = calcStartEndX(moveCloud2Direction);
        moveCloud2Direction = props.direction;

        var cloud = document.querySelector('.cloud-2');
        var cloudAnimate = cloud.animate([
            {transform: 'translate3d(' + props.startX + 'px, 0, 0)'},
            {transform: 'translate3d(' + props.endX + 'px, 0, 0)'}
        ], 1 * 60 * 1000);
        cloudAnimate.addEventListener('finish', moveCloud2);
    };
    /**********/

    var initStars = function(){
        var NBSTARS = 25;
        var animatonDelay = 0;

        var sky = document.querySelector('.sky');
        if(sky){
           sky.remove(); 
        }
        sky = document.createElement('div');
        sky.classList.add('sky');
        
        
        for(var i=0; i<= NBSTARS; i++){
            animatonDelay += range(20,50);
            var posX = Math.random() * w.app.WIDTH;
            var posY = Math.random() * (w.app.HEIGHT /2);

            var star = document.createElement('div');
            star.classList.add('star');
            if(i%4===0){
                star.classList.add('shine');
            }
            star.style.transform = "translate(" + posX + "px, " + posY + "px)";
            star.style.animationDelay = animatonDelay + "s";
            sky.appendChild(star);
            
        }
        document.body.appendChild(sky);

    };
    /**********/

    var range = function(min, max){
        return Math.floor(Math.random() * (max-min) + min);
    };
    
    var debounceFn = null;
    var init = function(){
        w.app.WIDTH = document.body.offsetWidth;
        w.app.HEIGHT = document.body.offsetHeight;
        if(debounceFn){
            clearTimeout(debounceFn);
        }
        debounceFn = setTimeout(function(){
            initStars();
            w.app.initSnow();
            cloudParallax();
        }, 250);
        
    };

    window.onresize = function(){
        init();
    };

    document.addEventListener('deviceready', init, false);
    //init();
    
})(window);
