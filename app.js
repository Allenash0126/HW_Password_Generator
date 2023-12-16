const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

let password = '';
const passwordLength = 10;
const grNumber = '0123456789';
const grLowerCase = 'abcdefghijklmnopqrstuvwxyz'
const grUpperCase = grLowerCase.toUpperCase();
const grSymbol = '~`!@#$%^&*()_-+={[}]|\:;"/><,.?/'
let totalCharacter_Temp = grNumber+grLowerCase+grUpperCase+grSymbol
let totalCharacter_Final = '';
const grExclude = '012?><';
console.log(totalCharacter_Temp)
       
for (i = 0; i < grExclude.length; i++) {
  totalCharacter_Temp = totalCharacter_Temp.replaceAll(`${grExclude[i]}`,'')
  totalCharacter_Temp = totalCharacter_Temp.replaceAll(grLowerCase,'')
};
totalCharacter_Final = totalCharacter_Temp
console.log(totalCharacter_Final)
let numTotalCharacter = totalCharacter_Final.length      

   
for(i = 0; i < passwordLength; i++) {
  let character = totalCharacter_Final[Math.floor(Math.random()*numTotalCharacter)]
  password += character 
}      
console.log(password)

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/',(req,res) => {
  res.render('index')
});

app.listen(port,() => {
  console.log(`It is running on server http://localhost:${port}`)
})