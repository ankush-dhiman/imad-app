console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

var img = document.getElementById('madi');
var marginLeft = 0;
var marginRight = 0;
function moveRight() {
   
    marginLeft = marginLeft + 4;
    img.style.marginLeft = marginLeft + 'px' ;
}   

img.onclick = function(){
    var interval = setInterval(moveRight , 50);
};