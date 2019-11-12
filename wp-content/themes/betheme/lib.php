<?php
date_default_timezone_set ( "Asia/Almaty" );
global $ds;
require_once get_theme_root().'/betheme/config/config.php';
$ds = $db;

class SimpleModel {

    public $id;
    public $name;

    function __construct($id, $name) {
        $this->id = $id;
        $this->name = $name;
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
/*
class Country {

    public $id;
    public $name_ru;
    public $name_en;
    public $name_kk;
    public $created;
    public $modified;

    function __construct($id, $name_ru, $name_en, $name_kk, $created, $modified) {
        $this->id = $id;
        $this->name_ru = $name_ru;
        $this->name_en = $name_en;
        $this->name_kk = $name_kk;
        $this->created = $created;
        $this->modified = $modified;
    }

}
*/

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

function getAll($tableName)    {
    $arr[] = new SimpleModel(0, 'Не выбрано');
    $conn = getConnection();
    if ($res = $conn->query ( 'SELECT id, name_ru from '.$tableName.' order by name_ru asc;'))   {
        while($row = $res->fetch_row()) {
            $arr[] = new SimpleModel($row[0], $row[1]);
        }
        $res->close();
    }
    mysqli_close($conn);
    return json_encode($arr, JSON_UNESCAPED_UNICODE);
}

function getAllCountries()    {
    return getAll('country');
}

function getAllPrograms()    {
    return getAll('program');
}

function getAllSpecialties()    {
    return getAll('specialty');
}

function getAllLanguages()    {
    return getAll('language');
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
            $val = new SimpleModel($id, $row[0]);
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

?>