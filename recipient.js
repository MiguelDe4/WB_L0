window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i !== -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type === "blur" && this.value.length < 5)  this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });

    let form = document.getElementById('recipient')
    for (let i = 0; i < form.childElementCount; i++){
        let div = form.children[i]
        for (let k = 0; k < div.childElementCount; k++){
            let label = div.children[k]
            if (label.localName === 'label'){
                label.children[1].addEventListener("keyup", () => showTitle(label.children[1]))
            }
        }
    }

    document.getElementById('name').addEventListener('blur', (e) => validateName(e.target.id))
    document.getElementById('lastName').addEventListener('blur', (e) => validateLastName(e.target.id))
    document.getElementById('email').addEventListener('blur', (e) => validateEmail(e.target.id))
    document.getElementById('phone').addEventListener('blur', (e) => validatePhone(e.target.id))
    document.getElementById('INN').addEventListener('blur', (e) => validateINN(e.target.id))
});

function showTitle(input){
    if (input.value) {
        input.previousElementSibling.style.display = 'inline-block'
    } else {
        input.previousElementSibling.style.display = 'none'
    }
}

let flagName = true;
let flagLastName = true;
let flagEmail = true;
let flagPhone = true;
let flagINN = true;
let INN
let name
let lastName
let email
let phone


function validateName (id){
    name = name || id
    let target = document.getElementById(name);
    if(!target.value.match("^[a-zA-Zа-яА-Я]+$") && target.value){
        renderError(target)
        if (flagName) {
            target.addEventListener('keyup', validateName)
            flagName = false
        }
    }
    if (target.value.match("^[a-zA-Zа-яА-Я]+$") || !target.value){
        flagName = true
        target.removeEventListener('keyup', validateName)
        renderErrorMiss(target)
    }
}

function validateLastName (id){
    lastName = lastName || id
    let target = document.getElementById(lastName);
    if(!target.value.match("^[a-zA-Zа-яА-Я]+$") && target.value){
        renderError(target)
        if (flagLastName) {
            target.addEventListener('keyup', validateLastName)
            flagLastName = false
        }
    }
    if (target.value.match("^[a-zA-Zа-яА-Я]+$") || !target.value){
        flagLastName = true
        target.removeEventListener('keyup', validateLastName)
        renderErrorMiss(target)
    }
}

function renderError(target){
    if (target.id === 'email'){
        target.nextElementSibling.innerHTML = 'Проверьте адрес электронной почты'
    }
    if (target.id === 'phone'){
        target.nextElementSibling.innerHTML = 'Формат: +9 999 999 99 99'
    }
    if (target.id === 'INN'){
        target.nextElementSibling.innerHTML = 'Формат: 1234567'
    }
    target.style.borderBottom = '1px solid #F55123'
    target.style.color = '#F55123'
    target.nextElementSibling.style.display = 'inline-block'
}

function renderErrorMiss(target){
    if (target.id === 'email'){
        target.nextElementSibling.innerHTML = 'Укажите электронную почту'
    }
    if (target.id === 'phone'){
        target.nextElementSibling.innerHTML = 'Укажите номер телефона'
    }
    if (target.id === 'INN'){
        target.nextElementSibling.innerHTML = 'Укажите ИНН'
    }
    target.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)'
    target.style.color = 'black'
    target.nextElementSibling.style.display = 'none'
}

function validateEmail(id){
    email = email || id
    let target = document.getElementById(email);
    let emailCheck = target.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(!emailCheck && target.value){
        renderError(target)
        if (flagEmail) {
            target.addEventListener('keyup', validateEmail)
            flagEmail = false
        }
    }
    if (emailCheck || !target.value){
        flagEmail = true
        target.removeEventListener('keyup', validateEmail)
        renderErrorMiss(target)
    }
}

function validatePhone(id){
    phone = phone || id
    let target = document.getElementById(phone);
    let phoneCheck = target.value
    if(phoneCheck.length < 18 && target.value){
        renderError(target)
        if (flagPhone) {
            target.addEventListener('keyup', validatePhone)
            flagPhone = false
        }
    }
    if (phoneCheck.length === 18 || !target.value){
        flagPhone = true
        target.removeEventListener('keyup', validatePhone)
        renderErrorMiss(target)
    }
}

function validateINN(id){
    INN = INN || id
    let target = document.getElementById(INN);
    let INNCheck = target.value
    if(!INNCheck.match(/^\d+$/) && target.value){
        renderError(target)
        if (flagINN) {
            target.addEventListener('keyup', validateINN)
            flagINN = false
        }
    }
    if (INNCheck.match(/^\d+$/) || !target.value){
        flagINN = true
        target.removeEventListener('keyup', validateINN)
        renderErrorMiss(target)
    }
}

function checkForm(){
    let flagArr = [flagName, flagLastName, flagEmail, flagPhone, flagINN]
    let form = document.getElementById('recipient')
    let flag = true
    let flagFlags = true
    for (let i = 0; i < form.childElementCount; i++){
        let div = form.children[i]
            for (let k = 0; k < div.childElementCount; k++){
            let check = div.children[k].children[1]
            if (!check.value) {
                flag = false;
                check.nextElementSibling.style.display = 'inline-block'
                check.style.borderBottom = '1px solid #F55123'
                check.scrollIntoView({block: "center", behavior: "smooth"})
            }
        }
    }
    flagArr.forEach(el =>{
        if (!el){
            flagFlags = false
        }
    })
    if (sum > 0 && flag && flagFlags){
        alert('Мы уже начали собирать ваш заказ!!!!')
    }
}