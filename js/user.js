
//Cuando se acabe de cargar la pagina,  verificamos si el usuario esta loggeado
let userLoggedIndex;
let userStorage = window.localStorage;
window.addEventListener('load', function () {
    if (!JSON.parse(userStorage.getItem('users_data')).users.length > 0) {
        //vamos a la pagina de inicio si el usuario no esta loggeado
        location.href = '/index.html';
    }
    JSON.parse(userStorage.getItem('users_data')).users.forEach((user, index) => {
        //debugger;
        if (user.isUserLogged) {
            userLoggedIndex = index;
            //Si el usuario esta registrado, mostramos sus datos
            let userData = document.getElementById('data_form');
            let userStorage = window.localStorage;//aca vamos a guardar la sesion del usuario
            let userName = document.getElementById('userName');
            let userEmail = document.getElementById('userEmail');
            let userPhone = document.getElementById('userPhone');

            //debugger;
            userName.value = JSON.parse(userStorage.getItem('users_data')).users[userLoggedIndex].userName;
            userEmail.value = JSON.parse(userStorage.getItem('users_data')).users[userLoggedIndex].userEmail;
        }
    });
});

function userLogOut() {
    let parsedData = JSON.parse(userStorage.getItem('users_data'));
    parsedData.users[userLoggedIndex].isUserLogged = false;
    userStorage.setItem('users_data', JSON.stringify(parsedData));
    location.href = '/index.html';
}




