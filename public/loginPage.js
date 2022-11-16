'use strict'
const userForm = new UserForm();

userForm.loginFormCallback = (date) => {
    ApiConnector.login(date, response => {
        if(response.success === false){
            userForm.setLoginErrorMessage(response.error);
        } 
        location.reload();
})
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, response =>{
        console.log(response);
        if(response.success === false){
            userForm.setRegisterErrorMessage(response.error);
        }
    })
};


// ApiConnector.logout(() => {})
// login: oleg@demo.ru, password: demo