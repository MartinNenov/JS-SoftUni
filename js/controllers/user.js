import {setAuth} from './../auth.js';
import partials from './common.js';
import {register,login,logout} from './../data.js';

export function registerPage(){
    setAuth(this);
    this.loadPartials(partials).partial('./../../templates/user/register.hbs');
}

export function loginPage(){
    setAuth(this);
    this.loadPartials(partials).partial('./../../templates/user/login.hbs');
}

export async function loginPost(){
    let {email,password} = this.params;
    try{
        if(email == undefined||email == null||email == ''){
            throw new Error('The email input must be filled'); 
        }if(password.length < 6){
            throw new Error('The password should be at least 6 characters long'); 
        }
        let result = await login(email, password);
        if(result.hasOwnProperty('errorData')){
            const error = new Error();
            Object.assign(error,result);
            throw error;
        }
        this.redirect('#/home');
    }catch(err){
        console.log(err);
    }
}

export async function registerPost(){
    let {email,password,rePassword} = this.params;
    try{
        if(email == undefined||email == null||email == ''){
            throw new Error('The email input must be filled'); 
        }if(password.length < 6){
            throw new Error('The password should be at least 6 characters long'); 
        }if(password !== rePassword){
            throw new Error('The repeat password should be equal to the password'); 
        }
        let result = await register(email,password);
        if(result.hasOwnProperty('errorData')){
            const error = new Error();
            Object.assign(error,result);
            throw error;
        }
        await login(email, password);
        this.redirect('#/home');
    }catch(err){
        console.log(err);
    }
}

export async function logoutBtn(){
    let result = await logout();
    console.log(result);
    this.redirect('#/login')
}