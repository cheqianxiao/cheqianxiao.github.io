
  $(document).ready(function(){
  	$(window).scroll(
  		function(){
  			if($(window).scrollTop() > 200) 
  		    $('nav').hide();
  	      else{ $('nav').show();
        }
    })

    var au=document.getElementById('player');

     
    $('.fa-play').on('click',function(){ 
        
      $('.roll').css('animation-play-state','running');
      $('.fa-pause').show();
      $('.fa-play').hide();

      au.play();
    })
    $('.fa-pause').on('click',function(){
        
      $('.roll').css('animation-play-state','paused');
      $('.fa-play').show();
      $('.fa-pause').hide();
      au.pause();
    })
     
  	
  })




 



