//Cuando se acabe de cargar la pagina,  verificamos si el usuario esta loggeado
window.addEventListener('load', function () {
    if (userStorage.getItem('_user_email') != null) {
        //vamos a la pagina de competicion
        location.href = '/user.html';
    }
});

//Vamos a guradar el formulario en una varialble
let form = document.getElementById('register_form');
let userStorage = window.localStorage;//aca vamos a guardar la sesion del usuario

//Vamos a escuchar cuando el evento submit sea disparado 
form.addEventListener('submit', function (event) {
    event.preventDefault();
    //vamos a crear un locastorage para guardar la sesion del usuario con el correo
    //Guardamos el valor del input correo y loso otros datos
    let userEmailValue = document.getElementById('userEmail').value;
    let userNameValue = document.getElementById('userName').value;
    let userPhoneValue = document.getElementById('userPhone').value;
    //Guardamos los valores en el localStorage
    localStorage.setItem('_user_email', userEmailValue);
    localStorage.setItem('_user_name', userNameValue);
    localStorage.setItem('_user_phone', userPhoneValue);
    //vamos a la pagina de competicion
    location.href = '/user.html';
});
