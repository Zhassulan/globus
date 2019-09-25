<?php
/**
 * The template for displaying the footer.
 *
 * @package Betheme
 * @author Muffin group
 * @link http://muffingroup.com
 */


$back_to_top_class = mfn_opts_get('back-top-top');

if( $back_to_top_class == 'hide' ){
	$back_to_top_position = false;
} elseif( strpos( $back_to_top_class, 'sticky' ) !== false ){
	$back_to_top_position = 'body';
} elseif( mfn_opts_get('footer-hide') == 1 ){
	$back_to_top_position = 'footer';
} else {
	$back_to_top_position = 'copyright';
}

?>

<?php do_action( 'mfn_hook_content_after' ); ?>

<!-- #Footer -->		
<footer id="Footer" class="clearfix">
	
	<?php if ( $footer_call_to_action = mfn_opts_get('footer-call-to-action') ): ?>
	<div class="footer_action">
		<div class="container">
			<div class="column one column_column">
				<?php echo do_shortcode( $footer_call_to_action ); ?>
			</div>
		</div>
	</div>
	<?php endif; ?>
	
	<?php 
		$sidebars_count = 0;
		for( $i = 1; $i <= 5; $i++ ){
			if ( is_active_sidebar( 'footer-area-'. $i ) ) $sidebars_count++;
		}
		
		if( $sidebars_count > 0 ){
			
			$footer_style = '';
				
			if( mfn_opts_get( 'footer-padding' ) ){
				$footer_style .= 'padding:'. mfn_opts_get( 'footer-padding' ) .';';
			}
			
			echo '<div class="widgets_wrapper" style="'. $footer_style .'">';
				echo '<div class="container">';
						
					if( $footer_layout = mfn_opts_get( 'footer-layout' ) ){
						// Theme Options

						$footer_layout 	= explode( ';', $footer_layout );
						$footer_cols 	= $footer_layout[0];
		
						for( $i = 1; $i <= $footer_cols; $i++ ){
							if ( is_active_sidebar( 'footer-area-'. $i ) ){
								echo '<div class="column '. $footer_layout[$i] .'">';
									dynamic_sidebar( 'footer-area-'. $i );
								echo '</div>';
							}
						}						
						
					} else {
						// Default - Equal Width
						
						$sidebar_class = '';
						switch( $sidebars_count ){
							case 2: $sidebar_class = 'one-second'; break;
							case 3: $sidebar_class = 'one-third'; break;
							case 4: $sidebar_class = 'one-fourth'; break;
							case 5: $sidebar_class = 'one-fifth'; break;
							default: $sidebar_class = 'one';
						}
						
						for( $i = 1; $i <= 5; $i++ ){
							if ( is_active_sidebar( 'footer-area-'. $i ) ){
								echo '<div class="column '. $sidebar_class .'">';
									dynamic_sidebar( 'footer-area-'. $i );
								echo '</div>';
							}
						}
						
					}
				
				echo '</div>';
			echo '</div>';
		}
	?>


	<?php if( mfn_opts_get('footer-hide') != 1 ): ?>
	
		<div class="footer_copy">
			<div class="container">
				<div class="column one">

					<?php 
						if( $back_to_top_position == 'copyright' ){
							echo '<a id="back_to_top" class="button button_js" href=""><i class="icon-up-open-big"></i></a>';
						}
					?>
					
					<!-- Copyrights -->
					<div class="copyright">
						<?php 
							if( mfn_opts_get('footer-copy') ){
								echo do_shortcode( mfn_opts_get('footer-copy') );
							} else {
								echo '&copy; '. date( 'Y' ) .' '. get_bloginfo( 'name' ) .'. All Rights Reserved. <a target="_blank" rel="nofollow" href="http://muffingroup.com">Muffin group</a>';
							}
						?>
					</div>
					
					<?php 
						if( has_nav_menu( 'social-menu-bottom' ) ){
							mfn_wp_social_menu_bottom();
						} else {
							get_template_part( 'includes/include', 'social' );
						}
					?>
							
				</div>
			</div>
		</div>
	
	<?php endif; ?>
	
	
	<?php 
		if( $back_to_top_position == 'footer' ){
			echo '<a id="back_to_top" class="button button_js in_footer" href=""><i class="icon-up-open-big"></i></a>';
		}
	?>

	
</footer>

</div><!-- #Wrapper -->

<?php 
	// Responsive | Side Slide
	if( mfn_opts_get( 'responsive-mobile-menu' ) ){
		get_template_part( 'includes/header', 'side-slide' );
	}
?>

<?php
	if( $back_to_top_position == 'body' ){
		echo '<a id="back_to_top" class="button button_js '. $back_to_top_class .'" href=""><i class="icon-up-open-big"></i></a>';
	}
?>

<?php if( mfn_opts_get('popup-contact-form') ): ?>
	<div id="popup_contact">
		<a class="button button_js" href="#"><i class="<?php mfn_opts_show( 'popup-contact-form-icon', 'icon-mail-line' ); ?>"></i></a>
		<div class="popup_contact_wrapper">
			<?php echo do_shortcode( mfn_opts_get('popup-contact-form') ); ?>
			<span class="arrow"></span>
		</div>
	</div>
