angular.module('categories.todos', [
    'categories.todos.create',
    'categories.todos.edit',
    'myapp.models.categories',
    'myapp.models.todos'
])
	.config(function($stateProvider) {
		$stateProvider
			.state('myapp.categories.todos', {
				//meaning this url(with params) will go to this state
				//meaning this state contains this parmas
				//the views corresponding to this state can use the params from the stateParams
				//and then bring them into the scope(connection between controller and view)

				url: 'categories/:category',
                //target the named 'ui-view' in ROOT (eggly) state named 'bookmarks'
                //to show bookmarks for a specific category
				views: {
					'todos@': {
						templateUrl: 'app/categories/todos/todos.tmpl.html',
						controller: 'TodosListCtrl as todosListCtrl'
					}
				}
			})
		;
	})
	.controller('TodosListCtrl',function($stateParams, TodosModel, CategoriesModel) {
		var todosListCtrl = this;

		CategoriesModel.setCurrentCategory($stateParams.category);

		todosListCtrl.currentCategoryName = $stateParams.category;
		TodosModel.getTodos().then(function(todos) {
			todosListCtrl.todos = todos;
		});

		todosListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
		todosListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
		todosListCtrl.deleteTodo = TodosModel.deleteTodo;

	})
;
