//Counter code

var button = document.getElementById('counter');

button.onclick = function () {
    
    //Create a request object
    var request = new XMLHttpRequest();
    
    //Capture response and store it in a variable
    request.onreadystatechange = function () {
        //Take some actions
        if(request.readyState === XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }        
        
    };
    
    request.open('GET' ,'http://dhimanankush72.imad.hasura-app.io/counter' , true );
    request.send(null);
} ;


var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    
    //Make a request to the server and send a name
   
    //Create a request object
    var request = new XMLHttpRequest();
    
    //Capture response and store it in a variable
    request.onreadystatechange = function () {
        //Take some actions
        if(request.readyState === XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                 //capture a list of names and render it as list
                var names = request.responseText;
                names = JSON.parse(names); //convert from string to back in objects
                var list = ' ';
                
                for(var i=0 ; i<names.length;i++){
                    
                    list <- '<li>' + names[i]} '</li>' ;
                }
                var ul = document.getElementById('nameList')
                ul.innerHTML = list;
            }
        }        
        
    };
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET' ,'http://dhimanankush72.imad.hasura-app.io/submit-name?name='+name , true );
    request.send(null);
    
};