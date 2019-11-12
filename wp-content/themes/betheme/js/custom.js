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

var MSG = {
    ERR_ADD_COUNTRY: 'Ошибка добавления страны.',
    ERR_ADD_LANGUAGE: 'Ошибка добавления языка.',
    ERR_ADD_PROGRAM: 'Ошибка добавления программы обучения.',
    ERR_ADD_SPECIALTY: 'Ошибка добавления специальности.',
    ERR_ADD_LOCATION: 'Ошибка добавления местоположения.',

    ERR_LOAD_LANGUAGES: 'Ошибка загрузки языков.',
    ERR_LOAD_COUNTRIES: 'Ошибка загрузки стран.',
    ERR_LOAD_PROGRAMS: 'Ошибка загрузки программ обучения.',
    ERR_LOAD_SPECIALITIES: 'Ошибка загрузки специальностей.',
    ERR_LOAD_LOCATIONS: 'Ошибка загрузки местоположений.',

    ERR_LOAD_LANGUAGE: 'Ошибка загрузки языка.',
    ERR_LOAD_COUNTRY: 'Ошибка загрузки страны.',
    ERR_LOAD_PROGRAM: 'Ошибка загрузки программы обучения.',
    ERR_LOAD_SPECIALTY: 'Ошибка загрузки специальности.',
    ERR_LOAD_LOCATION: 'Ошибка загрузки местоположения.',

    ERR_UPDATE_LANGUAGE: 'Ошибка обновления языка.',
    ERR_UPDATE_COUNTRY: 'Ошибка обновления страны.',
    ERR_UPDATE_PROGRAM: 'Ошибка обновления программы обучения.',
    ERR_UPDATE_SPECIALTY: 'Ошибка обновления специальности.',
    ERR_UPDATE_LOCATION: 'Ошибка обновления местоположения.',

    NO_DATA_COUNTRIES: 'Нет данных по странам.',
    NO_DATA_LANGUAGES: 'Нет данных по языкам.',
    NO_DATA_SPECIALITIES: 'Нет данных по специальностям.',
    NO_DATA_PROGRAMS: 'Нет данных по программам обучения.',
    NO_DATA_LOCATIONS: 'Нет данных по местоположениям.',

    NO_DATA_COUNTRY: 'Нет данных по стране.',
    NO_DATA_LANGUAGE: 'Нет данных по языку.',
    NO_DATA_SPECIALTY: 'Нет данных по специальности.',
    NO_DATA_PROGRAM: 'Нет данных по программе обучения.',
    NO_DATA_LOCATION: 'Нет данных по местоположению.',

    ERR_SEARCH: 'Ошибка поиска.',
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
    log('Заполняется dropdown "' + dropdownId + '"..');
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
    log('Загрузка стран..');
    let params = {'action': 'my_action', 'query': 'get_all_countries'};
    getData(params).then(
        response => {
            if (response != null)   {
                ARR.countries = response;
                //log('Загруженные страны:\n' + jsonToStr(response));
                log('Загружено стран: ' + response.length);
                switch (typ) {
                    case TYP_EL.DROPDOWN:
                        fillDropdown('country', ARR.countries);
                        setDropdownState('country', getDropdownState('country'));
                        break;
                    case TYP_EL.TABLE:
                        printCountriesPaginator();
                        break;
                }
            }   else {
                log(MSG.NO_DATA_COUNTRIES);
                alert(MSG.NO_DATA_COUNTRIES);
            }
        },
        error => {
            log(MSG.ERR_LOAD_COUNTRIES + ' ' + error);
            alert(MSG.ERR_LOAD_COUNTRIES + ' ' + error);
        }
    );
}

function getLanguages(typ) {
    log('Загрузка языков..');
    let params = {'action': 'my_action', 'query': 'get_all_languages'};
    getData(params).then(
        response => {
            if (response != null)   {
                ARR.languages = response;
                //log('Загруженные языки:\n' + jsonToStr(response));
                log('Загружено языков: ' + response.length);
                switch (typ) {
                    case TYP_EL.DROPDOWN:
                        fillDropdown('language', ARR.languages);
                        setDropdownState('language', getDropdownState('language'));
                        break;
                    case TYP_EL.TABLE:
                        printLanguagesPaginator();
                        break;
                }
            }   else {
                log(MSG.NO_DATA_LANGUAGES);
                alert(MSG.NO_DATA_LANGUAGES);
            }
        },
        error => {
            log(MSG.ERR_LOAD_LANGUAGES + ' ' + error);
            alert(MSG.ERR_LOAD_LANGUAGES + ' ' + error);
        }
    );
}

