var express = require('express'); //used to create web server 
var morgan = require('morgan'); //put logs on server
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(session({
    secret:'SomeRandomSecretValue',
    cookie:{ maxAge: 1000 * 60 * 60 * 24 * 30 }
    
}));


var config = {
    
  user:"dhimanankush72",
  database:"dhimanankush72",
  host:"db.imad.hasura-app.io",
  port:"5432",
  password:process.env.DB_PASSWORD,
    
};




var articles = {
   
    'article-one':{
   title : 'Article One | Ankush Dhiman',
   date : 'Aug 27 2017',
   heading : 'Article One ',
   content : `
         <p>
          This is my 1st article.This is my 1st article.This is my 1st article.This is my 1st article.This is my 1st article.This is my 1st article.This is my 1st article.

         </p>
`
},

'article-two':{
   
   title : 'Article two | Ankush Dhiman',
   date : 'Aug 27 2017',
   heading : 'Article two ',
   content : `
         <p>
          This is my 2nd article.This is my 2nd article.This is my 2nd article.This is my 2nd article.This is my 2nd article.This is my 2nd article.This is my 2nd article.

         </p>
`

},

'article-three':{
   
  title : 'Article Three | Ankush Dhiman',
  date : 'Aug 27 2017',
  heading : 'Article Three ',
  content : `
         <p>
          This is my 3rd article.This is my 3rd article.This is my 3rd article.This is my 3rd article.This is my 3rd article.This is my 3rd article.This is my 3rd article.

         </p>
`
}


};

function createTemplate(data){

     var title = data.title;
     var heading = data.heading;
     var date = data.date;
     var content = data.content;
     var htmlTemplate =`
  <html>
  <head>
   	<title>
        	${title}
   	</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/ui/style.css" rel="stylesheet" />
        <link href="/ui/bootstrap/css/bootstrap.min.css" rel="stylesheet" >
   </head>
<body>
            <div class="container" >
                                <form class="navbar-form navbar-left">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search">
                        <div class="input-group-btn">
                          <button class="btn btn-default" type="submit">
                            <i class="glyphicon glyphicon-search"></i>
                          </button>
                        </div>
                      </div>
              </form>
                
             <hr/>
                <h3> ${heading} </h3>        
            
            <div>
                ${date}
            </div>
                
             <div>
               ${content}
            </div>  
      </div>

</body>
</html>

`;
return htmlTemplate;
     
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    
    return ["pbkdf2","10000",salt, hashed.toString('hex')].join('$');
    
    
}


app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user', function (req, res) {
    
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var name = req.body.name;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
   
    pool.query('INSERT INTO "user" (username, password, email,name ) VALUES($1, $2, $3, $4)',[username, dbString, email, name], function (err, result) {
        
        if (err) {
          res.status(500).send(err.toString());
      } else {
          
          res.send('Account succesfully created: ' + username);
      }
        
        
    });
});

app.post('/login', function (req, res) {
    
    var username = req.body.username;
    var password = req.body.password;
   
   
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
        
        if (err) {
          res.status(500).send(err.toString());
      } else {
          if(result.rows.length === 0)
          {
              res.send(403).send('Username/Password is Invalid');
              
          }
          else
          {
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt);
              
              if(hashedPassword === dbString) {
                  
                  //Set the Session
                  req.session.auth = {userId: result.rows[0].id};
                  
                  res.send('credentials are correct');
              }
              else {
                  res.send(403).send('Username/Password is Invalid');
              }
              
          }
      }
        
        
    });
});





app.get('/check-login', function (req, res) {
    if(req.session && req.session.auth && req.session.auth.userId)
    {
        res.send('you are logged in: ' + req.session.auth.userId.toString());
    }else{
        res.send('you are not logged in');
    }
    

});

app.get('/logout', function (req, res) {
   
        delete req.session.auth;
        res.send('you are logged out');

});


var pool = new Pool(config);



app.get('/test-db', function (req, res) {
  //make a select request
  //return a response with the results
  pool.query('SELECT *FROM test' ,  function (err, result) {
      
      if (err) {
          res.status(500).send(err.toString());
      } else {
          
          res.send(JSON.stringify(result.rows));
      }
      
      
  });
});





var counter = 0;

app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var names = [];

app.get('/submit-name', function (req, res) {
  var name = req.query.name;
  
  names.push(name);
 
  //JSON java script Obeject Notation
  res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
   
   var articleName = req.params.articleName;
   
   pool.query('SELECT * FROM articles WHERE title = $1 ', [articleName] ,  function (err, result) {
 
      
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if(result.rows.length === 0){
              res.status(404).send('Article not found');
          }
          else{
              var articleData = result.rows[0];
              res.send(createTemplate(articleData));
          }
       }
      
      
  }); 
  
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

