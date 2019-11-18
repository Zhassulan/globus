<?php
date_default_timezone_set ( "Asia/Almaty" );
global $ds;
require_once get_theme_root().'/betheme/config/config.php';
$ds = $db;

/**
 * Class RefModel модель данных справочника
 */
class Reference {

    public $id;
    public $val;

    function __construct($id, $val) {
        $this->id = $id;
        $this->val = $val;
    }
}

class Result {

    public $res;
    public $msg;

    function __construct($res, $msg) {
        $this->res = $res;
        $this->msg = $msg;
    }
}

/**
 * Class SearchResult модель данных результатов поиска
 */
class SearchResult {

    public $id;
    public $name;
    public $found;
    public $type;
    public $location;
    public $url;
    public $url_pic;
    public $languages;
    public $programs;

    function __construct($id, $name, $found, $type, $location, $url, $url_pic, $languages, $programs) {
        $this->id = $id;
        $this->name = $name;
        $this->found = $found;
        $this->type = $type;
        $this->location = $location;
        $this->url = $url;
        $this->url_pic = $url_pic;
        $this->languages = $languages;
        $this->programs = $programs;
    }

}

function getConnection() {
    global $ds;
    $mysqli = new mysqli ( $ds["server"], $ds["user"], $ds["pwd"], $ds["db"] );
    if (mysqli_connect_errno ())
        die ( 'Connect failed: ' . mysqli_connect_error () );
    return $mysqli;
}

function testConnection()   {
    $conn = getConnection();
    if ($conn->connect_errno) {
        return false;
    }   else    {
        mysqli_close ( $conn );
        return true;
    }
}

function getRefAll($tableName)    {
    $arr[] = new Reference(0, 'Не выбрано');
    $conn = getConnection();
    if ($res = $conn->query ( 'SELECT id, name_ru from '.$tableName.' order by name_ru asc;'))   {
        while($row = $res->fetch_row()) {
            $arr[] = new Reference($row[0], $row[1]);
        }
        $res->close();
    }
    mysqli_close($conn);
    return json_encode($arr, JSON_UNESCAPED_UNICODE);
}

function getUniverisities()    {
    $conn = getConnection();
    if ($res = $conn->query ( 'select u.*, c.name_ru country from university u left join country c on c.id = u.country_id order by c.name_ru , u.name_en;'))   {
        while($obj = $res->fetch_object()) {
            $arr [] = $obj;
        }
        $res->close();
    }
    mysqli_close($conn);
    return json_encode($arr, JSON_UNESCAPED_UNICODE);
}

function getTypes()    {
    $arr[] = new Reference(0, 'Не выбрано');
    $conn = getConnection();
    if ($res = $conn->query ( 'select t.id, t.name_ru val from university_type t order by t.name_ru;'))   {
        while($obj = $res->fetch_object()) {
            $arr [] = $obj;
        }
        $res->close();
    }
    mysqli_close($conn);
    return json_encode($arr, JSON_UNESCAPED_UNICODE);
}

function getCountries()    {
    return getRefAll('country');
}

function getPrograms()    {
    return getRefAll('program');
}

function getSpecialties()    {
    return getRefAll('specialty');
}

function getLocations()    {
    return getRefAll('location');
}

function getLanguages()    {
    return getRefAll('language');
}

function search($countryId, $programId, $specialtyd, $languageId)    {
    $conn = getConnection();
    if ($res = $conn->query('CALL search('.$countryId.', '.$programId.', '.$specialtyd.', '.$languageId.')'))   {
        while($row = $res->fetch_assoc()) {
            $arr[] = new SearchResult($row['id'], $row['name'], $row['found'], $row['type'], $row['location'], $row['url'], $row['url_pic'], $row['languages'], $row['programs']);
        }
        $res->close();
    }
    mysqli_close($conn);
    return json_encode($arr, JSON_UNESCAPED_UNICODE);
}

function getColById($table, $id, $col)   {
    $val = null;
    $conn = getConnection();
    if ($res = $conn->query ( 'SELECT '.$col.' from '.$table.' where id = '.$id))   {
        while($row = $res->fetch_row()) {
            $val = new Reference($id, $row[0]);
        }
        $res->close();
    }
    mysqli_close($conn);
    return json_encode($val, JSON_UNESCAPED_UNICODE);
}

function updateTxtColById($table, $id, $col, $val)   {
    $conn = getConnection();
    $sql = 'UPDATE '.$table.' SET '.$col.'=\''.$val.'\' where id = '.$id;
    $val = null;
    if ($conn->query($sql) === TRUE) {
        $val = new Result('200', 'Запись успешно обновлена.');
    } else {
        $val = new Result('500', 'Query: '.$sql. '. '.$conn->error);
    }
    mysqli_close($conn);
    return json_encode($val, JSON_UNESCAPED_UNICODE);
}

function insertTxt($table, $col, $val)   {
    $conn = getConnection();
    $sql = 'INSERT INTO '.$table.' ('.$col.') values (\''.$val.'\')';
    $val = null;
    if ($conn->query($sql) === TRUE) {
        $val = new Result('200', 'Запись успешно создана.');
    } else {
        $val = new Result('500', 'Query: '.$sql. '. '.$conn->error);
    }
    mysqli_close($conn);
    return json_encode($val, JSON_UNESCAPED_UNICODE);
}

function del($table, $id)   {
    $conn = getConnection();
    $sql = 'DELETE FROM '.$table.' WHERE id = '.$id;
    $val = null;
    if ($conn->query($sql) === TRUE) {
        $val = new Result('200', 'Запись успешно удалена.');
    } else {
        $val = new Result('500', 'Query: '.$sql. '. '.$conn->error);
    }
    mysqli_close($conn);
    return json_encode($val, JSON_UNESCAPED_UNICODE);
}

function addUniv($univ)  {
    $conn = getConnection();
    $val = null;
    $univ = json_decode(stripslashes($univ));
    //log1($univ->country);
    $sql = 'CALL add_univ(\''.$univ->name.'\', '.$univ->country.', '.$univ->found.', '.$univ->type.', '.$univ->location.', \''.$univ->url.'\', \''.$univ->url_pic.'\')';
    log1($sql);
    $id = 0;
    $err = null;
    if ($res = $conn->query($sql)->fetch()) {
        $id = $res['id'];
    }   else    {
        log1($conn->error);
    }
    if ($id != 0) {
        $val = new Result('200', 'Запись успешно удалена. ID'.$id);
    } else {
        $val = new Result('500', 'Query: '.$sql. '. '.$err);
    }
    mysqli_close($conn);
    return json_encode($val, JSON_UNESCAPED_UNICODE);
}

function log1($msg)  {
    file_put_contents('D:\dev\Bitnami\wampstack-7.1.26-0\apps\learn\htdocs\php_errors.log', $msg.PHP_EOL, FILE_APPEND);
}

?>