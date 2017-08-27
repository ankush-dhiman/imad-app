console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

var img = document.getElementById('madi');
var marginLeft = 0;
var marginRight = 0;
function moveRight() {
   
   if((marginLeft >= 0) && (marginLeft <= 1000) )
     {
         marginLeft = marginLeft + 10;
         img.style.marginLeft = marginLeft + 'px' ;
     }
     else
     {
         marginRight = marginRight - 10;
         img.style.marginRight = marginRight + 'px' ;
     }

}

img.onclick = function(){
    var interval = setInterval(moveRight , 50);
};