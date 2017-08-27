console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

var img = document.getElementById('madi');
var marginLeft = 0;
var marginRight = 0;
function moveRight() {
   
   if((marginRight === 0) && (marginLeft<=1000) )
     {
         marginLeft = marginLeft + 10;
         img.style.marginLeft = marginLeft + 'px' ;
     }
     marginRight =  (2*marginLeft);
     
     while(marginRight>=marginLeft)
     {
         marginRight = marginRight - 10;
         img.style.marginRight = marginRight + 'px' ;
     }
    
}

img.onclick = function(){
    var interval = setInterval(moveRight , 50);
};