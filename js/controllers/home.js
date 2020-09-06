import partials from './common.js';
import {setAuth} from './../auth.js';
import {getAll} from './../data.js'
    


export async function homePage(){
    setAuth(this);
    let allOffers = await getAll();
    this.allOffers = allOffers;
    this.loadPartials(partials).partial('./../../templates/home.hbs');
}