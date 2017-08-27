console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

var img = document.getElementById('madi');
var marginLeft = 0;

function moveRight() {
   if((marginLeft >= 0) && (marginLeft <= 200) )
     {
         marginLeft = marginLeft + 10;
         img.style.marginLeft = marginLeft + 'px' ;
     }

}

img.onclick = function(){
    var interval = setInterval(moveRight , 50);
};