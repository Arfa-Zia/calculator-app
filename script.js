
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

 
equalBtn.addEventListener('click' , () => {
   
    Operate(input.value)
    output.textContent = currentResult;
    previousResult = currentResult;
    input.value = '';

})

function Operate(input){
    let Input = input.split(' ')
    if(Input.includes('(') && Input.includes(')')){
        let openBracketIndex = Input.lastIndexOf('(');
        let closeBracketIndex = Input.indexOf(')' , openBracketIndex);
    
        if(openBracketIndex === -1 || closeBracketIndex === -1){
            evaluateExpression(Input)
        }
        
        let innerExpression = Input.slice(openBracketIndex + 1 , closeBracketIndex)
        let innerResult = evaluateExpression(innerExpression);

        let newExpression = []
        if(openBracketIndex != 0 ){
            for(let i = 0 ; i < Input.slice(0 , openBracketIndex).length; i++){
                newExpression.push(Input.slice(0 , openBracketIndex)[i])
            }
        }
         newExpression.push(innerResult)
        for(let i = 0 ; i < Input.slice(closeBracketIndex + 1).length; i++){
            newExpression.push(Input.slice(closeBracketIndex + 1)[i])
        }
        
        currentResult = evaluateExpression(newExpression)
        
    }
    else {
        currentResult = evaluateExpression(Input)
    }
}


function Calculate( operator , firstNum , secondNum){
    switch(operator){
        case '+':
            return firstNum + secondNum;
        break;
    case '-':
        return firstNum - secondNum;
        break;
    case '*':
        return firstNum * secondNum; 
        break;
    case '/':
        if( secondNum == 0){
            alert('Division with zero is not possible')
        }
        else if(Number.isInteger(firstNum/secondNum)){
            return firstNum / secondNum
        }
        else{
            return (firstNum / secondNum).toFixed(1)
        }
        break;
    case '%':
        return firstNum % secondNum;  
        break;
    default:
        alert('Invalid Operation');
        break;
  }
}


function evaluateExpression(input){
    let numbers = input.map(Number).filter(char => !isNaN(char));
    let operators = input.filter(char => isNaN(char));    
    let result = 0;
    
    for(let i = 0 ; i < operators.length ; i++){
   if(result == 0){
        result = Calculate(operators[i] , parseFloat(numbers[i]) , parseFloat(numbers[i+1]))
        return result
    }
    else{
        result = Calculate(operators[i] , result , parseFloat(numbers[i+1]))
        return result
    }
    }
 }
