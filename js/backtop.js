(function(){
    var BackTop = function(el,ops){
    	this.ops = $.extend({}, BackTop.DEFAULTS, ops);
		this.$el = $(el);
		this.$body = $('html,body');
		this._checkPosition();
		if(this.ops.mode === "move"){
			this.$el.on('click',$.proxy(this._move,this));
		}else{
			this.$el.on('click',$.proxy(this._go,this));
		}
		$(window).on('scroll',$.proxy(this._checkPosition,this));
    }
    

	
	BackTop.DEFAULTS = {
		mode: "move",
		pos: $(window).height(),
		dest: 0,
		speed: 600
	};
  BackTop.prototype._move = function(){
	  var ops = this.ops,
		    dest = ops.dest;
		if($(window).scrollTop != dest){
			if(!this.$body.is(':animated')){
				this.$body.animate({
			       scrollTop: dest
		        },ops.speed);
			}
		}
	};
	BackTop.prototype._go = function(){
		var dest = this.ops.dest;
		if($(window).scrollTop != dest){
			this.$body.scrollTop(dest);
		}
		
	};
	BackTop.prototype._checkPosition = function(){
   	var $el = this.$el;
   	// 局部变量的速度是快于通过点来访问的
   	if($(window).scrollTop() > this.ops.pos){
   		$el.fadeIn();
   	} else {
   		$el.fadeOut();
   	}
   };
    
	window['BackTop'] = BackTop;
})(jQuery)