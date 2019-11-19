// -------------------------------Zhass------------------------------------>>>>>
class Const {

    static LOG_DB = false;
    static URL = {
        SEARCH: '',
        URL_SEARCH_RESULTS: '',
        SEARCH_MANAGEMENT: '',
    };
    static TYP_EL = {
        TABLE: 0,
        DROPDOWN: 1,
        DROPDOWN_NEW: 2,
        DROPDOWN_EDIT: 3,
    };
    static DLG_RES = {
        OK: 0,
        CANCEL: 1
    };
    static MSG = {
        ERR_ADD_COUNTRY: 'Ошибка добавления страны.',
        ERR_ADD_LANGUAGE: 'Ошибка добавления языка.',
        ERR_ADD_PROGRAM: 'Ошибка добавления программы обучения.',
        ERR_ADD_SPECIALTY: 'Ошибка добавления специальности.',
        ERR_ADD_LOCATION: 'Ошибка добавления местоположения.',
        ERR_ADD_UNIVERSITY: 'Ошибка добавления университета.',

        ERR_LOAD_LANGUAGES: 'Ошибка загрузки языков.',
        ERR_LOAD_COUNTRIES: 'Ошибка загрузки стран.',
        ERR_LOAD_PROGRAMS: 'Ошибка загрузки программ обучения.',
        ERR_LOAD_SPECIALITIES: 'Ошибка загрузки специальностей.',
        ERR_LOAD_LOCATIONS: 'Ошибка загрузки местоположений.',
        ERR_LOAD_UNIVERSITIES: 'Ошибка загрузки университетов.',
        ERR_LOAD_TYPES: 'Ошибка загрузки типов университетов.',

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

        ERR_DEL_LANGUAGE: 'Ошибка удаления языка.',
        ERR_DEL_COUNTRY: 'Ошибка удаления страны.',
        ERR_DEL_PROGRAM: 'Ошибка удаления программы обучения.',
        ERR_DEL_SPECIALTY: 'Ошибка удаления специальности.',
        ERR_DEL_LOCATION: 'Ошибка удаления местоположения.',

        NO_DATA_COUNTRIES: 'Нет данных по странам.',
        NO_DATA_LANGUAGES: 'Нет данных по языкам.',
        NO_DATA_SPECIALITIES: 'Нет данных по специальностям.',
        NO_DATA_PROGRAMS: 'Нет данных по программам обучения.',
        NO_DATA_LOCATIONS: 'Нет данных по местоположениям.',
        NO_DATA_UNIVERSITIES: 'Нет данных по университетам.',
        NO_DATA_TYPES: 'Нет данных по типам университетов.',

        NO_DATA_COUNTRY: 'Нет данных по стране.',
        NO_DATA_LANGUAGE: 'Нет данных по языку.',
        NO_DATA_SPECIALTY: 'Нет данных по специальности.',
        NO_DATA_PROGRAM: 'Нет данных по программе обучения.',
        NO_DATA_LOCATION: 'Нет данных по местоположению.',

        ERR_SEARCH: 'Ошибка поиска.',
        ERR_LOG: 'Ошибка записи в журнал.'
    };
    static PAGE_SIZE_SEARCH = 8;
    static PAGE_SIZE_REF = 8;
    static AJAX = window.wp_data.ajax_url;
}

class Country {

    sys;
    ui;
    data;
    _countries = [];

    get countries() {
        return this._countries;
    }

    constructor(sys, ui, data) {
        this.sys = sys;
        this.ui = ui;
        this.data = data;
    }

