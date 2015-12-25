var refresh;
startRefresh();
function startRefresh(){
refresh = setInterval(function getTemp(){
$.get("http://ad1e2a50.ngrok.io", function(data){
	console.log("got the data " + data);
	//var fahrenheit = (data * (9/5)) + 32;
	//console.log(fahrenheit);
	var arraydata = data.split(',');
	console.log(arraydata);
	var temp = arraydata[0];
	var humid = arraydata[1];
	$("#showtemp").text("The temperature is " + temp + " celsius");
	$("#showhumid").text("The humidity is " + humid + "%");
});
}
, 2000);
    $("#start").hide();
    $("#stop").show();

}

function stopRefresh(){
	$("#start").show();
	$("#stop").hide();
	clearInterval(refresh);
}