function getPrograms() {
    log('Загрузка программ обучения..');
    let params = {'action': 'my_action', 'query': 'get_all_programs'};
    getData(params).then(
        response => {
            if (response != null)   {
                ARR.programs = response;
                //log('Загруженные программы:\n' + jsonToStr(response));
                log('Загружено программ обучения: ' + response.length);
                fillDropdown('program', ARR.programs);
                setDropdownState('program', getDropdownState('program'));
            }   else {
                log(MSG.NO_DATA_PROGRAMS);
                alert(MSG.NO_DATA_PROGRAMS);
            }
        },
        error => {
            log(MSG.ERR_LOAD_PROGRAMS + ' ' + error);
            alert(MSG.ERR_LOAD_PROGRAMS + ' ' + error);
        }
    );
}

function getSpecialities() {
    log('Загрузка специальностей..');
    let params = {'action': 'my_action', 'query': 'get_all_specialities'};
    getData(params).then(
        response => {
            if (response != null)   {
                ARR.specialities = response;
                //log('Загруженные специальности:\n' + jsonToStr(response));
                log('Загружено специальностей: ' + response.length);
                fillDropdown('specialty', ARR.specialities);
                setDropdownState('specialty', getDropdownState('specialty'));
            }   else {
                log(MSG.NO_DATA_SPECIALITIES);
                alert(MSG.NO_DATA_SPECIALITIES);
            }
        },
        error => {
            log(MSG.ERR_LOAD_SPECIALITIES + ' ' + error);
            alert(MSG.ERR_LOAD_SPECIALITIES + ' ' + error);
        }
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
    log('Адрес загружаемой страницы: ' + currentURL);
    log('URL.SEARCH: ' + URL.SEARCH);
    log('URL.SEARCH_RESULTS: ' + URL.SEARCH_RESULTS);
    log('URL.SEARCH_MANAGEMENT: ' + URL.SEARCH_MANAGEMENT);
    if (currentURL.indexOf(URL.SEARCH_MANAGEMENT) != -1) {
        log('Текущая страница: URL.SEARCH_MANAGEMENT');
        getCountries(TYP_EL.TABLE);
        getLanguages(TYP_EL.TABLE);
    }
    if (currentURL.indexOf(URL.SEARCH) != -1) {
        log('Текущая страница: URL.SEARCH');
        initLocalStorage();
        if (jQuery(window).width() < 500) {
            log('Изменение цвета названий полей..');
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
        log('Текущая страница: URL.SEARCH_RESULTS');
        clearAllDropdowns();
        fillAllDropdowns();
        changeTitlesStyle();
        printSearchResults();
        printResultsPaginator();
    }
});

function on_click_search() {
    log('Открывается страница поиска..');
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
    log('Печать результатов поиска..');
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
    log('Значение "' +  value + '" сохранено в local storage для dropdown "' + dropdownName + '".');
}

function getDropdownState(dropdownName) {
    let val = localStorage.getItem(dropdownName);
    log('Получение значения "' + val + '" из local storage для dropdown "' + dropdownName + '"..');
    return val;
}

function saveAllDropdownState() {
    saveDropdownState('country', getField('country'));
    saveDropdownState('program', getField('program'));
    saveDropdownState('specialty', getField('specialty'));
    saveDropdownState('language', getField('language'));
}

function setDropdownState(dropdownName, value) {
    log('Установка dropdown "' + dropdownName + '" в значение "' + value + '"');
    setField(dropdownName, value);
}

function search(countryId, programId, specialtyId, languageId) {
    log('Поиск с параметрами country = ' + countryId + ', program = ' + programId + ', specialty = ' + specialtyId + ', language = ' + languageId + '..');
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
                log('Количество результатов поиска: ' + ARR.cards.length);
                printSearchHeader();
                printResultsPaginator();
            } else {
                printNoResults();
            }
        },
        error => {
            log(MSG.ERR_SEARCH + ' ' + error);
            alert(MSG.ERR_SEARCH + ' ' + error);
        }
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
    log("Инициализация local storage..");
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
    log('Меняется цвет для ' + titleId + '..');
    jQuery("#" + titleId).css("color", color);
}

