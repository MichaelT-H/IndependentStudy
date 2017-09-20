var mysql = require('mysql');
var express = require('express');
var app = express();
var path = require('path');
var serv = require('http').Server(app);
var bcrypt = require('bcrypt');
var io = require('socket.io')(serv);
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Cookies = require("cookies");
var cookieParser = require('cookie-parser');
var session = require("express-session");




app.use(session({secret: 'testing',
                saveUIninitialized: true,
                resave: true  }));

app.use(cookieParser());
app.use(bodyParser());




app.use('/', function(req, res){
            res.sendFile(__dirname + '/client/index.html');
            console.log(req.cookies);
            console.log("_______");
            console.log(req.session);

});
app.get('/login', function(req, res){

  res.sendFile(__dirname + '/client/login.html');
})
io.on('connection',function(socket){
		console.log('socket Connection');
    console.log(socket.id);
    socket.on('disconnect',function(socket){
    		console.log('socket disconnected');

    });
    socket.on('test',function(data){
      console.log(data);

    });
  });



serv.listen(80);
console.log("Server is running on port 80");










/*
var con = mysql.createConnection({
  host: "localhost",
  user: "server",
  password: "michael",
  database: "michaelstudy"
});

con.connect();
con.query('SELECT * from account', function (error, results, fields) {
  if (error) throw error;
  //console.log('\nUsername: ', results[0].Username);
  //console.log('\nPasssword: ', results[0].Pass);
  //console.log(results[0]);
});
app.use(express.static(path.join(__dirname, 'client')));
app.get('/', function(req, res){
  console.log("Cookies: ", req.cookies)
  res.sendFile(__dirname + '/client/index.html');
})
serv.listen(80);
app.post('/', function(req, res) {
  console.log(req.cookies);
  console.log("______________________");
  console.log(req.session);
//  console.log(req.body.username);
if(req.body.pass1 == req.body.pass2) {
  con.query('SELECT username from account where username like "'+ req.body.username+'"', function (error, results, fields){
    if (results.length > 0){
      res.json({ success: false, message: 'Username Is Taken'});
    }else{
      bcrypt.hash(req.body.pass1, 8, (err, hash) => {
        if (err)
          return console.log(err);
        req.body.pass1 = hash
        con.query('INSERT INTO account (Username, Pass) VALUES ("' + req.body.username + '","' + req.body.pass1 +'")');
        res.json({ success: true, message: 'you did it daddy'});
      })
    }
  });


}else {
  res.json({ success: true, message:"passwords do not match"});

}

});

app.post('/testing',function(req, res){
  //console.log("HERE")
  //console.log(req.body.username);
  con.query('SELECT username, pass from account where username = "'+ req.body.username+'"', function (error, results, fields){
    if (results.length > 0){
    //  console.log("Form pword before = "+req.body.password);
      //console.log("DB Pword before : "+ results[0].pass);
      bcrypt.compare(req.body.password, results[0].pass, (err, matches) => {
        if (err){
          return console.log(err);
        }

        if (matches) {
          //SIGN IN
          var token = jwt.sign(req.body.username, "testingtoken");

          res.json({ success: true, message: 'Logged in homie', token: token});
        } else {
          res.json({ success: false, message: 'invalid username or password'});
        }
      });
    }
  });

});




});

*/
