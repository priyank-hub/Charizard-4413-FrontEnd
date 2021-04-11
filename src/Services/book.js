
const findAllCategoryURL = 'https://charizardbackend.herokuapp.com/book/getAllCategory';
const getAllBooksURL = 'https://charizardbackend.herokuapp.com/book/getAllBooks';

const addReviewURL = 'https://charizardbackend.herokuapp.com/book/addReview';

export async function getAllBooks() {
    let res;
    await fetch(getAllBooksURL, {
        method: 'get',
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        res = data;
    });
    return res;
}

export async function getAllCategory() {
    let res;
    await fetch(findAllCategoryURL, {
        method: 'get',
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        // console.log("categories", data);
        res = data;
    });
    return res;
}

export async function getBooksByCategory(cat) {
    const findBooksByCategoryURL = `https://charizardbackend.herokuapp.com/book/findByCategory?category=${cat}`;
    let res;
    await fetch(findBooksByCategoryURL, {
        method: 'get',
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        res = data;
    });
    return res;
}

export async function addReview(reviewData) {
    console.log("reviewData", reviewData);  
    let res;
    await fetch(addReviewURL, {
        method: 'post',
        body: JSON.stringify(reviewData)
    }).then(function(response) {
        console.log("response", response);
        return response.json();
    }).then(function(data) {
        res = data;
    });
    console.log("res", res);
    return res;
}

export async function getReviews(bid) {
    const getReviewsURL = `https://charizardbackend.herokuapp.com/book/getReviews?bid=${bid}`;
    let res;
    await fetch(getReviewsURL, {
        method: 'get',
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        res = data;
    });
    return res;
}
