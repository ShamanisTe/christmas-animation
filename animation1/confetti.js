(function(w){
    w.app = w.app || {};

    var WIDTH = w.app.WIDTH || document.body.offsetWidth;
    var HEIGHT = w.app.HEIGHT || document.body.offsetHeight;
    var MAX_CONFETTI = 300;

    var intervalFnSnow = null;
    
    var canvas;
    var ctx;
    
    var snowingBalls = [];

    var colors = [
        "250, 197, 203", 
        "165, 220, 217", 
        "150, 203, 89", 
        "153, 84, 151", 
        "205, 211, 101", 
        "255, 242, 234", 
        "0, 101, 169", 
        "200, 203, 160"
    ];
    

    var initConfetti = function(canvasSelector){
        canvas = document.querySelector(canvasSelector);
        ctx = canvas.getContext('2d');

        WIDTH = w.app.WIDTH;
        HEIGHT = w.app.HEIGHT;

        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        confettiBalls = [];
        for(var i = 0; i < MAX_CONFETTI; i++){
            confettiBalls.push({
                opacity: Math.random(),
                x: Math.random() * WIDTH,
                y: Math.random() * HEIGHT,
                r: Math.random() * 5 + 1, //radius
                d: Math.random() * MAX_CONFETTI, //density
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        if(intervalFnSnow){
            cancelAnimationFrame(intervalFnSnow);
            //clearTimeout(intervalFnSnow);
        }
       animateConfettiBalls();
    };


    var animateConfettiBalls = function(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        var maxCircle = Math.PI * 2;
        for (var i = 0; i < MAX_CONFETTI; i++) {
            ctx.beginPath();
            var p = confettiBalls[i];
            ctx.moveTo(p.x, p.y);
            ctx.fillStyle = "rgba(" + p.color + ", " + p.opacity+ ")";
            
            ctx.arc(p.x, p.y, p.r, 0, maxCircle, true);
            ctx.fill();
            ctx.closePath();
        }

        prepareNextMoveConfettiBalls();
        intervalFnSnow = requestAnimationFrame(animateConfettiBalls);
        //intervalFnSnow = setTimeout(animateSnowingBalls, 100);
    };

    var resetConfetti = function(confetti){
        confetti = confetti || {};
        
        confetti.x = Math.random() * WIDTH;
        confetti.y = Math.random() * HEIGHT;
        confetti.r = Math.random() * 5 + 1;
        confetti.d = Math.random() * MAX_CONFETTI,
        confetti.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.opacity = 0;
        confetti.appear = true;
    };
    var angle = 0;
    var prepareNextMoveConfettiBalls = function(){
        angle += 0.01;
        for (var i = 0; i < MAX_CONFETTI; i++) {
            var p = confettiBalls[i];
            p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) / 4;
            p.x += Math.sin(angle) * -0.5;

            if(p.appear){
                p.opacity += 0.05;
            } else {
                p.opacity -= 0.015;
            }
            
            if(p.opacity > 1){
                p.appear = false;
            }
            if(p.opacity < 0){
                resetConfetti(p);
            }

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

    w.app.initConfetti = initConfetti;
})(window);
