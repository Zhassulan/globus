// Zhass JS for search ---->>>

var URL = {
    SEARCH: '',
    URL_SEARCH_RESULTS: '',
    SEARCH_MANAGEMENT: '',
};
var COLOR = {
    WHITE: 'white'
};

var ARR = {
    cards: [],
    countries: [],
    languages: [],
    programs: [],
    specialities: []
}

if (window.location.origin.indexOf('localhost') != -1) {
    URL.SEARCH = window.location.origin + '/learn/?page_id=94';
    URL.SEARCH_RESULTS = window.location.origin + '/learn/?page_id=81';
    URL.SEARCH_MANAGEMENT = window.location.origin + '/learn/?page_id=86';
} else {
    URL.SEARCH = window.location.origin + '/poisk';
    URL.SEARCH_RESULTS = window.location.origin + '/results';
    URL.SEARCH_MANAGEMENT = window.location.origin + '/data';
}

function fillDropdown(dropdownId, arr) {
    console.log('Заполняется dropdown ' + dropdownId + '..');
    for (let i = 0; i < arr.length; i++) {
        jQuery("#" + dropdownId).append(new Option(arr[i].name, arr[i].id));
    }
}

function jsonToStr(data) {
    return JSON.stringify(data, undefined, 2);
}

function getData(params) {
    return new Promise(function (resolve, reject) {
        jQuery.ajax({
            type: 'GET',
            dataType: 'json',
            url: window.wp_data.ajax_url,
            data: params,
            error: function () {
                reject(null);
            },
            success: function (data) {
                resolve(data);
            }
        });
    });
}

function getCountries() {
    console.log('Загрузка из базы всех стран..');
    let params = { 'action': 'my_action', 'query': 'get_all_countries' };
    getData(params).then(
        response => {
            ARR.countries = response;
            //console.log('Загруженные страны:\n' + jsonToStr(response));
            console.log('Загружено стран: ' + response.length);
            fillDropdown('country', ARR.countries);
            setDropdownState('country', getDropdownState('country'));
        },
        error => console.log('Ошибка при получении списка стран. '  + error)
    );
}

function getLanguages() {
    console.log('Загрузка из базы всех языков..');
    let params = { 'action': 'my_action', 'query': 'get_all_languages' };
    getData(params).then(
        response => {
            ARR.languages = response;
            //console.log('Загруженные языки:\n' + jsonToStr(response));
            console.log('Загружено языков: ' + response.length);
            fillDropdown('language', ARR.languages);
            setDropdownState('language', getDropdownState('language'));
        },
        error => console.log('Ошибка при получении списка языков. '  + error)
    );
}

function getPrograms() {
    console.log('Загрузка из базы всех программ..');
    let params = { 'action': 'my_action', 'query': 'get_all_programs' };
    getData(params).then(
        response => {
            ARR.programs = response;
            //console.log('Загруженные программы:\n' + jsonToStr(response));
            console.log('Загружено программ: ' + response.length);
            fillDropdown('program', ARR.programs);
            setDropdownState('program', getDropdownState('program'));
        },
        error => console.log('Ошибка при получении списка программ. '  + error)
    );
}

function getSpecialities() {
    console.log('Загрузка из базы всех специальностей..');
    let params = { 'action': 'my_action', 'query': 'get_all_specialities' };
    getData(params).then(
        response => {
            ARR.specialities = response;
            //console.log('Загруженные специальности:\n' + jsonToStr(response));
            console.log('Загружено специальностей: ' + response.length);
            fillDropdown('specialty', ARR.specialities);
            setDropdownState('specialty', getDropdownState('specialty'));
        },
        error => console.log('Ошибка при получении списка специальностей. ' + error)
    );
}

function fillAllDropdowns() {
    getCountries();
    getPrograms();
    getLanguages();
    getSpecialities();
}

