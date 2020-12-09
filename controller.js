var app =  angular.module("addList",[]);
app.controller("addController",function ($scope,$http) {
	
	
	var onSuccess = function (data, status, headers, config) {
			$scope.products = data.data;
			console.log($scope.products);
		};

	var onError = function (data, status, headers, config) {
		$scope.errorText = status;
	}


	var req = {
		 method: 'GET',
		 url: 'http://localhost:1323/todos',
		 headers: {
		   'Origin': "localhost:1323"
		 }
	}


	$http(req).then(function(response) {
		$scope.products = response.data;
	}, onError);
	
	
	
    $scope.addItem = function() {
        console.log("adding: ".concat($scope.addMe));
        $scope.errorText = "";
        if(!$scope.addMe){
            return;
        }


		var req_add = {
			 method: 'POST',
			 url: 'http://localhost:1323/todos/'.concat($scope.addMe,'/false'),
			 headers: {
			   'Origin': "localhost:1323"
				}
		}

		var exist = false;
        $scope.products.forEach(element => {
            if(element.msg === $scope.addMe){
                exist = true;
            }
        });
        if(exist === false){
            $http(req_add).then(function(response) {
				$http(req).then(function(response) {
					$scope.products = response.data;
				}, onError);
		}, onError);
        }else{
            $scope.errorText = "This item already exist in your Todo List!";
        }
		
		
		
		
		/*
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
		*/
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
});
function changeState (item){
    alert("hello");
}