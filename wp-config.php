<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'wp');

/** Имя пользователя MySQL */
define('DB_USER', 'wp_user');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', '12345678');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8mb4');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'MG#s ZI<pPx[*wntKuo0t2su!8IzqS NHOTKU[]HeX84`}q9Zo-c/v/[K#,JWC.n');
define('SECURE_AUTH_KEY',  '3N{;<=$ua,KZ]Au33^8@aK#UERD#d2Psa:dQf=x&PLS`e94e!34&jq@CY2MHy@6`');
define('LOGGED_IN_KEY',    'u Y{dMuaQn#%%Mr0d>|DAIZ;#emK#o5an#SV6IJPZv935:8ki{|#K?P/_jlV<jm@');
define('NONCE_KEY',        'kA2>k~MPu/{N]NGD2R2+K=Mh.J.^,]MA,fDA:ys|HuRr3jQh^|@]mC!OWdfw|rC,');
define('AUTH_SALT',        'k99aK^[;L>l:a~pl .tz(8&?PpX>KHx;NRetCq-yUA!<xC>ld,WN)Ty.ocNgVU,~');
define('SECURE_AUTH_SALT', '30/7kkX`T{>#~sPP7.+)-BIRer%Y;(zC;qMs?T5k/h!i>O~F`R*FzjWTn1g/$i_5');
define('LOGGED_IN_SALT',   '&gn?1^(s1e9[ZR6 `dV3}(_3pb8*dk 7s{~VJIHdPD},sb,;.g~MWDwZrpsWY=Z/');
define('NONCE_SALT',       'E<*-1I):$DWy)v<.YaV)!,U<MLuxA;iZ#3S^}$z:n~y$SqW]aI_Z?;k9=?so.F3&');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 *
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
