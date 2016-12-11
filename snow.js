(function(w){
    w.app = w.app || {};

    var WIDTH = w.app.WIDTH || document.body.offsetWidth;
    var HEIGHT = w.app.HEIGHT || document.body.offsetHeight;
    var MAX_SNOW = 125;

    var intervalFnSnow = null;
    
    var canvas = document.querySelector('.snow');
    var ctx = canvas.getContext('2d');
    
    var snowingBalls = [];

    var initSnow = function(){
        WIDTH = w.app.WIDTH;
        HEIGHT = w.app.HEIGHT;

        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        snowingBalls = [];
        for(var i = 0; i < MAX_SNOW; i++){
            snowingBalls.push({
                x: Math.random() * WIDTH,
                y: Math.random() * HEIGHT,
                r: Math.random() * 5 + 1, //radius
                d: Math.random() * MAX_SNOW //density
            });
        }
        if(intervalFnSnow){
            cancelAnimationFrame(intervalFnSnow);
        }
       animateSnowingBalls();
    };

    var animateSnowingBalls = function(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for (var i = 0; i < MAX_SNOW; i++) {
            var p = snowingBalls[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();

        prepareNextMoveSnowingBalls();
        intervalFnSnow = requestAnimationFrame(animateSnowingBalls);
    };

    var angle = 0;
    var prepareNextMoveSnowingBalls = function(){
        angle += 0.01;
        for (var i = 0; i < MAX_SNOW; i++) {
            var p = snowingBalls[i];
            p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) / 4;
            p.x += Math.sin(angle) * -0.5;

            if(p.y > HEIGHT + 5){
                p.y = -5;
                p.x = Math.random() * WIDTH;
            }
            if(p.x > WIDTH + 5){
                p.x = -5;
                p.y = Math.random() * HEIGHT;
            } else if(p.x < -5){
                p.x = WIDTH + 5;
                p.y = Math.random() * HEIGHT;
            }   
        }
        
        if(360 <= angle){
            angle = 0;
        }
    };

    w.app.initSnow = initSnow;
})(window);
