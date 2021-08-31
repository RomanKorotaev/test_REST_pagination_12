import axios from 'axios';

var _ = require('lodash'); // добавляем эту запись, чтобы не выбивало ощшибку, при использовании функции _.throttle избиблиотеки Lodash


const  refs  = {
    form: document.querySelector('#form'),
    input: document.querySelector('#search'),
    container: document.querySelector('.container'),
    searchBtn2: document.querySelector('#searchBtn2'),
    more: document.querySelector('#more')
}

// //  // Пример запроса на бекенд через функцию  fetch
// const hndlerSubmit = (event) => {
//     event.preventDefault()
//     const value = refs.input.value;
//     console.log(value)

//     fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
//         .then(response => response.json())
//         .then(coctails => renderCollection(coctails.drinks))
//         .catch(err => console.log(err))
// }
// //  //------------------------------------------------------------------------


 // Пример запроса на бекенд через функцию  библиотеку axios
 // сначала установить ее через коменду npm install, а потом экспортируем в файл index.js: import axios from 'axios';
const hndlerSubmit = (event) => {
    event.preventDefault()
    const value = refs.input.value;
    console.log(value)

    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
    .then(result => renderCollection (result.data.drinks))
    .catch(err => console.log(err))        
}



function createItem({strDrinkThumb, strDrink}) {  
    const article = `<article>
        <img src= '${strDrinkThumb}'  alr= '${strDrink}'/>
        <p>${strDrink}</p>
        </article>
    `
    refs.container.insertAdjacentHTML('beforeend', article)
}

function renderCollection(arr) {
    arr.forEach (el => createItem (el) )
}

//Здесь та же функция с более простым, полным синтаксисом
// function createItem(obj) {
    
//      const coctailItem = `
// <article>
//   <img src= '${obj.strDrinkThumb}'  alr= '${obj.strDrink}'/>
//   <p>${obj.strDrink}</p>
// </article>
// `
    
//     return coctailItem;
// }

refs.form.addEventListener('submit', hndlerSubmit)



// ---------------------------Пример пагинации по API Github.--------- ПАГИНАЦИЯ

//это счётчик, который увеличивается при каждом запросе
let currentPage = 1;

const gitHandlerSummit = (e) => {
    e.preventDefault();
    const value = refs.input.value;
    axios.get (`https://api.github.com/search/users?q=${value}&client_id=f13c8683999b71a3600d&client_secret=eef562743c32c4ec5620bede29fc2b437c46f55c&page=${currentPage}`)
        .then(result => renderGitCollection(result.data.items))
        .then(() => currentPage++) // увеличиваем счётчик после каждого запроса
    .catch( (err) => console.log(err))
}

const gitHandlerSummitScroll = (e) => {
    console.log ("Сработала функция gitHandlerSummitScroll")
    e.preventDefault();
    const value = refs.input.value;
    axios.get (`https://api.github.com/search/users?q=${value}&client_id=f13c8683999b71a3600d&client_secret=eef562743c32c4ec5620bede29fc2b437c46f55c&page=${currentPage}`)
        .then(result => renderGitCollection(result.data.items))
        .then(() => currentPage++) // увеличиваем счётчик после каждого запроса
    .catch( (err) => console.log(err))
}


refs.searchBtn2.addEventListener('click', gitHandlerSummit)
refs.more.addEventListener('click', gitHandlerSummit)
//Ивент scroll вешается не на какой-то DOM- элемент, а на объект  window
window.addEventListener ('scroll', _.throttle(gitHandlerSummitScroll, 1000) )


function createGitItem({avatar_url, login}) {  
    const article = `<article>
        <img src= '${avatar_url}'  alr= '${login}'/>
        <p>${login}</p>
        </article>
    `
    refs.container.insertAdjacentHTML('beforeend', article)
}

function renderGitCollection(arr) {
    arr.forEach (el => createGitItem (el) )
}