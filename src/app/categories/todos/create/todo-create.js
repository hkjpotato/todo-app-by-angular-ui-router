angular.module('categories.todos.create', [])
	.config(function($stateProvider) {
		$stateProvider
			.state('myapp.categories.todos.create', {
				url: '/todos/create',
				templateUrl: 'app/categories/todos/create/todo-create.tmpl.html',
				controller: 'CreateTodoCtrl as createTodoCtrl'
			})
		;
	})
	.controller('CreateTodoCtrl', function($state, $stateParams, TodosModel) {
		var createTodoCtrl = this;

		function returnToTodos() {
			$state.go('myapp.categories.todos', {
				category: $stateParams.category
			})
		}

		function cancelCreating() {
			returnToTodos();
		}

		function createTodo(todo) {
			TodosModel.createTodo(todo);
			returnToTodos();
		}

		function resetForm() {
			createTodoCtrl.newTodo = {
				title: '',
				content: '',
				category: $stateParams.category
			}
		}

		createTodoCtrl.cancelCreating = cancelCreating;
		createTodoCtrl.createTodo = createTodo;

		resetForm();
	})
;
