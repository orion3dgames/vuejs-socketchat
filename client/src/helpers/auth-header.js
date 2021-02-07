export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}

export function isLoggedIn() {
    console.log('CHECKING IF LOGGED IN');
    const loggedIn = localStorage.getItem('user');
    if (loggedIn) {
        console.log('LOGGED IN');
        return true;
    }else{
        console.log('NOT LOGGED IN');
        return false
    }
}