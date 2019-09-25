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
        return false; //echo "Не удалось подключиться к MySQL: (" . $conn->connect_errno . ") " . $conn->connect_error;
    }   else    {
        mysqli_close ( $conn );
        return true;
    }
}

function getAll($tableName)    {
    $arr[] = new SimpleModel(0, 'Не выбрано');
    $conn = getConnection();
    if ($res = $conn->query ( 'SELECT p.id, p.name_ru from '.$tableName.' p order by p.name_ru asc;'))   {
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

function search($countryId, $programId, $languageId)    {
    $conn = getConnection();
    if ($res = $conn->query('CALL search('.$countryId.', '.$programId.', '.$languageId.')'))   {
        while($row = $res->fetch_assoc()) {
            $arr[] = new SearchResult($row['id'], $row['name'], $row['found'], $row['type'], $row['location'], $row['url'], $row['url_pic'], $row['languages'], $row['programs']);
        }
        $res->close();
    }
    mysqli_close($conn);
    return json_encode($arr, JSON_UNESCAPED_UNICODE);
}

?>