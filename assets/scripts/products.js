//Function that returns the HTML elements required. sE is a shortcut, it means selectElement.

const sE = (element) => document.querySelector(element); 

////////////////////////////////////////////////

//Product constructor

class Products{
    result = []

    constructor(data){
        this.data = data;
    }

     /** Method that will look for the ID in the JSON. 
     *Params string id - A number that it's a string */
     getDessertByID = (id) => this.data.filter((dessert) => dessert.id === id);

     /** Method that will create the structure of the product's cards HTML and return it. 
     *Params object dessert - A specific object created in the JSON data.json 
     * in the button tag has an onclick event calling the addToCart() function 
     */
     buildHTMLCard = (dessert) => {
         return `<div class="column is-3 card">
                     <div class="card-image">
                         <figure class="image is-4by3">
                             <img src="${dessert.img}" alt="">
                         </figure>
                     </div>
                 <div class="card-content">
                     <div class="media">
                         <div class="media-content">
                             <p class="title is-4"><span class="title-gradient">${dessert.name}</span></p>
                             <p class="subtitle is-4">${dessert.price}$</p>
                         </div>
                     </div>
       
                 <div class="content">${dessert.description}</div>
                 <div class="buttons">
                     <button class="button is-primary view-details" id="view-details" onclick="viewDetails(event, '${dessert.id}')"><i class="fas fa-plus"></i> <p>View details</p>  </button>
                     <button class="button is-link is-light" onclick="addToCart('${dessert.id}')"><i class="fas fa-shopping-basket"></i> <p>Add to basket</p></button>
                 </div>
                 </div>
             </div>
             `
     }

     /** Method that will create the structure of each table row in the HTML and return it. 
     *Params object dess - a specific object created in the data.json */
     buildIngredientsList = (dess) => {
         let html = ''
         dess.ingredients.forEach(ingredient => {
             html += `<tr>
                         <td>${ingredient}</td>
                     </tr>`
         })
         return html
     }

     /** Method that will create the structure of the view more modal in HTML and return it. 
     *Params object dessert - An object created in the JSON data.json 
     * in the button tag has an onclick event calling the addToCart() function 
     */
     viewMore = (dessert) => {
         return `
         <div class="column tile is-3 is-vertical is-centered card" id="view-more-modal">
             <div class="card-image">
                 <figure class="image is-4by3">
                     <img src='${dessert.img}' alt="">
                 </figure>
             </div>
             <div class="card-content">
                 <div class="media">
                     <div class="media-content">
                         <p class="title is-4"><span class="title-gradient">${dessert.name}</span></p>
                         <p class="subtitle is-4">${dessert.price}$</p>
                     </div>
                 </div>
                 <div id="modal-buttons">
                     <button class="button is-link is-light" onclick="addToCart('${dessert.id}')"><i class="fas fa-shopping-basket"></i> <p>Add to basket</p></button>
                 </div>
             </div>
         </div>
         <div class="column is-9 is-centered" id='description-modal'>
             <p class="title">Description</p>
             <div class="content">${dessert.description}</div>
             <table class="table is-fullwidth">
                 <thead>
                     <tr>
                     <th id="ingredients">Ingredients</th>
                     </tr>
                 </thead>
                 <tbody>
                     ${this.buildIngredientsList(dessert)}
                 </tbody>
             </table>
         </div>` 
     }

     /** Method that will render the structure of the HTML created in this.viewMore. 
     *Params string divID - An element from the DOM 
     *Params object sourceData - the specified object you want to view more 
     */
     buildViewMoreCard = (divID, sourceData) => {
         let container = sE(divID);
         container.innerHTML = '';
         let html = this.viewMore(sourceData);
         container.innerHTML = html
     }

     /** Method that will render the structure of the HTML created in this.viewMore. 
     *Params string divID - An element from the DOM 
     *Params object sourceData - the data in data.json */
     buildList = (divID, sourceData) => {
         let container = sE(divID);
         container.innerHTML = '';
         let html = '';
         this[sourceData].forEach(dessert => {
             html += this.buildHTMLCard(dessert);
         })

         container.innerHTML = html;
     }
     /** Method that will render the structure of the HTML created in this.viewMore. 
     *Params string key - the value of the input storage in the variable searchBox in the main.js file */
     search = (key) => {
         this.results = [];
         this.data.forEach((dessert) => {
             (dessert.name.toLowerCase().includes(key.toLowerCase())) && this.results.push(dessert)
         })
         return this.results;
     }
}