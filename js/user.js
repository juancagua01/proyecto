
//Cuando se acabe de cargar la pagina,  verificamos si el usuario esta loggeado
window.addEventListener('load', function () {
    if (userStorage.getItem('_user_email') == null) {
        //vamos a la pagina de inicio si el usuario no esta loggeado
        location.href = '/index.html';
    }
});

//Si el usuario esta registrado, mostramos sus datos
let userData = document.getElementById('data_form');
let userStorage = window.localStorage;//aca vamos a guardar la sesion del usuario
let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
let userPhone = document.getElementById('userPhone');

userName.value = userStorage.getItem('_user_name');
userEmail.value = userStorage.getItem('_user_email');
userPhone.value = userStorage.getItem('_user_phone');


