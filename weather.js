/*var canvasTest = document.getElementById("canvasS");
var ctxTest = canvasTest.getContext("2d");

var tttImg;

function tttt() {
    ctxTest.drawImage(tttImg, 0, 0);
}

tttImg = loadImage("http://www.cwb.gov.tw/V7/observe/radar/Data/MOS2_1024S/2014-07-26_1454.2MOS3SC.jpg", tttt);*/


var weatherImgN;
var weatherImgS;
var gpsImg = loadImage('up_arrow.png', main);

//dummy geo data
var longitude = -16;
var latitude = 0;

var canvasGps = document.getElementById("canvasGps");
var ctxGps = canvasGps.getContext("2d");

var canvasN = document.getElementById("canvasN");
canvasSize = 500;
var ctxN = canvasN.getContext("2d");
ctxN.width  = canvasSize;
ctxN.height = canvasSize;

var canvasS = document.getElementById("canvasS");
var ctxS = canvasS.getContext("2d");
ctxS.width  = canvasSize;
ctxS.height = canvasSize;

var cwb_pathN = [];
var cwb_pathS = [];
//not use anymore
var cwb_name = [];

var refreshIntervalId;

var selectedImgIndex = 0;

var selectedImg;

$("#sel").addOption(MOS2_1024N, false);

for (var key in MOS2_1024N) {
    cwb_pathN.push(key);
    //cwb_name.push(MOS2_1024N[key]);
}

for (var key in MOS2_1024S) {
    cwb_pathS.push(key);
    //cwb_name.push(MOS2_1024N[key]);
}



function GetLocation(location) {
    //alert(location.coords.longitude);
    //alert(location.coords.latitude);
    //alert(location.coords.accuracy);
    
    //(x-min)/(max-min)=(xImg-minImg)/(maxImg-minImg)
	longitude = (location.coords.longitude-120)/(121.998-120)*(canvasSize-1)+longitude+1;
	latitude = canvasSize-(location.coords.latitude-23.474)/(25.47-23.474)*(canvasSize-1)+latitude+1;
	//alert("GetLocation  "+latitude);
	ctxGps.clearRect(0,0,canvasSize,canvasSize);
	ctxGps.drawImage(gpsImg, longitude, latitude);
	drawImgN();
	drawImgS();
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
    ctxGps.drawImage(gpsImg, -16, 0);
    navigator.geolocation.getCurrentPosition(GetLocation);
}

//select change listener
function selchange() {
    //stop current loop
    clearInterval(refreshIntervalId);
    //alert(document.getElementById("sel").selectedIndex);
    weatherImgN = loadImage('http://www.cwb.gov.tw'+cwb_pathN[document.getElementById("sel").selectedIndex], drawImgN);
    weatherImgS = loadImage('http://www.cwb.gov.tw'+cwb_pathS[document.getElementById("sel").selectedIndex], drawImgS);
}
var alpha = 1.0;
function drawImgN() {
    //dirty way to clear
    //canvas.width = canvas.width;
    //good way to clear
    ctxN.clearRect(0,0,canvasSize,canvasSize);
    ctxN.globalAlpha = alpha;
    ctxN.drawImage(weatherImgN, 0, 0);
    //ctx.globalAlpha = 1.0;
    //ctx.drawImage(gpsImg, longitude, latitude);
}
function drawImgS() {
    //dirty way to clear
    //canvas.width = canvas.width;
    //good way to clear
    ctxS.clearRect(0,0,canvasSize,canvasSize);
    ctxS.globalAlpha = alpha;
    ctxS.drawImage(weatherImgS, 0, 0);
    //ctx.globalAlpha = 1.0;
    //ctx.drawImage(gpsImg, longitude, latitude);
}

function drawLoopImg() {
    // composite now
    weatherImgN = loadImage('http://www.cwb.gov.tw'+cwb_pathN[selectedImg[selectedImg.length-1-selectedImgIndex]], drawImgN);
    weatherImgS = loadImage('http://www.cwb.gov.tw'+cwb_pathS[selectedImg[selectedImg.length-1-selectedImgIndex]], drawImgS);
    
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
    drawImgN();
    drawImgS();
}