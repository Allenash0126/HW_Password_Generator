const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

// const passwordLength = 10;
const grNumber = '0123456789';
const grLowerCase = 'abcdefghijklmnopqrstuvwxyz'
const grUpperCase = grLowerCase.toUpperCase();
const grSymbol = '~`!@#$%^&*()_-+={[}]|\:;"/><,.?/'
let totalCharacter_Temp = grNumber+grLowerCase+grUpperCase+grSymbol
let totalCharacter_Final = '';
const grExclude = '012?><';

function passwordGenerator(passwordLength) {
  let password = '';
  for (i = 0; i < grExclude.length; i++) {
    totalCharacter_Temp = totalCharacter_Temp.replaceAll(`${grExclude[i]}`,'')
    totalCharacter_Temp = totalCharacter_Temp.replaceAll(grLowerCase,'')
  };
  totalCharacter_Final = totalCharacter_Temp
  let numTotalCharacter = totalCharacter_Final.length      
    
  for(i = 0; i < passwordLength; i++) {
    let character = totalCharacter_Final[Math.floor(Math.random()*numTotalCharacter)]
    password += character 
  }      
  return password
}

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res) => {
  res.render('index')
});

app.get('/onClickPasswordLength',(req,res) => {
  let getPasswordLength = req.query.clickPasswordLength
  console.log(passwordGenerator(getPasswordLength))
})

app.post('/onClickCondition',(req,res) => {
  console.log(req.body)
})

app.listen(port,() => {
  console.log(`It is running on server http://localhost:${port}`)
})