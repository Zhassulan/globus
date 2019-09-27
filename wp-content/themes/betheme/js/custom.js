// Zhass JS for search ---->>>
const OPTION_NULL = 'Не выбрано';
const URL_ROOT = 'http://localhost/learn/';
const URL_SEARCH_RESULTS = URL_ROOT + '?page_id=81';

function addNullOptionDropdown(dropDownId)    {
    jQuery("#" + dropDownId).append(new Option(OPTION_NULL, -1));
}

function getSortedListByAlpFromArr(arr) {
    let list = arr.sort(function(a, b){
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    });
    return list;
}

function fillDropdown(dropdownId, countries)   {
    for(let i = 0; i < countries.length; i++) {
        jQuery("#" + dropdownId).append(new Option(countries[i].name, countries[i].id));
    }
}

function getAll(query, dropdownName)  {
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
        },
        error: function () {
            return "error";
        }
    });
}

function getAllCountries()  {
    console.log('Loading all countries..');
    getAll('get_all_countries', 'country');
}

function getAllPrograms()  {
    console.log('Loading all programs..');
    getAll('get_all_programs', 'program');
}

function getAllSpecialities()  {
    console.log('Loading all specialities..');
    getAll('get_all_specialities', 'specialty');
}

function getAllLanguages()  {
    console.log('Loading all languages..');
    getAll('get_all_languages', 'language');
}

function fillAllDropdowns()   {
    getAllCountries();
    getAllPrograms();
    getAllSpecialities();
    getAllLanguages();
    /*
    let listCountries = getSortedListByAlpFromArr(COUNTRIES);
    for(let i = 0; i < listCountries.length; i++) {
        jQuery("#country").append(new Option(listCountries[i].name, listCountries[i].id));
    }
    */
}

// On load page
jQuery("document").ready(function() {
    fillAllDropdowns();
    let currentURL = window.location.href;
    let idx = currentURL.indexOf(URL_SEARCH_RESULTS);
    if (idx != -1)  {
        printSearchResults();
    }
});

/*
function addProgDef() {
    jQuery("#program").children().remove();
    jQuery.each(programsOptsDef, function (key, val) {
        jQuery("#program").append(jQuery("<option></option>")
            .attr("value", key)
            .text(val));
    });
}

function addProgFr() {
    jQuery("#program").children().remove();
    jQuery.each(programsOptsFr, function (key, val) {
        jQuery("#program").append(jQuery("<option></option>")
            .attr("value", key)
            .text(val));
    });
}

*/

jQuery("#country").on('change', function () {
    let selectedCountry = jQuery("#country").val();
    console.log(selectedCountry);
    /*
    if (selectedCountry == 'country_fr') {
        console.log('Loading program values for France..');
        addProgFr();
    }
    */
    /*
    var data = {
        'action': 'my_action',
        'query': 'get_all_countries'
    };
    jQuery.get( window.wp_data.ajax_url, data, function(response) {
        console.log('Получено с сервера: ' + response);
    });
    */
});

jQuery("#program").on('change', function () {
    console.log('changed');
});

function on_click_search() {
    console.log('Opening search results page..');
    let currentURL = window.location.href;
    let idx = currentURL.indexOf(URL_SEARCH_RESULTS);
    saveAllDropdownState();
    if (idx != -1)  {
        printSearchResults();
    }   else    {
        window.location = URL_SEARCH_RESULTS;
    }
}

function printSearchResults() {
    console.log('Printing results..');
    printSearchHeader();
    search(localStorage.getItem("country"), localStorage.getItem("program"), localStorage.getItem("language"));
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

function printCard(card) {
    let html = `
        <div>
          <div class="card">
            <div class="img">
              <img src="${card.url_pic}">
            </div>
            <div class="desc">
              <div class="desc_txt">
                <div class="desc_title">
                  ${card.name}
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
                      ${card.type}
                    </div>
                    <div>
                      <b>Расположение:</b>
                    </div>
                    <div>
                      ${card.location}
                    </div>
                    <div>
                      <b>Язык обучения:</b>
                    </div>
                    <div>
                      ${card.languages}
                    </div>
                    <div>
                      <b>Программы:</b>
                    </div>
                    <div>
                      ${card.programs}
                    </div>
                </div>
              </div>
            </div>
            <div class="mor_info_btn">
              <a href="${card.url }">Подробно</a>
            </div>
          </div>
        </div>`;
    appendDiv("found_objects", html);
}

function saveDropdownState(dropdownName, value)    {
    localStorage.setItem(dropdownName, value);
    console.log('Saved item in local storage ' + dropdownName + ' = ' + value);
}

function getDropdownState(dropdownName) {
    return localStorage.getItem(dropdownName);
}

function saveAllDropdownState() {
    saveDropdownState('country', jQuery("#country").val());
    saveDropdownState('program', jQuery("#program").val());
    saveDropdownState('specialty', jQuery("#specialty").val());
    saveDropdownState('language', jQuery("#language").val());
}

function setDropdownState(dropdownName, value) {
    console.log('Setting dropdown ' + dropdownName + ' value ' + value);
    jQuery("#" + dropdownName).val(value);
}

function setAllDropdownState()  {
    setDropdownState('country', getDropdownState('country'));
    setDropdownState('program', getDropdownState('program'));
    setDropdownState('specialty', getDropdownState('specialty'));
    setDropdownState('language', getDropdownState('language'));
}

function search(countryId, programId, languageId)  {
    printWait();
    console.log('Searching with parameters country = ' + countryId + ", program = " + programId + ", language = " + languageId);
    var data = {
        'action': 'my_action',
        'query': 'search',
        'country': countryId,
        'program': programId,
        'language': languageId
    };
    jQuery.ajax({
        type: 'GET',
        dataType: 'json',
        url: window.wp_data.ajax_url,
        data: data,
        success: function (data) {
            if (data)   {
                clearResults();
                for(let i = 0; i < data.length; i++) {
                    printCard(data[i]);
                }
            }   else {
                printNoResults();
            }
        },
        error: function () {
            return "error";
        }
    });
}

function printNoResults()   {
    let html = `
        <div>
            <h4><b>Ничего не найдено</b></h4>
        </div>
    `;
    setDiv("found_objects", html);
}

function printWait()   {
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

// <<<--------------Zhass JS for search
