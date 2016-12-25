(function(w){
    w.app = w.app || {};
    
    /** Fork from http://codepen.io/mkhoudary/pen/afski 
    Thanks Mohammed El Khoudary 
    change : init counter
    **/
    var INTERVALTIME = 1000;

    var intervaltimediff;
    var nbnumeros = 0;
    // Todo calc interval, recreate scene day / min / sec
    function initCounter(dateToInit, callbackFinish){

        var now = new Date();
        console.log(dateToInit);
        console.log(now);
        
        var tsdiff = dateToInit - now;
        console.log("tsdiff=" + tsdiff);
        
        var intervaltimediff = Math.ceil(tsdiff / INTERVALTIME);
        console.log('difference=' + intervaltimediff);

        var baseTpl = 
        `<span class="number" data-number="9">
            <span class="primary">
            </span>
            <span class="secondary">
            </span>
        </span>`;
        
        intervaltimediffStr = intervaltimediff.toString();
        nbnumeros = intervaltimediffStr.length;

        var counterContainer = document.createElement('div');
        counterContainer.classList.add('counter-container');
        var counterContainerHTML = "";
        for(var i =0; i<nbnumeros; i++){
            counterContainerHTML += baseTpl.replace('9', intervaltimediffStr.charAt(i));  
        }
        counterContainer.innerHTML = counterContainerHTML;
        document.body.appendChild(counterContainer);

        var intervalfn = setInterval(function() {
            if(intervaltimediff === 0){
                counterContainer.remove();
                clearInterval(intervalfn);
                return false;
            }

            doFlip(nbnumeros - 1);
            
            if(--intervaltimediff === 0){
                callbackFinish();
            }

        }, INTERVALTIME);
    }

    

    function doFlip(numberIndex) {
        var currentNumberElement = $(".number:eq(" + numberIndex + ")");
        
        var currentNumber = Number(currentNumberElement.attr("data-number"));    

        currentNumber--;
        
        if (currentNumber < 0) {
            currentNumber = 9;
            
            if (numberIndex > 0) {
                doFlip(--numberIndex);
            }
        } 
        
        currentNumberElement.addClass("flip");
        
        setTimeout(function() {
            currentNumberElement.attr("data-number", currentNumber);
            
            currentNumberElement.removeClass("flip");
        }, 500);
    }

    w.app.initCounter = initCounter;
})(window);