function printResultsPaginator() {
    log('Печать пагинатора результатов поиска..');
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
    log('Печать пагинатора стран..');
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
    log('Получение HTML фрагмента для таблицы языков..');
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
                <td>${arr[i].val}</td>
                <td>
                    <button onclick="on_click_language_edit(${arr[i].id})">Изменить</button>
                </td>
                <td>
                    <button onclick="on_click_language_del(${arr[i].id}, '${arr[i].val}')">Удалить</button>
                </td>
            </tr>`;
    }
    return html + `</table>`;
}

function getCountryRefTable(arr) {
    log('Получение HTML фрагмента для таблицы стран..');
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
                <td>${arr[i].val}</td>
                <td>
                    <button onclick="on_click_country_edit(${arr[i].id})">Изменить</button>
                </td>
                <td>
                    <button onclick="on_click_country_del(${arr[i].id}, '${arr[i].val}')">Удалить</button>
                </td>
            </tr>`;
    }
    return html + `</table>`;
}

/**
 * Распечатать таблицу и пагинатор языков
 */
function printLanguagesPaginator() {
    log('Печать пагинатора языков..');
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
    setLangEditVal(id);
}

function on_click_language_del(id, val) {
    delLanguage(id, val);
}

function on_click_new_country() {
    newCountry();
}

function on_click_new_lang() {
    newLanguage();
}

function setLangEditVal(id) {
    log('Загрузка значения по ID из таблицы "language"..');
    let params = {
        'action': 'my_action',
        'query': 'get_col_by_id',
        'table': 'language',
        'id': id,
        'col': 'name_ru'
    };
    getData(params).then(
        response => {
            if (response != null)   {
                setField('input_lang_edit', response.val);
                setField('input_lang_edit_id', id);
                setField('input_lang_edit_old_val', response.val);
            }   else {
                log(MSG.NO_DATA_LANGUAGE);
                alert(MSG.NO_DATA_LANGUAGE);
            }
        },
        error => {
            log(MSG.ERR_ADD_LANGUAGE + ' ' + error);
            alert(MSG.ERR_ADD_LANGUAGE + ' ' + error);
        }
    );
}

/**
 * Получить значение по ID
 * @param table
 * @param id
 */
function setCountryEditVal(id) {
    log('Загрузка значения по ID из таблицы "country"..');
    let params = {
        'action': 'my_action',
        'query': 'get_col_by_id',
        'table': 'country',
        'id': id,
        'col': 'name_ru'
    };
    getData(params).then(
        response => {
            log(response);
            if (response)   {
                setField('input_country_edit', response.val);
                setField('input_country_edit_id', id);
                setField('input_country_edit_old_val', response.val);
            }   else {
                log(MSG.NO_DATA_COUNTRY);
                alert(MSG.NO_DATA_COUNTRY);
            }
        },
        error => {
            log(MSG.ERR_LOAD_COUNTRY + ' ' + error);
            alert(MSG.ERR_LOAD_COUNTRY + ' ' + error);
        }
    );
}

function setField(field, val) {
    log('Установка поля "' + field + '" в значение "' + val + '"..');
    jQuery("#" + field).val(val);
}

function emptyField(field) {
    log('Очистка поля "' + field + '"..');
    jQuery("#" + field).val('');
}

function getField(field) {
    log('Получение значения поля "' + field + '"..');
    return jQuery("#" + field).val();
}

function on_click_update_country() {
    updateCountry();
}

function on_click_update_lang() {
    updateLanguage();
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
    let val = getField('input_country_new');
    if (insertCheck(val) == DLG_RES.OK) {
        log('Добавление страны "' + val + '"..');
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
                    log(MSG.ERR_ADD_COUNTRY + ' ' + response.msg);
                    alert(MSG.ERR_ADD_COUNTRY + ' ' + response.msg);
                }
                if (response.res == '200') {
                    alert(response.msg);
                    emptyField('input_country_new');
                    getCountries(TYP_EL.TABLE);
                }
            },
            error => {
                log(MSG.ERR_ADD_COUNTRY + ' ' + error);
                alert(MSG.ERR_ADD_COUNTRY + ' ' + error);
            }
        );
    }
}

