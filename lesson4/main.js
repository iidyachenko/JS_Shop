let name_txt = document.querySelector('.input_name');
let phone_txt = document.querySelector('.input_phone');
let email_txt = document.querySelector('.input_email');
let error_txt = document.querySelector('.error_txt');
console.dir(error_txt);

document.querySelector('.sub_button').addEventListener('click', e => {
    // console.dir(name_txt);
    // console.dir(name_txt.value);
    // console.log(name_txt.value.match(/^[a-zA-Zа-яА-ЯёЁ\s]+\S$/g))
    error_txt.innerText = '';
    if (!name_txt.value.match(/^[a-zA-Zа-яА-ЯёЁ\s]+\S$/g)) {
        name_txt.style.borderColor = '#ad1212';
        error_txt.innerText = 'Обнаруженна ошибка в заполнении формы ввода. исправте отмеченные красным поля';
    }
    else {
        name_txt.style.borderColor = '#1F3F68';
    }

    // console.dir(phone_txt);
    // console.dir(phone_txt.value);
    // console.log(phone_txt.value.match(/^\+7\([\d]{3}\)[\d]{3}-[\d]{4}$/g))
    if (!phone_txt.value.match(/^\+7\([\d]{3}\)[\d]{3}-[\d]{4}$/g)) {
        phone_txt.style.borderColor = '#ad1212';
        error_txt.innerText = 'Обнаруженна ошибка в заполнении формы ввода. исправте отмеченные красным поля';
    }
    else {
        phone_txt.style.borderColor = '#1F3F68'
    }

    console.dir(email_txt);
    console.dir(email_txt.value);
    console.log(email_txt.value.match(/^[a-zа-я0-9._-]+@[a-z0-9-_]+\.[a-z0-9-_]{2,4}/iu))
    if (!email_txt.value.match(/^[a-zа-я0-9._-]+@[a-z0-9-_]+\.[a-z0-9-_]{2,4}$/ig)) {
        email_txt.style.borderColor = '#ad1212';
        error_txt.innerText = 'Обнаруженна ошибка в заполнении формы ввода. исправте отмеченные красным поля';
    }
    else {
        email_txt.style.borderColor = '#1F3F68'
    }

    console.dir(error_txt);
});