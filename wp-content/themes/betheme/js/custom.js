// -------------------------------Zhass------------------------------------>>>>>

class Const {

    LOG_DB = false;
    /**
     * Перечисление URL
     * @type {{SEARCH: string, URL_SEARCH_RESULTS: string, SEARCH_MANAGEMENT: string}}
     */
    URL = {
        SEARCH: '',
        URL_SEARCH_RESULTS: '',
        SEARCH_MANAGEMENT: '',
    };
    /**
     * Перечисление типов элементов
     * @type {{TABLE: number, DROPDOWN: number}}
     */
    TYP_EL = {
        TABLE: 0,
        DROPDOWN: 1,
        DROPDOWN_NEW: 2,
        DROPDOWN_EDIT: 3,
    };

    DLG_RES = {
        OK: 0,
        CANCEL: 1
    };

    MSG = {
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
    }

    PAGE_SIZE_SEARCH = 8;
    PAGE_SIZE_REF = 8;
    
}

class Country {

    countries = [];

    /**
     *
     * @param typ перечисление элемента
     */
    all(typ) {
        sys.log('Загрузка стран..');
        let params = {'action': 'my_action', 'query': 'get_countries'};
        data.getData(params).then(
            response => {
                if (response != null)   {
                    this.countries = response;
                    sys.log('Загружено стран: ' + response.length);
                    switch (typ) {
                        case cons.TYP_EL.DROPDOWN:
                            ui.fillDropdown('country', this.countries);
                            ui.setDropdownState('country', ui.getDropdownState('country'));
                            break;
                        case cons.TYP_EL.TABLE:
                            this.printPaginator(this);
                            break;
                        case cons.TYP_EL.DROPDOWN_NEW:
                            ui.fillDropdown('dropdownUnivNewCountry', this.countries);
                            break;
                    }
                }   else {
                    sys.log(cons.MSG.NO_DATA_COUNTRIES);
                    alert(cons.MSG.NO_DATA_COUNTRIES);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_LOAD_COUNTRIES + ' ' + error);
                alert(cons.MSG.ERR_LOAD_COUNTRIES + ' ' + error);
            }
        );
    }

    setEditVal(id) {
        sys.log('Загрузка значения по ID из таблицы "country"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'country',
            'id': id,
            'col': 'name_ru'
        };
        data.getData(params).then(
            response => {
                sys.log(response);
                if (response)   {
                    ui.setField('input_country_edit', response.val);
                    ui.setField('input_country_edit_id', id);
                    ui.setField('input_country_edit_old_val', response.val);
                }   else {
                    sys.log(cons.MSG.NO_DATA_COUNTRY);
                    alert(cons.MSG.NO_DATA_COUNTRY);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_LOAD_COUNTRY + ' ' + error);
                alert(cons.MSG.ERR_LOAD_COUNTRY + ' ' + error);
            }
        );
    }

    emptyEdits() {
        ui.emptyField("#input_country_edit");
        ui.emptyField("#input_country_edit_id");
        ui.emptyField("#input_country_edit_old_val");
    }

    create() {
        let val = ui.getField('input_country_new');
        if (ui.insertCheck(val) == cons.DLG_RES.OK) {
            sys.log('Добавление страны "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'insertTxt',
                'table': 'country',
                'col': 'name_ru',
                'val': val,
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_ADD_COUNTRY + ' ' + response.msg);
                        alert(cons.MSG.ERR_ADD_COUNTRY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        ui.emptyField('input_country_new');
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_ADD_COUNTRY + ' ' + error);
                    alert(cons.MSG.ERR_ADD_COUNTRY + ' ' + error);
                }
            );
        }
    }

    update() {
        let val = ui.getField('input_country_edit');
        let id = ui.getField('input_country_edit_id');
        let oldVal = ui.getField('input_country_edit_old_val');
        if (ui.updateCheck(id, val, oldVal) == cons.DLG_RES.OK) {
            sys.log('Обновляется страна ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'update_txt_col_by_id',
                'table': 'country',
                'id': id,
                'val': val,
                'col': 'name_ru'
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_UPDATE_COUNTRY + ' ' + response.msg);
                        alert(cons.MSG.ERR_UPDATE_COUNTRY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.emptyEdits();
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_UPDATE_COUNTRY + ' ' + error);
                    alert(cons.MSG.ERR_UPDATE_COUNTRY + ' ' + error);
                }
            );
        }
    }

    del(id, val) {
        if (ui.delCheck(id, val) == cons.DLG_RES.OK) {
            sys.log('Удаляется страна ID ' + id + ' "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'del',
                'table': 'country',
                'id': id
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_DEL_COUNTRY + ' ' + response.msg);
                        alert(cons.MSG.ERR_DEL_COUNTRY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_DEL_COUNTRY + ' ' + error);
                    alert(cons.MSG.ERR_DEL_COUNTRY + ' ' + error);
                }
            );
        }
    }

    getRefTable(arr) {
        sys.log('Получение HTML фрагмента для таблицы стран..');
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
        sys.log('Печать пагинатора стран..');
        jQuery('#country-pagination-container').pagination({
            dataSource: this.countries,
            pageSize: cons.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('country_table', country.getRefTable(data));
            }
        })
    }

}

