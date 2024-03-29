<?php
/**
 * Theme Functions
 *
 * @package Betheme
 * @author Muffin group
 * @link http://muffingroup.com
 */


define( 'THEME_DIR', get_template_directory() );
define( 'THEME_URI', get_template_directory_uri() );

define( 'THEME_NAME', 'betheme' );
define( 'THEME_VERSION', '20.7.6.1' );

define( 'LIBS_DIR', THEME_DIR. '/functions' );
define( 'LIBS_URI', THEME_URI. '/functions' );
define( 'LANG_DIR', THEME_DIR. '/languages' );

add_filter( 'widget_text', 'do_shortcode' );

add_filter( 'the_excerpt', 'shortcode_unautop' );
add_filter( 'the_excerpt', 'do_shortcode' );


/* ----------------------------------------------------------------------------
 * White Label
 * IMPORTANT: We recommend the use of Child Theme to change this
 * ---------------------------------------------------------------------------- */
defined( 'WHITE_LABEL' ) or define( 'WHITE_LABEL', false );


/* ----------------------------------------------------------------------------
 * Loads Theme Textdomain
 * ---------------------------------------------------------------------------- */
load_theme_textdomain( 'betheme',  LANG_DIR );	// frontend
load_theme_textdomain( 'mfn-opts', LANG_DIR );	// backend


/* ----------------------------------------------------------------------------
 * Loads the Options Panel
 * ---------------------------------------------------------------------------- */
if( ! function_exists( 'mfn_admin_scripts' ) )
{
	function mfn_admin_scripts() {
		wp_enqueue_script( 'jquery-ui-sortable' );
	}
}
add_action( 'wp_enqueue_scripts', 'mfn_admin_scripts' );
add_action( 'admin_enqueue_scripts', 'mfn_admin_scripts' );

require( THEME_DIR .'/muffin-options/theme-options.php' );


/* ----------------------------------------------------------------------------
 * Loads Theme Functions
 * ---------------------------------------------------------------------------- */

$theme_disable = mfn_opts_get( 'theme-disable' );

// Functions ------------------------------------------------------------------
require_once( LIBS_DIR .'/theme-functions.php' );

// Header ---------------------------------------------------------------------
require_once( LIBS_DIR .'/theme-head.php' );

// Menu -----------------------------------------------------------------------
require_once( LIBS_DIR .'/theme-menu.php' );
if( ! isset( $theme_disable['mega-menu'] ) ){
	require_once( LIBS_DIR .'/theme-mega-menu.php' );
}

// Muffin Builder -------------------------------------------------------------
require_once( LIBS_DIR .'/builder/fields.php' );
require_once( LIBS_DIR .'/builder/back.php' );
require_once( LIBS_DIR .'/builder/front.php' );

// Custom post types ----------------------------------------------------------
$post_types_disable = mfn_opts_get( 'post-type-disable' );

if( ! isset( $post_types_disable['client'] ) ){
	require_once( LIBS_DIR .'/meta-client.php' );
}
if( ! isset( $post_types_disable['offer'] ) ){
	require_once( LIBS_DIR .'/meta-offer.php' );
}
if( ! isset( $post_types_disable['portfolio'] ) ){
	require_once( LIBS_DIR .'/meta-portfolio.php' );
}
if( ! isset( $post_types_disable['slide'] ) ){
	require_once( LIBS_DIR .'/meta-slide.php' );
}
if( ! isset( $post_types_disable['testimonial'] ) ){
	require_once( LIBS_DIR .'/meta-testimonial.php' );
}

if( ! isset( $post_types_disable['layout'] ) ){
	require_once( LIBS_DIR .'/meta-layout.php' );
}
if( ! isset( $post_types_disable['template'] ) ){
	require_once( LIBS_DIR .'/meta-template.php' );
}

require_once( LIBS_DIR .'/meta-page.php' );
require_once( LIBS_DIR .'/meta-post.php' );

// Content --------------------------------------------------------------------
require_once( THEME_DIR .'/includes/content-post.php' );
require_once( THEME_DIR .'/includes/content-portfolio.php' );

// Shortcodes -----------------------------------------------------------------
require_once( LIBS_DIR .'/theme-shortcodes.php' );

// Hooks ----------------------------------------------------------------------
require_once( LIBS_DIR .'/theme-hooks.php' );

// Widgets --------------------------------------------------------------------
require_once( LIBS_DIR .'/widget-functions.php' );

require_once( LIBS_DIR .'/widget-flickr.php' );
require_once( LIBS_DIR .'/widget-login.php' );
require_once( LIBS_DIR .'/widget-menu.php' );
require_once( LIBS_DIR .'/widget-recent-comments.php' );
require_once( LIBS_DIR .'/widget-recent-posts.php' );
require_once( LIBS_DIR .'/widget-tag-cloud.php' );

// TinyMCE --------------------------------------------------------------------
require_once( LIBS_DIR .'/tinymce/tinymce.php' );

// Plugins --------------------------------------------------------------------
require_once( LIBS_DIR .'/class-love.php' );
require_once( LIBS_DIR .'/plugins/visual-composer.php' );

// WooCommerce specified functions
if( function_exists( 'is_woocommerce' ) ){
	require_once( LIBS_DIR .'/theme-woocommerce.php' );
}

// Disable responsive images in WP 4.4+ if Retina.js enabled
if( mfn_opts_get( 'retina-js' ) ){
	add_filter( 'wp_calculate_image_srcset', '__return_false' );
}

// Hide activation and update specific parts ----------------------------------

