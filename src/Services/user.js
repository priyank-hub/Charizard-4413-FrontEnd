const signUpURL = 'https://charizardbackend.herokuapp.com/user/signup';
const signInURL = 'https://charizardbackend.herokuapp.com/user/login';
const addressURL = 'https://charizardbackend.herokuapp.com/user/addAddress';
const submitOrderURl = 'https://charizardbackend.herokuapp.com/order/confirmOrder';

export async function signup(userData) {
    let res;
    await fetch(signUpURL, {
        method: 'post',
        body: JSON.stringify(userData)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        res = data;
    });
    console.log("res", res);
    return res;
}

export async function signin(userData) {
    let res;
    await fetch(signInURL, {
        method: 'post',
        body: JSON.stringify(userData)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        res = data;
    });
    // console.log("res", res);
    return res;
}

export async function addAddress(addressData) {
    let res;
    await fetch(addressURL, {
        method: 'post',
        body: JSON.stringify(addressData)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        res = data;
    });
    return res;
}

export async function getAddress(userId) {
    console.log("userid", userId);
    let res;
    const getAddressURL = `https://charizardbackend.herokuapp.com/user/getAddress?userID=${userId}`;
    await fetch(getAddressURL, {
        method: 'get'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        res = data;
    });
    return res;
}

export async function submitOrder(cardData) {
    let res;
    console.log("submitting order!");
    await fetch(submitOrderURl, {
        method: 'post',
        body: JSON.stringify(cardData)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        res = data;
    });
    
    console.log("res", res);
    return res;
}

export async function generateReport(userId) {
    let res;
    const getReportURL = `https://charizardbackend.herokuapp.com/admin/generateReport?userID=${userId}`;

    await fetch(getReportURL, {
        method: 'get'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        res = data;
    });
    return res;
}

export async function getTopTen(userId) {
    let res;
    const getTopTenURL = `https://charizardbackend.herokuapp.com/admin/getTopSold?userID=${userId}`;
    await fetch(getTopTenURL, {
        method: 'get'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        res = data;
    });
    return res;
}

export function getUser() {
    const currentUser = sessionStorage.getItem('currentUser');
    return currentUser;
}

export function isSignedIn() {
    const currentUser = sessionStorage.getItem('signedin');
    return currentUser;
}

