// Zhass JS for search ---->>>

var URL_SEARCH;
var URL_SEARCH_RESULTS;

if (window.location.origin.indexOf('localhost') != -1)    {
    URL_SEARCH = window.location.origin + '/learn/';
    URL_SEARCH_RESULTS = window.location.origin + '/learn/?page_id=81/';
}   else {
    URL_SEARCH = window.location.origin + '/poisk/';
    URL_SEARCH_RESULTS = window.location.origin + '/results/';
}
console.log('URL_SEARCH = ' + URL_SEARCH);
console.log('URL_SEARCH_RESULTS = ' + URL_SEARCH_RESULTS);

function fillDropdown(dropdownId, arr)   {
    for(let i = 0; i < arr.length; i++) {
        jQuery("#" + dropdownId).append(new Option(arr[i].name, arr[i].id));
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
}

// On load page
jQuery("document").ready(function() {
    let currentURL = window.location.href;
    if (currentURL == URL_SEARCH || currentURL == URL_SEARCH_RESULTS)  {
        fillAllDropdowns();
    }
    if (currentURL == URL_SEARCH_RESULTS)  {
        printSearchResults();
    }
});

jQuery("#program").on('change', function () {
    console.log('changed');
});

function on_click_search() {
    console.log('Opening search results page..');
    let currentURL = window.location.href;
    saveAllDropdownState();
    if (currentURL == URL_SEARCH_RESULTS)  {
        fillAllDropdowns();
        printSearchResults();
    }   else    {
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
    if (!localStorage.getItem(dropdownName)) {
        localStorage.getItem(dropdownName);
    }   else {
        return 0;
    }
}

function saveAllDropdownState() {
    saveDropdownState('country', jQuery("#country").val());
    saveDropdownState('program', jQuery("#program").val());
    saveDropdownState('specialty', jQuery("#specialty").val());
    saveDropdownState('language', jQuery("#language").val());
}

function setDropdownState(dropdownName, value) {
    jQuery("#" + dropdownName).val(value);
}

function setAllDropdownState()  {
    setDropdownState('country', getDropdownState('country'));
    setDropdownState('program', getDropdownState('program'));
    setDropdownState('specialty', getDropdownState('specialty'));
    setDropdownState('language', getDropdownState('language'));
}

function search(countryId, programId, specialtyId, languageId)  {
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
