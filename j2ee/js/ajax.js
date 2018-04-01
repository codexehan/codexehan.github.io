// JavaScript Document

$(document).ready(function(){

	$.ajax({
		url:'content.json',
		 cache: false,
		success:function(d){
			var contentList="";
			var sectionList="";
			var url  = window.location.href;
			var urlActive="";
			d = JSON.stringify(d);
			var data = JSON.parse(d);
			$.each(data,function(key,val){
				//chapter val[0]
				//section val[1];
				var section = val[1];
				$.each(section,function(key,val1){
					if(val1[1]===url){
						urlActive=" active";
					}
					else{
						urlActive="";
					}
					sectionList += '<ul class="section-list"><li class="section'+urlActive+'"><a href="'+val1[1]+'">'+val1[0]+'</a></li></ul>';
				});
				contentList += '<li class="chapter"><a><strong>'+val[0]+'</strong></a>'+sectionList+'</li>';
				sectionList="";
			});
			$('.chapter-list').append(contentList);
		}
	});
	
	//show title
	$('#book-title').css('opacity',1);
	$('.navigation').css('display','none');
});