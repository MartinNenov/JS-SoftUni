import {registerPage,registerPost,logoutBtn,loginPage,loginPost} from './js/controllers/user.js';
import {homePage} from './js/controllers/home.js';
import {createPage,createPost,detailsPage,deleteBtn,editPage,editPost,buyBtn} from './js/controllers/offers.js';

const app = Sammy("main",function(){
    this.use('Handlebars','hbs');

    this.get('/register',(ctx)=>{registerPage.call(ctx)});
    this.post('/register',(ctx)=>{registerPost.call(ctx)});

    this.get('/home',(ctx)=>{homePage.call(ctx)});

    this.get('/logout',(ctx)=>{logoutBtn.call(ctx)});

    this.get('/login',(ctx)=>{loginPage.call(ctx)});
    this.post('/login',(ctx)=>{loginPost.call(ctx)});

    this.get('./create',(ctx)=>{createPage.call(ctx)})
    this.post('./create',(ctx)=>{createPost.call(ctx)})

    this.get('./details/:id',(ctx)=>{detailsPage.call(ctx)});

    this.get('./edit/:id',(ctx)=>{editPage.call(ctx)});
    this.post('./edit',(ctx)=>{editPost.call(ctx)});

    this.get('./delete/:id',(ctx)=>{deleteBtn.call(ctx)});

    this.get('./buy/:id',(ctx)=>{buyBtn.call(ctx)});

});

app.run('#/home');
