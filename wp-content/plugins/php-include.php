<?php
/*
Plugin Name: Search panel
Plugin URI: https://globusedu.kz/
Description: Поиск университетов
Version: 1.0
Author: Globus Education
Author URI: https://globusedu.kz/
License: Private
*/

// include PHP file
function PHP_Include($params = array()) {

	extract(shortcode_atts(array(
	    'file' => 'search_programs'
	), $params));
	
	ob_start();
	include(get_theme_root() . '/' . get_template() . "/$file.php");
	return ob_get_clean();
}

