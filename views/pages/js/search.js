
//////////////// filtering
$('.filter').change(function(){

  filter_function();
  
  //calling filter function each select box value change
  
});

$('.job_card .card  .card-body ').show(); //intially all rows will be shown

function filter_function(){
  $('.job_card .card  .card-body ').hide(); //hide all rows
  
  var companyFlag = 0;
  var companyValue = $('#filter-company').val();
  
  //setting intial values and flags needed
  
 //traversing each row one by one
  $('.card .card-body').each(function() {  
  
    if(companyValue == 0){   //if no value then display row
    companyFlag = 1;
    }
    else if(companyValue == $(this).find('h5.company').data('company')){ 
      companyFlag = 1;       //if value is same display row
    }
    else{
      companyFlag = 0;
    }
    
    
    
   if(companyFlag ){
     $(this).show();  //displaying row which satisfies all conditions
   }

});   
}
 