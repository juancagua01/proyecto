// Vamos a crear un objeto usuario para poder administrar mejor la informacion
let userModel = {
    userName: '',
    userPassword: '',
    userEmail: '',
    isUserLogged: false,
    userImage: '',
    userPhone: '',
    userAge: '',
    competitionData: {
        position: '',
        contestId: '',
        time: '',
        velocity: ''
    }
}
//Cuando se acabe de cargar la pagina,  verificamos si el usuario esta loggeado
let userStorage = window.localStorage;//aca vamos a guardar la sesion del usuario
window.addEventListener('load', function () {
    userStorage.getItem('users_data') == null && userStorage.setItem('users_data', JSON.stringify({ users: [] }));
    if (JSON.parse(userStorage.getItem('users_data')).users.length > 0) {
        //vamos a la pagina de competicion
        JSON.parse(userStorage.getItem('users_data')).users.forEach((user, index) => {
            //debugger;
            if (user.isUserLogged) {
                location.href = '/user.html';
            }
        });
    }
});

//Vamos a guradar el formulario en una varialble
let registerForm = document.getElementById('register_form');
let loginForm = document.getElementById('login_form');

//Vamos a escuchar cuando el evento submit sea disparado 
registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    //vamos a crear un locastorage para guardar la sesion del usuario con el correo
    //Guardamos el valor del input correo y loso otros datos
    let userEmailValue = document.getElementById('registerUserEmail').value;
    let userNameValue = document.getElementById('registerUserName').value;
    let userPhoneValue = document.getElementById('registerUserPhone').value;
    let userPasswordValue = document.getElementById('registerUserPassword').value;
    let registeredUser = JSON.parse(JSON.stringify(userModel));
    registeredUser['userName'] = userNameValue;
    registeredUser['userEmail'] = userEmailValue;
    registeredUser['userPhone'] = userPhoneValue;
    registeredUser['userPassword'] = userPasswordValue;
    registeredUser['isUserLogged'] = true;
    //Guardamos los valores en el localStorage

    let parsedData = JSON.parse(userStorage.getItem('users_data'));
    parsedData.users.push(registeredUser);
    userStorage.setItem('users_data', JSON.stringify(parsedData));
    //vamos a la pagina de competicion
    location.href = '/user.html';
});
//
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    //primero verificamos si el usuario existe
    let loggedUserMail = document.getElementById('userEmail');
    let loggedUserPass = document.getElementById('userPassword');
    let userMailIndex;
    let userExist = JSON.parse(userStorage.getItem('users_data')).users.some((user, index) => {
        userMailIndex = index;
        return user.userEmail == loggedUserMail.value
    });
    let userPassIndex;
    let userCorrectPassWord = JSON.parse(userStorage.getItem('users_data')).users.some((user, index) => {
        userPassIndex = index;
        return user.userPassword == loggedUserPass.value
    });
    if (userExist) {
        if (userCorrectPassWord) {
            if (userMailIndex == userPassIndex) {
                let parsedData = JSON.parse(userStorage.getItem('users_data'));
                parsedData.users[userMailIndex].isUserLogged = true;
                userStorage.setItem('users_data', JSON.stringify(parsedData));
                location.href = '/user.html';
            }
        }
    }
});
