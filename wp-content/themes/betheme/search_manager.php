<?php
require_once get_theme_root() . '/betheme/lib.php';
?>

<div id="data_container">

    <div id="country_table"></div>
    <div class="country-paginator-container">
        <div class="pp">
            <div id="country-pagination-container"></div>
        </div>
    </div>
    <div class="inputs">
        <div>
            <div class="add_edit_field">
                <div>Новая страна</div>
                <div>
                    <input type="text" id="input_country_new" placeholder="Введите название" value="">
                    <input type="hidden" id="input_country_new_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_country_new()">Добавить</button>
                </div>
            </div>
        </div>
        <div>
            <div class="add_edit_field">
                <div>Изменить страну</div>
                <div>
                    <input type="text" id="input_country_edit" value="">
                    <input type="hidden" id="input_country_edit_id" value="">
                    <input type="hidden" id="input_country_edit_old_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_country_update()">Обновить</button>
                </div>
            </div>
        </div>
    </div>

    <hr>

    <div id="lang_table"></div>
    <div class="lang-paginator-container">
        <div class="pp">
            <div id="lang-pagination-container"></div>
        </div>
    </div>
    <div class="inputs">
        <div>
            <div class="add_edit_field">
                <div>Новый язык</div>
                <div>
                    <input type="text" id="input_lang_new" placeholder="Введите название" value="">
                    <input type="hidden" id="input_lang_new_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_lang_new()">Добавить</button>
                </div>
            </div>
        </div>
        <div>
            <div class="add_edit_field">
                <div>Изменить язык</div>
                <div>
                    <input type="text" id="input_lang_edit" value="">
                    <input type="hidden" id="input_lang_edit_id" value="">
                    <input type="hidden" id="input_lang_edit_old_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_lang_update()">Обновить</button>
                </div>
            </div>
        </div>
    </div>

    <hr>

    <div id="prg_table"></div>
    <div class="prg-paginator-container">
        <div class="pp">
            <div id="prg-pagination-container"></div>
        </div>
    </div>
    <div class="inputs">
        <div>
            <div class="add_edit_field">
                <div>Новая программа обучения</div>
                <div>
                    <input type="text" id="input_prg_new" placeholder="Введите название" value="">
                    <input type="hidden" id="input_prg_new_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_prg_new()">Добавить</button>
                </div>
            </div>
        </div>
        <div>
            <div class="add_edit_field">
                <div>Изменить программу обучения</div>
                <div>
                    <input type="text" id="input_prg_edit" value="">
                    <input type="hidden" id="input_prg_edit_id" value="">
                    <input type="hidden" id="input_prg_edit_old_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_prg_update()">Обновить</button>
                </div>
            </div>
        </div>
    </div>

    <hr>

    <div id="spec_table"></div>
    <div class="spec-paginator-container">
        <div class="pp">
            <div id="spec-pagination-container"></div>
        </div>
    </div>
    <div class="inputs">
        <div>
            <div class="add_edit_field">
                <div>Новая специальность</div>
                <div>
                    <input type="text" id="input_spec_new" placeholder="Введите название" value="">
                    <input type="hidden" id="input_spec_new_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_spec_new()">Добавить</button>
                </div>
            </div>
        </div>
        <div>
            <div class="add_edit_field">
                <div>Изменить специальность</div>
                <div>
                    <input type="text" id="input_spec_edit" value="">
                    <input type="hidden" id="input_spec_edit_id" value="">
                    <input type="hidden" id="input_spec_edit_old_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_spec_update()">Обновить</button>
                </div>
            </div>
        </div>
    </div>

    <hr>

    <div id="loc_table"></div>
    <div class="loc-paginator-container">
        <div class="pp">
            <div id="loc-pagination-container"></div>
        </div>
    </div>
    <div class="inputs">
        <div>
            <div class="add_edit_field">
                <div>Новое местоположение</div>
                <div>
                    <input type="text" id="input_loc_new" placeholder="Введите название" value="">
                    <input type="hidden" id="input_loc_new_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_loc_new()">Добавить</button>
                </div>
            </div>
        </div>
        <div>
            <div class="add_edit_field">
                <div>Изменить местоположение</div>
                <div>
                    <input type="text" id="input_loc_edit" value="">
                    <input type="hidden" id="input_loc_edit_id" value="">
                    <input type="hidden" id="input_loc_edit_old_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_loc_update()">Обновить</button>
                </div>
            </div>
        </div>
    </div>

    <hr>

    <div id="typ_table"></div>
    <div class="typ-paginator-container">
        <div class="pp">
            <div id="typ-pagination-container"></div>
        </div>
    </div>
    <div class="inputs">
        <div>
            <div class="add_edit_field">
                <div>Новый тип</div>
                <div>
                    <input type="text" id="input_typ_new" placeholder="Введите название" value="">
                    <input type="hidden" id="input_typ_new_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_typ_new()">Добавить</button>
                </div>
            </div>
        </div>
        <div>
            <div class="add_edit_field">
                <div>Изменить тип</div>
                <div>
                    <input type="text" id="input_typ_edit" value="">
                    <input type="hidden" id="input_typ_edit_id" value="">
                    <input type="hidden" id="input_typ_edit_old_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_typ_update()">Обновить</button>
                </div>
            </div>
        </div>
    </div>

    <hr>

    <div id="univ_table"></div>
    <div class="univ-paginator-container">
        <div class="pp">
            <div id="univ-pagination-container"></div>
        </div>
    </div>
    <div class="inputs">
        <div>
            <div>
                <table>
                    <caption><h4>Новый университет</h4></caption>
                    <tr>
                        <td>Название (англ.)</td>
                        <td>
                            <input type="text" id="inpUnivNewName">
                        </td>
                    </tr>
                    <tr>
                        <td>Страна</td>
                        <td>
                            <select id="dropdownUnivNewCountry" onchange="on_change_univ_new_country()"></select>
                        </td>
                    </tr>
                    <tr>
                        <td>Основан</td>
                        <td><input type="text" id="inpUnivNewFound"></td>
                    </tr>
                    <tr>
                        <td>Тип</td>
                        <td>
                            <select id="dropdownUnivNewType"></select>
                        </td>
                    </tr>
                    <tr>
                        <td>Местоположение</td>
                        <td>
                            <select id="dropdownUnivNewLoc"></select>
                        </td>
                    </tr>
                    <tr>
                        <td>Ссылка страницы</td>
                        <td><input type="text" id="inpUnivNewUrl"></td>
                    </tr>
                    <tr>
                        <td>Ссылка фото</td>
                        <td><input type="text" id="inpUnivNewUrlPhoto"></td>
                    </tr>
                    <tr>
                        <td>Программы обучения</td>
                        <td>
                            <div class="inputs">
                                <div>
                                    <select id="dropdownUnivNewPrg"></select>
                                </div>
                                <div>
                                    <button onclick="on_click_univ_new_add_prg()">Добавить</button>
                                </div>
                            </div>
                            Список:
                            <div id="list_univ_new_prgs">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Специальности</td>
                        <td>
                            <div class="inputs">
                                <div>
                                    <select id="dropdownUnivNewSpec"></select>
                                </div>
                                <div>
                                    <button onclick="on_click_univ_new_add_spec()">Добавить</button>
                                </div>
                            </div>
                            Список:
                            <div id="list_univ_new_specs">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Языки обучения</td>
                        <td>
                            <div class="inputs">
                                <div>
                                    <select id="dropdownUnivNewLang"></select>
                                </div>
                                <div>
                                    <button onclick="on_click_univ_new_add_lang()">Добавить</button>
                                </div>
                            </div>
                            Список:
                            <div id="list_univ_new_langs">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div>
                <button type="button" onclick="on_click_univ_add()">Добавить университет</button>
            </div>

        </div>

        <div>

            <div>
                <table>
                    <caption><h4>Изменить университет</h4></caption>
                    <tr>
                        <td>Название (англ.)</td>
                        <td><input type="text" id="inpUnivName"></td>
                    </tr>
                    <tr>
                        <td>Страна</td>
                        <td><select id="dropdownUnivCountry" onchange="on_change_univ_country()"></select></td>
                    </tr>
                    <tr>
                        <td>Основан</td>
                        <td><input type="text" id="inpUnivFound"></td>
                    </tr>
                    <tr>
                        <td>Тип</td>
                        <td><select id="dropdownUnivType"></select></td>
                    </tr>
                    <tr>
                        <td>Местоположение</td>
                        <td><select id="dropdownUnivLoc"></select></td>
                    </tr>
                    <tr>
                        <td>Ссылка страницы</td>
                        <td><input type="text" id="inpUnivUrl"></td>
                    </tr>
                    <tr>
                        <td>Ссылка фото</td>
                        <td><input type="text" id="inpUnivUrlPhoto"></td>
                    </tr>
                    <tr>
                        <td>Программы обучения</td>
                        <td>
                            <div class="inputs">
                                <div>
                                    <select id="dropdownUnivPrg"></select>
                                </div>
                                <div>
                                    <button onclick="on_click_univ_add_prg()">Добавить</button>
                                </div>
                            </div>
                            Список:
                            <div id="list_univ_prgs">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Специальности</td>
                        <td>
                            <div class="inputs">
                                <div>
                                    <select id="dropdownUnivSpec"></select>
                                </div>
                                <div>
                                    <button onclick="on_click_univ_add_spec()">Добавить</button>
                                </div>
                            </div>
                            Список:
                            <div id="list_univ_specs">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Языки обучения</td>
                        <td>
                            <div class="inputs">
                                <div>
                                    <select id="dropdownUnivLang"></select>
                                </div>
                                <div>
                                    <button onclick="on_click_univ_add_lang()">Добавить</button>
                                </div>
                            </div>
                            Список:
                            <div id="list_univ_langs">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div>
                <button type="button" onclick="on_click_univ_update()">Обновить университет</button>
            </div>

        </div>
    </div>

</div>