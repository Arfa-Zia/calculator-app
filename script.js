
const themeToggleBtn = document.getElementById('toggle-btn');
const icon = document.querySelector('i');
const body = document.querySelector('body');
const btns = document.querySelectorAll('button');



const ToggleIcons = () =>  {
    if(icon.classList.contains('fa-sun')){
        icon.classList.replace('fa-sun' , 'fa-moon');
    }
    else if (icon.classList.contains('fa-moon')){
        icon.classList.replace('fa-moon' , 'fa-sun')
    }
}

themeToggleBtn.addEventListener('click' , () => {
    body.classList.toggle('dark');
    ToggleIcons();
})


