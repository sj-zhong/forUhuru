$(document).ready(function(){
	$('body').on("click" , '#addUser' , function(e){
		e.preventDefault();
		let name      = $('#name').val(),
			age       = $('#age').val();
			sex 	  = $('#sex').val();
			telephone = $('#telephone').val();
			postNum   = $('#postNum').val();
			address   = $('#address').val();
		console.log(name,age,sex,telephone,postNum,address);
		$.ajax({
			type:'GET',
			url:'/users/addUser?name='+name+'&age='+age +'&sex='+sex+'&telephone='+telephone+'&postNum='+postNum+'&address='+address,
			dataType:'JSON',
			success:function(data){
				if(data['code'] === 200){
					location.href = '/users/queryAll';
				}
			}
		});
	})


});