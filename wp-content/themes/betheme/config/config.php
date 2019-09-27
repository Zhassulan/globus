<?php
if ($_SERVER[HTTP_HOST] != 'localhost') {
    $db['db'] = "globused_wordpress_8";
    $db['user'] = "globu_wordpres_6";
    $db['pwd'] =  "kA$3dL67Bo";
    $db['server']= "srv-pleskdb33.ps.kz:3306";
}   else    {
    $db['user'] = "wp_user";
    $db['pwd'] =  "12345678";
    $db['server']= "localhost";
    $db['db'] = "learn";
}
?>
