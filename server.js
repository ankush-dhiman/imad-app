var express = require('express'); //used to create web server 
var morgan = require('morgan'); //put logs on server
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));

var config = {
    
  user:'dhimanankush72',
  database:'dhimanankush72',
  host:'db.imad.hasura-app.io',
  port:'5432',
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

   </head>
<body>
	<div class="container" >
            <div>
                <a href="/" > Home</a>
            </div> 
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
    var hash = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return hash.toString('hex');
    
    
}


app.get('/hash/:input', function (req, res) {
    
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
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

