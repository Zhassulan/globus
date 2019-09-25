<script>

// Zhass JS for search ---->>>
var programsOptsFr = {
    program_mag: 'Магистр',
    program_doc: 'Докторантура'
};

var programsOptsDef = {
    program_mag: 'Магистр',
    program_bak: 'Бакалавр',
    program_asp: 'Аспирантура',
    program_doc: 'Докторантура'
};

function addProgDef() {
  jQuery("#program").children().remove();
  jQuery.each(programsOptsDef , function(key, val) {
     jQuery("#program").append(jQuery("<option></option>")
         .attr("value", key)
         .text(val));
  });
}

function addProgFr() {
  jQuery("#program").children().remove();
  jQuery.each(programsOptsFr, function(key, val) {
     jQuery("#program").append(jQuery("<option></option>")
         .attr("value", key)
         .text(val));
  });
}

addProgDef();

jQuery("#country").on('change', function() {
    var selectedCountry = jQuery("#country").val();
    console.log(selectedCountry );
    if (selectedCountry == 'country_fr') {
       console.log('Loading program values for France..'); 
       addProgFr();
    }

});

jQuery("#program").on('change', function() {
    console.log('changed'); 
});

 function on_clk() {  
    var program = jQuery("#program").val();
    console.log(program);
    //window.location = 'index.php';
    printSearchResults();
  }

function printSearchResults() {
  jQuery("#results").html('<p>No results</p>');
}

// <<<--------------Zhass JS for search

</script>