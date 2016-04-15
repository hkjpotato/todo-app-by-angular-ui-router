angular.module('myapp.models.todos', [])
	.service('TodosModel', function($http, $q) {
		var model = this,
		todos,
		URLS = {
			FETCH: 'data/todos.json'
		};

		function extract(result) {
			return result.data;
		}

		function cacheTodos(result) {
			todos = extract(result);
			return todos; 
		}

		function findTodo(todoId) {
			return _.find(todos, function(todo) {
				return todo.id === parseInt(todoId, 10);
			})
		}

        model.getTodos = function() {
   //      	var deferred = $q.defer();

			// if (todos) {
			// 	deferred.resolve(findTodo(todos));
			// } else {
			// 	$http.get(URLS.FETCH).then(function(todos) {
			// 		deferred.resolve(cacheTodos(todos));
			// 	})
			// }

			// return deferred.promise;
            return (todos) ? $q.when(todos) : $http.get(URLS.FETCH).then(cacheTodos);

        };

		model.getTodoById = function(todoId) {
			var deferred = $q.defer();
			if (todos) {
				deferred.resolve(findTodo(todoId));
			} else {
				model.getTodos().then(function() {
					deferred.resolve(findTodo(todoId));
				})
			}

			return deferred.promise;
		};

        model.createTodo = function(todo) {
        	//done by backend side, just illustration
        	todo.id = todos.length;
        	todos.push(todo);
        };

        model.updateTodo = function(todo) {
        	//should be update by back end 
        	var index = _.findIndex(todos, function(t) {
        		return t.id = todo.id
        	});

        	todos[index] = todo;
        };

        model.deleteTodo = function(todo) {
        	//simulating backend
        	_.remove(todos, function(t) {
        		return t.id === todo.id;
        	});
        }
	})
;
