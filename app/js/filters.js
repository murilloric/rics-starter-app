MASTERAPP.filter('runTime', function(){

	return function(input){
		var out = '';
		var hours = Math.floor(input / (60 * 60));
		var divs_mins = input % (60 * 60);
		var mins = Math.floor(divs_mins / 60);
		var hr_text = (hours > 1)?'hrs ':'hr ';
		out += hours + hr_text + mins + 'mins';
		return out
	}



})