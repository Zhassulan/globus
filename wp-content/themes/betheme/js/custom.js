// Zhass JS for search ---->>>

var URL_SEARCH;
var URL_SEARCH_RESULTS;
var cards = [];

if (window.location.origin.indexOf('localhost') != -1) {
    URL_SEARCH = window.location.origin + '/learn/';
    URL_SEARCH_RESULTS = window.location.origin + '/learn/?page_id=81/';
} else {
    URL_SEARCH = window.location.origin + '/poisk/';
    URL_SEARCH_RESULTS = window.location.origin + '/results/';
}
console.log('URL_SEARCH = ' + URL_SEARCH);
console.log('URL_SEARCH_RESULTS = ' + URL_SEARCH_RESULTS);

function fillDropdown(dropdownId, arr) {
    for (let i = 0; i < arr.length; i++) {
        jQuery("#" + dropdownId).append(new Option(arr[i].name, arr[i].id));
    }
}

function getAll(query, dropdownName) {
    var data = {
        'action': 'my_action',
        'query': query
    };
    jQuery.ajax({
        type: 'GET',
        dataType: 'json',
        url: window.wp_data.ajax_url,
        data: data,
        success: function (data) {
            fillDropdown(dropdownName, data);
            setDropdownState(dropdownName, getDropdownState(dropdownName));
        }
    });
}

function getAllCountries() {
    console.log('Loading all countries..');
    getAll('get_all_countries', 'country');
}

function getAllPrograms() {
    console.log('Loading all programs..');
    getAll('get_all_programs', 'program');
}

function getAllSpecialities() {
    console.log('Loading all specialities..');
    getAll('get_all_specialities', 'specialty');
}

function getAllLanguages() {
    console.log('Loading all languages..');
    getAll('get_all_languages', 'language');
}

function fillAllDropdowns() {
    getAllCountries();
    getAllPrograms();
    getAllSpecialities();
    getAllLanguages();
}

// On load page
jQuery("document").ready(function () {
    let currentURL = window.location.href;
    console.log('Current URL: ' + currentURL);
    if (currentURL.indexOf(URL_SEARCH) != -1) {
        initLocalStorage();
    }
    if (currentURL.indexOf(URL_SEARCH) != -1 || currentURL.indexOf(URL_SEARCH_RESULTS) != -1) {
        clearAllDropdowns();
        fillAllDropdowns();
    }
    if (currentURL.indexOf(URL_SEARCH_RESULTS) != -1) {
        changeStyle();
        printSearchResults();
        printPaginator();
    }
});

function on_click_search() {
    console.log('Opening search results page..');
    let currentURL = window.location.href;
    saveAllDropdownState();
    if (currentURL == URL_SEARCH_RESULTS) {
        clearAllDropdowns();
        fillAllDropdowns();
        printSearchResults();
    } else {
        window.location = URL_SEARCH_RESULTS;
    }
}

function printSearchResults() {
    console.log('Printing results..');
    printSearchHeader();
    search(localStorage.getItem("country"), localStorage.getItem("program"), localStorage.getItem("specialty"), localStorage.getItem("language"));
}

function printSearchHeader() {
    setDiv("results_container", `
    <div>
        <div>
            <h3>Результаты поиска:</h3>
        </div>
        <div>
            <div id="found_objects" class="found_objects">
            </div>
        </div>
    </div>
    `);
}

function setDiv(divId, val) {
    jQuery("#" + divId).html(val);
}

function appendDiv(divId, val) {
    jQuery("#" + divId).append(val);
}

function getCard(card) {
    let html = `
        <div>
          <div class="card">
            <div class="img_my">
              <img src="${emptyString(card.url_pic)}">
            </div>
            <div class="desc">
              <div class="desc_txt">
                <div class="desc_title">
                  ${emptyString(card.name)}
                </div>
                <div class="text_container">
                    <div>
                      <b>Год основания:</b>
                    </div>
                    <div>
                      ${new Date(card.found).getFullYear()}
                    </div>
                    <div>
                      <b>Тип учебного заведения:</b>
                    </div>
                    <div>
                      ${emptyString(card.type)}
                    </div>
                    <div>
                      <b>Расположение:</b>
                    </div>
                    <div>
                      ${emptyString(card.location)}
                    </div>
                    <div>
                      <b>Язык обучения:</b>
                    </div>
                    <div>
                      ${emptyString(card.languages)}
                    </div>
                    <div>
                      <b>Программы:</b>
                    </div>
                    <div>
                      ${emptyString(card.programs)}
                    </div>
                </div>
              </div>
            </div>
            <div class="mor_info_btn">
              <a href="${emptyString(card.url)}">Подробно</a>
            </div>
          </div>
        </div>`;
    return html;
}

