
angular.module('categories.todos.edit', [])
	.config(function($stateProvider) {
		$stateProvider
			.state('myapp.categories.todos.edit', {
				url: '/todos/:todoId/edit',
				templateUrl: 'app/categories/todos/edit/todo-edit.tmpl.html',
				controller: 'EditTodoCtrl as editTodoCtrl'
			})
		;
	})
	.controller('EditTodoCtrl', function($stateParams, $state, TodosModel) {
		var editTodoCtrl = this;

		function returnToTodos() {
			$state.go('myapp.categories.todos', {
				category: $stateParams.category
			})
		}

		function cancelEditing() {
			returnToTodos();
		}

		function updateTodo() {
			editTodoCtrl.todo = angular.copy(editTodoCtrl.editedTodo);
			TodosModel.updateTodo(editTodoCtrl.todo);
			returnToTodos();
		}

		TodosModel.getTodoById($stateParams.todoId)
			.then(function(todo) {
				if (todo) {
					editTodoCtrl.todo = todo;
					//copy it so as to isolate the memory
					editTodoCtrl.editedTodo = angular.copy(editTodoCtrl.todo);
				} else {
					returnToTodos();
				}
			});

		editTodoCtrl.cancelEditing = cancelEditing;
		editTodoCtrl.updateTodo = updateTodo;
		
	})
;
