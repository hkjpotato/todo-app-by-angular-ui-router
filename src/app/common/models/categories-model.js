angular.module('myapp.models.categories', [])
	.service('CategoriesModel', function($http, $q) {
		var model = this,
			//end points map
			URLS = {
				FETCH: 'data/categories.json'
			},
			categories,
                        currentCategory;

		function extract(result) {
			return result.data;
		}

		//the result is actually stateless, but I want to store a reference
		//to the server result so I can use it a bit later
		function cacheCategories(result) {
			categories = extract(result);
			return categories;
		}

                model.getCategories = function() {
                	//use $q to wrap a promise around it
                	return (categories) ? $q.when(categories) : $http.get(URLS.FETCH).then(cacheCategories);
                }

                model.setCurrentCategory = function(categoryName) {
                        return model.getCategoryByName(categoryName)
                                .then(function(category) {
                                        currentCategory = category;
                                })
                };

                model.getCurrentCategory = function() {
                        return currentCategory;
                };
                
                model.getCurrentCategoryName = function() {
                        return currentCategory ? currentCategory.name : '';
                };

                //promise 
                model.getCategoryByName = function(categoryName) {
                	//create a deferred object by calling $q.defer()
                	var deferred = $q.defer();

                	function findCategory() {
                		return _.find(categories, function(c) {
                			return c.name == categoryName;
                		})
                	}

                	if (categories) {
                		deferred.resolve(findCategory());
                	} else {
                		model.getCategories()
                			.then(function(result) {
                				deferred.resolve(findCategory());
                			})
                	}

                	//return the promise object on that defer object
                	return deferred.promise;
                }
	});