function saveDropdownState(dropdownName, value) {
    localStorage.setItem(dropdownName, value);
    console.log('Saved item in local storage ' + dropdownName + ' = ' + value);
}

function getDropdownState(dropdownName) {
    console.log('Getting dropdown "' + dropdownName + '" state..');
    return localStorage.getItem(dropdownName);
}

function saveAllDropdownState() {
    saveDropdownState('country', jQuery("#country").val());
    saveDropdownState('program', jQuery("#program").val());
    saveDropdownState('specialty', jQuery("#specialty").val());
    saveDropdownState('language', jQuery("#language").val());
}

function setDropdownState(dropdownName, value) {
    console.log('Setting dropdown "' + dropdownName + '" state to "' + value + '"');
    jQuery("#" + dropdownName).val(value);
}

function search(countryId, programId, specialtyId, languageId) {
    printWait();
    console.log('Searching with parameters country = ' + countryId + ', program = ' + programId + ', specialty = ' + specialtyId + ', language = ' + languageId);
    var data = {
        'action': 'my_action',
        'query': 'search',
        'country': countryId,
        'program': programId,
        'specialty': specialtyId,
        'language': languageId
    };
    jQuery.ajax({
        type: 'GET',
        dataType: 'json',
        url: window.wp_data.ajax_url,
        data: data,
        success: function (data) {
            if (data) {
                clearResults();
                cards = data;
                printPaginator();
            } else {
                printNoResults();
            }
        },
        error: function () {
            return "error";
        }
    });
}

function printCard(card) {
    appendDiv("found_objects", getCard(card));
}

function printNoResults() {
    let html = `
        <div>
            <h4><b>Ничего не найдено</b></h4>
        </div>
    `;
    setDiv("found_objects", html);
}

function printWait() {
    let html = `
        <div>
            <h4><b>Идёт поиск..</b></h4>
        </div>
    `;
    setDiv("found_objects", html);
}

function clearResults() {
    let html = ``;
    setDiv("found_objects", html);
}

function initLocalStorage() {
    console.log("Init local storage..");
    saveDropdownState('country', 0);
    saveDropdownState('program', 0);
    saveDropdownState('specialty', 0);
    saveDropdownState('language', 0);
    /*
    if (!localStorage.getItem('country')) {
        console.log('Setting to default value 0 dropdown "country"');
        saveDropdownState('country', 0);
    }
    if (!localStorage.getItem('program')) {
        console.log('Setting to default value 0 dropdown "program"');
        saveDropdownState('program', 0);
    }
    if (!localStorage.getItem('specialty')) {
        console.log('Setting to default value 0 dropdown "specialty"');
        saveDropdownState('specialty', 0);
    }
    if (!localStorage.getItem('language')) {
        console.log('Setting to default value 0 dropdown "language"');
        saveDropdownState('language', 0);
    }
    */
}

function emptyString(str) {
    if (str == null)
        return '';
    else
        return str;
}

function clearDropDown(dropDownId) {
    console.log('Clearing "' + dropDownId + '" dropdown..');
    jQuery("#" + dropDownId).empty();
}

function clearAllDropdowns() {
    clearDropDown('country');
    clearDropDown('program');
    clearDropDown('specialty');
    clearDropDown('language');
}

function changeStyle() {
    let color = "black";
    changeColor("dropdown_title_country", color);
    changeColor("dropdown_title_program", color);
    changeColor("dropdown_title_specialty", color);
    changeColor("dropdown_title_language", color);
}

function changeColor(titleId, color) {
    console.log('Changing style..');
    jQuery("#" + titleId).css("color", color);
}

function printPaginator() {
    console.log('Printing paginator..');
    console.log('Total cards ' + cards.length);
    jQuery('#pagination-container').pagination({
        dataSource: cards,
        callback: function (data, pagination) {
            clearResults();
            console.log('Printing cards ' + data.length);
            jQuery.each(data, function (index, item) {
                printCard(item);
            });
            //$('#data-container').html(html);
        }
    })
}


// <<<--------------Zhass JS for search
