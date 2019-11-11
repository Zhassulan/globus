<?php
/*
Plugin Name: Search Management Data
Plugin URI: https://globusedu.kz/
Description: Управление данными поиска
Version: 1.0
Author: Globus Education
Author URI: https://globusedu.kz/
License: Private
*/

function search_management($params = array()) {

    extract(shortcode_atts(array(
        'file' => 'search_manager'
    ), $params));

    ob_start();
    include(get_theme_root() . '/' . get_template() . "/$file.php");
    return ob_get_clean();
}