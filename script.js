const CLASS_MENU = "header__menu ";
const DISPLAY_NONE = "displayNone";

const CLASS_MENU_ENLACES = "header__menu__menuEnlaces";

const CLASS_FORM = "form__input";
const CLASS_FORM_CHECKBOX = "form__personalData__checkbox__input";

const CLASS_NEWSLETTER = "newsletter"
const CLASS_NEWSLETTER_INPUT = "newsletter__input"

const NEWS_LETTER_ACTIVE = 'NewsLetter_active';

const MAIL_FORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

let actualCurrency = "usd";
const currenciesSymbols = {usd: "$", eur: "€", gbp: "£"};

const CLASS_SLIDER_IMG = "slider__img";
const CLASS_SLIDER_CIRCLES = "slider__circles__circle";


// Functionality to desplagate menu in the header in the mobile version.
document
    .querySelector('#menuBtn')
    .addEventListener('click', () => {
        let menu = document.getElementById('menu');
        if (menu.getAttribute('class').includes('displayNone')) {
            menu.setAttribute('class', CLASS_MENU);

            document.getElementById('munuBurger').setAttribute('class', DISPLAY_NONE);
            document.getElementById('menuCross').setAttribute('class', '');
        } else {
            menu.setAttribute('class', CLASS_MENU + DISPLAY_NONE);

            document.getElementById('menuCross').setAttribute('class', DISPLAY_NONE);
            document.getElementById('munuBurger').setAttribute('class', '');
        }
    });



// Functionality to percentage scroller
const percentageScroller = () => {
    let scrollPercent = Math.round((document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight))*100);
    document.getElementById('percentageScroller').setAttribute('style', 'width: ' + scrollPercent + '%');
    
    // A part to the functionality for de popUp 'News Letter'
    if (scrollPercent >= 25) {
        if (localStorage.getItem(NEWS_LETTER_ACTIVE) != "false" || sessionStorage.getItem(NEWS_LETTER_ACTIVE) != "false") {
            newsletter();
        }
    }

    if (scrollPercent >= 32 && scrollPercent < 63) {
        document.getElementsByClassName('header__menu__menuEnlaces--black')[0].setAttribute('class', CLASS_MENU_ENLACES)
        document.getElementsByClassName('header__menu__menuEnlaces')[1].setAttribute('class', CLASS_MENU_ENLACES + ' ' + CLASS_MENU_ENLACES + '--black')
    } else if (scrollPercent >= 63 && scrollPercent < 93) {
        document.getElementsByClassName('header__menu__menuEnlaces--black')[0].setAttribute('class', CLASS_MENU_ENLACES)
        document.getElementsByClassName('header__menu__menuEnlaces')[2].setAttribute('class', CLASS_MENU_ENLACES + ' ' + CLASS_MENU_ENLACES + '--black')
    } else if (scrollPercent >= 93 && scrollPercent <= 100) {
        document.getElementsByClassName('header__menu__menuEnlaces--black')[0].setAttribute('class', CLASS_MENU_ENLACES)
        document.getElementsByClassName('header__menu__menuEnlaces')[3].setAttribute('class', CLASS_MENU_ENLACES + ' ' + CLASS_MENU_ENLACES + '--black')
    } else {
        document.getElementsByClassName('header__menu__menuEnlaces--black')[0].setAttribute('class', CLASS_MENU_ENLACES)
        document.getElementsByClassName('header__menu__menuEnlaces')[0].setAttribute('class', CLASS_MENU_ENLACES + ' ' + CLASS_MENU_ENLACES + '--black')
    }

    return scrollPercent;
}

window.addEventListener('scroll', percentageScroller);



// Funcionality Scroll to the top page.

const scroll = (scrollPercent) => {
    let intervalScroll = setInterval(function() {

        scrollPercent <= percentageScroller() ? window.scrollTo(0, window.scrollY - 10) : window.scrollTo(0, window.scrollY + 10);

        if (percentageScroller() == scrollPercent) {
            clearInterval(intervalScroll);
        return;
        } 
    }, 5);
}


document
    .querySelector('#returnTop')
    .addEventListener('click', () => {
        window.setTimeout(scroll(0), 200)
    });



// Funcionality menu

const menu = document.querySelectorAll('.header__menu__menuEnlaces')
menu.forEach(e => {
    e.addEventListener('click', () => {
        document.getElementsByClassName('header__menu__menuEnlaces--black')[0].setAttribute('class', CLASS_MENU_ENLACES)
        e.setAttribute('class', CLASS_MENU_ENLACES + ' ' + CLASS_MENU_ENLACES + '--black')
    
        scroll(e.value)
    });
});



// Funcionality, 'Post' the name and email.
const sendForm = async (name, email) => {

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: name,
          body: email,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}


