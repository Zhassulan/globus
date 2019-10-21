<?php
    require_once get_theme_root().'/betheme/lib.php';
?>
<div class="search_container">
    <!--
    <div>
      <h2 style="color:gray">Большое количество программ обучения во мноих странах — выберите то, что подходит именно вам</h2>
    </div>
-->
  <div>
    <div class="search_panel">

        <div>
          <div class="dropdown_title" id="dropdown_title_country">
            Страна
          </div>
          <div class="dropdown">
            <select name="Страна" id="country">
            </select>
          </div>
        </div>

        <div>
          <div class="dropdown_title" id="dropdown_title_program">
              Программа обучения
          </div>
          <div class="dropdown">
          <select name="Программа обучения" id="program">
          </select>
          </div>
        </div>    

      <div>
        <div class="dropdown_title" id="dropdown_title_specialty">
          Специальность
        </div>
        <div class="dropdown">
          <select name="Специальность" id="specialty">

          </select>
          </div>
      </div>

      <div>
        <div class="dropdown_title" id="dropdown_title_language">
            Язык
        </div>
        <div class="dropdown">
          <select name="Язык" id="language">
          </select>
        </div>
      </div>

      <div>
        <div class="dropdown_title">&nbsp;</div> 
        <div class="btn_search">
          <button type="button" onclick="on_click_search()">Поиск</button>
        </div>
      </div>

    </div>
  </div>

  <div>
    <div id="results_container">

    </div>
  </div>

    <div class="paginator_container">
        <div class="pp">
            <div class="pagination" id="pagination">
            </div>
        </div>
    </div>

</div>