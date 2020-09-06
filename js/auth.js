export function setAuth(ctx){
    if(sessionStorage.length > 1){
        ctx.auth = true;
        ctx.email = sessionStorage.getItem('email');
    }else{
        ctx.auth = false;
    }
}