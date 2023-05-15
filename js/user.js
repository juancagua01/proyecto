
//Cuando se acabe de cargar la pagina,  verificamos si el usuario esta loggeado
let userLoggedIndex;
let userStorage = window.localStorage;
let parsedData = JSON.parse(userStorage.getItem('users_data'));
window.addEventListener('load', function () {
    if (!JSON.parse(userStorage.getItem('users_data')).users.length > 0) {
        //vamos a la pagina de inicio si el usuario no esta loggeado
        location.href = '/index.html';
    }
    JSON.parse(userStorage.getItem('users_data')).users.forEach((user, index) => {

        if (user.isUserLogged) {
            userLoggedIndex = index;
            //Si el usuario esta registrado, mostramos sus datos
            let userData = document.getElementById('data_form');
            let userName = document.getElementById('userName');
            let userEmail = document.getElementById('userEmail');
            let userPhone = document.getElementById('userPhone');

            userName.value = parsedData.users[userLoggedIndex].userName;
            userEmail.value = parsedData.users[userLoggedIndex].userEmail;
            userPhone.value = parsedData.users[userLoggedIndex].userPhone;
        }
    });
    if (parsedData.users[userLoggedIndex].userImage != '') {
        this.document.getElementById('fileInputContainer').style.display = 'none';
        this.document.getElementById('userImageImg').src = parsedData.users[userLoggedIndex].userImage;
    } else {
        this.document.getElementById('userImageContainer').style.display = 'none';
    }
    this.document.getElementById('save-button').addEventListener('click', saveImage);
});

function userLogOut() {
    parsedData.users[userLoggedIndex].isUserLogged = false;
    userStorage.setItem('users_data', JSON.stringify(parsedData));
    location.href = '/index.html';
}


function saveImage() {
    let userPhotoInput = document.getElementById('userPhotoInput');
    const file = userPhotoInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const imageSrc = reader.result;//optenemos la ruta de la imagen
        parsedData.users[userLoggedIndex].userImage = imageSrc;
        userStorage.setItem('users_data', JSON.stringify(parsedData));
    }
    reader.readAsDataURL(file);
    if (parsedData.users[userLoggedIndex].userImage != '') {
        document.getElementById('fileInputContainer').style.display = 'flex';
    } else {
        document.getElementById('userImageContainer').style.display = 'none';
    }
};



