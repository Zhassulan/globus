<?php 
require_once('wp-config.php');
global $wpdb;
header("Content-type: text/plain; charset=utf-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
//sleep(2);
//echo "ajax test<br>";
$i = 0;
while(list ($key, $val) = each ($_POST))
{
                //$val = iconv("UTF-8","CP1251", $_POST[$key]);
                $val = $_POST[$key];
                $mas[$i]  = $_POST[$key];
                //echo /*"<b>".$key.":</b> ".*/"<pre>".$val."</pre>";
                //var_dump($val);
                //break;
                
                if ($i == 1) {
                	break;
                }
                $i++;
}
// 0 Алматы
// 1 Астана
// 2 Атырау
// 3 Актау
if ($mas[0] == 1) {
	$city = 'Алматы';
}
elseif ($mas[0] == 2) {
	$city = 'Астана';
}
elseif ($mas[0] == 3) {
	$city = 'Атырау';
}
elseif ($mas[0] == 4) {
	$city = 'Актау';
}
else {
	$city = $mas[0];
}
echo $city . '<br>'; 
$univer = $mas[1];
//	$datechoose = $val;
//echo $univer . '<br>';

$fulltime = array('13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45','15:00');
$finaltime = $fulltime;
//var_dump( $fulltime);

//echo 'test1' . '<br>';
  /*
   $posts = $wpdb->get_results("SELECT ID, post_title FROM wp_posts WHERE post_status = 'publish'
   AND post_type='post' ORDER BY post_date ASC LIMIT 0,4");

   // Echo the title of the first scheduled post
   echo count($posts);
   echo '<br>';
   echo $posts[0]->post_title;
   */
   $posts = $wpdb->get_results("SELECT id, data_id, name, value 
FROM  `wp_cf7_data_entry` 
WHERE name =  'your-city'
OR name =  'cities'
OR name =  'your-time'
");
   //echo count($posts) . '<br>';
   //echo $posts[3]->data_id . '<br>';
$x=0;
//var_dump($posts);
while ($x++<count($posts)) 
  {
    //echo $posts[$x-1]->data_id . ' ' . $posts[$x-1]->value . '<br>';
  }
$q=0;
for ($y=0; $y++<count($posts);) 
{$mass[$q]=$posts[$y-1]->value; // универ
$mass1[$q]=$posts[$y  ]->value; // город
$mass1_[$q]=$posts[$y +1 ]->value; // время
$q++;
$y+=2;}
//var_dump($mass); echo '<br>'.'<br>';
//var_dump($mass1); echo '<br>'.'<br>';
//sort($mass1_);
//var_dump($mass1_); echo '<br>'.'<br>';
$t=0;
for ($i=0;$i<=count($posts);$i++){
	if (($mass1[$i] == $city) && ($mass[$i] == $univer)){
		$masstime[$t] = $mass1_[$t];
		//echo $masstime[$t] . '<br>';
		$t++;
	}
}
//var_dump($masstime); echo  'masstime <br>';
if ($masstime) {
	sort($masstime);
}

//var_dump($masstime); echo  'masstime <br>';
//array_multisort($mass1,$mass,$mass1_);

//var_dump($mass); echo '<br>'.'<br>';
//var_dump($mass1); echo '<br>'.'<br>';
//var_dump($mass1_); echo '<br>'.'<br>';
//echo '<br>';
/*$c=0;
$val = $datechoose;
for ($i=0; $i <= count($mass) ; $i++) { 
  if ($val == $mass[$i]) {
    //echo $mass[$i] . ' ' . $i .  '<br>';
    $mass3[$c]=$mass1[$i];
    $c++;
  }
  //else {echo  ' ' . $mass1[$i] . '<br>';}
}*/
//var_dump($mass3);
//echo  '<br>';
//var_dump($fulltime);echo  ' fulltime<br>';
//var_dump($finaltime);echo  ' finaltime <br>';
$l=0;
//$finaltime_i = array(0);
for ($i=0; $i <= count($masstime); $i++) { 
	for ($y=0; $y <count($fulltime) ; $y++) { 
		if ($fulltime[$y] == $masstime[$i]) {
			$finaltime[$y]='';
			$finaltime_i[$l]=$y;
			$l++;
			//echo $y .' ';
		}
		else {
			//$finaltime_i[$l]=$y;
			//$l++;
		}
	}
}

//var_dump($finaltime);echo  ' finaltime <br>';
//var_dump($finaltime_i);echo  '<br>';
//echo count($finaltime_i) . ' '. count($fulltime);

if (count($finaltime_i) == count($fulltime) ) {
	echo 'нет доступного времени';
} else {
$msg ='Доступное время:<br>';
echo $msg;
echo '<select name="your-time" >' . '<br>';
for ($i=0; $i <=count($finaltime) ; $i++) { 
	if ($finaltime[$i] != '') {
		echo '<option value="';
		echo $fulltime[$i];
		echo '">';
		echo $fulltime[$i];
		echo '</option>';
	}
}
//<option value="13:00">13:00</option>
echo '</select>';
echo '<br><br>';
}



/*
for ($x=0; $x++<count($mass);)
{
	$mass3[$p]=$mass[$y];
	for ($y=0; $y++<count($mass);)
	{
		if ($mass[$y] == $mass[$y+1]) {$mass3[$x]}
	}
}*/
/*
array_multisort($mass[][0]);
for ($y=0; $y++<count($posts);) 
{echo $mass[$y-1][0]. ' ' ; echo $mass[$y-1][1] . '<br>';}
*/
?>
