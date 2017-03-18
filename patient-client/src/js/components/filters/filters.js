var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

angular.module('datefilter', []).filter('dateformat', function () {
  	return function (input) {
  		var date = new Date(input);
  		return monthNames[date.getMonth()]+ " " + date.getDate()+", "+date.getHours()+":"+date.getMinutes();
  	};
  });

 angular.module('reversefilter', []).filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

 angular.module('hitecfilter', []).filter('hitec', function() {
  return function(items) {
    var itemsFiltered = [];
    for(var i in items){
      if(items[i] != undefined && items[i].data!=undefined && !items[i].data.startsWith("@Hitec@")){
        itemsFiltered.push(items[i]);
      }
    }
    return itemsFiltered;
  };
});