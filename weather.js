var weatherImg;
var gpsImg = loadImage('circle16.png', main);

//dummy geo data
var latitude = 23;
var longitude = 200;

var canvas = document.getElementById("canvas");
canvasSize = 476;
var ctx = canvas.getContext("2d");
ctx.width  = canvasSize;
ctx.height = canvasSize;

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
    //alert(location.coords.longitude);
    //alert(location.coords.latitude);
    //alert(location.coords.accuracy);
    
    //(x-min)/(max-min)=(xImg-minImg)/(maxImg-minImg)
	latitude = canvasSize-(location.coords.latitude-23.474)/(25.47-23.474)*canvasSize;
	longitude = (location.coords.longitude-120)/(121.998-120)*canvasSize;
	//alert("GetLocation  "+latitude);
	
	drawImg();
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
    document.getElementById("sel").selectedIndex = 0;
    selchange();
}

//select change listener
function selchange() {
    //stop current loop
    clearInterval(refreshIntervalId);
    //alert(document.getElementById("sel").selectedIndex);
    weatherImg = loadImage('http://www.cwb.gov.tw'+cwb_path[document.getElementById("sel").selectedIndex], drawImg);
}
var alpha = 1.0;
function drawImg() {
    //dirty way to clear
    //canvas.width = canvas.width;
    //good way to clear
    ctx.clearRect(0,0,canvasSize,canvasSize);
    ctx.globalAlpha = alpha;
    ctx.drawImage(weatherImg, 0, 0);
    ctx.globalAlpha = 1.0;
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
function startLoopN(t) {
    //need fix this overindex bug
    var limit = t*10+1;
    var optionLimit = document.getElementById("sel").options.length-document.getElementById("sel").selectedIndex;
    if(limit > optionLimit)
        limit = optionLimit;
    
    //stop current loop
    clearInterval(refreshIntervalId);
    //reset loop counter
    selectedImgIndex = 0;
    //re-new array
    selectedImg = [];
    for (var i = 0; i < limit; i++) {
        selectedImg.push(document.getElementById("sel").options[ document.getElementById("sel").selectedIndex+i ].index);
    }
    //start loop
    refreshIntervalId = setInterval(function(){drawLoopImg()}, 1000);
}
$( "#slider" ).slider( "option", "max", 10 );
function sliderChange() {
    //alert("GGGGG");
    var value = $( "#slider" ).slider( "values", 0 );
    //alert(value);
    alpha = value/10;
    drawImg();
}