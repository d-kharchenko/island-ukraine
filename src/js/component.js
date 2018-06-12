$(function(){
	$('.nav-hover-link').hover(function(){
		$(' > *', this).toggleClass('link-arrow-active')
	})


	// $('#callback-form').submit(function(){
	// 	$.ajax({
	// 		type: 'POST',
	// 		url: 'js/mail.php',
	// 		data: $(this).serialize()
	// 	}).done(function(){
	// 		alert('thanks')
	// 	});
	// 	return false;
	// })
	$("#callback-form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
			$("#form").trigger("reset");
		});
		return false;
	});
	

	// $.getJSON('products.json', function(data){
	// 	var arr = data.prod;
	// 	$.each( arr, function( key, val ) {
	// 		if(val.price == 75000){
	// 			console.log(val)
	// 		}
		    
		   
	// 	  });
	// })

	var list = $('#top-sale')

	$.ajax({
		url: 'products.json'
	}).done(function(data){
		var source = $('#prod-list').html();
		var template = Handlebars.compile(source);
		var html = template(data);
		list.append(html)	
	})

	function modalProduct(val){
		$('.title-prod > *').remove()
		$('.description-prod').empty()
		var title ='<h2 class="uk-modal-title uk-padding uk-margin-remove-bottom description-title">'+  val.name + '</h2>';
		var titleImage = '<img class="products__icon" src="'+ val.image +'" alt="">' ;
		var description = val.description;
		var price = val.price;
		$('.title-prod').append(titleImage + title + '<h2 class="uk-text-large uk-label modal-price ">' + price +' грн.</h2>');
		$('.description-prod').append(description);
	}


$('body').on('click', '.info-btn', function(){
	var getTitle = $(this).siblings('.uk-card-title').get(0).textContent;

	$.getJSON('products.json', function(data){
		var arr = data.prod;
		$.each( arr, function( key, val ) {
			if(val.name == getTitle){
				modalProduct(val)
			
			}
		    
		   
		  });
	})
});

// personal-page script start


})