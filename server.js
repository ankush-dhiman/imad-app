var express = require('express'); //used to create web server 
var morgan = require('morgan'); //put logs on server
var path = require('path');

var app = express();
app.use(morgan('combined'));

var counter = 0;

app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var names = [];

app.get('/submit-name/:name', function (req, res) {
  var name = req.query.name;
  
  names.push(name);
 
  //JSON java script Obeject Notation
  
  res.send(JSON.stringify(names));
});

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
        
        <meta naname="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="ui/style.css" rel="stylesheet" />

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


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
   var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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

