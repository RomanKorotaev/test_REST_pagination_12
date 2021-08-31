import axios from 'axios';

const  refs  = {
    form: document.querySelector('#form'),
    input: document.querySelector('#search'),
    container: document.querySelector('.container')
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

refs.form.addEventListener ('submit', hndlerSubmit)