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
            if(sequest.status===200)
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