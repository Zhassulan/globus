// -------------------------------Zhass------------------------------------>>>>>

class Const {

    static LOG_DB = false;
    /**
     * Перечисление URL
     * @type {{SEARCH: string, URL_SEARCH_RESULTS: string, SEARCH_MANAGEMENT: string}}
     */
    static URL = {
        SEARCH: '',
        URL_SEARCH_RESULTS: '',
        SEARCH_MANAGEMENT: '',
    };
    /**
     * Перечисление типов элементов
     * @type {{TABLE: number, DROPDOWN: number}}
     */
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
    
}

class Country {

    private sys;
    private ui;
    private data;

    /**
     * Конструктор
     * @param sys
     * @param ui
     * @param data
     */
    constructor(sys, ui, data) {
        this.sys = sys;
        this.ui = ui;
        this.data = data;
    }

    private countries = [];

    /**
     *
     * @param typ перечисление элемента
     */
    all(typ) {
        this.sys.log('Загрузка стран..');
        let params = {'action': 'my_action', 'query': 'get_countries'};
        this.data.getData(params).then(
            response => {
                if (response != null)   {
                    this.countries = response;
                    this.sys.log('Загружено стран: ' + response.length);
                    switch (typ) {
                        case Const.TYP_EL.DROPDOWN:
                            this.ui.fillDropdown('country', this.countries);
                            this.ui.setDropdownState('country', this.ui.getDropdownState('country'));
                            break;
                        case Const.TYP_EL.TABLE:
                            this.printPaginator(this);
                            break;
                        case Const.TYP_EL.DROPDOWN_NEW:
                            this.ui.fillDropdown('dropdownUnivNewCountry', this.countries);
                            break;
                    }
                }   else {
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
        this.sys.log('Загрузка значения по ID из таблицы "country"..');
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
                if (response)   {
                    this.ui.setField('input_country_edit', response.val);
                    this.ui.setField('input_country_edit_id', id);
                    this.ui.setField('input_country_edit_old_val', response.val);
                }   else {
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
                        this.all(Const.TYP_EL.TABLE);
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
                        this.all(Const.TYP_EL.TABLE);
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
                        this.all(Const.TYP_EL.TABLE);
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
        this.sys.log('Получение HTML фрагмента для таблицы стран..');
        let html = `<table id="country_table_data">
            <caption><h4>Страны (${this.countries.length})</h4></caption>
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

    printPaginator(country) {
        this.sys.log('Печать пагинатора стран..');
        jQuery('#country-pagination-container').pagination({
            dataSource: this.countries,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                this.ui.setDiv('country_table', country.getRefTable(data));
            }
        })
    }

}

class Language {

    private languages = [];
    private sys;
    private ui;
    private data;

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
    printPaginator(language) {
        this.sys.log('Печать пагинатора языков..');
        jQuery('#lang-pagination-container').pagination({
            dataSource: this.languages,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                this.ui.setDiv('lang_table', language.getRefTable(data));
            }
        })
    }

    setEditVal(id) {
        this.sys.log('Загрузка значения по ID из таблицы "language"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'language',
            'id': id,
            'col': 'name_ru'
        };
        this.data.getData(params).then(
            response => {
                if (response != null)   {
                    this.ui.setField('input_lang_edit', response.val);
                    this.ui.setField('input_lang_edit_id', id);
                    this.ui.setField('input_lang_edit_old_val', response.val);
                }   else {
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
        this.sys.log('Получение HTML фрагмента для таблицы языков..');
        let html = `<table id="lang_table_data">
            <caption><h4>Языки (${this.languages.length})</h4></caption>
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

    all(typ) {
        this.sys.log('Загрузка языков..');
        let params = {'action': 'my_action', 'query': 'get_languages'};
        this.data.getData(params).then(
            response => {
                if (response != null)   {
                    this.languages = response;
                    //sys.log('Загруженные языки:\n' + sys.jsonToStr(response));
                    this.sys.log('Загружено языков: ' + response.length);
                    switch (typ) {
                        case Const.TYP_EL.DROPDOWN:
                            this.ui.fillDropdown('language', this.languages);
                            this.ui.setDropdownState('language', ui.getDropdownState('language'));
                            break;
                        case Const.TYP_EL.TABLE:
                            this.printPaginator(this);
                            break;
                    }
                }   else {
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
                        this.all(Const.TYP_EL.TABLE);
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
                        this.all(Const.TYP_EL.TABLE);
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
                        this.all(Const.TYP_EL.TABLE);
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
    
    private programs = [];
    private ui;
    private sys;
    private data;

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
        this.sys.log('Загрузка значения по ID из таблицы "program"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'program',
            'id': id,
            'col': 'name_ru'
        };
        this.data.getData(params).then(
            response => {
                if (response != null)   {
                    this.ui.setField('input_prg_edit', response.val);
                    this.ui.setField('input_prg_edit_id', id);
                    this.ui.setField('input_prg_edit_old_val', response.val);
                }   else {
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

    all(typ) {
        this.sys.log('Загрузка программ обучения..');
        let params = {'action': 'my_action', 'query': 'get_programs'};
        this.data.getData(params).then(
            response => {
                if (response != null)   {
                    this.programs = response;
                    //sys.log('Загруженные программы:\n' + sys.jsonToStr(response));
                    this.sys.log('Загружено программ обучения: ' + response.length);
                    switch (typ)    {
                        case Const.TYP_EL.DROPDOWN:
                            this.ui.fillDropdown('program', this.programs);
                            this.ui.setDropdownState('program', this.ui.getDropdownState('program'));
                            break;
                        case Const.TYP_EL.TABLE:
                            this.printPaginator(this);
                    }
                }   else {
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
                        this.all(Const.TYP_EL.TABLE);
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
                        this.all(Const.TYP_EL.TABLE);
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
                        this.all(Const.TYP_EL.TABLE);
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_DEL_PROGRAM + ' ' + error);
                    alert(Const.MSG.ERR_DEL_PROGRAM + ' ' + error);
                }
            );
        }
    }

    printPaginator(program) {
        this.sys.log('Печать пагинатора программ обучения..');
        jQuery('#prg-pagination-container').pagination({
            dataSource: this.programs,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                this.ui.setDiv('prg_table', program.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        this.sys.log('Получение HTML фрагмента для таблицы программ..');
        let html = `<table id="prg_table_data">
            <caption><h4>Программы обучения (${this.programs.length})</h4></caption>
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

    private specialities = [];
    private ui;
    private sys;
    private data;

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

    all(typ) {
        this.sys.log('Загрузка специальностей..');
        let params = {'action': 'my_action', 'query': 'get_specialities'};
        this.data.getData(params).then(
            response => {
                if (response != null)   {
                    this.specialities = response;
                    //sys.log('Загруженные специальности:\n' + sys.jsonToStr(response));
                    this.sys.log('Загружено специальностей: ' + response.length);
                    switch (typ)    {
                        case Const.TYP_EL.DROPDOWN:
                            this.ui.fillDropdown('specialty', this.specialities);
                            this.ui.setDropdownState('specialty', this.ui.getDropdownState('specialty'));
                            break;
                        case Const.TYP_EL.TABLE:
                            this.printPaginator(this);
                            break;
                    }
                }   else {
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
        this.sys.log('Загрузка значения по ID из таблицы "specialty"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'specialty',
            'id': id,
            'col': 'name_ru'
        };
        this.data.getData(params).then(
            response => {
                if (response != null)   {
                    this.ui.setField('input_spec_edit', response.val);
                    this.ui.setField('input_spec_edit_id', id);
                    this.ui.setField('input_spec_edit_old_val', response.val);
                }   else {
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
                        this.all(Const.TYP_EL.TABLE);
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
                        this.all(Const.TYP_EL.TABLE);
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
                        this.all(Const.TYP_EL.TABLE);
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_DEL_SPECIALTY + ' ' + error);
                    alert(Const.MSG.ERR_DEL_SPECIALTY + ' ' + error);
                }
            );
        }
    }

    printPaginator(specialty) {
        this.sys.log('Печать пагинатора специальностей..');
        jQuery('#spec-pagination-container').pagination({
            dataSource: this.specialities,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                this.ui.setDiv('spec_table', specialty.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        this.sys.log('Получение HTML фрагмента для таблицы специальностей..');
        let html = `<table id="spec_table_data">
            <caption><h4>Специальности (${this.specialities.length})</h4></caption>
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

    private locations = [];
    private sys;
    private ui;
    private data;

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
        this.sys.log('Загрузка значения по ID из таблицы "location"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'location',
            'id': id,
            'col': 'name_ru'
        };
        this.data.getData(params).then(
            response => {
                if (response != null)   {
                    this.ui.setField('input_loc_edit', response.val);
                    this.ui.setField('input_loc_edit_id', id);
                    this. ui.setField('input_loc_edit_old_val', response.val);
                }   else {
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
                        this.all(Const.TYP_EL.TABLE);
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
                        this.all(Const.TYP_EL.TABLE);
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
                        this.all(Const.TYP_EL.TABLE);
                    }
                },
                error => {
                    this.sys.log(Const.MSG.ERR_DEL_LOCATION + ' ' + error);
                    alert(Const.MSG.ERR_DEL_LOCATION + ' ' + error);
                }
            );
        }
    }

     printPaginator(loc) {
         this.sys.log('Печать пагинатора местоположений..');
        jQuery('#loc-pagination-container').pagination({
            dataSource: this.locations,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                this.ui.setDiv('loc_table', loc.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        this.sys.log('Получение HTML фрагмента для таблицы местоположений..');
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

    all(typ) {
        this.sys.log('Загрузка местоположений..');
        let params = { 'action': 'my_action', 'query': 'get_locations'};
        this.data.getData(params).then(
            response => {
                if (response != null)   {
                    this.locations = response;
                    this.sys.log('Загружено местоположений: ' + response.length);
                    switch (typ) {
                        case Const.TYP_EL.DROPDOWN:
                            break;
                        case Const.TYP_EL.TABLE:
                            this.printPaginator(this);
                            break;
                        case Const.TYP_EL.DROPDOWN_NEW:
                            this.ui.fillDropdown('dropdownUnivNewLocation', this.locations);
                            break;
                    }
                }   else {
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
    
    private cards = [];
    private sys;
    private ui;
    private data;

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
        this.sys.log('Печать пагинатора результатов поиска..');
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
        this.sys.log('Поиск с параметрами country = ' + countryId + ', program = ' + programId + ', specialty = ' + specialtyId + ', language = ' + languageId + '..');
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

    log(msg)  {
        if (!Const.LOG_DB)    {
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
        this.ui.saveDropdownState('country', 0);
        this.ui.saveDropdownState('program', 0);
        this.ui.saveDropdownState('specialty', 0);
        this.ui.saveDropdownState('language', 0);
    }

    emptyString(str) {
        if (str == null)
            return '';
        else
            return str;
    }
    
}

class UI {

    private sys;
    private country;
    private program;
    private specialty;
    private language;

    constructor(sys, country, program, specialty, language) {
        this.sys = sys;
        this.country = country;
        this.program = program;
        this.specialty = specialty;
        this.language = language;
    }

    /**
     * Заполнить dropdown элемент
     * @param dropdownId ID элемента
     * @param arr массив
     */
    fillDropdown(dropdownId, arr) {
        this.sys.log('Заполняется dropdown "' + dropdownId + '"..');
        for (let i = 0; i < arr.length; i++) {
            jQuery("#" + dropdownId).append(new Option(arr[i].val, arr[i].id));
        }
    }

    fillAllDropdowns() {
        this.country.all(Const.TYP_EL.DROPDOWN);
        this.program.all(Const.TYP_EL.DROPDOWN);
        this.language.all(Const.TYP_EL.DROPDOWN);
        this.specialty.all(Const.TYP_EL.DROPDOWN);
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
        this.sys.log('Значение "' +  value + '" сохранено в local storage для dropdown "' + dropdownName + '".');
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

    clearAllDropdowns() {
        this.clearDiv('country');
        this.clearDiv('program');
        this.clearDiv('specialty');
        this.clearDiv('language');
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

}

class University  {

    private universities = [];
    private types = [];
    private programs = [];
    private languages = [];
    private specialities = [];
    private sys;
    private ui;
    private data;

    constructor(sys, ui, data) {
        this.sys = sys;
        this.ui = ui;
        this.data = data;
    }

    all(typ) {
        this.sys.log('Загрузка университетов..');
        let params = {'action': 'my_action', 'query': 'get_universities'};
        this.data.getData(params).then(
            response => {
                if (response != null)   {
                    this.universities = response;
                    this.sys.log('Загружено университетов: ' + this.universities.length);
                    switch (typ) {
                        case Const.TYP_EL.DROPDOWN:
                            break;
                        case Const.TYP_EL.TABLE:
                            this.printPaginator(this);
                            break;
                    }
                }   else {
                    this.sys.log(Const.MSG.NO_DATA_UNIVERSITIES);
                    alert(Const.MSG.NO_DATA_UNIVERSITIES);
                }
            },
            error => {
                this.sys.log(Const.MSG.ERR_LOAD_UNIVERSITIES+ ' ' + error);
                alert(Const.MSG.ERR_LOAD_UNIVERSITIES + ' ' + error);
            }
        );
    }

    printPaginator(university) {
        this.sys.log('Печать пагинатора стран..');
        jQuery('#univ-pagination-container').pagination({
            dataSource: this.universities,
            pageSize: Const.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                this.ui.setDiv('univ_table', university.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        this.sys.log('Получение HTML фрагмента для таблицы университета..');
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
        this.sys.log('Загрузка типов университетов..');
        let params = {'action': 'my_action', 'query': 'get_types'};
        this.data.getData(params).then(
            response => {
                if (response != null)   {
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
                }   else {
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

}

class App {

    _sys = new System();
    _ui = new UI();
    _data = new Data();
    _univ = new University(this.sys, this.ui, this.data);
    _country = new Country(this.sys, this.ui, this.data)
    _language = new Language(this.sys, this.ui, this.data);
    _program = new Program(this.sys, this.ui, this.data);
    _specialty = new Specialty(this.sys, this.ui, this.data);
    _loc = new Location(this.sys, this.ui, this.data);
    _search = new Search(this.sys, this.ui, this.data);

    get country() {
        return this._country;
    }

    get language() {
        return this._language;
    }

    get program() {
        return this._program;
    }

    get specialty() {
        return this._specialty;
    }

    get loc() {
        return this._loc;
    }

    get search() {
        return this._search;
    }

    get sys() {
        return this._sys;
    }

    get ui() {
        return this._ui;
    }

    get data() {
        return this._data;
    }

    get univ() {
        return this._univ;
    }

    constructor() {
        this.initUrls();
        this.ready();
    }

    initUrls()  {
        if (window.location.origin.indexOf('localhost') != -1) {
            Const.URL.SEARCH = window.location.origin + '/learn/?page_id=94';
            Const.URL.SEARCH_RESULTS = window.location.origin + '/learn/?page_id=81';
            Const.URL.SEARCH_MANAGEMENT = window.location.origin + '/learn/?page_id=86';
        } else {
            Const.URL.SEARCH = window.location.origin + '/poisk';
            Const.URL.SEARCH_RESULTS = window.location.origin + '/results';
            Const.URL.SEARCH_MANAGEMENT = window.location.origin + '/panel';
        }
    }

    ready() {
        jQuery("document").ready(function () {
            let currentURL = window.location.href;
            this.sys.log('Адрес загружаемой страницы: ' + currentURL);
            this.sys.log('_Const.URL.SEARCH: ' + Const.URL.SEARCH);
            this.sys.log('_Const.URL.SEARCH_RESULTS: ' + Const.URL.SEARCH_RESULTS);
            this.sys.log('_Const.URL.SEARCH_MANAGEMENT: ' + Const.URL.SEARCH_MANAGEMENT);
            if (currentURL.indexOf(Const.URL.SEARCH_MANAGEMENT) != -1) {
                this.sys.log('Текущая страница: Const.URL.SEARCH_MANAGEMENT');
                this.country.all(Const.TYP_EL.TABLE);
                this.country.all(Const.TYP_EL.DROPDOWN_NEW);
                this.language.all(Const.TYP_EL.TABLE);
                this.program.all(Const.TYP_EL.TABLE);
                this.specialty.all(Const.TYP_EL.TABLE);
                this.loc.all(Const.TYP_EL.TABLE);
                this.loc.all(Const.TYP_EL.DROPDOWN_NEW);
                this.univ.all(Const.TYP_EL.TABLE);
                this.univ.geTypes(Const.TYP_EL.DROPDOWN_NEW);
            }
            if (currentURL.indexOf(Const.URL.SEARCH) != -1) {
                this.sys.log('Текущая страница: Const.URL.SEARCH');
                this.sys.initLocalStorage();
                if (jQuery(window).width() < 500) {
                    this.sys.log('Изменение цвета названий полей..');
                    let color = 'white';
                    jQuery("#dropdown_title_country").css("color", color);
                    jQuery("#dropdown_title_program").css("color", color);
                    jQuery("#dropdown_title_specialty").css("color", color);
                    jQuery("#dropdown_title_language").css("color", color);
                }
                this.ui.clearAllDropdowns();
                this.ui.fillAllDropdowns();
            }
            if (currentURL.indexOf(Const.URL.SEARCH_RESULTS) != -1) {
                this.sys.log('Текущая страница: Const.URL.SEARCH_RESULTS');
                this.ui.clearAllDropdowns();
                this.ui.fillAllDropdowns();
                this.ui.changeTitlesStyle();
                this.search.printResults();
                this.search.printPaginator(search);
            }
        });
    }
}

let app = new App();

// on clicks ------------------------>>>
function on_click_spec_edit(id) {
    app.specialty.setEditVal(id);
}

function on_click_spec_del(id, val) {
    app.specialty.del(id, val);
}

function on_click_spec_new() {
    app.specialty.create();
}

function on_click_spec_update() {
    app.specialty.update();
}

function on_click_loc_del(id, val) {
    app.loc.del(id, val);
}

function on_click_loc_new() {
    app.loc.create();
}

function on_click_loc_update() {
    app.loc.update();
}

function on_click_loc_edit(id) {
    app.loc.setEditVal(id);
}

function on_click_country_edit(id) {
    app.country.setEditVal(id);
}

function on_click_country_del(id, val) {
    app.country.del(id, val);
}

function on_click_country_new() {
    app.country.create();
}

function on_click_lang_edit(id) {
    app.language.setEditVal(id);
}

function on_click_lang_del(id, val) {
    app.language.del(id, val);
}

function on_click_lang_new() {
    app.language.create();
}

function on_click_country_update() {
    app.country.update();
}

function on_click_lang_update() {
    app.language.update();
}

function on_click_search() {
    app.sys.log('Открывается страница поиска..');
    let currentURL = window.location.href;
    app.ui.saveAllDropdownState();
    if (currentURL == Const.URL.SEARCH_RESULTS) {
        app.search.printWait();
        app.ui.setDropdownState('country', app.ui.getDropdownState('country'));
        app.ui.setDropdownState('program', app.ui.getDropdownState('program'));
        app.ui.setDropdownState('specialty', app.ui.getDropdownState('specialty'));
        app.ui.setDropdownState('language', app.ui.getDropdownState('language'));
        app.search.printResults();
    } else {
        window.location = Const.URL.SEARCH_RESULTS;
    }
}

function on_click_prg_edit(id)    {
    app.program.setEditVal(id);
}

function on_click_prg_update() {
    app.program.update();
}

function on_click_prg_new() {
    app.program.create();
}

function on_click_prg_del(id, val) {
    app.program.del(id, val);
}

function on_click_univ_new()    {

}

function on_click_univ_update() {

}

function on_click_univ_new_add_prg()    {

}

// on clicks <<<------------------------

// <<<<-------------------------------Zhass------------------------------------
