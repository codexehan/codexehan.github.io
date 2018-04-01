
//slide navigator
function collapseNav(){
  document.getElementById("book-summary").style.width="0";
  document.getElementById("book-container").style.left="0";
  document.getElementById("collapse").style.display="none";
  document.getElementById("expand").style.display="flex";
  document.getElementById("summary-control").style.left="-300px";
}
function expandNav(){
  document.getElementById("book-summary").style.width="300px";
  document.getElementById("book-container").style.left="300px";
  document.getElementById("collapse").style.display="flex";
  document.getElementById("expand").style.display="none";
  document.getElementById("summary-control").style.left="0";
}
//init click event of navigation and back top button
function initClickEvent(){
	//hljs.initHighlightingOnLoad();//load highlight.js
	$("pre code").each(function(i, block) {
    hljs.highlightBlock(block);
  });
	$("#book-content").scroll(function(){
		//show top arrow
		if($("#book-content")[0].scrollHeight == $("#book-content").height()+$("#book-content").scrollTop()){
			$("#top-arrow").css("display","flex");
		}
		else{
			$("#top-arrow").css("display","none");
		}
	/*	if($("#book-content")[0].scrollHeight > $("#book-content").height()){
			$("#top-arrow").css("display","flex");
		}
		else{
			$("#top-arrow").css("display","none");
		}
		if($("#book-content").scrollTop()>20){
			$("#top-arrow").css("display","flex");
		}
		else{
			$("#top-arrow").css("display","none");
		}*/
	});
	
	$("#top-arrow").click(function(){
		$("#book-content").scrollTop(0);
	});
	
    $(".navigation").click(function(){
      var addr=$(this).attr("href");
	  
	  var $liArray = $(".section");
	  var $curActiveLi = $("#book-summary li.active");
	  var index = $liArray.index($curActiveLi);
	  
	  //change the color of summary list
	  $curActiveLi.removeClass('active');
	  if($(this).hasClass('navigator-pre')){
		  var $preLi = $liArray.eq(index-1);//get return the DOM element while eq return the DOM element wrapped in jQuery object
		  $preLi.addClass('active');
		  index--;//move to previous page
	  }
	  else{
		  var $nextLi = $liArray.eq(index+1);
		  $nextLi.addClass('active');
		  index++;//move to next page
	  }
	  ajaxLoadBook(addr,index);
      return false;//or e.preventDefault()
    });	
}
//index is the index of addr page
function ajaxLoadBook(addr,index){
	 $("#book-container").load(addr+" #book-body", function(response,status,xhr){
		if(status==="error"){
			alert(xhr.status+" "+xhr.statusText);
		}
		else{
			window.history.pushState({"addr":addr,"index":index},"title",addr);
			//update title
			var title = $("#book-title").text();
			$("head>title").text(title);
			//reinit the click listener
			initClickEvent();
		}
	});
}
//TODO:change to jquery later
window.onpopstate=function(e){
	if(e.state){
		$("#book-container").load(e.state.addr+" #book-body",function(response,status,xhr){
			if(status==="error"){
				alert(xhr.status+" "+xhr.statusText);
			}
			else{
				//update title
				var title = $("#book-title").text();
				$("head>title").text(title);
				//change color of active summary list
				$("#book-summary li.active").removeClass('active');
				var $liArray = $(".section");
				$liArray.eq(e.state.index).addClass('active');
				//reinit the click listener
				initClickEvent();
			}
		});
	}
	else{//is initial page
		location.reload();
	}
}
$(document).ready(function(){
	//init click event of navigation and back top button
	initClickEvent();
    //click link active
  /*  $("#book-summary li a").click(function(e){
      $("#book-summary li.active").removeClass('active');
      $(this).parent().addClass('active');
      e.preventDefault();//dont add for ajax load
    });*/
	//summary list
	$(".section").children("a").click(function(){
      if(!$(this).parent().hasClass('active')){
		$("#book-summary li.active").removeClass('active'); 
		$(this).parent().addClass('active');
		
        var $liArray = $(".section");
		var $curActiveLi = $("#book-summary li.active");
		var index = $liArray.index($curActiveLi);
		
		var addr=$(this).attr("href");
		ajaxLoadBook(addr,index);
      }
      return false;//dont add for ajax load
    });
});