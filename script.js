
const icon = document.querySelector('i');
const body = document.querySelector('body');

const input = document.getElementById('input');
const output = document.getElementById('output');

const Btns = document.querySelectorAll('.btn');
const operatorBtns = document.querySelectorAll('.operator-btn')
const equalBtn = document.querySelector('#equal-btn')

let previousResult = null ;
let currentResult;



const ToggleIcons = () =>  {
    if(icon.classList.contains('fa-sun')){
        icon.classList.replace('fa-sun' , 'fa-moon');
    }
    else if (icon.classList.contains('fa-moon')){
        icon.classList.replace('fa-moon' , 'fa-sun')
    }
    body.classList.toggle('dark');
}

function clearInput() {
    output.textContent = '';
    input.value = '';
    previousResult = null
}

function delFunc() {
    let  str = input.value;
    input.value = str.slice(0 , -1);

}


Btns.forEach( btn => btn.addEventListener( 'click' , () => {
    input.value += btn.textContent
     updateResult();
}))

operatorBtns.forEach( btn => btn.addEventListener('click' , () => {

    if(!Number(input.value.charAt(0)) && previousResult != null){
        
            input.value = previousResult;
    
            if(btn.textContent == '('){
                input.value += `${btn.textContent} `
            }
            else if(btn.textContent == ')'){
                input.value += ` ${btn.textContent}`
            }
            else{
                input.value += ` ${btn.textContent} `
            }
        }
        else{
            if(btn.textContent == '('){
                input.value += `${btn.textContent} `
            }
            else if(btn.textContent == ')'){
                input.value += ` ${btn.textContent}`
            }
            else{
                input.value += ` ${btn.textContent} `
            }
        }   
}))

 function updateResult() {
    let inputValue = input.value;
    const operaterClicked = Array.from(operatorBtns).some(btn => inputValue.includes(btn.textContent.trim()));
    if (inputValue && operaterClicked) {
        Operate(inputValue);
        output.textContent = currentResult;
    } else {
        output.textContent = '';
    }
}
input.addEventListener('input', updateResult);
equalBtn.addEventListener('click' , () => { updateResult(); previousResult = currentResult; input.value = '';})

function Operate(input) {
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


function evaluateExpression(input) {
  let numbers = input.map(Number).filter(num => !isNaN(num));
  let operators = input.filter(op => isNaN(op));

     // Handle percentage calculations first
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '%') {
            let percentage = numbers[i];
            let baseNumber = numbers[i - 1];
            let secondNumber = numbers[i + 1];            
            if (isNaN(baseNumber)) {
            if(secondNumber == 0) {
            return percentage / 100
        }else {
            return percentage * (secondNumber / 100);  
        }
    }

            let result = baseNumber * (percentage / 100);
            numbers.splice(i - 1, 2, baseNumber + result);
            operators.splice(i, 1);
            i--; 
        }
    }

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '*' || operators[i] === '÷') {
      let result = Calculate(operators[i], numbers[i], numbers[i + 1]);
      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i--;
    }
  }

    // Handle remaining addition and subtraction
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        result = Calculate(operators[i], result, numbers[i + 1]);
    }
    return result;
}

function Calculate( operator , a , b){
    switch(operator){
    case '+':
            return a + b;
    case '-':
        return a - b;
    case '*':
        return a * b; 
    case '÷':
        if( b == 0){
            alert('Division with zero is not possible')
        }
        else if(Number.isInteger(a/b)){
            return a / b
        }
        else{
            return (a / b).toFixed(1)
        }
        break;
    default:
        alert('Invalid Operation');
        break;
  }
}