class Language {

    languages = [];

    /**
     * Распечатать таблицу и пагинатор языков
     */
    printPaginator(language) {
        sys.log('Печать пагинатора языков..');
        jQuery('#lang-pagination-container').pagination({
            dataSource: this.languages,
            pageSize: cons.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('lang_table', language.getRefTable(data));
            }
        })
    }

    setEditVal(id) {
        sys.log('Загрузка значения по ID из таблицы "language"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'language',
            'id': id,
            'col': 'name_ru'
        };
        data.getData(params).then(
            response => {
                if (response != null)   {
                    ui.setField('input_lang_edit', response.val);
                    ui.setField('input_lang_edit_id', id);
                    ui.setField('input_lang_edit_old_val', response.val);
                }   else {
                    sys.log(cons.MSG.NO_DATA_LANGUAGE);
                    alert(cons.MSG.NO_DATA_LANGUAGE);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_ADD_LANGUAGE + ' ' + error);
                alert(cons.MSG.ERR_ADD_LANGUAGE + ' ' + error);
            }
        );
    }

    getRefTable(arr) {
        sys.log('Получение HTML фрагмента для таблицы языков..');
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
        sys.log('Загрузка языков..');
        let params = {'action': 'my_action', 'query': 'get_languages'};
        data.getData(params).then(
            response => {
                if (response != null)   {
                    this.languages = response;
                    //sys.log('Загруженные языки:\n' + sys.jsonToStr(response));
                    sys.log('Загружено языков: ' + response.length);
                    switch (typ) {
                        case cons.TYP_EL.DROPDOWN:
                            ui.fillDropdown('language', this.languages);
                            ui.setDropdownState('language', ui.getDropdownState('language'));
                            break;
                        case cons.TYP_EL.TABLE:
                            this.printPaginator(this);
                            break;
                    }
                }   else {
                    sys.log(cons.MSG.NO_DATA_LANGUAGES);
                    alert(cons.MSG.NO_DATA_LANGUAGES);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_LOAD_LANGUAGES + ' ' + error);
                alert(cons.MSG.ERR_LOAD_LANGUAGES + ' ' + error);
            }
        );
    }

    emptyEdits() {
        ui.emptyField("input_lang_edit");
        ui.emptyField("input_lang_edit_id");
        ui.emptyField("input_lang_edit_old_val");
    }

    create() {
        let val = ui.getField('input_lang_new');
        if (ui.insertCheck(val) == cons.DLG_RES.OK) {
            sys.log('Добавление нового языка "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'insertTxt',
                'table': 'language',
                'col': 'name_ru',
                'val': val,
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_ADD_LANGUAGE + ' ' + response.msg);
                        alert(cons.MSG.ERR_ADD_LANGUAGE + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        ui.emptyField('input_lang_new');
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_ADD_LANGUAGE + ' ' + error);
                    alert(cons.MSG.ERR_ADD_LANGUAGE + ' ' + error);
                }
            );
        }
    }

    update() {
        let val = ui.getField('input_lang_edit');
        let id = ui.getField('input_lang_edit_id');
        let oldVal = ui.getField('input_lang_edit_old_val');
        if (ui.updateCheck(id, val, oldVal) == cons.DLG_RES.OK) {
            sys.log('Обновляется язык ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'update_txt_col_by_id',
                'table': 'language',
                'id': id,
                'val': val,
                'col': 'name_ru'
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_UPDATE_LANGUAGE + ' ' + response.msg);
                        alert(cons.MSG.ERR_UPDATE_LANGUAGE + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.emptyEdits();
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_UPDATE_LANGUAGE + ' ' + error);
                    alert(cons.MSG.ERR_UPDATE_LANGUAGE + ' ' + error);
                }
            );
        }
    }

    del(id, val) {
        if (ui.delCheck(id, val) == cons.DLG_RES.OK) {
            sys.log('Удаляется язык ID ' + id + ' "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'del',
                'table': 'language',
                'id': id
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_DEL_LANGUAGE + ' ' + response.msg);
                        alert(cons.MSG.ERR_DEL_LANGUAGE + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_DEL_LANGUAGE + ' ' + error);
                    alert(cons.MSG.ERR_DEL_LANGUAGE + ' ' + error);
                }
            );
        }
    }

}

