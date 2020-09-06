import { setAuth } from './../auth.js';
import partials from './common.js';
import { getByID, create, deleteByID, editByID } from './../data.js';

export function createPage() {
    setAuth(this);
    this.loadPartials(partials).partial('./../../templates/offers/create.hbs');
}

export async function deleteBtn() {
    let id = this.params.id;
    let result = await deleteByID(id);
    this.redirect('#/home');
}
let offerToEdit ;

export async function editPage() {
    setAuth(this);

    let id = this.params.id;
    let offer = await getByID(id);
    offerToEdit = id;
    this.offer = offer;
    this.loadPartials(partials).partial('./../../templates/offers/edit.hbs');
}

export async function buyBtn(){
    let id = this.params.id;
    let offer = await getByID(id);
    if(offer.peopleBoughtIt == ''){
        await editByID(id,{peopleBoughtIt:offer.peopleBoughtIt+`${sessionStorage.getItem('email')}`})
    }else{
        await editByID(id,{peopleBoughtIt:offer.peopleBoughtIt+`, ${sessionStorage.getItem('email')}`})
    }
    this.redirect('#/details/'+id);
}


export async function editPost() {

    try {
        
        let { brand, description, imageURL, name, price } = this.params;
        if (brand == '' || description == '' || imageURL == '' || name == '' || price == '') {
            throw new Error('All input fields shouldn’t be empty');
        }
        let editedOffer = {
            brand: brand,
            description: description,
            imageURL: imageURL,
            name: name,
            price: +price,
        }
        
        let result = await editByID(offerToEdit, editedOffer);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        this.redirect('#/details/' + offerToEdit);
    } catch (err) {
        console.log(err);
    }
}

export async function detailsPage() {
    setAuth(this);
    let id = this.params.id;
    let offer = await getByID(id);
    let currUserEmail = sessionStorage.getItem('email');
    this.offer = offer;

    let peopleBoughtItArr = offer.peopleBoughtIt.split(', ');
    this.alredyBought = peopleBoughtItArr.includes(currUserEmail)

    this.creator = (offer.creator == currUserEmail)
    this.id = id;
    this.loadPartials(partials).partial('./../../templates/offers/details.hbs');
}

export async function createPost() {
    let { brand, description, imageURL, name, price } = this.params;
    try {
        if (brand == '' || description == '' || imageURL == '' || name == '' || price == '') {
            throw new Error('All input fields shouldn’t be empty');
        }
        let newOffer = {
            brand: brand,
            creator: sessionStorage.getItem('email'),
            description: description,
            imageURL: imageURL,
            name: name,
            peopleBoughtIt: "",
            price: +price,
        }
        let result = await create(newOffer);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        this.redirect('#/home');
    } catch (err) {
        console.log(err);
    }
}