// On load page
jQuery("document").ready(function () {
    let currentURL = window.location.href;
    console.log('Current URL: ' + currentURL);
    console.log('URL.SEARCH: ' + URL.SEARCH);
    console.log('URL.SEARCH_RESULTS: ' + URL.SEARCH_RESULTS);
    console.log('URL.SEARCH_MANAGEMENT: ' + URL.SEARCH_MANAGEMENT);
    //console.log('Window width ' + jQuery(window).width())
    if (currentURL.indexOf(URL.SEARCH_MANAGEMENT) != -1) {
        console.log('Current page: URL.SEARCH_MANAGEMENT');
        return;
    }
    if (currentURL.indexOf(URL.SEARCH) != -1) {
        console.log('Current page: URL.SEARCH');
        initLocalStorage();
        if (jQuery(window).width() < 500) {
            console.log('Changing color of title..');
            jQuery("#dropdown_title_country").css("color", COLOR.WHITE);
            jQuery("#dropdown_title_program").css("color", COLOR.WHITE);
            jQuery("#dropdown_title_specialty").css("color", COLOR.WHITE);
            jQuery("#dropdown_title_language").css("color", COLOR.WHITE);
        }
        clearAllDropdowns();
        fillAllDropdowns();
    }
    if (currentURL.indexOf(URL.SEARCH_RESULTS) != -1) {
        console.log('Текущая страница: URL.SEARCH_RESULTS');
        clearAllDropdowns();
        fillAllDropdowns();
        changeStyle();
        printSearchResults();
        printResultsPaginator();
    }
});

function on_click_search() {
    console.log('Открывается страница поиска..');
    let currentURL = window.location.href;
    saveAllDropdownState();
    if (currentURL == URL.SEARCH_RESULTS) {
        printWait();
        //clearAllDropdowns();
        //fillAllDropdowns();
        setDropdownState('country', getDropdownState('country'));
        setDropdownState('program', getDropdownState('program'));
        setDropdownState('specialty', getDropdownState('specialty'));
        setDropdownState('language', getDropdownState('language'));
        printSearchResults();
    } else {
        window.location = URL.SEARCH_RESULTS;
    }
}

function printSearchResults() {
    console.log('Печать результатов..');
    search(localStorage.getItem("country"), localStorage.getItem("program"), localStorage.getItem("specialty"), localStorage.getItem("language"));
}

function printSearchHeader() {
    setDiv("results_container", `
    <div>
        <div>
            <h4>Результаты поиска: ${ARR.cards.length}</h4>
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
                      <b class="attr_name">Год основания:</b>
                    </div>
                    <div>
                      ${new Date(card.found).getFullYear()}
                    </div>
                    <div>
                      <b class="attr_name">Тип:</b>
                    </div>
                    <div>
                      ${emptyString(card.type)}
                    </div>
                    <div>
                      <b class="attr_name">Расположение:</b>
                    </div>
                    <div>
                      ${emptyString(card.location)}
                    </div>
                    <div>
                      <b class="attr_name">Язык обучения:</b>
                    </div>
                    <div>
                      ${emptyString(card.languages)}
                    </div>
                    <div>
                      <b class="attr_name">Программы:</b>
                    </div>
                    <div class="attr_name">
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
    console.log('Поиск с параметрами country = ' + countryId + ', program = ' + programId + ', specialty = ' + specialtyId + ', language = ' + languageId);
    let params = {
        'action': 'my_action',
        'query': 'search',
        'country': countryId,
        'program': programId,
        'specialty': specialtyId,
        'language': languageId
    };
    getData(params).then(
        response => {
            if (response != null)   {
                clearResults();
                ARR.cards = response;
                console.log('Количество результатов: ' + ARR.cards.length);
                printSearchHeader();
                printResultsPaginator();
            }   else {
                printNoResults();
            }
        },
        error => console.log('Ошибка поиска. ' + error)
    );
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
    setDiv("results_container", html);
}

function printWait() {
    let html = `
        <div>
            <h4><b>Идёт поиск..</b></h4>
        </div>
    `;
    setDiv("results_container", html);
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

function clearDiv(el) {
    jQuery("#" + el).empty();
}

function clearAllDropdowns() {
    clearDiv('country');
    clearDiv('program');
    clearDiv('specialty');
    clearDiv('language');
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

function printResultsPaginator() {
    console.log('Печать пагинатора результатов поиска..');
    jQuery('#cards-pagination-container').pagination({
        dataSource: ARR.cards,
        callback: function (data, pagination) {
            clearResults();
            jQuery.each(data, function (index, item) {
                printCard(item);
            });
        }
    })
}

function getReferenceTable(arr) {
    let html = `<table>
            <caption>Страны</caption>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действие</th>
                <th>Действие</th>
            </tr>`;
    for (let i = 0; i < arr.length; i++) {
        let row = `<tr>
                <td>${arr[i].id}</td>
                <td>${arr[i].name}</td>
                <td>
                    <button onclick="on_click_country_edit(${arr[i].id})">Изменить</button>
                </td>
                <td>
                    <button onclick="on_click_country_del(${arr[i].id})">Удалить</button>
                </td>
            </tr>`;
        html += row;
    }
    html += `</table>`;
    return html;
}


function on_click_country_edit(id) {

}

// <<<--------------Zhass JS for search