class Program {
    
    programs = [];

    setEditVal(id) {
        sys.log('Загрузка значения по ID из таблицы "program"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'program',
            'id': id,
            'col': 'name_ru'
        };
        data.getData(params).then(
            response => {
                if (response != null)   {
                    ui.setField('input_prg_edit', response.val);
                    ui.setField('input_prg_edit_id', id);
                    ui.setField('input_prg_edit_old_val', response.val);
                }   else {
                    sys.log(cons.MSG.NO_DATA_PROGRAM);
                    alert(cons.MSG.NO_DATA_PROGRAM);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_ADD_PROGRAM + ' ' + error);
                alert(cons.MSG.ERR_ADD_PROGRAM + ' ' + error);
            }
        );
    }

    all(typ) {
        sys.log('Загрузка программ обучения..');
        let params = {'action': 'my_action', 'query': 'get_programs'};
        data.getData(params).then(
            response => {
                if (response != null)   {
                    this.programs = response;
                    //sys.log('Загруженные программы:\n' + sys.jsonToStr(response));
                    sys.log('Загружено программ обучения: ' + response.length);
                    switch (typ)    {
                        case cons.TYP_EL.DROPDOWN:
                            ui.fillDropdown('program', this.programs);
                            ui.setDropdownState('program', ui.getDropdownState('program'));
                            break;
                        case cons.TYP_EL.TABLE:
                            this.printPaginator(this);
                    }
                }   else {
                    sys.log(cons.MSG.NO_DATA_PROGRAMS);
                    alert(cons.MSG.NO_DATA_PROGRAMS);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_LOAD_PROGRAMS + ' ' + error);
                alert(cons.MSG.ERR_LOAD_PROGRAMS + ' ' + error);
            }
        );
    }

    emptyEdits() {
        ui.emptyField("input_prg_edit");
        ui.emptyField("input_prg_edit_id");
        ui.emptyField("input_prg_edit_old_val");
    }

