const icon = document.querySelector('i');
const body = document.querySelector('body');

const input = document.getElementById('input');
const output = document.getElementById('output');

const Btns = document.querySelectorAll('.btn');
const operatorBtns = document.querySelectorAll('.operator-btn')
const equalBtn = document.querySelector('#equal-btn')

let previousResult = null;
let currentResult;

const ToggleIcons = () =>{
   if(icon.classList.contains('fa-sun')){
      icon.classList.replace('fa-sun', 'fa-moon');
   }else if(icon.classList.contains('fa-moon')){
      icon.classList.replace('fa-moon', 'fa-sun')
   }
   body.classList.toggle('dark');
}

const clearInput = () =>{
   output.textContent = '';
   input.value = '';
   previousResult = null
}

const delFunc =() =>{
   let str = input.value;
   input.value = str.slice(0, -1);
}

const appendToInput = (content) =>{
   input.value += content;
}

Btns.forEach(btn => btn.addEventListener('click', () =>{
   appendToInput(btn.textContent);
   updateResult();
}))

const handleOperatorClick = (operator) =>{
   const firstCharIsNotNumber = isNaN(input.value.charAt(0));
    if(firstCharIsNotNumber && previousResult != null){
        input.value = previousResult;
    }
    
    if(operator === '('){
        appendToInput(`${operator} `);
    }else if(operator === ')'){
        appendToInput(` ${operator}`);
    }else{
        appendToInput(` ${operator} `);
    }
}

operatorBtns.forEach(btn => btn.addEventListener('click', () =>{
   handleOperatorClick(btn.textContent);
}))

function updateResult(){
   let inputValue = input.value;
    const operaterClicked = Array.from(operatorBtns).some(btn => inputValue.includes(btn.textContent));
    if(inputValue && operaterClicked){
      Operate(inputValue);
      output.textContent = currentResult;
   }else{
      output.textContent = '';
   }
}

input.addEventListener('input', updateResult);
equalBtn.addEventListener('click', () =>{
   updateResult();
   previousResult = currentResult;
   input.value = ''
})

function Operate(input) {
   let openCount = (input.match(/\(/g)||[]).length;
   let closeCount = (input.match(/\)/g)||[]).length;
   while(openCount > closeCount){
      input += ' ) ';
      closeCount++
   }
    let expression = input.split(' ');
    while (expression.includes('(') && expression.includes(')')) {
        let openIndex = expression.lastIndexOf('(');
        let closeIndex = expression.indexOf(')', openIndex);
        if (openIndex === -1 || closeIndex === -1) {
            break; 
        }
        let subExpression = expression.slice(openIndex + 1, closeIndex);
        let subResult = evaluateExpression(subExpression);
        expression.splice(openIndex, closeIndex - openIndex + 1, subResult.toString());
    }
    currentResult = evaluateExpression(expression);
}

const evaluateExpression = (input) =>{
   let numbers = input.map(Number).filter(num => !isNaN(num));
   let operators = input.filter(op => isNaN(op));
   
   // Handle percentage calculations first
   for(let i = 0; i < operators.length; i++){
      if(operators[i] === '%'){
         let percentage = numbers[i];
         let baseNumber = numbers[i - 1];
         let secondNumber = numbers[i + 1];
         if(isNaN(baseNumber)){
            if(secondNumber == 0){
               return percentage / 100
            }else{
               return percentage * (secondNumber / 100);
            }
         }
         
         let result = baseNumber * (percentage / 100);
         numbers.splice(i - 1, 2, baseNumber + result);
         operators.splice(i, 1);
         i--;
      }
   }
   
   for(let i = 0; i < operators.length; i++){
      if(operators[i] === '*' || operators[i] === '÷'){
         let result = Calculate(operators[i], numbers[i], numbers[i + 1]);
         numbers.splice(i, 2, result);
         operators.splice(i, 1);
         i--;
      }
   }
   
   let result = numbers[0];
   for(let i = 0; i < operators.length; i++){
      result = Calculate(operators[i], result, numbers[i + 1]);
   }
   return result;
}

const Calculate = (operator, a, b) =>{
   switch(operator){
      case '+':
         return a + b;
      case '-':
         return a - b;
      case '*':
         return a * b;
      case '÷':
         if(b == 0){
            alert('Division with zero is not possible')
        }
         else if(Number.isInteger(a / b)){
            return a / b
        }else{
            return (a / b).toFixed(1)
        }
         break;
      default:
         break;
   }
}