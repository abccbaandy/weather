var latitude = 100;
var longitude = 300;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var img1 = [];
img1[0] = loadImage('pic1.jpg', main);
img1[1] = loadImage('pic2.jpg', main);
img1[2] = loadImage('pic3.jpg', main);
var img2 = loadImage('gps.png', main);

var imagesLoaded = 0;
var counter = 0;
navigator.geolocation.getCurrentPosition(GetLocation);
function GetLocation(location) {
    //alert(location.coords.latitude);
    //alert(location.coords.longitude);
    //alert(location.coords.accuracy);
	latitude = location.coords.latitude+24;
	longitude = location.coords.longitude+240;
	//alert("GetLocation  "+latitude);
	ctx.drawImage(img2, longitude, latitude);
}
function loadImage(src, onload) {
    // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
    var img = new Image();
    
    img.onload = onload;
    img.src = src;

    return img;
}
function main() {
    imagesLoaded += 1;

    /*if(imagesLoaded == 2) {
        // composite now
        ctx.drawImage(img1, 0, 0);
        
        //ctx.globalAlpha = 1;
        ctx.drawImage(img2, longitude, latitude);
    }*/
    //window.setTimeout(imageLoop, 1000);
    //ctx.drawImage(img2, longitude, latitude);
    if(imagesLoaded == 4) {
        alert("Image is loaded");
        //setInterval(drawScreen(), 1000);
    }
    //imageLoop();
}

function drawScreen() {
    // composite now
    ctx.drawImage(img1[counter], 0, 0);
    
    if(counter==2)
        counter = 0;
    else
        counter++;
        
    //ctx.globalAlpha = 1;
    ctx.drawImage(img2, longitude, latitude);
}
function imageLoop() {
    //window.setTimeout(function(){imageLoop()}, 1000000000);
    //drawScreen();
    setInterval(drawScreen(), 10000);
}
