var latitude = 100;
var longitude = 100;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var img1 = loadImage('pic.jpg', main);
var img2 = loadImage('gps.png', main);

var imagesLoaded = 0;

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

    if(imagesLoaded == 2) {
        // composite now
        ctx.drawImage(img1, 0, 0);
        
        //ctx.globalAlpha = 1;
        //ctx.drawImage(img2, latitude, longitude);
    }
}

