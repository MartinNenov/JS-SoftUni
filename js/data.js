//import {beginRequest , endRequest,showError} from './notifications.js' ;
import API from './api.js'

const endpoints = {
    OFFERS: 'data/offers',
    OFFERS_BY_ID: 'data/offers/'
}

const api = new API(
    '7897239D-F763-EDAD-FF8A-B258CE384B00',
    '30AD4301-1120-4FB0-AED3-E0DC27FC42C4',
    //beginRequest,
    //endRequest
    );

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

//get all recipes

export async function getAll(){
    return await api.get(endpoints.OFFERS);
}

//create recipe

export async function create(body){
    return await api.post(endpoints.OFFERS,body);
}

//get recipe by id

export async function getByID(id){
    return await api.get(endpoints.OFFERS_BY_ID+id);
}

//edit recipe by id

export async function editByID(id,body){
    return await api.put(endpoints.OFFERS_BY_ID+id,body);
}

//delete recipe by id

export async function deleteByID(id){
    return await api.delete(endpoints.OFFERS_BY_ID+id);
}

//like recipe by id

export async function buyById(id){
    let response = await getByID(id);
    return await editByID(id,{peopleBoughtIt : response.peopleBoughtIt +', '+ sessionStorage.getItem('email')});
}



