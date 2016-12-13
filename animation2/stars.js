(function(w){
    w.app = w.app || {};

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

    var range = function(min, max){
        return Math.floor(Math.random() * (max-min) + min);
    };

    w.app.initStars = initStars;
})(window);
