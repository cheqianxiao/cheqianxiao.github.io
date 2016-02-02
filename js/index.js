
  $(document).ready(function(){
    // 导航条
  	$(window).scroll(
  		function(){
  			if($(window).scrollTop() > 200) 
  		    $('nav').hide();
  	      else{ $('nav').show();
        }
    })
    //音乐播放
    var au = document.getElementById('player');

     
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

    // 小象喷水
    var elephant = $("#elephant-backtop");
    var springs = elephant.children();

    elephant.hover(
      function(){
        springs[0].style.display = "block";
        springs[0].classList.add("spring-left");
        springs[1].style.display = "block";
        springs[1].classList.add("spring-right");
      },
      function(){
        springs[0].style.display = "none";
        springs[0].classList.remove("spring-left");
        springs[1].style.display = "none";
        springs[1].classList.remove("spring-right");
      });

    //返回顶部
    $(function(){
       var backtop = new BackTop($('#elephant-backtop'),{ pos: 1000});
    });
  	
})




 



