// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/*!
* JavaScript Drumcomputer Library v0.5
* By Stephan Ahlf,  (MIT Licensed)
*/ 
(function($){

			
	var c=0,_drumComputer = { 
		_timer:function(bpm, steps){
			this.bpm = bpm;
			this.step = 0;
			this.steps = steps;
			this.onTick=function(timer){
				if (!this.stopped){
					this.tick();
					jsDrums.timer.play();
					if (this.step<this.steps-1){this.step+=1;} else {
						this.step=0;
					};
				}
			};
			this.tick=function(){
				if (!this.stopped){
					var _timer = (4 /* minutes */ * 60 /* seconds */ * 1000 /* milliseconds*/ / this.bpm) / this.steps;
					window.setTimeout(function(){
						jsDrums.timer.onTick();
					},_timer);
				}
			};
			this.start=function() {
				this.stopped = false;
				this.step=0;
				this.tick();
			};
			this.stop=function(){
				this.stopped=true;
				this.step=0;
			};
			this.play=function(){
				for(var i=0; i<this.sequenz[this.step].samples.length; i++){
					if (this.sequenz[this.step].samples[i]) this.sequenz[this.step].samples[i].play();
				}
			};
			this.sequenz=new Array();
			for(var i=0; i<this.steps; i++){
				this.sequenz.push({
					samples:new Array(),play:function(){
				}});
			} 
			return this	;
		},			
		ui:{
			events:{
				play_sample_click:function (e) {
					$(this).data('sample').play(); 
				},
				toggle_sample_active_click:function(e){
					var _newValue = '';
					if ($(this).html()=='') _newValue='X';
					
					
					var _step = $(this).index()-2;
					var _sampleId = $(this).parent().index();
					var _s = _drumComputer.timer.sequenz;	
					if (!$(this).hasClass('active')) {
						_s[_step].samples[_sampleId]=_drumComputer.samples[_sampleId];
						$(this).addClass('active')
					}else{
						if (_s[_step].samples[_sampleId]){
							_s[_step].samples[_sampleId].stop();	
							_s[_step].samples.remove(_sampleId);  
						}
						$(this).removeClass('active')
					}
				},				
			},
			render:function(samples, timer){
				var _table = $('<table/>',{
					id:'bp_dc',
					border:1
				}); 

				for(var r=0; r<samples.length; r++){
					var _tr = $('<tr/>',{
					});
					$('<td/>').addClass('play').html(samples[r].id).click(function(){
						alert($(this).html()+': So far you cannot change a sample.');}
					).appendTo(_tr);

					var cell = $('<td/>',{ 
						id:'BP_DC_'+r+'_1'
					}).addClass('play').html('&#9658;').appendTo(_tr);
					cell.data('sample', samples[r]).click(this.events.play_sample_click);
  
					
					for(var c=0; c<timer.steps; c++){
						var _className = '';
						var _active = ''; 
						var _sample = timer.sequenz[c].samples[r];
						if (_sample==undefined) _sample=null;
						if (c % (timer.steps/4) == 0) _className ='odd'; 
						if (_sample){
							_active = "active";
						}
						$('<td/>').addClass('step').addClass(_className).addClass(_active).click(this.events.toggle_sample_active_click).appendTo(_tr);
					}
					_tr.appendTo(_table);
				}
				_table.appendTo($('#drumcomputer'));
			} 
		},
		toggleStartStop:function(sender){
			if ($(sender).attr('value')=="Play"){
				this.toggleButtonColor = $(sender).css('background-color');
				$(sender).css({'background-color':'red'});
				this.start();
				$(sender).attr('value','Stop').addClass('active');
			}else{
				$(sender).css({'background-color':this.toggleButtonColor});
				this.stop();
				$(sender).attr('value', 'Play');
				$(sender).css({'background-color':'white'}).removeClass('active');
			}
		},
		start:function(){
			this.timer.start();
		},
		stop:function(){
			this.timer.stop();
		},
		loadSample:function(ident,uri,position, callback){
 			var 
 				self = this, 
 				onloadeddata = function() {
					c++;
			    	if (c===self.settings.samples.length) callback(); 
	      		} 
      

			var _snd = $('<audio/>',{
				id:ident,
				name:ident,
				autostart:false,
				width:0,
				height:0,
				src: uri+'.wav'
			});
			console.log(_snd),
			_snd.appendTo($('#drumcomputer'));		
			_snd.get(0).addEventListener('loadeddata', onloadeddata, false);
			this.samples.push({
				id:ident,
				fn:uri,
				pos:position,
				sound:_snd[0],
				stop:function(){ 			
				    try {
					    this.sound.pause();
					} catch (e) { 
						jsDrums.stop();
						alert(':O( --- Error.');
					} finally {
						
					} 
				},
				play:function(){
					var _ = $('#BP_DC_'+this.pos+'_1');
					
					window.setTimeout(function(){
						_.addClass('active');
						window.setTimeout(function(){_.removeClass('active')},200);
					},1);

				    try {
					    this.sound.pause();
						this.sound.currentTime= 0.0;
					    this.sound.volume=0.5;
						this.sound.play();
					} catch (e) {
						jsDrums.stop();
						alert(':O( --- Error.');
					} finally {
						
					} 					
					
				}
			});
		},
		setBpm:function(bpm){
			this.timer.bpm=bpm;
		},
		getSequenz:function () {
			var _result = new Array; 
			for (var i = 0; i < this.timer.sequenz.length; i++) {
				var 
					_item = this.timer.sequenz[i],
					_set = new Array;

				$(_item.samples).each(function (i,n) {
					if (n) _set.push(n.pos);
				});
				switch(_set.length){
					case 0:
					  	_set = -1;
					  	break;
					case 1:
					  	_set = _set[0];
					  	break;  
				} 
				_result.push(_set);
			};
			console.log(_result);
			console.log( JSON.stringify(_result) );
		},
		load:function(settings){ 
			var pattern = settings.sequenzer[0];
			this.settings = settings;
			this.samples = new Array();
			for (var i = 0; i < settings.samples.length; i++) {
				this.loadSample(settings.samples[i].name,settings.samples[i].filename,i, settings.done);
			};			

			this.timer = new this._timer(settings.bpm, pattern.sequenz.length);

			for (var _step = 0; _step < pattern.sequenz.length; _step++) {
				var n = pattern.sequenz[_step];
				if ($.isArray(n)) {
					debugger;
					// fetch multiple samples
					for (var i = 0; i < n.length; i++) {
						this.timer.sequenz[_step].samples[ n[i] ]=(this.samples[ n[i] ]);
					};
				} else {
					if (n!==-1) this.timer.sequenz[_step].samples[n]=(this.samples[n]);
				}
			}

			this.ui.render(this.samples, this.timer);	
				
		}
	}
	if (!window.jsDrums) window.jsDrums=_drumComputer;		
})(jQuery);

