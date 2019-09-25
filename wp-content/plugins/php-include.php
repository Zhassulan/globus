<?php
/*
Plugin Name: PHP File Includer
Plugin URI: http://www.sitepoint.com/
Description: Include PHP files using a shortcode
Version: 1.0
Author: Craig Buckler
Author URI: http://optimalworks.net/
License: Use this how you like!
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