<?php endif; ?>

<?php do_action( 'mfn_hook_bottom' ); ?>
	
<!-- wp_footer() -->
<?php wp_footer(); ?>
<?php

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
WHERE name =  'your-date'
OR name =  'your-time'");
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
{$mass[$q]=$posts[$y-1]->value;
$mass1[$q]=$posts[$y  ]->value;
$q++;
$y++;}
/*
var_dump($mass); echo '<br>';
var_dump($mass1); echo '<br>';
array_multisort($mass,$mass1);
var_dump($mass); echo '<br>';
var_dump($mass1); echo '<br>';

$c=0;
$val = '2017-12-21';
for ($i=0; $i <= count($mass) ; $i++) { 
  if ($val == $mass[$i]) {
    echo $mass[$i] . ' ' . $i .  '<br>';
    $mass3[$c]=$mass1[$i];
    $c++;
  }
  //else {echo  ' ' . $mass1[$i] . '<br>';}
}
var_dump($mass3);


/*
$m3=1;
$m4=1;
$mass3[0]=$m3;
$mass4[0]=$m4;
for ($x=0; $x++<count($mass);)
{
		if ($mass[$x] == $mass[$x+1]) {$mass3[$x]}
	
}*/
/*
array_multisort($mass[][0]);
for ($y=0; $y++<count($posts);) 
{echo $mass[$y-1][0]. ' ' ; echo $mass[$y-1][1] . '<br>';}
*/
?> 
<style type="text/css">
.wpcf7-form-control-wrap .countries {color:#ff00ffl;}
</style>

<script type="text/javascript">
/*
function getXmlHttp() {
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  }
  function changeCountry(id) {
    var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
    xmlhttp.open('POST', 'cities.php', true); // Открываем асинхронное соединение
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Отправляем кодировку
    xmlhttp.send("id=" + encodeURIComponent(id)); // Отправляем POST-запрос
    xmlhttp.onreadystatechange = function() { // Ждём ответа от сервера
      if (xmlhttp.readyState == 4) { // Ответ пришёл
        if(xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)
          var cities = JSON.parse(xmlhttp.responseText); // Преобразуем JSON-строку в массив
          var text = "<option value=''>1Выберите Университет</option>"; // Начинаем создавать элементы в select
          for (var i in cities) {
            
            text += "<option value='" + cities[i] + "'>" + cities[i] + "</option>";
          }
          document.myform.cities.innerHTML = text; // Устанавливаем options в select
        }
      }
    };
  }
*/
  

    

  

</script>
<!--
<div id="status1">
</div>
                <form action="get_ajax.php">
                <p><b>Поле ввода 1</b></p>
                <p><textarea id="area_1" name="area_1" style="height:50px; width:500px;">Введите свой текст. Например: Я люблю sitear.ru!</textarea></p>
                <p><b>Поле ввода 2</b></p>
                <p><textarea id="area_2" name="area_1" style="height:100px; width:500px;">Произвольный текст... Я тащусь от этой статьи, и хочу подписаться на RSS, что-бы читать такие статьи почаще!!!</textarea></p>
                <input type='button' value='TEST AJAX' onclick='
                               ajax({
                                                               url:"get_ajax.php",
                                                               statbox:"status",
                                                               method:"POST",
                                                               data:
                                                               {
                                                                              first_area:document.getElementById("area_1").value,
                                                                              second_area:document.getElementById("area_2").value
                                                              },
                                                               success:function(data){document.getElementById("status").innerHTML=data;}
                                               })'
                >
                </form>
-->

<!--
                <select id="category" size="1">
                                        <option value="0">Выберите страну</option>
                    <option value="1">Страна1</option>
                    <option value="2">Страна2</option>
                </select>
                <br>
                <select id="sub-category" size="1">
                    <option value="0">Университет</option>
                </select>
            
        
        <script type="text/javascript">
        $("#category").change(function(){
            $("#sub-category").load("./handler.php", { id: $("#category option:selected").val() });
        });
        </script>
-->


<!-- 
  <p>
    #2 - Custom open/close animation
  </p>
  <p>
    <a data-fancybox data-options='{ "touch": false, "smallBtn" : true}' data-animation-duration="700" data-src="#animatedModal" href="javascript:;" class="btn">Open demo</a>
  </p>

  
    <?php /*echo do_shortcode( '[contact-form-7 id="5" title="Контактная форма 1"]' );*/ ?>
  

JS -->
<!-- myfunc -->

<!-- JS -->

<!-- BEGIN JIVOSITE CODE {literal} -->
<script type='text/javascript'>
(function(){ var widget_id = 'nFCqmv4XPj';var d=document;var w=window;function l(){
var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = '//code.jivosite.com/script/widget/'+widget_id; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);}if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();</script>
<!-- {/literal} END JIVOSITE CODE -->

</body>
</html>