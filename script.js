
const icon = document.querySelector('i');
const body = document.querySelector('body');

const input = document.getElementById('input');
const output = document.getElementById('output');

const Btns = document.querySelectorAll('.btn');




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
}

function delFunc() {
    let  str = input.value;
    input.value = str.slice(0 , -1);

}


function Calculate(str){
   let operators = str.match(/[\*\-\+\/]/g)
   let operands = str.split(/[\*\-\+\/]/g).map(Number)
   let result;

   for(let i=0; i < operators.length ; i++){
    let operator = operators[i];
    let firstOperand = operands[i];
    let sencondOperand = operands[i+1];

    switch(operator){
        case "+":
            result =  firstOperand + sencondOperand;
            break;
        case "-":
            result =  firstOperand - sencondOperand;
            break;
        case "*":
            result =  firstOperand * sencondOperand;
            break;
        case "/":
            if(firstOperand / sencondOperand == "Infinity"){
                alert('Division with 0 is not possible')
            }
            else{
                result =  (firstOperand / sencondOperand).toFixed(5)
            }
            break;
    }
   }

    output.textContent = result
    input.value = '';
}



Btns.forEach( btn => btn.addEventListener( 'click' , () => {
    input.value += btn.textContent
}))