// Funcionality to validation form.
document
    .querySelector('#formBtn')
    .addEventListener('click', () => {
        let formName = document.getElementById('formName');
        let formEmail = document.getElementById('formEmail');
        let formCheck = document.getElementById('formCheck');
        if (!(formName.value.length >= 2 && formName.value.length <= 100)) {
            formName.setAttribute("class", CLASS_FORM + " " + CLASS_FORM + "--red");
            return;
        } else {
            formName.setAttribute("class", CLASS_FORM);
        }

        if (!formEmail.value.match(MAIL_FORMAT)) {
            formEmail.setAttribute("class", CLASS_FORM + " " + CLASS_FORM + "--red");
            return;
        } else {
            formEmail.setAttribute("class", CLASS_FORM);
        }

        if (!formCheck.checked) {
            formCheck.setAttribute("class", CLASS_FORM_CHECKBOX + " " + CLASS_FORM_CHECKBOX + "--red");
            return; 
        } else {
            formCheck.setAttribute("class", CLASS_FORM_CHECKBOX);
        }

        sendForm(formName.value, formEmail.value);
    });



// Functionality for the popUp.
    
const newsletter = () => {
    document.getElementById('popUp').setAttribute('class', CLASS_NEWSLETTER);
}

window.setTimeout(() => {
    if (localStorage.getItem(NEWS_LETTER_ACTIVE) != "false" || sessionStorage.getItem(NEWS_LETTER_ACTIVE) != "false") {
        newsletter();
    }
}, 5000)


const closePopUp = () => {
    document.getElementById('popUp').setAttribute('class', CLASS_NEWSLETTER + ' ' + DISPLAY_NONE);
    localStorage.setItem(NEWS_LETTER_ACTIVE, false);
    sessionStorage.setItem(NEWS_LETTER_ACTIVE, false);
}


document
    .querySelector('#newsletterCross')
    .addEventListener('click', () => {
        closePopUp();
    })

document
    .querySelector('#popUp')
    .addEventListener('click', (element) => {
        if (element.target.id == "popUp") {
            closePopUp();
        }
    })

document
    .querySelector('#newsletterBtn')
    .addEventListener('click', () => {
        let newsletterEmail = document.getElementById('newsletterEmail');
        if (!newsletterEmail.value.match(MAIL_FORMAT)) {
            newsletterEmail.setAttribute("class", CLASS_NEWSLETTER_INPUT + " " + CLASS_NEWSLETTER_INPUT + "--red");
            return;
        } else {
            newsletterEmail.setAttribute("class", CLASS_NEWSLETTER_INPUT);
            closePopUp();
            sendForm('News Letter', newsletterEmail.value);
        }
    })

// Functionality to change currency.

const changePrices = (priceCurrency) => {
    let prices = document.querySelectorAll('.cardPricing__columna__price');
    prices.forEach(e => {
        e.innerHTML = currenciesSymbols[actualCurrency] + parseFloat(e.innerHTML.substring(1) * priceCurrency).toFixed(0);
    });
}

const currencies = (currency) => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + actualCurrency + "/" + currency + ".json")
      .then(response => response.json())
      .then(data => {
        actualCurrency = currency;
        changePrices(data[currency]);
      })
}

document
    .querySelector('#moneda')
    .addEventListener('change', (element) => {
        currencies(element.target.value);
    })



// Funcionality Slider

class Slider {
    constructor(elementoPrincipal) {
        this.elementoPrincipal = elementoPrincipal;
    }

    changeSlider(a) {
        let imagenActual = document.getElementById(this.elementoPrincipal);
        imagenActual.setAttribute('class', CLASS_SLIDER_IMG + " " + DISPLAY_NONE);

        idNumSlider += a;

        if (idNumSlider > 8) {
            idNumSlider = 1
        } else if (idNumSlider < 1) {
            idNumSlider = 8
        }

        this.elementoPrincipal = ID_SLIDER + idNumSlider;
        document.getElementById(this.elementoPrincipal).setAttribute('class', CLASS_SLIDER_IMG);

        document.getElementsByClassName(CLASS_SLIDER_CIRCLES + "--big")[0]
            .setAttribute('class', CLASS_SLIDER_CIRCLES);

        circleSlider[idNumSlider-1].setAttribute('class', CLASS_SLIDER_CIRCLES + " " + CLASS_SLIDER_CIRCLES + "--big");
    }
}


const ID_SLIDER = "slider";
let slider = new Slider("slider1");
let idNumSlider = 1;
let circleSlider = document.getElementsByClassName('slider__circles__circle');
let imagenesSlider = document.getElementsByClassName("slider__img");

function intervalSliderFunction() {
    intervalSlider = setInterval(() => {
        slider.changeSlider(1)
    }, 5000);   
}
intervalSliderFunction()


document
    .querySelector('#sliderArrowLeft')
    .addEventListener('click', () => {
        clearInterval(intervalSlider);
        slider.changeSlider(-1);
        intervalSliderFunction();
    })

document
    .querySelector('#sliderArrowRigth')
    .addEventListener('click', () => {
        clearInterval(intervalSlider);
        slider.changeSlider(1);
        intervalSliderFunction();
    })


for (let i = 0; i < circleSlider.length; i++) {
    circleSlider[i].addEventListener("click", (e) => {
        clearInterval(intervalSlider);
        slider.changeSlider(i - (idNumSlider - 1));
        intervalSliderFunction();
    });
}