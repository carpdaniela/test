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
		 url: 'http://localhost:3000/todos',
		 headers: {
		   'Origin': "localhost:3000"
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
			url: 'http://localhost:3000/todos/add/?msg='+$scope.addMe+'&done=false',  //.concat($scope.addMe,'/false')
		}
		
		console.log(req_add);

		var exist = false;
        $scope.products.forEach(element => {
            if(element.msg === $scope.addMe){
                exist = true;
            }
        });
        if(exist === false){
            $http(req_add).then(function(response) {
					$scope.products = response.data;
					$scope.addMe = "";
		}, onError);
        }else{
            $scope.errorText = "This item already exist in your Todo List!";
        }
	
    }
	
    $scope.removeItem = function(todo) {
        console.log("deleting");
        //$scope.products.splice(index,1);
		
	
		var req_del = {
			method: 'DELETE',
			url: 'http://localhost:3000/todos/remove/?msg='+todo.msg,  //.concat(newMsg)
		}
		
		console.log(req_del);


		$http(req_del).then(function(response) {
			$scope.products = response.data;
			
		}, onError);
		
    }
	
    $scope.changeState = function(todo) {
        console.log("status changed for: ".concat(todo.msg));
		console.log("status is: ".concat(todo.done));
		
		console.log($scope.products);

		var req_update = {
			method: 'PUT',
			url: 'http://localhost:3000/todos/update/?msg='+todo.msg+"&done="+todo.done, //.concat(newMsg,'/',todo.done)
		}
		
		console.log(req_update);

		console.log(req_update.url);

		$http(req_update).then(function(response) {
			$scope.products = response.data;
			console.log($scope.products);
			
		}, onError);
       
    }
});