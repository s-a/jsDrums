$(function(){
	jsDrums.load({
		bpm:90, 
		samples:[
			{ name:'Base', filename:'samples/base' },
			{ name:'Base+Hihat', filename:'samples/base_and_hi' },
			{ name:'Snare', filename:'samples/snare' } 
		],
		sequenzer:[{  
			sequenz:[0,-1,0,-1,-1,-1,2,-1,-1,-1,0,-1,2,-1,1,-1] // sampleID / step
		}],
		done:function(){ 
			$('#drumcomputer__play').attr('value','Play').removeAttr('disabled');
		}
	});
});