    all() {
        //this.sys.log('Загрузка стран..');
        let params = {'action': 'my_action', 'query': 'get_countries'};
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this._countries = response;
                    this.sys.log('Загружено стран: ' + response.length);
                    this.ui.fillDropdown('country', this._countries);
                    this.ui.setDropdownState('country', this.ui.getDropdownState('country'));
                    this.printPaginator(this, this.ui);
                    this.ui.fillDropdown('dropdownUnivNewCountry', this._countries);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_COUNTRIES);
                    alert(Const.MSG.NO_DATA_COUNTRIES);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_LOAD_COUNTRIES + ' ' + error);
                alert(Const.MSG.ERR_LOAD_COUNTRIES + ' ' + error);
            }
        );
    }

    setEditVal(id) {
        //this.sys.log('Загрузка значения по ID из таблицы "country"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'country',
            'id': id,
            'col': 'name_ru'
        };
        this.data.getData(params).then(
            response => {
                this.sys.log(response);
                if (response) {
                    this.ui.setField('input_country_edit', response.val);
                    this.ui.setField('input_country_edit_id', id);
                    this.ui.setField('input_country_edit_old_val', response.val);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_COUNTRY);
                    alert(Const.MSG.NO_DATA_COUNTRY);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_LOAD_COUNTRY + ' ' + error);
                alert(Const.MSG.ERR_LOAD_COUNTRY + ' ' + error);
            }
        );
    }

    emptyEdits() {
        this.ui.emptyField("#input_country_edit");
        this.ui.emptyField("#input_country_edit_id");
        this.ui.emptyField("#input_country_edit_old_val");
    }

    create() {
        let val = this.ui.getField('input_country_new');
        if (this.ui.insertCheck(val) == Const.DLG_RES.OK) {
            this.sys.log('Добавление страны "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'insertTxt',
                'table': 'country',
                'col': 'name_ru',
                'val': val,
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_ADD_COUNTRY + ' ' + response.msg);
                        alert(Const.MSG.ERR_ADD_COUNTRY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.ui.emptyField('input_country_new');
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_ADD_COUNTRY + ' ' + error);
                    alert(Const.MSG.ERR_ADD_COUNTRY + ' ' + error);
                }
            );
        }
    }

    update() {
        let val = this.ui.getField('input_country_edit');
        let id = this.ui.getField('input_country_edit_id');
        let oldVal = this.ui.getField('input_country_edit_old_val');
        if (this.ui.updateCheck(id, val, oldVal) == Const.DLG_RES.OK) {
            this.sys.log('Обновляется страна ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'update_txt_col_by_id',
                'table': 'country',
                'id': id,
                'val': val,
                'col': 'name_ru'
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_UPDATE_COUNTRY + ' ' + response.msg);
                        alert(Const.MSG.ERR_UPDATE_COUNTRY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.emptyEdits();
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_UPDATE_COUNTRY + ' ' + error);
                    alert(Const.MSG.ERR_UPDATE_COUNTRY + ' ' + error);
                }
            );
        }
    }

    del(id, val) {
        if (this.ui.delCheck(id, val) == Const.DLG_RES.OK) {
            this.sys.log('Удаляется страна ID ' + id + ' "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'del',
                'table': 'country',
                'id': id
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_DEL_COUNTRY + ' ' + response.msg);
                        alert(Const.MSG.ERR_DEL_COUNTRY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_DEL_COUNTRY + ' ' + error);
                    alert(Const.MSG.ERR_DEL_COUNTRY + ' ' + error);
                }
            );
        }
    }

    getRefTable(arr) {
        //this.sys.log('Получение HTML фрагмента для таблицы стран..');
        let html = `<table id="country_table_data">
            <caption><h4>Страны (${this._countries.length})</h4></caption>
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

    printPaginator(country, ui) {
        //this.sys.log('Печать пагинатора стран..');
        jQuery('#country-pagination-container').pagination({
            dataSource: this._countries,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('country_table', country.getRefTable(data));
            }
        })
    }

}

class Language {

    sys;
    ui;
    data;
    _languages = [];

    get languages() {
        return this._languages;
    }

    /**
     *
     * @param sys
     * @param ui
     * @param data
     */
    constructor(sys, ui, data) {
        this.sys = sys;
        this.ui = ui;
        this.data = data;
    }

    /**
     * Распечатать таблицу и пагинатор языков
     */
    printPaginator(language, ui) {
        //this.sys.log('Печать пагинатора языков..');
        jQuery('#lang-pagination-container').pagination({
            dataSource: this._languages,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('lang_table', language.getRefTable(data));
            }
        })
    }

    setEditVal(id) {
        //this.sys.log('Загрузка значения по ID из таблицы "language"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'language',
            'id': id,
            'col': 'name_ru'
        };
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this.ui.setField('input_lang_edit', response.val);
                    this.ui.setField('input_lang_edit_id', id);
                    this.ui.setField('input_lang_edit_old_val', response.val);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_LANGUAGE);
                    alert(Const.MSG.NO_DATA_LANGUAGE);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_ADD_LANGUAGE + ' ' + error);
                alert(Const.MSG.ERR_ADD_LANGUAGE + ' ' + error);
            }
        );
    }

    getRefTable(arr) {
        //this.sys.log('Получение HTML фрагмента для таблицы языков..');
        let html = `<table id="lang_table_data">
            <caption><h4>Языки (${this._languages.length})</h4></caption>
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
                    <button onclick="on_click_lang_edit(${arr[i].id})">Изменить</button>
                </td>
                <td>
                    <button onclick="on_click_lang_del(${arr[i].id}, '${arr[i].val}')">Удалить</button>
                </td>
            </tr>`;
        }
        return html + `</table>`;
    }

    all() {
        //this.sys.log('Загрузка языков..');
        let params = {'action': 'my_action', 'query': 'get_languages'};
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this._languages = response;
                    //sys.log('Загруженные языки:\n' + sys.jsonToStr(response));
                    this.sys.log('Загружено языков: ' + response.length);
                    this.ui.fillDropdown('language', this._languages);
                    this.ui.setDropdownState('language', ui.getDropdownState('language'));
                    this.printPaginator(this, this.ui);
                    this.ui.fillDropdown('dropdownUnivNewLang', this._languages);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_LANGUAGES);
                    alert(Const.MSG.NO_DATA_LANGUAGES);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_LOAD_LANGUAGES + ' ' + error);
                alert(Const.MSG.ERR_LOAD_LANGUAGES + ' ' + error);
            }
        );
    }

    emptyEdits() {
        this.ui.emptyField("input_lang_edit");
        this.ui.emptyField("input_lang_edit_id");
        this.ui.emptyField("input_lang_edit_old_val");
    }

    create() {
        let val = this.ui.getField('input_lang_new');
        if (this.ui.insertCheck(val) == Const.DLG_RES.OK) {
            this.sys.log('Добавление нового языка "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'insertTxt',
                'table': 'language',
                'col': 'name_ru',
                'val': val,
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_ADD_LANGUAGE + ' ' + response.msg);
                        alert(Const.MSG.ERR_ADD_LANGUAGE + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.ui.emptyField('input_lang_new');
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_ADD_LANGUAGE + ' ' + error);
                    alert(Const.MSG.ERR_ADD_LANGUAGE + ' ' + error);
                }
            );
        }
    }

    update() {
        let val = this.ui.getField('input_lang_edit');
        let id = this.ui.getField('input_lang_edit_id');
        let oldVal = this.ui.getField('input_lang_edit_old_val');
        if (this.ui.updateCheck(id, val, oldVal) == Const.DLG_RES.OK) {
            this.sys.log('Обновляется язык ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'update_txt_col_by_id',
                'table': 'language',
                'id': id,
                'val': val,
                'col': 'name_ru'
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_UPDATE_LANGUAGE + ' ' + response.msg);
                        alert(Const.MSG.ERR_UPDATE_LANGUAGE + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.emptyEdits();
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_UPDATE_LANGUAGE + ' ' + error);
                    alert(Const.MSG.ERR_UPDATE_LANGUAGE + ' ' + error);
                }
            );
        }
    }

    del(id, val) {
        if (this.ui.delCheck(id, val) == Const.DLG_RES.OK) {
            this.sys.log('Удаляется язык ID ' + id + ' "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'del',
                'table': 'language',
                'id': id
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_DEL_LANGUAGE + ' ' + response.msg);
                        alert(Const.MSG.ERR_DEL_LANGUAGE + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_DEL_LANGUAGE + ' ' + error);
                    alert(Const.MSG.ERR_DEL_LANGUAGE + ' ' + error);
                }
            );
        }
    }

}

class Program {

    ui;
    sys;
    data;
    _programs = [];

    get programs() {
        return this._programs;
    }

    /**
     *
     * @param ui
     * @param sys
     * @param data
     */
    constructor(sys, ui, data) {
        this.ui = ui;
        this.sys = sys;
        this.data = data;
    }

    setEditVal(id) {
        //this.sys.log('Загрузка значения по ID из таблицы "program"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'program',
            'id': id,
            'col': 'name_ru'
        };
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this.ui.setField('input_prg_edit', response.val);
                    this.ui.setField('input_prg_edit_id', id);
                    this.ui.setField('input_prg_edit_old_val', response.val);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_PROGRAM);
                    alert(Const.MSG.NO_DATA_PROGRAM);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_ADD_PROGRAM + ' ' + error);
                alert(Const.MSG.ERR_ADD_PROGRAM + ' ' + error);
            }
        );
    }

    all() {
        //this.sys.log('Загрузка программ обучения..');
        let params = {'action': 'my_action', 'query': 'get_programs'};
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this._programs = response;
                    //sys.log('Загруженные программы:\n' + sys.jsonToStr(response));
                    this.sys.log('Загружено программ обучения: ' + response.length);
                    this.ui.fillDropdown('program', this._programs);
                    this.ui.setDropdownState('program', this.ui.getDropdownState('program'));
                    this.printPaginator(this, this.ui);
                    this.ui.fillDropdown('dropdownUnivNewPrg', this._programs);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_PROGRAMS);
                    alert(Const.MSG.NO_DATA_PROGRAMS);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_LOAD_PROGRAMS + ' ' + error);
                alert(Const.MSG.ERR_LOAD_PROGRAMS + ' ' + error);
            }
        );
    }

    emptyEdits() {
        this.ui.emptyField("input_prg_edit");
        this.ui.emptyField("input_prg_edit_id");
        this.ui.emptyField("input_prg_edit_old_val");
    }

    create() {
        let val = this.ui.getField('input_prg_new');
        if (this.ui.insertCheck(val) == Const.DLG_RES.OK) {
            this.sys.log('Добавление новой программмы "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'insertTxt',
                'table': 'program',
                'col': 'name_ru',
                'val': val,
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_ADD_PROGRAM + ' ' + response.msg);
                        alert(Const.MSG.ERR_ADD_PROGRAM + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.ui.emptyField('input_prg_new');
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_ADD_PROGRAM + ' ' + error);
                    alert(Const.MSG.ERR_ADD_PROGRAM + ' ' + error);
                }
            );
        }
    }

    update() {
        let val = this.ui.getField('input_prg_edit');
        let id = this.ui.getField('input_prg_edit_id');
        let oldVal = this.ui.getField('input_prg_edit_old_val');
        if (this.ui.updateCheck(id, val, oldVal) == Const.DLG_RES.OK) {
            this.sys.log('Обновляется программа ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'update_txt_col_by_id',
                'table': 'program',
                'id': id,
                'val': val,
                'col': 'name_ru'
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_UPDATE_PROGRAM + ' ' + response.msg);
                        alert(Const.MSG.ERR_UPDATE_PROGRAM + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.emptyEdits();
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_UPDATE_PROGRAM + ' ' + error);
                    alert(Const.MSG.ERR_UPDATE_PROGRAM + ' ' + error);
                }
            );
        }
    }

    del(id, val) {
        if (this.ui.delCheck(id, val) == Const.DLG_RES.OK) {
            this.sys.log('Удаляется программа обучения ID ' + id + ' "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'del',
                'table': 'program',
                'id': id
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        // noinspection Annotator
                        this.sys.log(Const.MSG.ERR_DEL_PROGRAM + ' ' + response.msg);
                        alert(Const.MSG.ERR_DEL_PROGRAM + ' ' + response.msg);
                    }
                    // noinspection Annotator
                    if (response.res == '200') {
                        alert(response.msg);
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_DEL_PROGRAM + ' ' + error);
                    alert(Const.MSG.ERR_DEL_PROGRAM + ' ' + error);
                }
            );
        }
    }

    printPaginator(program, ui) {
        //this.sys.log('Печать пагинатора программ обучения..');
        jQuery('#prg-pagination-container').pagination({
            dataSource: this._programs,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('prg_table', program.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        //this.sys.log('Получение HTML фрагмента для таблицы программ..');
        let html = `<table id="prg_table_data">
            <caption><h4>Программы обучения (${this._programs.length})</h4></caption>
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
                    <button onclick="on_click_prg_edit(${arr[i].id})">Изменить</button>
                </td>
                <td>
                    <button onclick="on_click_prg_del(${arr[i].id}, '${arr[i].val}')">Удалить</button>
                </td>
            </tr>`;
        }
        return html + `</table>`;
    }

}

class Specialty {

    ui;
    sys;
    data;
    _specialities = [];

    get specialities() {
        return this._specialities;
    }

    /**
     *
     * @param ui
     * @param sys
     * @param data
     */
    constructor(sys, ui, data) {
        this.ui = ui;
        this.sys = sys;
        this.data = data;
    }

    emptyEdits() {
        this.ui.emptyField("input_spec_edit");
        this.ui.emptyField("input_spec_edit_id");
        this.ui.emptyField("input_spec_edit_old_val");
    }

    all() {
        //this.sys.log('Загрузка специальностей..');
        let params = {'action': 'my_action', 'query': 'get_specialities'};
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this._specialities = response;
                    //sys.log('Загруженные специальности:\n' + sys.jsonToStr(response));
                    this.sys.log('Загружено специальностей: ' + response.length);
                    this.ui.fillDropdown('specialty', this._specialities);
                    this.ui.setDropdownState('specialty', this.ui.getDropdownState('specialty'));
                    this.printPaginator(this, this.ui);
                    this.ui.fillDropdown('dropdownUnivNewSpec', this._specialities);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_SPECIALITIES);
                    alert(Const.MSG.NO_DATA_SPECIALITIES);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_LOAD_SPECIALITIES + ' ' + error);
                alert(Const.MSG.ERR_LOAD_SPECIALITIES + ' ' + error);
            }
        );
    }

    setEditVal(id) {
        //this.sys.log('Загрузка значения по ID из таблицы "specialty"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'specialty',
            'id': id,
            'col': 'name_ru'
        };
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this.ui.setField('input_spec_edit', response.val);
                    this.ui.setField('input_spec_edit_id', id);
                    this.ui.setField('input_spec_edit_old_val', response.val);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_SPECIALTY);
                    alert(Const.MSG.NO_DATA_SPECIALTY);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_ADD_SPECIALTY + ' ' + error);
                alert(Const.MSG.ERR_ADD_SPECIALTY + ' ' + error);
            }
        );
    }

    create() {
        let val = this.ui.getField('input_spec_new');
        if (this.ui.insertCheck(val) == Const.DLG_RES.OK) {
            this.sys.log('Добавление новой специальности "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'insertTxt',
                'table': 'specialty',
                'col': 'name_ru',
                'val': val,
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_ADD_SPECIALTY + ' ' + response.msg);
                        alert(Const.MSG.ERR_ADD_SPECIALTY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.ui.emptyField('input_spec_new');
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_ADD_SPECIALTY + ' ' + error);
                    alert(Const.MSG.ERR_ADD_SPECIALTY + ' ' + error);
                }
            );
        }
    }

    update() {
        let val = this.ui.getField('input_spec_edit');
        let id = this.ui.getField('input_spec_edit_id');
        let oldVal = this.ui.getField('input_spec_edit_old_val');
        if (this.ui.updateCheck(id, val, oldVal) == Const.DLG_RES.OK) {
            this.sys.log('Обновляется специальность ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'update_txt_col_by_id',
                'table': 'specialty',
                'id': id,
                'val': val,
                'col': 'name_ru'
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_UPDATE_SPECIALTY + ' ' + response.msg);
                        alert(Const.MSG.ERR_UPDATE_SPECIALTY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.emptyEdits();
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_UPDATE_SPECIALTY + ' ' + error);
                    alert(Const.MSG.ERR_UPDATE_SPECIALTY + ' ' + error);
                }
            );
        }
    }

    del(id, val) {
        if (this.ui.delCheck(id, val) == Const.DLG_RES.OK) {
            this.sys.log('Удаляется специальность ID ' + id + ' "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'del',
                'table': 'specialty',
                'id': id
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_DEL_SPECIALTY + ' ' + response.msg);
                        alert(Const.MSG.ERR_DEL_SPECIALTY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_DEL_SPECIALTY + ' ' + error);
                    alert(Const.MSG.ERR_DEL_SPECIALTY + ' ' + error);
                }
            );
        }
    }

    printPaginator(specialty, ui) {
        //this.sys.log('Печать пагинатора специальностей..');
        jQuery('#spec-pagination-container').pagination({
            dataSource: this._specialities,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('spec_table', specialty.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        //this.sys.log('Получение HTML фрагмента для таблицы специальностей..');
        let html = `<table id="spec_table_data">
            <caption><h4>Специальности (${this._specialities.length})</h4></caption>
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
                    <button onclick="on_click_spec_edit(${arr[i].id})">Изменить</button>
                </td>
                <td>
                    <button onclick="on_click_spec_del(${arr[i].id}, '${arr[i].val}')">Удалить</button>
                </td>
            </tr>`;
        }
        return html + `</table>`;
    }

}

class Location {

    sys;
    ui;
    data;
    locations = [];

    /**
     *
     * @param sys
     * @param ui
     * @param data
     */
    constructor(sys, ui, data) {
        this.sys = sys;
        this.ui = ui;
        this.data = data;
    }

    emptyEdits() {
        this.ui.emptyField("input_loc_edit");
        this.ui.emptyField("input_loc_edit_id");
        this.ui.emptyField("input_loc_edit_old_val");
    }

    setEditVal(id) {
        //this.sys.log('Загрузка значения по ID из таблицы "location"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'location',
            'id': id,
            'col': 'name_ru'
        };
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this.ui.setField('input_loc_edit', response.val);
                    this.ui.setField('input_loc_edit_id', id);
                    this.ui.setField('input_loc_edit_old_val', response.val);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_LOCATION);
                    alert(Const.MSG.NO_DATA_LOCATION);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_ADD_LOCATION + ' ' + error);
                alert(Const.MSG.ERR_ADD_LOCATION + ' ' + error);
            }
        );
    }

    create() {
        let val = this.ui.getField('input_loc_new');
        if (this.ui.insertCheck(val) == Const.DLG_RES.OK) {
            this.sys.log('Добавление нового местоположения "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'insertTxt',
                'table': 'location',
                'col': 'name_ru',
                'val': val,
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_ADD_LOCATION + ' ' + response.msg);
                        alert(Const.MSG.ERR_ADD_LOCATION + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.ui.emptyField('input_loc_new');
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_ADD_LOCATION + ' ' + error);
                    alert(Const.MSG.ERR_ADD_LOCATION + ' ' + error);
                }
            );
        }
    }

    update() {
        let val = this.ui.getField('input_loc_edit');
        let id = this.ui.getField('input_loc_edit_id');
        let oldVal = this.ui.getField('input_loc_edit_old_val');
        if (this.ui.updateCheck(id, val, oldVal) == Const.DLG_RES.OK) {
            this.sys.log('Обновляется местоположение ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'update_txt_col_by_id',
                'table': 'location',
                'id': id,
                'val': val,
                'col': 'name_ru'
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_UPDATE_LOCATION + ' ' + response.msg);
                        alert(Const.MSG.ERR_UPDATE_LOCATION + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.emptyEdits();
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_UPDATE_LOCATION + ' ' + error);
                    alert(Const.MSG.ERR_UPDATE_LOCATION + ' ' + error);
                }
            );
        }
    }

    del(id, val) {
        if (this.ui.delCheck(id, val) == Const.DLG_RES.OK) {
            this.sys.log('Удаляется местоположение ID ' + id + ' "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'del',
                'table': 'location',
                'id': id
            };
            this.data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        this.sys.log(Const.MSG.ERR_DEL_LOCATION + ' ' + response.msg);
                        alert(Const.MSG.ERR_DEL_LOCATION + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.all();
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_DEL_LOCATION + ' ' + error);
                    alert(Const.MSG.ERR_DEL_LOCATION + ' ' + error);
                }
            );
        }
    }

    printPaginator(loc, ui) {
        //this.sys.log('Печать пагинатора местоположений..');
        jQuery('#loc-pagination-container').pagination({
            dataSource: this.locations,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('loc_table', loc.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        //this.sys.log('Получение HTML фрагмента для таблицы местоположений..');
        let html = `<table id="loc_table_data">
            <caption><h4>Местоположения (${this.locations.length})</h4></caption>
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
                    <button onclick="on_click_loc_edit(${arr[i].id})">Изменить</button>
                </td>
                <td>
                    <button onclick="on_click_loc_del(${arr[i].id}, '${arr[i].val}')">Удалить</button>
                </td>
            </tr>`;
        }
        return html + `</table>`;
    }

    all() {
        //this.sys.log('Загрузка местоположений..');
        let params = {'action': 'my_action', 'query': 'get_locations'};
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this.locations = response;
                    this.sys.log('Загружено местоположений: ' + response.length);
                    this.printPaginator(this, this.ui);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_LOCATIONS);
                    alert(Const.MSG.NO_DATA_LOCATIONS);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_LOAD_LOCATIONS + ' ' + error);
                alert(Const.MSG.ERR_LOAD_LOCATIONS + ' ' + error);
            }
        );
    }

}

class Search {

    sys;
    ui;
    data;
    cards = [];

    /**
     *
     * @param sys
     * @param ui
     * @param data
     */
    constructor(sys, ui, data) {
        this.sys = sys;
        this.ui = ui;
        this.data = data;
    }

    /**
     * Получить HTML фрагмент карточки университета
     * @param card
     * @returns {string}
     */
    getCard(card) {
        return `
        <div>
          <div class="card">
            <div class="img_my">
              <img src="${this.sys.emptyString(card.url_pic)}">
            </div>
            <div class="desc">
              <div class="desc_txt">
                <div class="desc_title">
                  ${this.sys.emptyString(card.name)}
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
                      ${this.sys.emptyString(card.type)}
                    </div>
                    <div>
                      <b class="attr_name">Расположение:</b>
                    </div>
                    <div>
                      ${this.sys.emptyString(card.location)}
                    </div>
                    <div>
                      <b class="attr_name">Язык обучения:</b>
                    </div>
                    <div>
                      ${this.sys.emptyString(card.languages)}
                    </div>
                    <div>
                      <b class="attr_name">Программы:</b>
                    </div>
                    <div class="attr_name">
                      ${this.sys.emptyString(card.programs)}
                    </div>
                </div>
              </div>
            </div>
            <div class="mor_info_btn">
              <a href="${this.sys.emptyString(card.url)}">Подробно</a>
            </div>
          </div>
        </div>`;
    }

    printResults() {
        this.sys.log('Печать результатов поиска..');
        this.search(localStorage.getItem("country"), localStorage.getItem("program"), localStorage.getItem("specialty"), localStorage.getItem("language"));
    }

    printHeader() {
        this.ui.setDiv("results_container", `
        <div>
            <div>
                <h4>Результаты поиска: ${this.cards.length}</h4>
            </div>
            <div>
                <div id="found_objects" class="found_objects">
                </div>
            </div>
        </div>
        `);
    }

    printPaginator(search) {
        //this.sys.log('Печать пагинатора результатов поиска..');
        jQuery('#cards-pagination-container').pagination({
            dataSource: this.cards,
            pageSize: Const.PAGE_SIZE_SEARCH,
            callback: function (data, pagination) {
                search.clearResults();
                jQuery.each(data, function (index, item) {
                    search.printCard(item);
                });
            }
        })
    }

    search(countryId, programId, specialtyId, languageId) {
        this.sys.log('Поиск, параметры country ID ' + countryId + ', program ID ' + programId + ', specialty ID ' + specialtyId + ', language ID ' + languageId + '..');
        let params = {
            'action': 'my_action',
            'query': 'search',
            'country': countryId,
            'program': programId,
            'specialty': specialtyId,
            'language': languageId
        };
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this.clearResults();
                    this.cards = response;
                    this.sys.log('Количество результатов поиска: ' + this.cards.length);
                    this.printHeader();
                    this.printPaginator(this);
                } else {
                    this.printNoResults();
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_SEARCH + ' ' + error);
                alert(Const.MSG.ERR_SEARCH + ' ' + error);
            }
        );
    }

    printCard(card) {
        this.ui.appendDiv("found_objects", this.getCard(card));
    }

    printNoResults() {
        let html = `
        <div>
            <h4><b>Ничего не найдено</b></h4>
        </div>
    `;
        this.ui.setDiv("results_container", html);
    }

    printWait() {
        let html = `
        <div>
            <h4><b>Идёт поиск..</b></h4>
        </div>
    `;
        this.ui.setDiv("results_container", html);
    }

    clearResults() {
        let html = ``;
        this.ui.setDiv("found_objects", html);
    }

}

class System {

    //_log = _.curry(log);

    /**
     * Логирование
     * @param msg
     */
    log(msg) {
        if (!Const.LOG_DB) {
            console.log(msg);
            return;
        }
        let params = {
            'action': 'my_action',
            'query': 'insertTxt',
            'table': 'log',
            'col': 'msg',
            'val': msg
        };
        this.data.getData(params).then(
            response => {
                if (response.res == '500') {
                    alert(Const.MSG.ERR_LOG + ' ' + response.msg);
                }
                if (response.res == '200') {
                    console.log(msg);
                }
            },
            error => {
                alert(Const.MSG.ERR_LOG + ' ' + error);
            }
        );
    }

    /**
     * Конвертировать JSON объект в String
     * @param data
     * @returns {string}
     */
    jsonToStr(data) {
        return JSON.stringify(data, undefined, 2);
    }

    initLocalStorage() {
        this.log("Инициализация local storage..");

    }

    emptyString(str) {
        if (str == null)
            return '';
        else
            return str;
    }

}

class UI {

    sys;
    country;
    program;
    specialty;
    language;

    get country() {
        return this.country;
    }

    set country(value) {
        this.country = value;
    }

    get program() {
        return this.program;
    }

    set program(value) {
        this.program = value;
    }

    get specialty() {
        return this.specialty;
    }

    set specialty(value) {
        this.specialty = value;
    }

    get language() {
        return this.language;
    }

    set language(value) {
        this.language = value;
    }

    constructor(sys) {
        this.sys = sys;
    }

    /**
     * Заполнить dropdown элемент
     * @param dropdownId ID элемента
     * @param arr массив
     */
    fillDropdown(dropdownId, arr) {
        this.clearDiv(dropdownId)
        for (let i = 0; i < arr.length; i++) {
            jQuery("#" + dropdownId).append(new Option(arr[i].val, arr[i].id));
        }
    }

    fillAllDropdowns() {
        this.country.all();
        this.program.all();
        this.language.all();
        this.specialty.all();
    }

    /**
     * Установить значение DIV
     * @param divId
     * @param val
     */
    setDiv(divId, val) {
        jQuery("#" + divId).html(val);
    }

    /**
     * Добавить значение к DIV
     * @param divId
     * @param val
     */
    appendDiv(divId, val) {
        jQuery("#" + divId).append(val);
    }

    saveDropdownState(dropdownName, value) {
        localStorage.setItem(dropdownName, value);
        this.sys.log('Значение "' + value + '" сохранено в local storage для dropdown "' + dropdownName + '".');
    }

    getDropdownState(dropdownName) {
        let val = localStorage.getItem(dropdownName);
        this.sys.log('Получение значения "' + val + '" из local storage для dropdown "' + dropdownName + '"..');
        return val;
    }

    saveAllDropdownState() {
        this.saveDropdownState('country', this.getField('country'));
        this.saveDropdownState('program', this.getField('program'));
        this.saveDropdownState('specialty', this.getField('specialty'));
        this.saveDropdownState('language', this.getField('language'));
    }

    setDropdownState(dropdownName, value) {
        this.sys.log('Установка dropdown "' + dropdownName + '" в значение "' + value + '"');
        this.setField(dropdownName, value);
    }

    clearDiv(el) {
        jQuery("#" + el).empty();
    }

    changeTitlesStyle() {
        let color = "black";
        this.changeColor("dropdown_title_country", color);
        this.changeColor("dropdown_title_program", color);
        this.changeColor("dropdown_title_specialty", color);
        this.changeColor("dropdown_title_language", color);
    }

    changeColor(titleId, color) {
        this.sys.log('Меняется цвет для ' + titleId + '..');
        jQuery("#" + titleId).css("color", color);
    }


    setField(field, val) {
        this.sys.log('Установка поля "' + field + '" в значение "' + val + '"..');
        jQuery("#" + field).val(val);
    }

    emptyField(field) {
        this.sys.log('Очистка поля "' + field + '"..');
        jQuery("#" + field).val('');
    }

    getField(field) {
        this.sys.log('Получение значения поля "' + field + '"..');
        return jQuery("#" + field).val();
    }

    getFieldText(field) {
        this.sys.log('Получение текстового значения поля "' + field + '"..');
        return jQuery("#" + field).text();
    }

    /**
     * Проверки и диалог при обновлениие
     * @param id ID записи
     * @param val новое значение
     * @param oldVal старое значение
     */
    updateCheck(id, val, oldVal) {
        if (!val) {
            alert('Нет значения!');
            return;
        }
        if (val == oldVal) {
            alert('Нет изменений!');
            return;
        }
        if (confirm('Обновить значение "' + oldVal + '" на новое "' + val + '"?')) {
            return Const.DLG_RES.OK;
        } else {
            return Const.DLG_RES.CANCEL;
        }
    }

    insertCheck(val) {
        if (!val) {
            alert('Нет значения!');
            return;
        }
        if (confirm('Создать запись "' + val + '"?')) {
            return Const.DLG_RES.OK;
        } else {
            return Const.DLG_RES.CANCEL;
        }
    }

    delCheck(id, val) {
        if (!id) {
            alert('Нет значения!');
            return;
        }
        if (confirm('Удалить запись ID ' + id + ' "' + val + '" ?')) {
            return Const.DLG_RES.OK;
        } else {
            return Const.DLG_RES.CANCEL;
        }
    }

}

class Data {

    /**
     * Получить данные из базы - вызвать AJAX хукер Wordpress
     * @param params параметры
     * @returns {Promise<any>}
     */
    getData(params) {
        return new Promise(function (resolve, reject) {
            jQuery.ajax({
                type: 'GET',
                dataType: 'json',
                url: Const.AJAX,
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

}

class University {

    sys;
    ui;
    data;
    universities = [];
    programs = new Set();
    languages = new Set();
    specialities = new Set();
    programsEx = new Set();
    languagesEx = new Set();
    specialitiesEx = new Set();
    locations = [];
    locationsEx = [];

    constructor(sys, ui, data) {
        this.sys = sys;
        this.ui = ui;
        this.data = data;
    }

    all() {
        //this.sys.log('Загрузка университетов..');
        let params = {'action': 'my_action', 'query': 'get_universities'};
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this.universities = response;
                    this.sys.log('Загружено университетов: ' + this.universities.length);
                    this.printPaginator(this, this.ui);
                } else {
                    this.sys.log(Const.MSG.NO_DATA_UNIVERSITIES);
                    alert(Const.MSG.NO_DATA_UNIVERSITIES);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_LOAD_UNIVERSITIES + ' ' + error);
                alert(Const.MSG.ERR_LOAD_UNIVERSITIES + ' ' + error);
            }
        );
    }

    printPaginator(university, ui) {
        //this.sys.log('Печать пагинатора стран..');
        jQuery('#univ-pagination-container').pagination({
            dataSource: this.universities,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('univ_table', university.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        //this.sys.log('Получение HTML фрагмента для таблицы университета..');
        let html = `<table id="univ_table_data">
            <caption><h4>Университеты (${ this.universities.length })</h4></caption>
            <tr>
                <th>ID</th>
                <th>Страна</th>
                <th>Название</th>
                <th>Действие</th>
                <th>Действие</th>
            </tr>`;
        for (let i = 0; i < arr.length; i++) {
            html += `<tr>
                <td>${ arr[i].id }</td>
                <td>${ arr[i].country }</td>
                <td>${ arr[i].name_en }</td>
                <td>
                    <button onclick="on_click_univ_edit(${ arr[i].id })">Изменить</button>
                </td>
                <td>
                    <button onclick="on_click_univ_del(${ arr[i].id }, '${ arr[i].name_en }')">Удалить</button>
                </td>
            </tr>`;
        }
        return html + `</table>`;
    }

    geTypes(typ) {
        //this.sys.log('Загрузка типов университетов..');
        let params = {'action': 'my_action', 'query': 'get_types'};
        this.data.getData(params).then(
            response => {
                if (response != null) {
                    this.types = response;
                    this.sys.log('Загружено типов: ' + response.length);
                    switch (typ) {
                        case Const.TYP_EL.DROPDOWN:
                            break;
                        case Const.TYP_EL.TABLE:
                            break;
                        case Const.TYP_EL.DROPDOWN_NEW:
                            this.ui.fillDropdown('dropdownUnivNewType', this.types);
                            break;
                    }
                } else {
                    this.sys.log(Const.MSG.NO_DATA_TYPES);
                    alert(Const.MSG.NO_DATA_TYPES);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_LOAD_TYPES + ' ' + error);
                alert(Const.MSG.ERR_LOAD_TYPES + ' ' + error);
            }
        );
    }

    addUniv()   {
        let newUniv = {
            name : ui.getField('inpUnivNewName'),
            country: ui.getField('dropdownUnivNewCountry'),
            found: ui.getField('inpUnivNewFound'),
            type: ui.getField('dropdownUnivNewType'),
            location: ui.getField('dropdownUnivNewLoc'),
            url: ui.getField('inpUnivNewUrl'),
            url_pic: ui.getField('inpUnivNewUrlPhoto'),
            programs: Array.from(this.programs),
            specialities: Array.from(this.specialities),
            languages: Array.from(this.languages)
        }

        if (newUniv.name.length == 0) {
            alert('Введите название.');
            return;
        }
        if (newUniv.country == 0) {
            alert('Выберите страну.');
            return;
        }
        if (newUniv.found.length == 0) {
            alert('Введите год основания.');
            return;
        }
        if (newUniv.type == 0) {
            alert('Выберите тип.');
            return;
        }
        if (newUniv.location == 0) {
            alert('Выберите местоположение.');
            return;
        }
        if (newUniv.url.length == 0) {
            alert('Введите URL.');
            return;
        }
        if (newUniv.url_pic.length == 0) {
            alert('Введите URL фото.');
            return;
        }
        if (newUniv.programs.length == 0) {
            alert('Добавьте программы обучения.');
            return;
        }
        if (newUniv.specialities.length == 0) {
            alert('Добавьте специальности.');
            return;
        }
        if (newUniv.languages.length == 0) {
            alert('Добавьте языки.');
            return;
        }

        let params = {
            'action': 'my_action',
            'query': 'add_univ',
            'univ': JSON.stringify(newUniv)
        };
        data.getData(params).then(
            response => {
                if (response.res == '500')  {
                    sys.log(Const.MSG.ERR_ADD_UNIVERSITY + ' ' + response.msg);
                    alert(Const.MSG.ERR_ADD_UNIVERSITY + ' ' + response.msg)
                }
                if (response.res == '200')  {
                    sys.log(response.msg);
                    alert(response.msg)
                    this.resetFields();
                    this.all();
                }
            },
            error => {
                alert(Const.MSG.ERR_ADD_UNIVERSITY + error);
                sys.log(Const.MSG.ERR_ADD_UNIVERSITY + ' ' + error);
            });
    }

    async addPrg()    {
        let id = ui.getField('dropdownUnivNewPrg');
        if (id != 0) this.programs.add(id);
        let htmlRows = '';
        for (let item of this.programs) {
            let params = {
                'action': 'my_action',
                'query': 'get_col_by_id',
                'table': 'program',
                'id': item,
                'col': 'name_ru'
            };
            let result = await data.getData(params);
            htmlRows += `<li>${result.val}</li>`;
        }
        let html = `
            <ul>
                ${htmlRows}
            </ul>`;
        ui.setDiv('list_univ_new_prgs', html);
    }

    async addSpec()    {
        let id = ui.getField('dropdownUnivNewSpec');
        if (id != 0) this.specialities.add(id);
        let htmlRows = '';
        for (let item of this.specialities) {
            let params = {
                'action': 'my_action',
                'query': 'get_col_by_id',
                'table': 'specialty',
                'id': item,
                'col': 'name_ru'
            };
            let result = await data.getData(params);
            htmlRows += `<li>${result.val}</li>`;
        }
        let html = `
            <ul>
                ${htmlRows}
            </ul>`;
        ui.setDiv('list_univ_new_specs', html);
    }

    async addLang()    {
        let id = ui.getField('dropdownUnivNewLang');
        if (id != 0) this.languages.add(id);
        let htmlRows = '';
        for (let item of this.languages) {
            let params = {
                'action': 'my_action',
                'query': 'get_col_by_id',
                'table': 'language',
                'id': item,
                'col': 'name_ru'
            };
            let result = await data.getData(params);
            htmlRows += `<li>${result.val}</li>`;
        }
        let html = `
            <ul>
                ${htmlRows}
            </ul>`;
        ui.setDiv('list_univ_new_langs', html);
    }

    loadLocations() {
        let id = ui.getField('dropdownUnivNewCountry');
        //console.log('Chosen country ID ' + id);
        if (id == 0) return;
        let params = {
            'action': 'my_action',
            'query': 'get_locations_by_country',
            'id': id
        };
        data.getData(params).then(
            response => {
                this.locations = response;
                this.ui.fillDropdown('dropdownUnivNewLoc', this.locations);
            },
            error => {
                alert(Const.MSG.ERR_LOAD_LOCATIONS + error);
                sys.log(Const.MSG.ERR_LOAD_LOCATIONS + ' ' + error);
            });
    }

    resetFields()   {
        this.ui.setField('inpUnivNewName', '');
        this.ui.setField('inpUnivNewFound', '');
        this.ui.setField('inpUnivNewUrl', '');
        this.ui.setField('inpUnivNewUrlPhoto', '');

        this.ui.setDropdownState('dropdownUnivNewCountry', 0);
        this.ui.setDropdownState('dropdownUnivNewType', 0);
        this.ui.setDropdownState('dropdownUnivNewLoc', 0);
        this.ui.setDropdownState('dropdownUnivNewPrg', 0);
        this.ui.setDropdownState('dropdownUnivNewSpec', 0);
        this.ui.setDropdownState('dropdownUnivNewLang', 0);

        this.ui.clearDiv('list_univ_new_prgs');
        this.ui.clearDiv('list_univ_new_specs');
        this.ui.clearDiv('list_univ_new_langs');
    }

    loadUniv(universityId)  {
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'university',
            'id': universityId,
            'col': 'name_en'
        };
        this.data.getData(params).then( response => {
            this.ui.setField('inpUnivName', response.val);
        });
        params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'university',
            'id': universityId,
            'col': 'found'
        };
        this.data.getData(params).then( response => {
            this.ui.setField('inpUnivFound', response.val);
        });
        params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'university',
            'id': universityId,
            'col': 'url'
        };
        this.data.getData(params).then( response => {
            this.ui.setField('inpUnivUrl', response.val);
        });
        params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'university',
            'id': universityId,
            'col': 'url_pic'
        };
        this.data.getData(params).then( response => {
            this.ui.setField('inpUnivUrlPhoto', response.val);
        });
        params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'university',
            'id': universityId,
            'col': 'country_id'
        };
        this.data.getData(params).then( response => {
            //console.log(this.sys.jsonToStr(response));
            let countryId = response.val;
            //console.log('countryId = ' + countryId);
            this.ui.fillDropdown('dropdownUnivCountry', country.countries);
            this.ui.setDropdownState('dropdownUnivCountry', countryId);
            let params = {
                'action': 'my_action',
                'query': 'get_locations_by_country',
                'id': countryId,
            };
            this.data.getData(params).then( response => {
                for (let item of response) {
                    this.locationsEx.push(item.id);
                }
                console.log('locationsEx = ' + this.locationsEx);
                this.ui.fillDropdown('dropdownUnivLoc', response);
                let params = {
                    'action': 'my_action',
                    'query': 'get_col_by_id',
                    'table': 'university',
                    'id': countryId,
                    'col': 'location_id'
                };
                console.log('location_id = ' + this.sys.jsonToStr(response));
                this.data.getData(params).then( response => {
                    this.ui.setDropdownState('dropdownUnivLoc', response.id);
                });
            });
        });
        params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'university',
            'id': universityId,
            'col': 'type_id'
        };
        this.data.getData(params).then( response => {
            this.ui.fillDropdown('dropdownUnivType', this.types);
            this.ui.setDropdownState('dropdownUnivType', response.val);
        });

        params = {
            'action': 'my_action',
            'query': 'get_programs_by_university',
            'id': universityId
        };
        this.data.getData(params).then( response => {
            this.ui.fillDropdown('dropdownUnivPrg', program.programs);
            let htmlRows = '';
            this.programsEx.clear();
            for (let item of response) {
                this.programsEx.add(item.id);
                htmlRows += `<li>${item.val}</li>`;
            }
            let html = `
            <ul>
                ${htmlRows}
            </ul>`;
            ui.setDiv('list_univ_prgs', html);
        });
        params = {
            'action': 'my_action',
            'query': 'get_specialities_by_university',
            'id': universityId
        };
        this.data.getData(params).then( response => {
            this.ui.fillDropdown('dropdownUnivSpec', specialty.specialities);
            let htmlRows = '';
            this.specialitiesEx.clear();
            for (let item of response) {
                this.specialitiesEx.add(item.id);
                htmlRows += `<li>${item.val}</li>`;
            }
            let html = `
            <ul>
                ${htmlRows}
            </ul>`;
            ui.setDiv('list_univ_specs', html);
        });
        params = {
            'action': 'my_action',
            'query': 'get_languages_by_university',
            'id': universityId
        };
        this.data.getData(params).then( response => {
            this.ui.fillDropdown('dropdownUnivLang', language.languages);
            let htmlRows = '';
            this.languagesEx.clear();
            for (let item of response) {
                this.languagesEx.add(item.id);
                htmlRows += `<li>${item.val}</li>`;
            }
            let html = `
            <ul>
                ${htmlRows}
            </ul>`;
            ui.setDiv('list_univ_langs', html);
        });
    }

    changeUniv(id)  {
        this.loadUniv(id);
    }

}

let sys;
let ui;
let data;
let country;
let language;
let program;
let specialty;
let loc;
let search;
let univ;

function on_load() {

    sys = new System();
    ui = new UI(sys);
    data = new Data();
    country = new Country(sys, ui, data);
    language = new Language(sys, ui, data);
    program = new Program(sys, ui, data);
    specialty = new Specialty(sys, ui, data);
    loc = new Location(sys, ui, data);
    search = new Search(sys, ui, data);
    univ = new University(sys, ui, data);

    ui.specialty = specialty;
    ui.country = country;
    ui.language = language;
    ui.program = program;

    if (window.location.origin.indexOf('localhost') != -1) {
        Const.URL.SEARCH = window.location.origin + '/learn/?page_id=94';
        Const.URL.SEARCH_RESULTS = window.location.origin + '/learn/?page_id=81';
        Const.URL.SEARCH_MANAGEMENT = window.location.origin + '/learn/?page_id=86';
    } else {
        Const.URL.SEARCH = window.location.origin + '/poisk';
        Const.URL.SEARCH_RESULTS = window.location.origin + '/results';
        Const.URL.SEARCH_MANAGEMENT = window.location.origin + '/panel';
    }

    jQuery("document").ready(function () {
        let currentURL = window.location.href;
        sys.log('Адрес загружаемой страницы: ' + currentURL);
        sys.log('URL.SEARCH: ' + Const.URL.SEARCH);
        sys.log('URL.SEARCH_RESULTS: ' + Const.URL.SEARCH_RESULTS);
        sys.log('URL.SEARCH_MANAGEMENT: ' + Const.URL.SEARCH_MANAGEMENT);
        if (currentURL.indexOf(Const.URL.SEARCH_MANAGEMENT) != -1) {
            sys.log('Текущая страница: Const.URL.SEARCH_MANAGEMENT');
            country.all();
            language.all();
            program.all();
            specialty.all();
            loc.all();
            univ.all();
            univ.geTypes(Const.TYP_EL.DROPDOWN_NEW);
        }
        if (currentURL.indexOf(Const.URL.SEARCH) != -1) {
            sys.log('Текущая страница: URL.SEARCH');
            sys.initLocalStorage();

            ui.saveDropdownState('country', 0);
            ui.saveDropdownState('program', 0);
            ui.saveDropdownState('specialty', 0);
            ui.saveDropdownState('language', 0);

            if (jQuery(window).width() < 500) {
                sys.log('Изменение цвета названий полей..');
                let color = 'white';
                jQuery("#dropdown_title_country").css("color", color);
                jQuery("#dropdown_title_program").css("color", color);
                jQuery("#dropdown_title_specialty").css("color", color);
                jQuery("#dropdown_title_language").css("color", color);
            }
            ui.fillAllDropdowns();
        }
        if (currentURL.indexOf(Const.URL.SEARCH_RESULTS) != -1) {
            sys.log('Текущая страница: URL.SEARCH_RESULTS');
            ui.fillAllDropdowns();
            ui.changeTitlesStyle();
            search.printResults();
            search.printPaginator(search);
        }
    });
}

function on_click_spec_edit(id) {
    specialty.setEditVal(id);
}

function on_click_spec_del(id, val) {
    specialty.del(id, val);
}

function on_click_spec_new() {
    specialty.create();
}

function on_click_spec_update() {
    specialty.update();
}

function on_click_loc_del(id, val) {
    loc.del(id, val);
}

function on_click_loc_new() {
    loc.create();
}

function on_click_loc_update() {
    loc.update();
}

function on_click_loc_edit(id) {
    loc.setEditVal(id);
}

function on_click_country_edit(id) {
    country.setEditVal(id);
}

function on_click_country_del(id, val) {
    country.del(id, val);
}

function on_click_country_new() {
    country.create();
}

function on_click_lang_edit(id) {
    language.setEditVal(id);
}

function on_click_lang_del(id, val) {
    language.del(id, val);
}

function on_click_lang_new() {
    language.create();
}

function on_click_country_update() {
    country.update();
}

function on_click_lang_update() {
    language.update();
}

function on_click_search() {
    sys.log('Открывается страница поиска..');
    let currentURL = window.location.href;
    ui.saveAllDropdownState();
    if (currentURL == Const.URL.SEARCH_RESULTS) {
        search.printWait();
        ui.setDropdownState('country', ui.getDropdownState('country'));
        ui.setDropdownState('program', ui.getDropdownState('program'));
        ui.setDropdownState('specialty', ui.getDropdownState('specialty'));
        ui.setDropdownState('language', ui.getDropdownState('language'));
        search.printResults();
    } else {
        window.location = Const.URL.SEARCH_RESULTS;
    }
}

function on_click_prg_edit(id) {
    program.setEditVal(id);
}

function on_click_prg_update() {
    program.update();
}

function on_click_prg_new() {
    program.create();
}

function on_click_prg_del(id, val) {
    program.del(id, val);
}

function on_click_univ_new() {

}

function on_click_univ_update() {

}

function on_click_univ_new_add_prg() {

}

function on_click_univ_add()    {
    univ.addUniv();
}

function on_click_univ_new_add_prg()    {
    univ.addPrg();
}

function on_click_univ_new_add_spec() {
    univ.addSpec();
}

function on_click_univ_new_add_lang() {
    univ.addLang();
}

function on_change_univ_new_country() {
    univ.loadLocations();
}

function on_click_univ_edit(id) {
    univ.changeUniv(id);
}

on_load();

// <<<<-------------------------------Zhass------------------------------------
