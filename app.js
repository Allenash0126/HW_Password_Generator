const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const copyPaste = require("copy-paste"); 
const app = express();
const port = 3000;
const wasValidated = 'was-validated'

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

let passwordLength = '';
const grNumber = '0123456789';
const grLowerCase = 'abcdefghijklmnopqrstuvwxyz'
const grUpperCase = grLowerCase.toUpperCase();
const grSymbol = '~`!@#$%^&*()_-+={[}]|\:;"/><,.?/'
let totalCharacter_Temp = ''
let totalCharacter_Final = '';
let grExclude = '';
let passwordResult = '';

function passwordGenerator(passwordLength) {
  let password = '';
  // 移除grExclude的元素
  for (i = 0; i < grExclude.length; i++) {
    totalCharacter_Temp = totalCharacter_Temp.replaceAll(`${grExclude[i]}`,'')
  };
  totalCharacter_Final = totalCharacter_Temp
  let numTotalCharacter = totalCharacter_Final.length      
    
  for(i = 0; i < passwordLength; i++) {
    let character = totalCharacter_Final[Math.floor(Math.random()*numTotalCharacter)]
    password += character 
  }      
  return password
}

app.get('/',(req,res) => {
  res.render('index')
});

app.post('/onClickCondition',(req,res) => {
  passwordLength = req.body.onClickPasswordLength;
  grExclude = req.body.onClickExclude;

  let options = req.body
  if (options.onClickLowercase) {
    totalCharacter_Temp += grLowerCase
  }
  if (options.onClickUppercase) {
    totalCharacter_Temp += grUpperCase
  }
  if (options.onClickNumbers) {
    totalCharacter_Temp += grNumber
  }
  if (options.onClickSymbols) {
    totalCharacter_Temp += grSymbol
  }

  // Debug: 針對 (1)沒有選擇任一密碼元素者、(2)選擇元素為數字 但排除元素為所有數字者
  if (!totalCharacter_Temp) {
    passwordResult = 'You must select at least one character set'
  } else if (totalCharacter_Temp === grNumber) {
    passwordResult = 'You can not select Include Numbers and input 0~9 in Exclude Character'
  }
  else {
    passwordResult = passwordGenerator(passwordLength);
  }

  // 清空（totalCharacter_Temp）暫存檔
  totalCharacter_Temp = ''

  res.render('index',{passwordResult,passwordLength,grExclude,options,wasValidated})
})

app.get('/copyButton',(req,res) => {
  copyPaste.copy(passwordResult)
}) 

app.listen(port,() => {
  console.log(`It is running on server http://localhost:${port}`)
})