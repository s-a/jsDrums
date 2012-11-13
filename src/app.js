$(function(){
	jsDrums.load({
		name: "default beat",
		bpm:90,
		samples:[
			{ name:"Base", filename:"https://github.com/s-a/jsDrums/raw/master/samples/base" },
			{ name:"Base+Hihat", filename:"https://github.com/s-a/jsDrums/raw/master/samples/base_and_hi" },
			{ name:"Snare", filename:"https://github.com/s-a/jsDrums/raw/master/samples/snare" },
			{ name:"Baseline 160bpm", filename:"https://github.com/s-a/jsDrums/raw/master/samples/baseline_1_160" }
		],
		sequenz:[
			[0,-1,0,-1,-1,-1,2,-1,-1,-1,0,-1,2,-1,1,-1,0,-1,0,-1,-1,-1,2,-1,-1,-1,0,-1,2,-1,1,-1,0,-1,0,-1,-1,-1,2,-1,-1,-1,0,-1,2,-1,1,-1,0,-1,0,-1,-1,-1,2,-1,-1,-1,0,-1,2,-1,1,-1] // sampleID per step 
		],
		done:function(){
			$("#drumcomputer__play").attr("value","Play").removeAttr("disabled");
			$("#drumcomputer__presets a:last").click();
		}
	}); 
});