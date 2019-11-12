// Zhass JS for search ---->>>

/**
 * Перечисление URL
 * @type {{SEARCH: string, URL_SEARCH_RESULTS: string, SEARCH_MANAGEMENT: string}}
 */
var URL = {
    SEARCH: '',
    URL_SEARCH_RESULTS: '',
    SEARCH_MANAGEMENT: '',
};
/**
 * Перечисление массивов данных (списков)
 * @type {{cards: Array, countries: Array, languages: Array, programs: Array, specialities: Array}}
 */
var ARR = {
    cards: [],
    countries: [],
    languages: [],
    programs: [],
    specialities: []
}
/**
 * Перечисление типов элементов
 * @type {{TABLE: number, DROPDOWN: number}}
 */
var TYP_EL = {
    TABLE: 0,
    DROPDOWN: 1
}

var DLG_RES = {
    OK: 0,
    CANCEL: 1
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

/**
 * Заполнить dropdown элемент
 * @param dropdownId ID элемента
 * @param arr массив
 */
function fillDropdown(dropdownId, arr) {
    console.log('Заполняется dropdown ' + dropdownId + '..');
    for (let i = 0; i < arr.length; i++) {
        jQuery("#" + dropdownId).append(new Option(arr[i].name, arr[i].id));
    }
}

/**
 * Конвертировать JSON объект в String
 * @param data
 * @returns {string}
 */
function jsonToStr(data) {
    return JSON.stringify(data, undefined, 2);
}

/**
 * Получить данные из базы - вызвать AJAX хукер Wordpress
 * @param params параметры
 * @returns {Promise<any>}
 */
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

/**
 *
 * @param typ перечисление элемента
 */
function getCountries(typ) {
    console.log('Загрузка из базы всех стран..');
    let params = {'action': 'my_action', 'query': 'get_all_countries'};
    getData(params).then(
        response => {
            ARR.countries = response;
            //console.log('Загруженные страны:\n' + jsonToStr(response));
            console.log('Загружено стран: ' + response.length);
            switch (typ) {
                case TYP_EL.DROPDOWN: {
                    fillDropdown('country', ARR.countries);
                    setDropdownState('country', getDropdownState('country'));
                }
                case TYP_EL.TABLE: {
                    printCountriesPaginator();
                }
            }

        },
        error => console.log('Ошибка при получении списка стран. ' + error)
    );
}

function getLanguages(typ) {
    console.log('Загрузка из базы всех языков..');
    let params = {'action': 'my_action', 'query': 'get_all_languages'};
    getData(params).then(
        response => {
            ARR.languages = response;
            //console.log('Загруженные языки:\n' + jsonToStr(response));
            console.log('Загружено языков: ' + response.length);
            switch (typ) {
                case TYP_EL.DROPDOWN: {
                    fillDropdown('language', ARR.languages);
                    setDropdownState('language', getDropdownState('language'));
                }
                case TYP_EL.TABLE: {
                    printLanguagesPaginator();
                }
            }
        },
        error => console.log('Ошибка при получении списка языков. ' + error)
    );
}

function getPrograms() {
    console.log('Загрузка из базы всех программ..');
    let params = {'action': 'my_action', 'query': 'get_all_programs'};
    getData(params).then(
        response => {
            ARR.programs = response;
            //console.log('Загруженные программы:\n' + jsonToStr(response));
            console.log('Загружено программ: ' + response.length);
            fillDropdown('program', ARR.programs);
            setDropdownState('program', getDropdownState('program'));
        },
        alert('Ошибка! ' + error)
    );
}

function getSpecialities() {
    console.log('Загрузка из базы всех специальностей..');
    let params = {'action': 'my_action', 'query': 'get_all_specialities'};
    getData(params).then(
        response => {
            ARR.specialities = response;
            //console.log('Загруженные специальности:\n' + jsonToStr(response));
            console.log('Загружено специальностей: ' + response.length);
            fillDropdown('specialty', ARR.specialities);
            setDropdownState('specialty', getDropdownState('specialty'));
        },
        alert('Ошибка! ' + error)
    );
}

function fillAllDropdowns() {
    getCountries(TYP_EL.DROPDOWN);
    getPrograms(TYP_EL.DROPDOWN);
    getLanguages(TYP_EL.DROPDOWN);
    getSpecialities(TYP_EL.DROPDOWN);
}

// On load page
jQuery("document").ready(function () {
    let currentURL = window.location.href;
    console.log('Адрес загружаемой страницы: ' + currentURL);
    console.log('URL.SEARCH: ' + URL.SEARCH);
    console.log('URL.SEARCH_RESULTS: ' + URL.SEARCH_RESULTS);
    console.log('URL.SEARCH_MANAGEMENT: ' + URL.SEARCH_MANAGEMENT);
    if (currentURL.indexOf(URL.SEARCH_MANAGEMENT) != -1) {
        console.log('Текущая страница: URL.SEARCH_MANAGEMENT');
        getCountries(TYP_EL.TABLE);
        getLanguages(TYP_EL.TABLE);
    }
    if (currentURL.indexOf(URL.SEARCH) != -1) {
        console.log('Текущая страница: URL.SEARCH');
        initLocalStorage();
        if (jQuery(window).width() < 500) {
            console.log('Изменение цвета названий полей..');
            let color = 'white';
            jQuery("#dropdown_title_country").css("color", color);
            jQuery("#dropdown_title_program").css("color", color);
            jQuery("#dropdown_title_specialty").css("color", color);
            jQuery("#dropdown_title_language").css("color", color);
        }
        clearAllDropdowns();
        fillAllDropdowns();
    }
    if (currentURL.indexOf(URL.SEARCH_RESULTS) != -1) {
        console.log('Текущая страница: URL.SEARCH_RESULTS');
        clearAllDropdowns();
        fillAllDropdowns();
        changeTitlesStyle();
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

/**
 * Установить значение DIV
 * @param divId
 * @param val
 */
function setDiv(divId, val) {
    jQuery("#" + divId).html(val);
}

/**
 * Добавить значение к DIV
 * @param divId
 * @param val
 */
function appendDiv(divId, val) {
    jQuery("#" + divId).append(val);
}

/**
 * Получить HTML фрагмент карточки университета
 * @param card
 * @returns {string}
 */
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
    console.log('Значение сохранено в local storage ' + dropdownName + ' = ' + value);
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
    console.log('Установка dropdown "' + dropdownName + '" значение "' + value + '"');
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
            if (response != null) {
                clearResults();
                ARR.cards = response;
                console.log('Количество результатов: ' + ARR.cards.length);
                printSearchHeader();
                printResultsPaginator();
            } else {
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
    console.log("Инициализация local storage..");
    saveDropdownState('country', 0);
    saveDropdownState('program', 0);
    saveDropdownState('specialty', 0);
    saveDropdownState('language', 0);
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

function changeTitlesStyle() {
    let color = "black";
    changeColor("dropdown_title_country", color);
    changeColor("dropdown_title_program", color);
    changeColor("dropdown_title_specialty", color);
    changeColor("dropdown_title_language", color);
}

function changeColor(titleId, color) {
    console.log('Меняется стиль для ' + titleId + '..');
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

function printCountriesPaginator() {
    console.log('Печать пагинатора стран..');
    jQuery('#country-pagination-container').pagination({
        dataSource: ARR.countries,
        callback: function (data, pagination) {
            setDiv('country_table', getCountryRefTable(data));
        }
    })
}

/**
 * Получить HTML фрагмент таблицы
 * @param arr
 * @returns {string}
 */
function getLangRefTable(arr) {
    let html = `<table id="language_table_data">
            <caption><h4>Языки</h4></caption>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действие</th>
                <th>Действие</th>
            </tr>`;
    for (let i = 0; i < arr.length; i++) {
        html += `<tr>
                <td>${arr[i].id}</td>
                <td>${arr[i].name}</td>
                <td>
                    <button onclick="on_click_language_edit(${arr[i].id})">Изменить</button>
                </td>
                <td>
                    <button onclick="on_click_language_del(${arr[i].id})">Удалить</button>
                </td>
            </tr>`;
    }
    return html + `</table>`;
}

function getCountryRefTable(arr) {
    let html = `<table id="country_table_data">
            <caption><h4>Страны</h4></caption>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действие</th>
                <th>Действие</th>
            </tr>`;
    for (let i = 0; i < arr.length; i++) {
        html += `<tr>
                <td>${arr[i].id}</td>
                <td>${arr[i].name}</td>
                <td>
                    <button onclick="on_click_country_edit(${arr[i].id})">Изменить</button>
                </td>
                <td>
                    <button onclick="on_click_country_del(${arr[i].id}, '${arr[i].name}')">Удалить</button>
                </td>
            </tr>`;
    }
    return html + `</table>`;
}

/**
 * Распечатать таблицу и пагинатор языков
 */
function printLanguagesPaginator() {
    console.log('Печать пагинатора языков..');
    jQuery('#language-pagination-container').pagination({
        dataSource: ARR.languages,
        callback: function (data, pagination) {
            setDiv('language_table', getLangRefTable(data));
        }
    })
}

function on_click_country_edit(id) {
    setCountryEditVal(id);
}

function on_click_country_del(id, val) {
    delCountry(id, val);
}

function on_click_language_edit(id) {
    console.log(id);
}

function on_click_language_del(id) {
    console.log(id);
}

function on_click_new_country() {
    newCountry();
}

function setCountryEditVal(id) {
    getColById('country', 'name_ru', id);
}

/**
 * Получить значение по ID
 * @param table
 * @param id
 */
function getColById(table, col, id) {
    console.log('Получить значение по ID..');
    let params = {
        'action': 'my_action',
        'query': 'get_col_by_id',
        'table': table,
        'id': id,
        'col': col
    };
    getData(params).then(
        response => {
            //console.log(response.name);
            setField('input_country_edit', response.name);
            setField('input_country_edit_id', id);
            setField('input_country_edit_old_val', response.name);
        },
        error => alert('Ошибка! ' + error)
    );
}

function setField(field, val) {
    console.log('Установка поля ' + field + ' в значение ' + val + '..');
    jQuery("#" + field).val(val);
}

function emptyField(field) {
    jQuery("#" + field).val('');
}

function on_click_update_country() {
    updateCountry();
}

function emptyEditCountry() {
    emptyField("#input_country_edit");
    emptyField("#input_country_edit_id");
    emptyField("#input_country_edit_old_val");
}

/**
 * Проверки и диалог при обновлениие
 * @param id ID записи
 * @param val новое значение
 * @param oldVal старое значение
 */
function updateCheck(id, val, oldVal) {
    if (!val) {
        alert('Нет значения!');
        return;
    }
    if (val == oldVal) {
        alert('Нет изменений!');
        return;
    }
    if (confirm('Обновить значение "' + oldVal + '" на новое "' + val + '"?')) {
        return DLG_RES.OK;
    } else {
        return DLG_RES.CANCEL;
    }
    return DLG_RES.CANCEL;
}

function insertCheck(val) {
    if (!val) {
        alert('Нет значения!');
        return;
    }
    if (confirm('Создать запись "' + val + '"?')) {
        return DLG_RES.OK;
    } else {
        return DLG_RES.CANCEL;
    }
    return DLG_RES.CANCEL;
}

function delCheck(id, val) {
    if (!id) {
        alert('Нет значения!');
        return;
    }
    if (confirm('Удалить запись ID ' + id + ' "' + val + '" ?')) {
        return DLG_RES.OK;
    } else {
        return DLG_RES.CANCEL;
    }
    return DLG_RES.CANCEL;
}

function newCountry() {
    let val = jQuery("#input_country_new").val();
    if (insertCheck(val) == DLG_RES.OK) {
        console.log('Вставка страны "' + val + '"..');
        let params = {
            'action': 'my_action',
            'query': 'insertTxt',
            'table': 'country',
            'col': 'name_ru',
            'val': val,
        };
        getData(params).then(
            response => {
                if (response.res == '500') {
                    alert('Ошибка! ' + response.msg);
                }
                if (response.res == '200') {
                    alert(response.msg);
                    jQuery("#input_country_new").val('');
                    getCountries(TYP_EL.TABLE);
                }
            },
            error => alert('Ошибка! ' + error)
        );
    }
}

function updateCountry() {
    let val = jQuery("#input_country_edit").val();
    let id = jQuery("#input_country_edit_id").val();
    let oldVal = jQuery("#input_country_edit_old_val").val();
    if (updateCheck(id, val, oldVal) == DLG_RES.OK) {
        console.log('Обновляется страна ID ' + id + ' на значение "' + val + '"..');
        let params = {
            'action': 'my_action',
            'query': 'update_txt_col_by_id',
            'table': 'country',
            'id': id,
            'val': val,
            'col': 'name_ru'
        };
        getData(params).then(
            response => {
                if (response.res == '500') {
                    alert('Ошибка! ' + response.msg);
                }
                if (response.res == '200') {
                    alert(response.msg);
                    emptyEditCountry();
                    getCountries(TYP_EL.TABLE);
                }
            },
            error => alert('Ошибка! ' + error)
        );
    }
}

function delCountry(id, val) {
    if (delCheck(id, val) == DLG_RES.OK) {
        console.log('Удаляется страна страна ID ' + id + ' "' + val + '"..');
        let params = {
            'action': 'my_action',
            'query': 'del',
            'table': 'country',
            'id': id
        };
        getData(params).then(
            response => {
                if (response.res == '500') {
                    alert('Ошибка! ' + response.msg);
                }
                if (response.res == '200') {
                    alert(response.msg);
                    getCountries(TYP_EL.TABLE);
                }
            },
            error => alert('Ошибка! ' + error)
        );
    }
}

// <<<--------------Zhass JS for search
