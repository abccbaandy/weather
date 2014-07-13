var weatherImg;
var gpsImg = loadImage('gps.png', main);

//dummy geo data
var latitude = 23;
var longitude = 200;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var cwb_path = [];
//not use anymore
var cwb_name = [];

var refreshIntervalId;

var selectedImgIndex = 0;

var selectedImg;

$("#sel").addOption(MOS2_1024N, false);

for (var key in MOS2_1024N) {
    cwb_path.push(key);
    cwb_name.push(MOS2_1024N[key]);
}

navigator.geolocation.getCurrentPosition(GetLocation);

function GetLocation(location) {
    alert(location.coords.longitude);
    alert(location.coords.latitude);
    alert(location.coords.accuracy);
    
    //(x-min)/(max-min)=(xImg-minImg)/(maxImg-minImg)
	latitude = 476-(location.coords.latitude-23.474)/(25.47-23.474)*476;
	longitude = (location.coords.longitude-120)/(121.998-120)*476;
	//alert("GetLocation  "+latitude);
	
	//ctx.globalAlpha = 0.7;
	ctx.drawImage(gpsImg, longitude, latitude);
}

function loadImage(src, onload) {
    // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
    var img = new Image();
    
    img.onload = onload;
    img.src = src;

    return img;
}

function main() {
    //do nothing
}

//select change listener
function selchange() {
    //stop current loop
    clearInterval(refreshIntervalId);
    //alert(document.getElementById("sel").selectedIndex);
    weatherImg = loadImage('http://www.cwb.gov.tw'+cwb_path[document.getElementById("sel").selectedIndex], drawImg);
}

function drawImg() {
    ctx.drawImage(weatherImg, 0, 0);
    //ctx.globalAlpha = 0.7;
    ctx.drawImage(gpsImg, longitude, latitude);
}

function drawLoopImg() {
    // composite now
    weatherImg = loadImage('http://www.cwb.gov.tw'+cwb_path[selectedImg[selectedImg.length-1-selectedImgIndex]], drawImg);
    
    if(selectedImgIndex==selectedImg.length-1)
        selectedImgIndex = 0;
    else
        selectedImgIndex++;
}

function startLoop() {
    //stop current loop
    clearInterval(refreshIntervalId);
    //reset loop counter
    selectedImgIndex = 0;
    //re-new array
    selectedImg = [];
    for (var i = 0; i < document.getElementById("sel").options.length; i++) {
        if (document.getElementById("sel").options[ i ].selected)
            selectedImg.push(document.getElementById("sel").options[ i ].index);
    }
    //alert(selectedImg);
    //start loop
    refreshIntervalId = setInterval(function(){drawLoopImg()}, 1000);
}