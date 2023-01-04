//0342
const express = require("express");
const app = express();
const path = require("path");
const {logger}=require('./middleware/logEvents');
const errorHandler=require('./middleware/errorHandler');
const cors=require("cors");
const corsOptions=require('./config/corsOptions')
//const dotenv=require('dotenv');
const PORT = process.env.PORT || 3500;

//Custom middleware logger
app.use(logger);
//Cross Origin Resource Sharing

app.use(cors(corsOptions));
//built-in middleware to handle urlencodedata/formdata
//content-type: application/x-www-form-urlencoded

app.use(express.urlencoded({extended:false}));
//build-in middleware for json
app.use(express.json());
//serve static files
app.use(express.static(path.join(__dirname,'/public')));
//app.use('/subdir',express.static(path.join(__dirname,'/public')));
app.use('/employees',require('./routes/api/employees'))
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/',require('./routes/root'))
//app.use('/subdir',require('./routes/subdir'));


    //Route Handlers
  app.get('/hello(.html)?',(req,res,next)=>{
    console.log('attempted to load hello.html');
    next()
  },((req, res)=>{
    res.send('hello world');
  })) ;
  //Chaining Route Handlers
  const one=(req,res,next)=>{
    console.log('One');
    next();
  }
  const two=(req, res,next)=>{
console.log('Two');
next();
  }
  const three=(req,res)=>{
    console.log('Three')
    res.send('Finished')
  }
  app.get('/chain(.html)?',[one,two,three]);
  
  app.all('/*',(req, res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views','404.html'));
  })
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
