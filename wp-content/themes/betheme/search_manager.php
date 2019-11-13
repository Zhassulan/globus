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

    <div id="univ_table"></div>
    <div class="univ-paginator-container">
        <div class="pp">
            <div id="univ-pagination-container"></div>
        </div>
    </div>
    <div class="inputs">
        <div>
            <div class="add_edit_field">
                <div>Новый университет</div>
                <div>
                    <input type="text" id="input_univ_new" placeholder="Введите название" value="">
                    <input type="hidden" id="input_univ_new_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_univ_new()">Добавить</button>
                </div>
            </div>
        </div>
        <div>
            <div class="add_edit_field">
                <div>Изменить университет</div>
                <div>
                    <input type="text" id="input_univ_edit" value="">
                    <input type="hidden" id="input_univ_edit_id" value="">
                    <input type="hidden" id="input_univ_edit_old_val" value="">
                </div>
                <div>
                    <button type="button" onclick="on_click_univ_update()">Обновить</button>
                </div>
            </div>
        </div>
    </div>

</div>