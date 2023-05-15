
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
            showUserData();
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

function showUserData() {
    //user data
    let userName = document.getElementById('userName');
    let userEmail = document.getElementById('userEmail');
    let userPhone = document.getElementById('userPhone');
    let userAge = document.getElementById('userAge');
    let userWeight = document.getElementById('userWeight');
    userName.value = parsedData.users[userLoggedIndex].userName;
    userEmail.value = parsedData.users[userLoggedIndex].userEmail;
    userPhone.value = parsedData.users[userLoggedIndex].userPhone;
    userAge.value = parsedData.users[userLoggedIndex].userAge;
    userWeight.value = parsedData.users[userLoggedIndex].userWeight;
    //constest data
    let userPosition = document.getElementById('userPosition');
    let userContestId = document.getElementById('userContestId');
    let userTime = document.getElementById('userTime');
    let userVelocity = document.getElementById('userVelocity');
    userPosition.value = parsedData.users[userLoggedIndex].competitionData.position;
    userContestId.value = parsedData.users[userLoggedIndex].competitionData.contestId;
    userTime.value = parsedData.users[userLoggedIndex].competitionData.time;
    userVelocity.value = parsedData.users[userLoggedIndex].competitionData.velocity;

    if (parsedData.users[userLoggedIndex].userImage != '') {
        this.document.getElementById('fileInputContainer').style.display = 'none';
        this.document.getElementById('userImageImg').src = parsedData.users[userLoggedIndex].userImage;
    } else {
        this.document.getElementById('userImageContainer').style.display = 'none';
    }
}

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

let userInforForm = document.getElementById('data_form');
let userContestForm = document.getElementById('contest_form');


userInforForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let userNameValue = document.getElementById('userName').value;
    let userEmailValue = document.getElementById('userEmail').value;
    let userPhoneValue = document.getElementById('userPhone').value;
    let userAgeValue = document.getElementById('userAge').value;
    let userWeightValue = document.getElementById('userWeight').value;
    parsedData.users[userLoggedIndex].userName = userNameValue;
    parsedData.users[userLoggedIndex].userEmail = userEmailValue;
    parsedData.users[userLoggedIndex].userPhone = userPhoneValue;
    parsedData.users[userLoggedIndex].userAge = userAgeValue;
    parsedData.users[userLoggedIndex].userWeight = userWeightValue;
    userStorage.setItem('users_data', JSON.stringify(parsedData));
    showUserData();
});


userContestForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let userPositionValue = document.getElementById('userPosition').value;
    let userContestIdValue = document.getElementById('userContestId').value;
    let userTimeValue = document.getElementById('userTime').value;
    let userVelocityValue = document.getElementById('userVelocity').value;
    parsedData.users[userLoggedIndex].competitionData.position = userPositionValue;
    parsedData.users[userLoggedIndex].competitionData.contestId = userContestIdValue;
    parsedData.users[userLoggedIndex].competitionData.time = userTimeValue;
    parsedData.users[userLoggedIndex].competitionData.velocity = userVelocityValue;
    userStorage.setItem('users_data', JSON.stringify(parsedData));
    showUserData();
})


