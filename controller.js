var app =  angular.module("addList",[]);
app.controller("addController",function ($scope) {
    $scope.products = [
        {
            text:"Go to gym",
            status:true
        },
        {
            text:"Do your homework",
            status:true
        },
        {
            text:"Make a pizza",
            status: false
        }
    ];
	
	function loadData(){
		var onSuccess = function (data, status, headers, config) {
                $scope.products = data;
            };

            var onError = function (data, status, headers, config) {
                $scope.errorText = status;
            }
        
            var promise = $http.get("localhost:1323/todos").success(onSuccess).error(onError);
	}
	
	
    $scope.addItem = function() {
        console.log("adding: ".concat($scope.addMe));
        $scope.errorText = "";
        if(!$scope.addMe){
            return;
        }

        var exist = false;
        $scope.products.forEach(element => {
            if(element.text === $scope.addMe){
                exist = true;
            }
        });
        if(exist === false){
            $scope.products.push({text:$scope.addMe});
        }else{
            $scope.errorText = "This item already exist in your Todo List!";
        }
    }
    $scope.removeItem = function(index) {
        console.log("deleting");
        $scope.products.splice(index,1);
    }
    $scope.changeState = function(index) {
        console.log("status changed for: ".concat(index));
        console.log("before update = ".concat($scope.products));
        console.log("length= ".concat($scope.products.length));

        for (var i=0; i < $scope.products.length; i++) {
            //if (i == index) {
                //$scope.products[i].status = !$scope.products[i].status;
                console.log($scope.products[i]);
               // break;
            //}
        }
    }
	
	loadData();
});
function changeState (item){
    alert("hello");
}