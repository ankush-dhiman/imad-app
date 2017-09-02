
//Submit username/password
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
                console.log('user logged in');
                alert('logged in successfully');
                
            }else if (request.status===403)
            {
                alert('username/password is incorrect');
            }else if (request.status===500)
            {
                alert('something went wrong on server');
            }
            
        }        
        
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST' ,'http://dhimanankush72.imad.hasura-app.io/login' , true );
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
    
};