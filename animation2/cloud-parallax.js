(function(w){
    w.app = w.app || {};

    var cloudAnimates = [];
    var cancelAnimates = function(){
        for(var i = 0, c = cloudAnimates.length; i<c; i++){
            cloudAnimates[i].cancel();
        }
    };
    
    var cloudParallax = function(){
        cancelAnimates();

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

        cloudAnimates[0] = cloudAnimate;
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

        cloudAnimates[1] = cloudAnimate;
    };

    
    w.app.initCloudParallax = cloudParallax;
})(window);
