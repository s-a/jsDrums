$(function(){
	jsDrums.load({
		name: "default beat",
		bpm:90,
		samples:[
			{ name:"Base", filename:"samples/base" },
			{ name:"Base+Hihat", filename:"samples/base_and_hi" },
			{ name:"Snare", filename:"samples/snare" },
			{ name:"Baseline 160bpm", filename:"samples/baseline_1_160" }
		],
		sequenz:[
			[] // sampleID per step 
		],
		done:function(){
			$("#drumcomputer__play").attr("value","Play").removeAttr("disabled");
			$("#drumcomputer__presets a:last").click();
		}
	}); 
});