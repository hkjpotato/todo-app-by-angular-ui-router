angular
.module('categories', [
    'myapp.models.categories'
])
.config(function($stateProvider) {
	$stateProvider
		.state('myapp.categories', {
			url: '/',
			views: {
				'categories@': {
					controller: 'CategoriesListCtrl as categoriesListCtrl',
					templateUrl: 'app/categories/categories.tmpl.html'
				},
                //target the ui-view named 'todos' in ROOT state (eggly)
                //to show all todos for all categories
                'todos@': {
                    controller: 'TodosListCtrl as todosListCtrl',
                    templateUrl: 'app/categories/todos/todos.tmpl.html'
                }
			}
		})
})
.controller('CategoriesListCtrl', function CategoriesCtrl(CategoriesModel) {
	var categoriesListCtrl = this;

	CategoriesModel.getCategories()
		.then(function(result) {
			categoriesListCtrl.categories = result;
			console.log(result);
		})

	// categoriesListCtrl.categories = CategoriesModel.getCategories();
})
;
