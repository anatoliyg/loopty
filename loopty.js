
var Loopty = angular.module("Loopty", ["ngResource"]);

function LooptyCtrl($scope, $resource){

	$scope.youtube = $resource("https://gdata.youtube.com/feeds/api/:action",
		{action:"videos", q:"angularjs", alt:"json-in-script", callback:"JSON_CALLBACK"},
		{get:{method:"JSONP"}});

	$scope.doSearch = function(){
		$scope.searchResults = $scope.youtube.get({q:$scope.searchTerm}, function(){
			console.log("http request succeeded");
		} );
	};

	$scope.queue = [];
	$scope.currentEmbedUrl = "";

	$scope.filterOptions = [
		{name:'Most Views', theFilter:'stringToInt'},
		{name:'Least Views', theFilter:'-stringToInt'},
		{name:'Longest Duration', theFilter:'-author[0].name.$t'},
		{name:'Title (A-Z)', theFilter:'title.$t'},
	    {name:'Title (Z-A)', theFilter:'-title.$t'},
	    {name:'Author (A-Z)', theFilter:'author[0].name.$t'},
	    {name:'Author (Z-A)', theFilter:'-author[0].name.$t'}
	  ];

	$scope.selectChanged = function(){
		//console.dir($scope.currentFilter);
	};

	$scope.stringToInt = function(item){
		return parseInt(item.yt$statistics.viewCount);
	}

	$scope.playVideo = function(item){
		$scope.currentEmbedUrl = "http://www.youtube.com/embed/" + this.extractUrl(item.id.$t)+"?autoplay=1";
		// console.dir(item);
		// console.log("url is "+$scope.currentEmbedUrl);
	};

	$scope.extractUrl = function(string){
		return string.split('/').reverse()[0];
		//console.log("extracting from "+string)
	}

	$scope.addToQueue = function(item){
		$scope.queue.push(item);
		console.log("queue is now "+$scope.queue);
		// console.dir(item);
	}
};

Loopty.directive("videothumb", function(){

	return {
		restrict: "E",
		replace:true,
		templateUrl: "video_thumb",
		link: function(scope, iElement, iAttrs, controller){
			// console.log($vid);
		}
	}
});

Loopty.directive("queuethumb", function(){

	return {
		restrict: "E",
		replace:true,
		// scope: {
		//   // title: '@',             // the title uses the data-binding from the parent scope
		//   // onOk: '&',              // create a delegate onOk function
		//   // onCancel: '&',          // create a delegate onCancel function
		//   // visible: '='            // set up visible to accept data-binding
		// },
		templateUrl: "queue_thumb",
		link: function(scope, iElement, iAttrs, controller){

		}
	}
});

Loopty.directive("videoplayer", function(){

	return {
		restrict: "E",
		replace:true,
		templateUrl: "video_player",
		link: function(scope, iElement, iAttrs, controller){

		}
	}
});



