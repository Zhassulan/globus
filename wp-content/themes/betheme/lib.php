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

function getLocationsByCountry($id)    {
    $arr[] = new Reference(0, 'Не выбрано');
    $conn = getConnection();
    if ($res = $conn->query ( 'select l.id, l.name_ru from location l 
        left join university u on u.location_id = l.id 
        where 
          u.country_id =  '.$id.' group by l.id order by name_ru asc;'))   {
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
    $sql = 'CALL add_univ(\''.$univ->name.'\', '.$univ->country.', \''.$univ->found.'\', '.$univ->type.', '.$univ->location.', \''.$univ->url.'\', \''.$univ->url_pic.'\')';
    $id = 0;
    if ($res = $conn->query($sql)) {
        while ($row = $res->fetch_assoc()) {
            $id = $row['id'];
        }
        while ($conn->next_result()) $conn->store_result();
        $res->close();
    }   else    {
        $val = new Result('500', $conn->error);
        return json_encode($val, JSON_UNESCAPED_UNICODE);
    }
    $sql = '';
    foreach ($univ->languages as $val) {
        $sql .= 'insert into university_languages (university_id, language_id) values ('.$id.', '.$val.');';
    }
    foreach ($univ->programs as $val) {
        $sql .= 'insert into university_programs (university_id, program_id) values ('.$id.', '.$val.');';
    }
    foreach ($univ->specialities as $val) {
        $sql .= 'insert into university_specialities (university_id, specialty_id) values ('.$id.', '.$val.');';
    }
    if ($conn->multi_query($sql) === TRUE) {
        $val = new Result('200', 'Университет и связки успешно добавлены.');
    } else {
        $val = new Result('500', $conn->error);
        return json_encode($val, JSON_UNESCAPED_UNICODE);
    }
    mysqli_close($conn);
    return json_encode($val, JSON_UNESCAPED_UNICODE);
}

function log1($msg)  {
    file_put_contents('D:\dev\Bitnami\wampstack-7.1.26-0\apps\learn\htdocs\php_errors_my.log', $msg.PHP_EOL, FILE_APPEND);
    //file_put_contents('D:\dev\Bitnami\wampstack-7.1.26-0\apps\learn\htdocs\php_errors.log', $msg);
}

function getProgramsByUniversity($id)   {
    $conn = getConnection();
    if ($res = $conn->query ( 'select p.id, trim(p.name_ru) from university_programs up
        inner join program p on p.id = up.program_id
        where
          up.university_id = '.$id.'
        order by trim(p.name_ru) asc;'))   {
        while($row = $res->fetch_row()) {
            $arr[] = new Reference($row[0], $row[1]);
        }
        $res->close();
    }
    mysqli_close($conn);
    return json_encode($arr, JSON_UNESCAPED_UNICODE);
}

function getSpecialitiesByUniversity($id)   {
    $conn = getConnection();
    if ($res = $conn->query ( 'select s.id, trim(s.name_ru) from university_specialities us
          inner join specialty s on s.id = us.specialty_id
        where
          us.university_id = '.$id.'
        order by trim(s.name_ru) asc;'))   {
        while($row = $res->fetch_row()) {
            $arr[] = new Reference($row[0], $row[1]);
        }
        $res->close();
    }
    mysqli_close($conn);
    return json_encode($arr, JSON_UNESCAPED_UNICODE);
}

function getLanguagesByUniversity($id)  {
    $conn = getConnection();
    if ($res = $conn->query ( 'select l.id, trim(l.name_ru) from university_languages ul
          inner join language l on l.id = ul.language_id
        where
          ul.university_id = '.$id.'
        order by trim(l.name_ru) asc;'))   {
        while($row = $res->fetch_row()) {
            $arr[] = new Reference($row[0], $row[1]);
        }
        $res->close();
    }
    mysqli_close($conn);
    return json_encode($arr, JSON_UNESCAPED_UNICODE);
}

function updateUniv($univ)  {
    $conn = getConnection();
    $val = null;
    $univ = json_decode(stripslashes($univ));
    $sql = 'CALL update_univ('.$univ->id.', \''.$univ->name.'\', '.$univ->country.', \''.$univ->found.'\', '.$univ->type.', '.$univ->location.', \''.$univ->url.'\', \''.$univ->url_pic.'\')';
    if (!$conn->query($sql)) {
        $val = new Result('500', $conn->error);
        return json_encode($val, JSON_UNESCAPED_UNICODE);
    }
    $sql = 'delete from university_languages where university_id = '.$univ->id.';';
    foreach ($univ->languages as $val) {
        $sql .= 'insert into university_languages (university_id, language_id) values ('.$univ->id.', '.$val.');';
    }
    $sql .= 'delete from university_programs where university_id = '.$univ->id.';';
    foreach ($univ->programs as $val) {
        $sql .= 'insert into university_programs (university_id, program_id) values ('.$univ->id.', '.$val.');';
    }
    $sql .= 'delete from university_specialities where university_id = '.$univ->id.';';
    foreach ($univ->specialities as $val) {
        $sql .= 'insert into university_specialities (university_id, specialty_id) values ('.$univ->id.', '.$val.');';
    }
    log1($sql);
    if ($conn->multi_query($sql)) {
        $val = new Result('200', 'Университет и связки успешно обновлены.');
    } else {
        $val = new Result('500', $conn->error);
    }
    mysqli_close($conn);
    return json_encode($val, JSON_UNESCAPED_UNICODE);
}

?>