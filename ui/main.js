 var img = document.getElementById("madi");
 
 
 /*
 var marginLeft =  0;
 var marginRight = 0;
 var interval; //declaring variable globally so that i can use it in outside the funtion.
 
    function moveRight(){
        
        if( marginLeft < 600 && marginRight <=0  ) {
            marginLeft += 1;
            img.style.marginLeft =  marginLeft + "px";
            marginRight = marginRight - 1 ;
        }
         else
          { 
              
              marginLeft -= 1;
              marginRight = marginLeft;
              img.style.marginLeft =  marginLeft + "px";
              
          }
    }

    img.onclick = function() {
        
          interval = setInterval(moveRight, 10);
          
    }
*/

$("#login").click(function(){
   
   var logform = `<html>
<body>

<form action="/action_page.php">
  First name:<br>
  <input type="text" name="firstname" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form> 

<p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>

</body>
</html>`
   
    res.send(logform);
   
});

$("#register").click(function(){
//Show your register form here
});


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
   // console.log(username);
    //console.log(password);
    request.open('POST' ,'http://dhimanankush72.imad.hasura-app.io/login' , true );
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
    
};