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
                    <button type="button" onclick="on_click_new_country()">Добавить</button>
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
                    <button type="button" onclick="on_click_update_country()">Обновить</button>
                </div>
            </div>
        </div>
    </div>

    <hr>

    <div id="language_table"></div>
    <div class="language-paginator-container">
        <div class="pp">
            <div id="language-pagination-container"></div>
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
                    <button type="button" onclick="on_click_new_lang()">Добавить</button>
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
                    <button type="button" onclick="on_click_update_lang()">Обновить</button>
                </div>
            </div>
        </div>
    </div>

    <hr>

</div>