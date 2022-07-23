//Variables
let modal;
let closeModal;
let keyframes;
let options;
let searchBox;

//////////////////////////////////////////////////////////////////////////////////////////////////

// Arrow function to search the value of the data in the input, that the user previously writes
const getSearchValue = () => {
    const searchBoxValue = searchBox.value;
    const searchResult = desserts.search(searchBoxValue);

    if (searchBoxValue.trim() !== '') {
        setSearchKeyRender(searchBoxValue, searchResult.length);
        desserts.buildList('.columns', 'results');
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////


/**Arrow function that renders the value of the previous function (getSearchValue)
 * Params string key - the value of the searchBox input
 * Params int resultLength - the length of the searchResult variable
*/
const setSearchKeyRender = (key, resultLength) => {
    $('#search-result-length').html(resultLength);
    $('#search-key').html(key);
    $('.results').css({
        display: "flex"
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////

/**Arrow function that will call a method from the class Products and one from the class ShoppingBasket
 * Params object id - the specified object you want add to cart
*/
const addToCart = (id) => {
    let dessert = desserts.getDessertByID(id)[0];
    shoppingBasket.add(dessert)
}

/////////////////////////////////////////////////////////////////////////////////////////////////

/**Arrow function that will call a method from the class Products and one from the class ShoppingBasket
 * Params object id - the specified object you want to delete from the cart
*/
const deleteItem = (id) => {
    const dessert = desserts.getDessertByID(id)[0];
    shoppingBasket.removeDessert(dessert);
}

//////////////////////////////////////////

/**Arrow function to open and close de view more modal in the HTML. 
 * this function also calls for the this.buildViewMoreCard() method of the class Products to render the information required
 * Params object id - the specified object you want to delete from the cart
 * Params e - the event
*/
const viewDetails = (e, id) => {
    (e.target) && modal.classList.add('is-active');

    const dessert = desserts.getDessertByID(id)[0];
    desserts.buildViewMoreCard('#modal-details-content', dessert);

    (modal?.classList?.[1] === 'is-active') && closeModal.addEventListener('click', () => modal?.classList.remove('is-active'));
}

////////////////////////////////////////////////

/*Arrow function for deleting all the content in the cart
 *This function also calls for the this.emptyCart() method of the class ShoppingBasket 
*/ 
const emptyTheCart = () => {
    shoppingBasket.emptyCart()
};


///////////////////////////////////////////////

/*Arrow function for opening the modal in the cart
*/ 
const clickBuyBtn = (e) => {
    e.preventDefault()
    $('#shipping-address').show('slow');
    $('.modal-content').animate(keyframes = {
        scrollTop: 0
    }, options = 1000);
    $('#cart').hide()

}

//////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Arrow function for rendering de value introducing by the user in the different cart inputs
 */
const renderResume = () => {
    /* searching the values of the inputs with jQuery */

    const addressOne = $('input[name="address1"]');
    const addressTwo = $('input[name="address2"]');
    const countrySelect = $('select[name="country"] option:checked');
    const city = $('input[name="city"]');
    const shipZipCode = $('input[name="zipcode"]')
    const phoneNumb = $('input[name="phonenumber"]')
    const textArea =$('textarea[name="textarea"]')
    const cardNumber = $('input[name="cardnumber"]')
    const month= $('select[name="selectmonth"] option:checked')
    const year= $('select[name="selectyear"] option:checked')
    const payZipCode = $('input[name="zipcode2"]')
    const mail = $('input[name="mail"]')

    $('.shipping-display').html(
        `<p>${addressOne.val()}</p>
        <p>${addressTwo.val()}</p>
        <p>${countrySelect.val()}</p>
        <p>${city.val()}</p>
        <p>${shipZipCode.val()}</p>
        <p>${phoneNumb.val()}</p>
        <p>${textArea.val()}</p>
        `)
    $('.payment-display').html(
        `<p>${cardNumber.val()}</p>
        <p>${month.val()}</p>
        <p>${year.val()}</p>
        <p>${payZipCode.val()}</p>
        `)
    $('.mail-display').html(
        `<p>${mail.val()}</p>`
    )
}

//window.onload
window.onload = () => {

    //creating a new object by AJAX calling
    $.ajax({
        method: "GET",
        url: "/assets/scripts/data.json"
    }).done((data) => {
        desserts = new Products(data);
        desserts.buildList('#products', 'data');

    }).fail((error) => {
        console.log(error);
    });

    ////////////////////////

    //Creating the shopping cart
    shoppingBasket = new ShoppingBasket([]);
    shoppingBasket.populate();
    shoppingBasket.cartLength('#cart-length');
    shoppingBasket.buildBasket('.cart-container');

    ////////////////////////////////

    //sE is an abrevation of 'selectElement', is a selector created by me. You can find the structure of it in the file products.js
    const body = sE('body');
    const nav = sE('nav');
    const overlay = sE('.overlay');
    const cart = sE('#cart-length');
    const formSearch = sE('#search-container');
    searchBox = sE("#search-box");
    const searchButton = sE('#search-button');
    modal = sE('#modal-section');
    closeModal = sE('#view-more-close');
    const closeCartModal = sE('#close-cart-modal');
    const cartModal = sE('#cart-modal');
    const buyBtn = sE('#buy-cart-btn')

    ////////////////////////////////////////////////////////////

    //Form validations//

    $("form[name='shipping-information'").validate({
        rules:{
            address1: {
                required: true,
                minlength: 5
            },
            city: {
                required: true,
                minlength: 4
            },
            zipcode: {
                required: true,
                minlength: 4,
                maxlength: 7
            },
            phonenumber: {
                required:true,
            }
        },
        submitHandler: function(form){
            $("form[name='shipping-information'").on('submit', (e) => {
                e.preventDefault(e)
                $('#shipping-address').hide();
                $('.modal-content').animate(keyframes = {
                    scrollTop: 0
                }, options = 1000);
                $('#payment-section').show('slow');
            })
            $('#shipping-continue_btn').click((e) => {
                e.preventDefault(e)
                $('#shipping-address').hide();
                $('.modal-content').animate(keyframes = {
                    scrollTop: 0
                }, options = 1000);
                $('#payment-section').show('slow');
            })
        }
    })

    $("form[name='payment-information'").validate({
        rules:{
            cardnumber: {
                required: true,
                creditcard: true,
            },
            selectmonth: {
                required: true,
            },
            selectyear: {
                required:true,
            },
            cvc: {
                required: true,
                number: true,
                minlength: 3,
                maxlength: 4
            },
            zipcode2: {
                required: true,
                minlength: 4,
                maxlength: 7
            },
            mail: {
                required:true
            }
        },
        submitHandler: function(form){
            $("form[name='payment-information'").on('submit', (e) => {
                e.preventDefault()
                $('#payment-section').hide("slow");
                $('.modal-content').animate(keyframes = {
                    scrollTop: 0
                }, options = 1000);
        
                renderResume()
        
                $('#finish-shopping_section').show('slow');
            })
            $('#payment-continue_btn').click((e) =>{
                e.preventDefault()
                $('#payment-section').hide("slow");
                $('.modal-content').animate(keyframes = {
                    scrollTop: 0
                }, options = 1000);
        
                renderResume()
        
                $('#finish-shopping_section').show('slow');
            })
        }

    })

    ////////////////////////////////////////////////////////////////

    //Events//

    //EventListener that will change the navbar background-color on scroll
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop || document.body.scrollTop > window.innerHeight) {
            $('nav').addClass('bg-scroll');
            $('.logo').css({ filter: 'invert(1)' });
            $('.home').css({ color: 'var(--color1)' });
            $('.the').css({ color: 'var(--color1)' });
        } else {
            $('nav').removeClass('bg-scroll');
            $('.logo').css({ filter: '' });
            $('.home').css({ color: '' });
            $('.the').css({ color: '' });
        }
    })

    //////////////////////////////////////////////////////////////

    //EventListener that will open and close the mobile menu
    sE('.menu-toggle').addEventListener('click', () => {
        body.classList.toggle('fixed-position');
        nav.classList.toggle('menu-active');
        overlay.classList.toggle('menu-open');
    })
    nav.addEventListener('click', () => {
        nav.classList.remove('menu-active');
        body.classList.remove('fixed-position');
        overlay.classList.remove('menu-open');
    })


    ///////////////////////////////////////////////////////////

    //EventListener that will hide or show the different sections in the cart-container of the HTML

    $('#shipping-address').hide();
    $('#payment-section').hide();
    $('#finish-shopping_section').hide();
    $('#thanks-for-buying').hide();

    $('#shipping-cancel_btn').click((e) =>{
        e.preventDefault()
        cartModal.classList.remove('is-active');
        $('html').removeClass('is-clipped');
        $('#cart-section').css({
            display: 'none'
        })  
        $('#shipping-address').hide();
        $('#payment-section').hide();
        $('#finish-shopping_section').hide();
        $('#thanks-for-buying').hide();
        $('#cart').show()
    })

    $('#payment-cancel_btn').click((e) =>{
        e.preventDefault()
        $('#payment-section').hide("slow");
        $('.modal-content').animate(keyframes = {
            scrollTop: 0
        }, options = 1000);
        $('#shipping-address').show('slow')
    })
    $("form[name='payment-information'").on('submit', (e) => {
        e.preventDefault()
        $('#payment-section').hide("slow");
        $('.modal-content').animate(keyframes = {
            scrollTop: 0
        }, options = 1000);

        renderResume()

        $('#finish-shopping_section').show('slow');
    })
    $('#payment-continue_btn').click((e) =>{
        e.preventDefault()
        $('#payment-section').hide("slow");
        $('.modal-content').animate(keyframes = {
            scrollTop: 0
        }, options = 1000);

        renderResume()

        $('#finish-shopping_section').show('slow');
    })

    $("#finish-shopping_section").on('submit', (e) => {
        e.preventDefault(e)
        $('#shipping-address').hide();
        $('.modal-content').animate(keyframes = {
            scrollTop: 0
        }, options = 1000);
        $('#payment-section').show('slow');
    })
    $('#finish-continue_btn').click((e) => {
        e.preventDefault();
        $('#finish-shopping_section').hide();
        $('#thanks-for-buying').show("slow");
        shoppingBasket.emptyCart();

    })
    $('#finish-cancel_btn').click((e) =>{
        e.preventDefault()
        cartModal.classList.remove('is-active');
        $('html').removeClass('is-clipped');
        $('#cart-section').css({
            display: 'none'
        })
        $('#finish-shopping_section').hide();
        $('#cart').show()
    })

    $('#thanks-for-buying').on('submit', (e) => {
        e.preventDefault()
        cartModal.classList.remove('is-active');
        $('html').removeClass('is-clipped');
        $('#cart-section').css({
            display: 'none'
        })
        $('#thanks-for-buying').hide();
        $('#cart').show()
    })
    $('#go-to-home_btn').click((e) =>{
        e.preventDefault()
        cartModal.classList.remove('is-active');
        $('html').removeClass('is-clipped');
        $('#cart-section').css({
            display: 'none'
        })
        $('#thanks-for-buying').hide();
        $('#cart').show()
    })

    //////////////////////////////////////////////////////////////

    //Disabling the buy button if the cart is empty
    buyBtn.disabled = true;
    (shoppingBasket.basket.length > 0) ? buyBtn.disabled = false : buyBtn.disabled = true;
    //EventListener that will call the getSearchValue function
    searchButton.disabled = true;
    searchButton.addEventListener('click', () => getSearchValue);

    //////////////////////////////////////////////////////////

    //EventListener that will disabled the input button
    searchBox.addEventListener('input', (event) => (event.target.value.length > 3) ? searchButton.disabled = false : searchButton.disabled = true);

    /////////////////////////////////////////////////////////

    //EventListener that will call the getSearchValue function through the submit button
    formSearch.addEventListener('submit', (event) => {
        event.preventDefault();
        (!searchButton.disabled) ? getSearchValue() : console.log("Error");
    })

    ///////////////////////////////////////////////////////

    //EvenetListener for open and close the cart modal section
    $('#cart-section').hide('slow')

    cart.addEventListener('click', () => {
        cartModal.classList.add('is-active');
        $('html').addClass('is-clipped');
        $('#cart-section').show("slow");
    })
    $('.cart-toggle').click(() => {
        cartModal.classList.add('is-active');
        $('html').addClass('is-clipped');
        $('#cart-section').show("slow");
    })

    closeCartModal.addEventListener('click', () => {
        cartModal.classList.remove('is-active');
        $('html').removeClass('is-clipped');

        $('#shipping-address').hide();
        $('#payment-section').hide();
        $('#finish-shopping_section').hide();
        $('#thanks-for-buying').hide();
        $('#cart-section').hide();
        $('#cart').show();
    })

    ////////////////////////////////////////////////////

    //EventListener that will return to all the products in the page after you search for one in particular
    $(".go-back").click((e) => {
        e.preventDefault();
        (e.target) ? desserts.buildList('.columns', 'data'): console.log("Error");
        $('.results').css({ display: "none" });
    })

    //////////////////////////////////////////////////////

    //EventListener that will create a smooth behavior on scrolling back to the beginning of the page or after you click a element in the nav   
    $('nav a[href*="#"]').click(function() {
        $('html, body').animate(keyframes = {
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, options = 1000);
    });

    $('#up').click(() => {
        $('html, body').animate(keyframes = {
            scrollTop: 0
        }, options = 2000);
    });

    //////////////////////////////////////////////////////////

}
