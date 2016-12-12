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
        ], 1 * 60 * 1000);
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
        ], 5 * 60 * 1000);
        cloudAnimate.addEventListener('finish', moveCloud2);
    };
    /**********/
    
    var init = function(){
        w.app.WIDTH = document.body.offsetWidth;
        w.app.HEIGHT = document.body.offsetHeight;

        w.app.initSnow();
        cloudParallax();
    };

    window.onresize = function(){
        init();
    };

    init();
    
})(window);
