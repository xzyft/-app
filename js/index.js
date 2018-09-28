//$(function(){
	
	//获取天气当前城市的天气信息
	let weathe;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city",
		dataType:"jsonp",
		success:function(obj){
			weathe=obj.data;
			console.log(weathe)
			updata(weathe)
		}
	});
	function updata(weath){
//		获取当前城市
	$(".top .where  h3").html(weath.city+"市")
	$(".disvible .sss").html(weath.city+"市")
	//	获取当前温度
	$(".top .main span").html(weath.weather.current_temperature+"°"
)
	// 获取当前天气状况
	$(".top .main .tianqi").html(weath.weather.current_condition
)
	//风向
	$(".top .main pre").html(weath.weather.wind_direction)
	//空气质量
	$(".top .leftmassage span").html(weath.weather.quality_level)
	$(".f-list .aa .ftop span").eq(1).html(weath.weather.dat_low_temperature+"/"+weath.weather.dat_high_temperature+"℃")
	$(".f-list .aa .fbottom span").eq(0).html(weath.weather.dat_condition)
	$(".f-list .aa .fbottom img").attr("src","img/"+weath.weather.dat_weather_icon_id+".png")
	$(".f-list .bb .ftop span").eq(1).html(weath.weather.tomorrow_low_temperature+"/"+weath.weather.tomorrow_high_temperature+"℃")
	$(".f-list .bb .fbottom span").eq(0).html(weath.weather.tomorrow_condition)
	$(".f-list .bb .fbottom img").attr("src","img/"+weath.weather.tomorrow_weather_icon_id+".png")
	//未来24小时
	let tfw=weath.weather.hourly_forecast;
	tfw.forEach(v=>{
		let str=`
		<li>
				<h5>${v.hour}:00</h5>
				<img src="img/${v.weather_icon_id}.png"/>
				<span>
					${v.temperature}°
				</span>
			</li>
		`
		$(".s-list>ul").append(str);
	})
	//未来天数的天气
	let fw=weath.weather.forecast_list;
	fw.forEach(s=>{
		let riqi=s.date.substr(5,9)
		let ti=s.condition.split("转")
		if(ti[1]==undefined){
			ti[1]=ti[0]
		}
		let str=`
				<li>
				<div class="t-top">
					<span>日期</span>
					<span>${riqi}</span>
					<span>${ti[0]}</span>
					<img src="img/${s.weather_icon_id}.png"/>
					<p>${s.low_temperature}</p>
				</div>
				<div class="t-bottom">
					<p>${s.high_temperature}</p>
					<img src="img/${s.weather_icon_id}.png"/>
					<span>${ti[1]}</span>
					<span>${s.wind_direction}</span>
					<span>${s.wind_level}</span>
				</div>
			</li>
		`
		$(".t-list>ul").append(str)
	})
	}
	$(".top .where").click(function(){
		$(".top").css({"display":"none"})
		$(".f-list").css({"display":"none"})
		$(".s-list").css({"display":"none"})
		$(".t-list").css({"display":"none"})
		$(".d").css({"display":"none"})
		$(".disvible").css({"display":"block"})
	})
	$(".disvible .right").click(function(){
		$(".top").css({"display":"block"})
		$(".f-list").css({"display":"block"})
		$(".s-list").css({"display":"block"})
		$(".t-list").css({"display":"block"})
		$(".d").css({"display":"block"})
		$(".disvible").css({"display":"none"})
	})	
	$(".disvible .left").click(function(){
		$(".top").css({"display":"block"})
		$(".f-list").css({"display":"block"})
		$(".s-list").css({"display":"block"})
		$(".t-list").css({"display":"block"})
		$(".d").css({"display":"block"})
		$(".disvible").css({"display":"none"})
	})
		$(".disvible .sss").click(function(){
		$(".top").css({"display":"block"})
		$(".f-list").css({"display":"block"})
		$(".s-list").css({"display":"block"})
		$(".t-list").css({"display":"block"})
		$(".d").css({"display":"block"})
		$(".disvible").css({"display":"none"})
	})
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
let k=0;
		for(let i in posi){
			let str=`
			<p class="previce">${i}</p>
			<ul>
			</ul>
			`	
		$(".allcity").append(str);
//		let ul=document.createElement("ul")
//		$(ul).css({"width":"100%"})
//		$(ul).insertAfter(".previce");
			for(let j in posi[i]){
			let st=`
			<li class="city">${j}</li>
			`
			$(".allcity ul").eq(k).append(st)
		}
			k++;
		}
	}
	window.onload=function(){
		
	
	$(".city").click(function(){
		$(".t-list ul").empty()
		$(".s-list ul").empty()
		$(".top").css({"display":"block"})
		$(".f-list").css({"display":"block"})
		$(".s-list").css({"display":"block"})
		$(".t-list").css({"display":"block"})
		$(".d").css({"display":"block"})
		$(".disvible").css({"display":"none"})
		let con=$(this).html()
//		$(".where h3").html(con)
		ajaxs(con);
		
	})
	function ajaxs(str){
		let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
		$.ajax({
			type:"get",
			url:url1,
			dataType:"jsonp",
			success:function(obj){
				let tianqi2=obj.data;
				updata(tianqi2);
			}
		})
	}
	$(".disvible .head #s").focus(function(){
		$(".disvible .head .right").html("搜索")
		 $(".disvible .head .right").click(function(){
		 	let text= $(".disvible .head #s").val();
		 	console.log(text)
//				$(".where h3").html(text)
//		 		ajaxs(text);
//			let flag=false;
		 	 for (let i in posi){
//		 	 	console.log(i)
		 	 	for( let j in posi[i]){
		 	 		if(text==j){
		 	 			$(".t-list ul").empty()
						$(".s-list ul").empty()
		 	 			ajaxs(text);
		 	 			$(".disvible .head #s").val("")
		 	 			$(".disvible .head .right").html("取消")
		 	 			return;
		 	 		}
		 	 	}
		 	 }
//		 	 if(flag=)
		 	 if(text!=""){
		 	 	alert("在想想输入的地址")
//		 	 	return;
		 	 }
		 })
	})
	$(".disvible .head #s").blur(function(){
		$(".disvible .head .right").html("取消")
	})
	}
	
//})