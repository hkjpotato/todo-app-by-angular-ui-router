angular.module('myApp', [
    'ui.router',
    'categories',
    'categories.todos'
])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('myapp', {
            url: '',
            abstract: true
        });

    $urlRouterProvider.otherwise('/');
})
;