// Slider Revolution
if( ! mfn_opts_get( 'plugin-rev' ) ){
	if( function_exists( 'set_revslider_as_theme' ) ){
		set_revslider_as_theme();
	}
}

// LayerSlider
if( ! mfn_opts_get( 'plugin-layer' ) ){
	add_action( 'layerslider_ready', 'mfn_layerslider_overrides' );
	function mfn_layerslider_overrides() {
		// Disable auto-updates
		$GLOBALS['lsAutoUpdateBox'] = false;
	}
}

// Visual Composer
if( ! mfn_opts_get( 'plugin-visual' ) ){
	add_action( 'vc_before_init', 'mfn_vcSetAsTheme' );
	function mfn_vcSetAsTheme() {
		vc_set_as_theme();
	}
}

// Dashboard ------------------------------------------------------------------
if( is_admin() ){

	require_once LIBS_DIR .'/admin/class-mfn-api.php';
	require_once LIBS_DIR .'/admin/class-mfn-helper.php';
	require_once LIBS_DIR .'/admin/class-mfn-update.php';

	require_once LIBS_DIR .'/admin/class-mfn-dashboard.php';
	$mfn_dashboard = new Mfn_Dashboard();

	if( ! isset( $theme_disable['demo-data'] ) ){
		require_once LIBS_DIR .'/importer/class-mfn-importer.php';
	}

	require_once LIBS_DIR .'/admin/tgm/class-mfn-tgmpa.php';

	if( ! mfn_is_hosted() ){
		require_once LIBS_DIR .'/admin/class-mfn-status.php';
	}

	require_once LIBS_DIR .'/admin/class-mfn-support.php';
	require_once LIBS_DIR .'/admin/class-mfn-changelog.php';
}

// Zhass-------------------------------------------->>>>

function js_variables() {
    $variables = array (
        'ajax_url' => admin_url('admin-ajax.php'),
        'is_mobile' => wp_is_mobile()
        // Тут обычно какие-то другие переменные
    );
    echo '<script type="text/javascript">window.wp_data = '.json_encode($variables).';</script>';
}
add_action('wp_head','js_variables');

add_action( 'wp_enqueue_scripts', 'load_scripts');

function load_scripts(){
    wp_enqueue_script('jquery');
    wp_enqueue_script( 'my-custom-script',get_template_directory_uri().'/js/custom.js', null, '1.0.0', true);
    wp_enqueue_script( 'my-custom-script1',get_template_directory_uri().'/js/pagination.js',null, '1.0.0', true);
}

wp_enqueue_style( 'custom', get_template_directory_uri() . '/css/custom.css');

// register shortcode
add_shortcode('phpinclude', 'PHP_Include');
add_shortcode('search_management', 'search_management');


// Подключаем локализацию в самом конце подключаемых к выводу скриптов, чтобы скрипт
// 'twentyfifteen-script', к которому мы подключаемся, точно был добавлен в очередь на вывод.
// Заметка: код можно вставить в любое место functions.php темы
add_action( 'wp_enqueue_scripts', 'myajax_data', 99 );
function myajax_data(){
    // Первый параметр 'twentyfifteen-script' означает, что код будет прикреплен к скрипту с ID 'twentyfifteen-script'
    // 'twentyfifteen-script' должен быть добавлен в очередь на вывод, иначе WP не поймет куда вставлять код локализации
    // Заметка: обычно этот код нужно добавлять в functions.php в том месте где подключаются скрипты, после указанного скрипта
    wp_localize_script( 'betheme-script', 'myajax',
        array(
            'url' => admin_url('admin-ajax.php')
        )
    );

}

add_action('wp_ajax_my_action', 'my_action');
add_action('wp_ajax_nopriv_my_action', 'my_action');

function my_action() {
    require_once 'lib.php';
    if (isset($_GET['query']))   {
        switch ($_GET['query']) {
            case 'get_countries':
                echo getCountries();
                break;
            case 'get_programs':
                echo getPrograms();
                break;
            case 'get_specialities':
                echo getSpecialties();
                break;
            case 'get_languages':
                echo getLanguages();
                break;
            case 'get_locations':
                echo getLocations();
                break;
            case 'get_universities':
                echo getUniverisities();
                break;
            case 'get_types':
                echo getTypes();
                break;
            case 'search':
                echo search($_GET['country'], $_GET['program'], $_GET['specialty'], $_GET['language']);
                break;
            case 'get_col_by_id':
                echo getColById($_GET['table'], $_GET['id'], $_GET['col']);
                break;
            case 'update_txt_col_by_id':
                echo updateTxtColById($_GET['table'], $_GET['id'], $_GET['col'], $_GET['val']);
                break;
            case 'insertTxt':
                echo insertTxt($_GET['table'], $_GET['col'], $_GET['val']);
                break;
            case 'del':
                echo del($_GET['table'], $_GET['id']);
                break;
            case 'add_univ':
                echo addUniv($_GET['univ']);
                break;
            case 'get_locations_by_country':
                echo getLocationsByCountry($_GET['id']);
                break;
            case 'get_programs_by_university':
                echo getProgramsByUniversity($_GET['id']);
                break;
            case 'get_specialities_by_university':
                echo getSpecialitiesByUniversity($_GET['id']);
                break;
            case 'get_languages_by_university':
                echo getLanguagesByUniversity($_GET['id']);
                break;
            case 'update_univ':
                echo updateUniv($_GET['univ']);
                break;
            case 'del_univ':
                echo delUniv($_GET['id']);
                break;
            case 'check_pwd':
                echo checkPwd($_GET['pwd']);
                break;
        }
    }
    wp_die();
}


