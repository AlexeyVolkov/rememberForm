/**
 * Saves the form's input data and fill in the form.
 * Script requires <form name="uniqueFormName">
 * 
 * @param {string} formQuery - css selectors` path to the form (ex: ".my_class #my_form")
 * @param {bool} tracking - do we respect browser`s doNotTrack option?
 * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event
 * @author Alex (alexey.a.volkov@pm.me)
 */
function rememberForm(formQuery, tracking = false, expireDaysInput = 30) {
    // grab reference to form
    const formElem = document.querySelector(formQuery);
    // if the form exists
    if (formElem == null || formElem == undefined) {
        console.debug("Cannot find form: " + formQuery);
        return;
    }
    // if the form NAME exists
    if (!formElem.hasAttribute('name')) {
        // no Form name found
        console.debug("Cannot find form[name]: " + formQuery);
        return;
    }

    const listName = 'rFS__list' + formElem.getAttribute('name');
    const cookiePrefix = 'rF__' + formElem.getAttribute('name') + '_';
    // if it's not an Integer -> set 30 days
    const expireDays = (Number.isInteger(parseInt(expireDaysInput, 10))) ? parseInt(expireDaysInput, 10) : 30;

    // if no tracking asked
    if (true == tracking && "doNotTrack" in navigator && navigator.doNotTrack) {
        deleteCookie(listName);
        return;
    }

    // check if there was cookie
    // so we can fill in the form
    if (getCookie(listName)) {
        // get list of saved cookies
        var JSONlistCookies = JSON.parse(getCookie(listName));
        // loop through Cookies
        JSONlistCookies.forEach(function (item, index, array) {
            // set form value
            var cookieValue = getCookie(cookiePrefix + item);
            if (cookieValue != null && cookieValue != undefined && cookieValue != '')
                formElem[item].value = getCookie(cookiePrefix + item);
        });
    }

    // form submit handler
    formElem.addEventListener('submit', (e) => {
        // on form submission, prevent default
        // e.preventDefault();
        // construct a FormData object, which fires the formdata event
        new FormData(formElem);
    });

    // form change handler
    formElem.addEventListener('change', (e) => {
        // construct a FormData object, which fires the formdata event
        new FormData(formElem);
    });

    /**
     * formdata handler to retrieve data
     * @link https://developer.mozilla.org/en-US/docs/Web/API/FormDataEvent
     */
    formElem.addEventListener('formdata', (e) => {
        // Get the form data from the event object
        var data = e.formData;
        // list of cookies
        var listCookies = [];
        // Display the key/value pairs
        for (var pair of data.entries()) {
            if (pair[0] !== null &&
                pair[0] !== undefined &&
                pair[0] !== '' &&
                pair[1] !== null &&
                pair[1] !== undefined &&
                pair[1] !== '') {
                setCookie(cookiePrefix + pair[0], pair[1], 30);
                listCookies.push(pair[0]);
            }
        }
        // rememberFormSpecial Cookie saves all the Cookies in Array
        setCookie(listName, JSON.stringify(listCookies), expireDays);
    });
}