    create() {
        let val = ui.getField('input_prg_new');
        if (ui.insertCheck(val) == cons.DLG_RES.OK) {
            sys.log('Добавление новой программмы "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'insertTxt',
                'table': 'program',
                'col': 'name_ru',
                'val': val,
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_ADD_PROGRAM + ' ' + response.msg);
                        alert(cons.MSG.ERR_ADD_PROGRAM + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        ui.emptyField('input_prg_new');
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_ADD_PROGRAM + ' ' + error);
                    alert(cons.MSG.ERR_ADD_PROGRAM + ' ' + error);
                }
            );
        }
    }

    update() {
        let val = ui.getField('input_prg_edit');
        let id = ui.getField('input_prg_edit_id');
        let oldVal = ui.getField('input_prg_edit_old_val');
        if (ui.updateCheck(id, val, oldVal) == cons.DLG_RES.OK) {
            sys.log('Обновляется программа ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'update_txt_col_by_id',
                'table': 'program',
                'id': id,
                'val': val,
                'col': 'name_ru'
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_UPDATE_PROGRAM + ' ' + response.msg);
                        alert(cons.MSG.ERR_UPDATE_PROGRAM + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.emptyEdits();
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_UPDATE_PROGRAM + ' ' + error);
                    alert(cons.MSG.ERR_UPDATE_PROGRAM + ' ' + error);
                }
            );
        }
    }

    del(id, val) {
        if (ui.delCheck(id, val) == cons.DLG_RES.OK) {
            sys.log('Удаляется программа обучения ID ' + id + ' "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'del',
                'table': 'program',
                'id': id
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_DEL_PROGRAM + ' ' + response.msg);
                        alert(cons.MSG.ERR_DEL_PROGRAM + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_DEL_PROGRAM + ' ' + error);
                    alert(cons.MSG.ERR_DEL_PROGRAM + ' ' + error);
                }
            );
        }
    }

    printPaginator(program) {
        sys.log('Печать пагинатора программ обучения..');
        jQuery('#prg-pagination-container').pagination({
            dataSource: this.programs,
            pageSize: cons.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('prg_table', program.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        sys.log('Получение HTML фрагмента для таблицы программ..');
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

    specialities = [];

    emptyEdits() {
        ui.emptyField("input_spec_edit");
        ui.emptyField("input_spec_edit_id");
        ui.emptyField("input_spec_edit_old_val");
    }

    all(typ) {
        sys.log('Загрузка специальностей..');
        let params = {'action': 'my_action', 'query': 'get_specialities'};
        data.getData(params).then(
            response => {
                if (response != null)   {
                    this.specialities = response;
                    //sys.log('Загруженные специальности:\n' + sys.jsonToStr(response));
                    sys.log('Загружено специальностей: ' + response.length);
                    switch (typ)    {
                        case cons.TYP_EL.DROPDOWN:
                            ui.fillDropdown('specialty', this.specialities);
                            ui.setDropdownState('specialty', ui.getDropdownState('specialty'));
                            break;
                        case cons.TYP_EL.TABLE:
                            this.printPaginator(this);
                            break;
                    }
                }   else {
                    sys.log(cons.MSG.NO_DATA_SPECIALITIES);
                    alert(cons.MSG.NO_DATA_SPECIALITIES);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_LOAD_SPECIALITIES + ' ' + error);
                alert(cons.MSG.ERR_LOAD_SPECIALITIES + ' ' + error);
            }
        );
    }

    setEditVal(id) {
        sys.log('Загрузка значения по ID из таблицы "specialty"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'specialty',
            'id': id,
            'col': 'name_ru'
        };
        data.getData(params).then(
            response => {
                if (response != null)   {
                    ui.setField('input_spec_edit', response.val);
                    ui.setField('input_spec_edit_id', id);
                    ui.setField('input_spec_edit_old_val', response.val);
                }   else {
                    sys.log(cons.MSG.NO_DATA_SPECIALTY);
                    alert(cons.MSG.NO_DATA_SPECIALTY);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_ADD_SPECIALTY + ' ' + error);
                alert(cons.MSG.ERR_ADD_SPECIALTY + ' ' + error);
            }
        );
    }

    create() {
        let val = ui.getField('input_spec_new');
        if (ui.insertCheck(val) == cons.DLG_RES.OK) {
            sys.log('Добавление новой специальности "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'insertTxt',
                'table': 'specialty',
                'col': 'name_ru',
                'val': val,
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_ADD_SPECIALTY + ' ' + response.msg);
                        alert(cons.MSG.ERR_ADD_SPECIALTY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        ui.emptyField('input_spec_new');
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_ADD_SPECIALTY + ' ' + error);
                    alert(cons.MSG.ERR_ADD_SPECIALTY + ' ' + error);
                }
            );
        }
    }

    update() {
        let val = ui.getField('input_spec_edit');
        let id = ui.getField('input_spec_edit_id');
        let oldVal = ui.getField('input_spec_edit_old_val');
        if (ui.updateCheck(id, val, oldVal) == cons.DLG_RES.OK) {
            sys.log('Обновляется специальность ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'update_txt_col_by_id',
                'table': 'specialty',
                'id': id,
                'val': val,
                'col': 'name_ru'
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_UPDATE_SPECIALTY + ' ' + response.msg);
                        alert(cons.MSG.ERR_UPDATE_SPECIALTY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.emptyEdits();
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_UPDATE_SPECIALTY + ' ' + error);
                    alert(cons.MSG.ERR_UPDATE_SPECIALTY + ' ' + error);
                }
            );
        }
    }

    del(id, val) {
        if (ui.delCheck(id, val) == cons.DLG_RES.OK) {
            sys.log('Удаляется специальность ID ' + id + ' "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'del',
                'table': 'specialty',
                'id': id
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_DEL_SPECIALTY + ' ' + response.msg);
                        alert(cons.MSG.ERR_DEL_SPECIALTY + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_DEL_SPECIALTY + ' ' + error);
                    alert(cons.MSG.ERR_DEL_SPECIALTY + ' ' + error);
                }
            );
        }
    }

    printPaginator(specialty) {
        sys.log('Печать пагинатора специальностей..');
        jQuery('#spec-pagination-container').pagination({
            dataSource: this.specialities,
            pageSize: cons.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('spec_table', specialty.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        sys.log('Получение HTML фрагмента для таблицы специальностей..');
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

    locations = [];
    
    emptyEdits() {
        ui.emptyField("input_loc_edit");
        ui.emptyField("input_loc_edit_id");
        ui.emptyField("input_loc_edit_old_val");
    }

    setEditVal(id) {
        sys.log('Загрузка значения по ID из таблицы "location"..');
        let params = {
            'action': 'my_action',
            'query': 'get_col_by_id',
            'table': 'location',
            'id': id,
            'col': 'name_ru'
        };
        data.getData(params).then(
            response => {
                if (response != null)   {
                    ui.setField('input_loc_edit', response.val);
                    ui.setField('input_loc_edit_id', id);
                    ui.setField('input_loc_edit_old_val', response.val);
                }   else {
                    sys.log(cons.MSG.NO_DATA_LOCATION);
                    alert(cons.MSG.NO_DATA_LOCATION);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_ADD_LOCATION + ' ' + error);
                alert(cons.MSG.ERR_ADD_LOCATION + ' ' + error);
            }
        );
    }

    create() {
        let val = ui.getField('input_loc_new');
        if (ui.insertCheck(val) == cons.DLG_RES.OK) {
            sys.log('Добавление нового местоположения "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'insertTxt',
                'table': 'location',
                'col': 'name_ru',
                'val': val,
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_ADD_LOCATION + ' ' + response.msg);
                        alert(cons.MSG.ERR_ADD_LOCATION + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        ui.emptyField('input_loc_new');
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_ADD_LOCATION + ' ' + error);
                    alert(cons.MSG.ERR_ADD_LOCATION + ' ' + error);
                }
            );
        }
    }

    update() {
        let val = ui.getField('input_loc_edit');
        let id = ui.getField('input_loc_edit_id');
        let oldVal = ui.getField('input_loc_edit_old_val');
        if (ui.updateCheck(id, val, oldVal) == cons.DLG_RES.OK) {
            sys.log('Обновляется местоположение ID ' + id + ' "' + oldVal + '" на значение "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'update_txt_col_by_id',
                'table': 'location',
                'id': id,
                'val': val,
                'col': 'name_ru'
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_UPDATE_LOCATION + ' ' + response.msg);
                        alert(cons.MSG.ERR_UPDATE_LOCATION + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.emptyEdits();
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_UPDATE_LOCATION + ' ' + error);
                    alert(cons.MSG.ERR_UPDATE_LOCATION + ' ' + error);
                }
            );
        }
    }

    del(id, val) {
        if (ui.delCheck(id, val) == cons.DLG_RES.OK) {
            sys.log('Удаляется местоположение ID ' + id + ' "' + val + '"..');
            let params = {
                'action': 'my_action',
                'query': 'del',
                'table': 'location',
                'id': id
            };
            data.getData(params).then(
                response => {
                    if (response.res == '500') {
                        sys.log(cons.MSG.ERR_DEL_LOCATION + ' ' + response.msg);
                        alert(cons.MSG.ERR_DEL_LOCATION + ' ' + response.msg);
                    }
                    if (response.res == '200') {
                        alert(response.msg);
                        this.all(cons.TYP_EL.TABLE);
                    }
                },
                error => {
                    sys.log(cons.MSG.ERR_DEL_LOCATION + ' ' + error);
                    alert(cons.MSG.ERR_DEL_LOCATION + ' ' + error);
                }
            );
        }
    }

     printPaginator(loc) {
        sys.log('Печать пагинатора местоположений..');
        jQuery('#loc-pagination-container').pagination({
            dataSource: this.locations,
            pageSize: cons.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('loc_table', loc.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        sys.log('Получение HTML фрагмента для таблицы местоположений..');
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
        sys.log('Загрузка местоположений..');
        let params = { 'action': 'my_action', 'query': 'get_locations'};
        data.getData(params).then(
            response => {
                if (response != null)   {
                    this.locations = response;
                    sys.log('Загружено местоположений: ' + response.length);
                    switch (typ) {
                        case cons.TYP_EL.DROPDOWN:
                            break;
                        case cons.TYP_EL.TABLE:
                            this.printPaginator(this);
                            break;
                        case cons.TYP_EL.DROPDOWN_NEW:
                            ui.fillDropdown('dropdownUnivNewLocation', this.locations);
                            break;
                    }
                }   else {
                    sys.log(cons.MSG.NO_DATA_LOCATIONS);
                    alert(cons.MSG.NO_DATA_LOCATIONS);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_LOAD_LOCATIONS + ' ' + error);
                alert(cons.MSG.ERR_LOAD_LOCATIONS + ' ' + error);
            }
        );
    }

}

class Search {
    
    cards = [];

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
              <img src="${sys.emptyString(card.url_pic)}">
            </div>
            <div class="desc">
              <div class="desc_txt">
                <div class="desc_title">
                  ${sys.emptyString(card.name)}
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
                      ${sys.emptyString(card.type)}
                    </div>
                    <div>
                      <b class="attr_name">Расположение:</b>
                    </div>
                    <div>
                      ${sys.emptyString(card.location)}
                    </div>
                    <div>
                      <b class="attr_name">Язык обучения:</b>
                    </div>
                    <div>
                      ${sys.emptyString(card.languages)}
                    </div>
                    <div>
                      <b class="attr_name">Программы:</b>
                    </div>
                    <div class="attr_name">
                      ${sys.emptyString(card.programs)}
                    </div>
                </div>
              </div>
            </div>
            <div class="mor_info_btn">
              <a href="${sys.emptyString(card.url)}">Подробно</a>
            </div>
          </div>
        </div>`;
    }
    
    printResults() {
        sys.log('Печать результатов поиска..');
        this.search(localStorage.getItem("country"), localStorage.getItem("program"), localStorage.getItem("specialty"), localStorage.getItem("language"));
    }

    printHeader() {
        ui.setDiv("results_container", `
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
        sys.log('Печать пагинатора результатов поиска..');
        jQuery('#cards-pagination-container').pagination({
            dataSource: this.cards,
            pageSize: cons.PAGE_SIZE_SEARCH,
            callback: function (data, pagination) {
                search.clearResults();
                jQuery.each(data, function (index, item) {
                    search.printCard(item);
                });
            }
        })
    }

    search(countryId, programId, specialtyId, languageId) {
        sys.log('Поиск с параметрами country = ' + countryId + ', program = ' + programId + ', specialty = ' + specialtyId + ', language = ' + languageId + '..');
        let params = {
            'action': 'my_action',
            'query': 'search',
            'country': countryId,
            'program': programId,
            'specialty': specialtyId,
            'language': languageId
        };
        data.getData(params).then(
            response => {
                if (response != null) {
                    this.clearResults();
                    this.cards = response;
                    sys.log('Количество результатов поиска: ' + this.cards.length);
                    this.printHeader();
                    this.printPaginator(this);
                } else {
                    this.printNoResults();
                }
            },
            error => {
                sys.log(cons.MSG.ERR_SEARCH + ' ' + error);
                alert(cons.MSG.ERR_SEARCH + ' ' + error);
            }
        );
    }

    printCard(card) {
        ui.appendDiv("found_objects", this.getCard(card));
    }

    printNoResults() {
        let html = `
        <div>
            <h4><b>Ничего не найдено</b></h4>
        </div>
    `;
        ui.setDiv("results_container", html);
    }

    printWait() {
        let html = `
        <div>
            <h4><b>Идёт поиск..</b></h4>
        </div>
    `;
        ui.setDiv("results_container", html);
    }

    clearResults() {
        let html = ``;
        ui.setDiv("found_objects", html);
    }
    
}

class System {

    log(msg)  {
        if (!cons.LOG_DB)    {
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
        data.getData(params).then(
            response => {
                if (response.res == '500') {
                    alert(cons.MSG.ERR_LOG + ' ' + response.msg);
                }
                if (response.res == '200') {
                    console.log(msg);
                }
            },
            error => {
                alert(cons.MSG.ERR_LOG + ' ' + error);
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
        ui.saveDropdownState('country', 0);
        ui.saveDropdownState('program', 0);
        ui.saveDropdownState('specialty', 0);
        ui.saveDropdownState('language', 0);
    }

    emptyString(str) {
        if (str == null)
            return '';
        else
            return str;
    }
    
}

class UI {

    /**
     * Заполнить dropdown элемент
     * @param dropdownId ID элемента
     * @param arr массив
     */
    fillDropdown(dropdownId, arr) {
        sys.log('Заполняется dropdown "' + dropdownId + '"..');
        for (let i = 0; i < arr.length; i++) {
            jQuery("#" + dropdownId).append(new Option(arr[i].val, arr[i].id));
        }
    }

    fillAllDropdowns() {
        country.all(cons.TYP_EL.DROPDOWN);
        program.all(cons.TYP_EL.DROPDOWN);
        language.all(cons.TYP_EL.DROPDOWN);
        specialty.all(cons.TYP_EL.DROPDOWN);
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
        sys.log('Значение "' +  value + '" сохранено в local storage для dropdown "' + dropdownName + '".');
    }

    getDropdownState(dropdownName) {
        let val = localStorage.getItem(dropdownName);
        sys.log('Получение значения "' + val + '" из local storage для dropdown "' + dropdownName + '"..');
        return val;
    }

    saveAllDropdownState() {
        this.saveDropdownState('country', this.getField('country'));
        this.saveDropdownState('program', this.getField('program'));
        this.saveDropdownState('specialty', this.getField('specialty'));
        this.saveDropdownState('language', this.getField('language'));
    }

    setDropdownState(dropdownName, value) {
        sys.log('Установка dropdown "' + dropdownName + '" в значение "' + value + '"');
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
        sys.log('Меняется цвет для ' + titleId + '..');
        jQuery("#" + titleId).css("color", color);
    }


    setField(field, val) {
        sys.log('Установка поля "' + field + '" в значение "' + val + '"..');
        jQuery("#" + field).val(val);
    }

    emptyField(field) {
        sys.log('Очистка поля "' + field + '"..');
        jQuery("#" + field).val('');
    }

    getField(field) {
        sys.log('Получение значения поля "' + field + '"..');
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
            return cons.DLG_RES.OK;
        } else {
            return cons.DLG_RES.CANCEL;
        }
    }

    insertCheck(val) {
        if (!val) {
            alert('Нет значения!');
            return;
        }
        if (confirm('Создать запись "' + val + '"?')) {
            return cons.DLG_RES.OK;
        } else {
            return cons.DLG_RES.CANCEL;
        }
    }

    delCheck(id, val) {
        if (!id) {
            alert('Нет значения!');
            return;
        }
        if (confirm('Удалить запись ID ' + id + ' "' + val + '" ?')) {
            return cons.DLG_RES.OK;
        } else {
            return cons.DLG_RES.CANCEL;
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

    universities = [];
    types = [];

    all(typ) {
        sys.log('Загрузка университетов..');
        let params = {'action': 'my_action', 'query': 'get_universities'};
        data.getData(params).then(
            response => {
                if (response != null)   {
                    this.universities = response;
                    sys.log('Загружено университетов: ' + this.universities.length);
                    switch (typ) {
                        case cons.TYP_EL.DROPDOWN:
                            break;
                        case cons.TYP_EL.TABLE:
                            this.printPaginator(this);
                            break;
                    }
                }   else {
                    sys.log(cons.MSG.NO_DATA_UNIVERSITIES);
                    alert(cons.MSG.NO_DATA_UNIVERSITIES);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_LOAD_UNIVERSITIES+ ' ' + error);
                alert(cons.MSG.ERR_LOAD_UNIVERSITIES + ' ' + error);
            }
        );
    }

    printPaginator(university) {
        sys.log('Печать пагинатора стран..');
        jQuery('#univ-pagination-container').pagination({
            dataSource: this.universities,
            pageSize: cons.PAGE_SIZE_REF,
            callback: function (data, pagination) {
                ui.setDiv('univ_table', university.getRefTable(data));
            }
        })
    }

    getRefTable(arr) {
        let k = 1;
        sys.log('Получение HTML фрагмента для таблицы университета..');
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
        sys.log('Загрузка типов университетов..');
        let params = {'action': 'my_action', 'query': 'get_types'};
        data.getData(params).then(
            response => {
                if (response != null)   {
                    this.types = response;
                    sys.log('Загружено типов: ' + response.length);
                    switch (typ) {
                        case cons.TYP_EL.DROPDOWN:
                            break;
                        case cons.TYP_EL.TABLE:
                            break;
                        case cons.TYP_EL.DROPDOWN_NEW:
                            ui.fillDropdown('dropdownUnivNewType', this.types);
                            break;
                    }
                }   else {
                    sys.log(cons.MSG.NO_DATA_TYPES);
                    alert(cons.MSG.NO_DATA_TYPES);
                }
            },
            error => {
                sys.log(cons.MSG.ERR_LOAD_TYPES + ' ' + error);
                alert(cons.MSG.ERR_LOAD_TYPES + ' ' + error);
            }
        );
    }

}

let cons = new Const();
let country = new Country();
let language = new Language();
let program = new Program();
let specialty = new Specialty();
let loc = new Location();
let search = new Search();
let sys = new System();
let ui = new UI();
let data = new Data();
let univ = new University();

function onLoad() {
    
    if (window.location.origin.indexOf('localhost') != -1) {
        cons.URL.SEARCH = window.location.origin + '/learn/?page_id=94';
        cons.URL.SEARCH_RESULTS = window.location.origin + '/learn/?page_id=81';
        cons.URL.SEARCH_MANAGEMENT = window.location.origin + '/learn/?page_id=86';
    } else {
        cons.URL.SEARCH = window.location.origin + '/poisk';
        cons.URL.SEARCH_RESULTS = window.location.origin + '/results';
        cons.URL.SEARCH_MANAGEMENT = window.location.origin + '/panel';
    }

    jQuery("document").ready(function () {
        let currentURL = window.location.href;
        sys.log('Адрес загружаемой страницы: ' + currentURL);
        sys.log('cons.URL.SEARCH: ' + cons.URL.SEARCH);
        sys.log('cons.URL.SEARCH_RESULTS: ' + cons.URL.SEARCH_RESULTS);
        sys.log('cons.URL.SEARCH_MANAGEMENT: ' + cons.URL.SEARCH_MANAGEMENT);
        if (currentURL.indexOf(cons.URL.SEARCH_MANAGEMENT) != -1) {
            sys.log('Текущая страница: cons.URL.SEARCH_MANAGEMENT');
            country.all(cons.TYP_EL.TABLE);
            country.all(cons.TYP_EL.DROPDOWN_NEW);
            language.all(cons.TYP_EL.TABLE);
            program.all(cons.TYP_EL.TABLE);
            specialty.all(cons.TYP_EL.TABLE);
            loc.all(cons.TYP_EL.TABLE);
            loc.all(cons.TYP_EL.DROPDOWN_NEW);
            univ.all(cons.TYP_EL.TABLE);
            univ.geTypes(cons.TYP_EL.DROPDOWN_NEW);
        }
        if (currentURL.indexOf(cons.URL.SEARCH) != -1) {
            sys.log('Текущая страница: cons.URL.SEARCH');
            sys.initLocalStorage();
            if (jQuery(window).width() < 500) {
                sys.log('Изменение цвета названий полей..');
                let color = 'white';
                jQuery("#dropdown_title_country").css("color", color);
                jQuery("#dropdown_title_program").css("color", color);
                jQuery("#dropdown_title_specialty").css("color", color);
                jQuery("#dropdown_title_language").css("color", color);
            }
            ui.clearAllDropdowns();
            ui.fillAllDropdowns();
        }
        if (currentURL.indexOf(cons.URL.SEARCH_RESULTS) != -1) {
            sys.log('Текущая страница: cons.URL.SEARCH_RESULTS');
            ui.clearAllDropdowns();
            ui.fillAllDropdowns();
            ui.changeTitlesStyle();
            search.printResults();
            search.printPaginator(search);
        }
    });
    
}

onLoad();

// on clicks ------------------------>>>
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
    if (currentURL == cons.URL.SEARCH_RESULTS) {
        search.printWait();
        ui.setDropdownState('country', ui.getDropdownState('country'));
        ui.setDropdownState('program', ui.getDropdownState('program'));
        ui.setDropdownState('specialty', ui.getDropdownState('specialty'));
        ui.setDropdownState('language', ui.getDropdownState('language'));
        search.printResults();
    } else {
        window.location = cons.URL.SEARCH_RESULTS;
    }
}

function on_click_prg_edit(id)    {
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

function on_click_univ_new()    {

}

function on_click_univ_update() {

}

function on_click_univ_new_add_prg()    {

}

// on clicks <<<------------------------

// <<<<-------------------------------Zhass------------------------------------
