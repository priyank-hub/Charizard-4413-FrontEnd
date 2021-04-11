const addSingleBookURL = 'https://charizard4413project.herokuapp.com/order/addSingleCartItem';
const removeBookURL = 'https://charizard4413project.herokuapp.com/order/removeCartItem';

export async function addSingleBook(data) {
    let res;
    await fetch(addSingleBookURL, {
        method: 'post',
        body: JSON.stringify(data)
    }).then(function(response) {
        // console.log("response", response);
        return response.json();
    }).then(function(data) {
        res = data;
    });
    return res;
}

export async function removeBook(data) {
    let res;
    await fetch(removeBookURL, {
        method: 'post',
        body: JSON.stringify(data)
    }).then(function(response) {
        // console.log("response", response);
        return response.json();
    }).then(function(data) {
        res = data;
    });
    return res;
}