//var web=document.getElementsByClassName('web')[0];
var scrollBody=document.getElementsByClassName('web')[0];
var menu=document.getElementsByClassName('menu')[0];
var web= document.body;
var image=document.getElementById('cursor-trail');
var lineCanvas = document.createElement('canvas');
var lineCanvasContext = lineCanvas.getContext('2d');
var imageCanvas = document.createElement('canvas');
var imageCanvasContext = imageCanvas.getContext('2d');
imageCanvas.style.position='absolute';
imageCanvas.style.left='0';
imageCanvas.style.top='0';
imageCanvas.style.right='0';
imageCanvas.style.bottom='0';
imageCanvas.style.zIndex='-1';
/*imageCanvas.style.backgroundColor='red';*/
/*imageCanvas.style.position='relative';
imageCanvas.style.width='100%';
imageCanvas.style.height='100%';
imageCanvas.style.zIndex='-1';
imageCanvas.style.backgroundColor='red';*/
var points = [];
var maxActiveTime=1000;
if(image.complete){
  start();
}
else{
  image.onload=start();
}
function start(){
    web.addEventListener("mousemove",cursorTrail);
    web.appendChild(imageCanvas);
	//var height=Math.max(web.scrollHeight,web.clientHeight);
    window.addEventListener('resize', function(){
	//  var height=Math.max(web.scrollHeight,web.clientHeight);
        //set the width and height of image
 //     lineCanvas.width=imageCanvas.width=web.clientWidth;
//      lineCanvas.height=imageCanvas.height=web.clientHeight;
	  lineCanvas.width=imageCanvas.width=window.innerWidth;
      lineCanvas.height=imageCanvas.height=window.innerHeight;
    });
    //set the width and height of image
 //   lineCanvas.width=imageCanvas.width=web.clientWidth;
//    lineCanvas.height=imageCanvas.height=web.clientHeight;
	lineCanvas.width=imageCanvas.width=window.innerWidth;
    lineCanvas.height=imageCanvas.height=window.innerHeight;
    main();
}
function cursorTrail(e){
  points.push({
    x:e.clientX,
    y:e.clientY,
    t:Date.now()
/*	x:e.pageX-e.currentTarget.offsetLeft,
	y:e.pageY-e.currentTarget.offsetTop,
	t:Date.now()*/
  });
 // console.log(e.clientY);
}
function main(){
  filterPoints();
  drawPath();
  drawImage();
  requestAnimationFrame(main);
}
function filterPoints(){
  points = points.filter(function(point){
    var age=Date.now()-point.t;
    return age<maxActiveTime;
  });
}
function drawPath(){
  var maxLineWidth=110;
  var minLineWidth=25;
  lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);//keep the internal line opacity is 1
  lineCanvasContext.lineCap="round";
  lineCanvasContext.shadowBlur=35;
  lineCanvasContext.shadowColor="#000";
  lineCanvasContext.lineWidth=45;
  for(var i=1;i<points.length;i++){
    var prevPoint = points[i-1];
    var curPoint = points[i];
    var age=Date.now()-curPoint.t;
    var opacity;
    if(age>maxActiveTime){
      opacity=0;  
    }
    else{
      opacity=(maxActiveTime-age)/maxActiveTime;
    }
    lineCanvasContext.strokeStyle = "rgba(0,0,0,"+opacity+")";
    
    //change the line width
  //  var dis=getDistance(prevPoint,curPoint);
    
    lineCanvasContext.beginPath();
    lineCanvasContext.moveTo(prevPoint.x,prevPoint.y);
    lineCanvasContext.lineTo(curPoint.x,curPoint.y);
    lineCanvasContext.stroke();
  }
}
function drawImage(){
/*	var width = imageCanvas.width;
	var height = imageCanvas.width / image.naturalWidth * image.naturalHeight;
  
	if (height < imageCanvas.height) {
		width = imageCanvas.height / image.naturalHeight * image.naturalWidth;
		height = imageCanvas.height;
	}*/
	var y;
	var scrolltop=scrollBody.scrollTop;
	
	if(scrolltop >= menu.clientHeight){//for showing the menu better
		y=0;//menu hide
	}
	else{
		y=menu.clientHeight-scrolltop;
	}
    imageCanvasContext.clearRect(0,0,imageCanvas.width,imageCanvas.height);
    imageCanvasContext.globalCompositeOperation="source-over";//cover the diagram
    imageCanvasContext.drawImage(image,0,0,imageCanvas.width,imageCanvas.height);
    imageCanvasContext.globalCompositeOperation="destination-in";
    imageCanvasContext.drawImage(lineCanvas,0,y);
}
function getDistance(prevPoint, nextPoint) {
  return Math.sqrt(Math.pow((prevPoint.x-nextPoint.x),2)+Math.pow((prevPoint.y-nextPoint.y),2));
}

function prevSlide(prev){
  var slideContainer = prev.parentElement;
  //show next navigator
  var next = slideContainer.getElementsByClassName("next");
  if(next[0].style.display==="none"){
    next[0].style.display="block";
  }
  //move slide
	var slides = slideContainer.getElementsByClassName("mySlides");
	for(var i=0;i<slides.length;i++){
		if(slides[i].classList.contains('slide-position1')){

			slides[i].className=slides[i].className.replace("slide-position1","slide-position2");
		}
		else if(slides[i].classList.contains('slide-position2')){

			slides[i].className=slides[i].className.replace("slide-position2","slide-position3");
		}
		else if(slides[i].classList.contains('slide-position3')){

			slides[i].className=slides[i].className.replace("slide-position3","slide-position4");
		}
		else if(slides[i].classList.contains('slide-position4')){

			slides[i].className=slides[i].className.replace("slide-position4","slide-position5");
		}
	}
	var leftSlides = slideContainer.getElementsByClassName("slide-position0");
	var lastLeftSlide=leftSlides.length -1;
	leftSlides[lastLeftSlide].className=leftSlides[lastLeftSlide].className.replace("slide-position0","slide-position1");
	delete leftSlides[lastLeftSlide];
	if(leftSlides.length===0){
	  prev.style.display="none";
	}
}
function nextSlide(next){
  var slideContainer = next.parentElement;
  //show next navigator
  var prev = slideContainer.getElementsByClassName("prev");
  if(prev[0].style.display==="none" || prev[0].style.display===""){
    prev[0].style.display="block";
  }
  //move slide
	var slides = slideContainer.getElementsByClassName("mySlides");
	for(var i=0;i<slides.length;i++){
		if(slides[i].classList.contains('slide-position1')){

			slides[i].className=slides[i].className.replace("slide-position1","slide-position0");
		}
		else if(slides[i].classList.contains('slide-position2')){

			slides[i].className=slides[i].className.replace("slide-position2","slide-position1");
		}
		else if(slides[i].classList.contains('slide-position3')){

			slides[i].className=slides[i].className.replace("slide-position3","slide-position2");
		}
		else if(slides[i].classList.contains('slide-position4')){

			slides[i].className=slides[i].className.replace("slide-position4","slide-position3");
		}
	}
	var leftSlides = slideContainer.getElementsByClassName("slide-position5");
	leftSlides[0].className=leftSlides[0].className.replace("slide-position5","slide-position4");
	delete leftSlides[0];
	if(leftSlides.length===0){
	  next.style.display="none";
	}
}
