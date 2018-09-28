$(function(){
	let posi;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(ob){
			posi=ob.data
			console.log(posi)
			updatawe(posi)
		}
	});
	function updatawe (posi) {
//		获取当前
		for(let i in posi){
			let str=`
			<p class="previce">${i}</p>
			`	
		$(".allcity").append(str);
		  	let ul=document.createElement("ul")
		    $(ul).css({"width":"100%"})
	     	$(ul).insertAfter(".previce");
			for(let j in posi[i]){
			let st=`
			 <li class="city">${j}</li>
			 `
			 $(".allcity ul").append(st)
		}
		}
	}
})
