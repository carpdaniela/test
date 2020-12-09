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
					$scope.products = response.data;
		}, onError);
        }else{
            $scope.errorText = "This item already exist in your Todo List!";
        }
	
    }
	
    $scope.removeItem = function(todo) {
        console.log("deleting");
        //$scope.products.splice(index,1);
		
		todo.msg = todo.msg.replace(" ", "%20");
		
		var req_del = {
		 method: 'DELETE',
		 url: 'http://localhost:1323/todos/'.concat(todo.msg),
		 headers: {
		   'Origin': "localhost:1323"
			}
		}
		
		console.log(req_del.url);


		$http(req_del).then(function(response) {
			$scope.products = response.data;
			
		}, onError);
		
		
    }
	
    $scope.changeState = function(todo) {
        console.log("status changed for: ".concat(todo.msg));
		console.log("status is: ".concat(todo.done));
		
		console.log($scope.products);
		
		todo.msg = todo.msg.replace(" ", "%20");

		var req_update = {
			method: 'PUT',
			url: 'http://localhost:1323/todos/'.concat(todo.msg,'/',todo.done),
			headers: {
				'Origin': "localhost:1323"
			}
		}

		console.log(req_update.url);

		$http(req_update).then(function(response) {
			$scope.products = response.data;
			console.log($scope.products);
			
		}, onError);
       
    }
});
function changeState (item){
    alert("hello");
}