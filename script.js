const CLASS_MENU = "header__menu ";
const DISPLAY_NONE = "displayNone";

const CLASS_FORM = "form__input";
const CLASS_FORM_CHECKBOX = "form__personalData__checkbox__input";

const CLASS_NEWSLETTER = "newsletter"
const CLASS_NEWSLETTER_INPUT = "newsletter__input"

const NEWS_LETTER_ACTIVE = 'NewsLetter_active';

const MAIL_FORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


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
}

window.addEventListener('scroll', percentageScroller);



// Funcionality Scroll to the top page.

const scrollTop = () => {
    let intervalScroll = setInterval(function() {
        window.scrollTo(0, window.scrollY - 10);
        console.log(window.scrollY);

        if (window.scrollY <= 0) {
            clearInterval(intervalScroll);
        return;
        } 
    }, 5);
}


document
    .querySelector('#returnTop')
    .addEventListener('click', () => {
        window.setTimeout(scrollTop, 200)
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
        console.log(element.target);
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