function updateCountry() {
    let val = getField('input_country_edit');
    let id = getField('input_country_edit_id');
    let oldVal = getField('input_country_edit_old_val');
    if (updateCheck(id, val, oldVal) == DLG_RES.OK) {
        log('Обновляется страна ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
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
                    log(MSG.ERR_UPDATE_COUNTRY + ' ' + response.msg);
                    alert(MSG.ERR_UPDATE_COUNTRY + ' ' + response.msg);
                }
                if (response.res == '200') {
                    alert(response.msg);
                    emptyEditCountry();
                    getCountries(TYP_EL.TABLE);
                }
            },
            error => {
                log(MSG.ERR_UPDATE_COUNTRY + ' ' + error);
                alert(MSG.ERR_UPDATE_COUNTRY + ' ' + error);
            }
        );
    }
}

function delCountry(id, val) {
    if (delCheck(id, val) == DLG_RES.OK) {
        log('Удаляется страна ID ' + id + ' "' + val + '"..');
        let params = {
            'action': 'my_action',
            'query': 'del',
            'table': 'country',
            'id': id
        };
        getData(params).then(
            response => {
                if (response.res == '500') {
                    log('Ошибка удаления страны. ' + response.msg);
                    alert('Ошибка удаления страны. ' + response.msg);
                }
                if (response.res == '200') {
                    alert(response.msg);
                    getCountries(TYP_EL.TABLE);
                }
            },
            error => {
                log('Ошибка удаления страны. ' + error);
                alert('Ошибка удаления страны. ' + error);
            }
        );
    }
}

function emptyEditLanguage() {
    emptyField("input_lang_edit");
    emptyField("input_lang_edit_id");
    emptyField("input_lang_edit_old_val");
}

function newLanguage() {
    let val = getField('input_lang_new');
    if (insertCheck(val) == DLG_RES.OK) {
        log('Добавления нового языка "' + val + '"..');
        let params = {
            'action': 'my_action',
            'query': 'insertTxt',
            'table': 'language',
            'col': 'name_ru',
            'val': val,
        };
        getData(params).then(
            response => {
                if (response.res == '500') {
                    log('Ошибка добавления нового языка. ' + response.msg);
                    alert('Ошибка добавления нового языка. ' + response.msg);
                }
                if (response.res == '200') {
                    alert(response.msg);
                    emptyField('input_lang_new');
                    getLanguages(TYP_EL.TABLE);
                }
            },
            error => {
                alert('Ошибка добавления нового языка.! ' + error);
            }
        );
    }
}

function updateLanguage() {
    let val = getField('input_lang_edit');
    let id = getField('input_lang_edit_id');
    let oldVal = getField('input_lang_edit_old_val');
    if (updateCheck(id, val, oldVal) == DLG_RES.OK) {
        log('Обновляется язык ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
        let params = {
            'action': 'my_action',
            'query': 'update_txt_col_by_id',
            'table': 'language',
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
                    emptyEditLanguage();
                    getLanguages(TYP_EL.TABLE);
                }
            },
            error => alert('Ошибка! ' + error)
        );
    }
}

function delLanguage(id, val) {
    if (delCheck(id, val) == DLG_RES.OK) {
        log('Удаляется язык ID ' + id + ' "' + val + '"..');
        let params = {
            'action': 'my_action',
            'query': 'del',
            'table': 'language',
            'id': id
        };
        getData(params).then(
            response => {
                if (response.res == '500') {
                    alert('Ошибка! ' + response.msg);
                }
                if (response.res == '200') {
                    alert(response.msg);
                    getLanguages(TYP_EL.TABLE);
                }
            },
            error => alert('Ошибка! ' + error)
        );
    }
}

function log(msg)  {
    let params = {
        'action': 'my_action',
        'query': 'insertTxt',
        'table': 'log',
        'col': 'msg',
        'val': msg
    };
    getData(params).then(
        response => {
            if (response.res == '500') {
                alert('Ошибка! ' + response.msg);
            }
            if (response.res == '200') {
                console.log(msg);
            }
        },
        error => alert('Ошибка! ' + error)
    );
}

// <<<--------------Zhass JS for search
