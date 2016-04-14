angular.module('myApp', [

])
    .controller('MainCtrl', function ($scope) {
        // give the name of the categories
        $scope.categories = [
            {"id": 0, "name": "Javascript"},
            {"id": 1, "name": "CSS"},
            {"id": 2, "name": "Coding"},
            {"id": 3, "name": "Campus"},
            {"id": 4, "name": "Other"},
        ];

        $scope.todos = [
            {"id": 0, "title": "AngularJS", "content": "http://angularjs.org", "category": "Javascript" },
            {"id": 1, "title": "Egghead.io", "content": "http://angularjs.org", "category": "Javascript" },
            {"id": 2, "title": "A List Apart", "content": "http://alistapart.com/", "category": "CSS" },
            {"id": 3, "title": "One Page Love", "content": "http://onepagelove.com/", "category": "CSS" },
            {"id": 4, "title": "MobilityW OD", "content": "http://www.mobilitywod.com/", "category": "Coding" },
            {"id": 5, "title": "Robb Wolf", "content": "http://robbwolf.com/", "category": "Coding" },
            {"id": 6, "title": "Senor Gif", "content": "http://memebase.cheezburger.com/senorgif", "category": "Campus" },
            {"id": 7, "title": "Wimp", "content": "http://wimp.com", "category": "Campus" },
            {"id": 8, "title": "Dump", "content": "http://dump.com", "category": "Other" }
        ];

        $scope.isCreating = false;
        $scope.isEditing = false;
        $scope.currentCategory = null;
        $scope.editedTodo = null;

        function isCurrentCategory(category) {
            return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        }

        function setCurrentCategory(category) {
            $scope.currentCategory = category;

            cancelCreating();
            cancelEditing();
        }

        $scope.isCurrentCategory = isCurrentCategory;
        $scope.setCurrentCategory = setCurrentCategory;

        function setEditedTodo(todo) {
            $scope.editedTodo = angular.copy(todo);
        }

        function isSelectedTodo(todoId) {
            return $scope.editedTodo !== null && $scope.editedTodo.id === todoId;
        }

        $scope.setEditedTodo = setEditedTodo;
        $scope.isSelectedTodo = isSelectedTodo;

        function resetCreateForm() {
            $scope.newTodo = {
                title: '',
                content: '',
                category: $scope.currentCategory
            };
        }

        //-------------------------------------------------------------------------------------------------
        // CRUD
        //-------------------------------------------------------------------------------------------------
        
        //for create new
        function createTodo(todo) {
            todo.id = $scope.todos.length;
            $scope.todos.push(todo);
            resetCreateForm();
        }

        function updateTodo(todo) {
            var index = _.findIndex($scope.todos, function (b) {
                return b.id == todo.id
            });
            // var ids = $scope.todos.map(function(todo){return todo.id});
            // var index = ids.indexOf(todo.id);

            // console.log('index of ' + todo.title + ' is ' + index);
            $scope.todos[index] = todo;

            $scope.editedTodo = null;
            $scope.isEditing = false;
        }

        function deleteTodo(todo) {
            _.remove($scope.todos, function (b) {
                return b.id == todo.id;
            });
        }

        $scope.createTodo = createTodo;
        $scope.updateTodo = updateTodo;
        $scope.deleteTodo = deleteTodo;

        //-------------------------------------------------------------------------------------------------
        // CREATING AND EDITING STATES
        //-------------------------------------------------------------------------------------------------
        function shouldShowCreating() {
            return $scope.currentCategory && !$scope.isEditing;
        }

        function startCreating() {
            $scope.isCreating = true;
            $scope.isEditing = false;
            resetCreateForm();
        }

        function cancelCreating() {
            $scope.isCreating = false;
        }

        $scope.shouldShowCreating = shouldShowCreating;
        $scope.startCreating = startCreating;
        $scope.cancelCreating = cancelCreating;

        function shouldShowEditing() {
            return $scope.isEditing && !$scope.isCreating;
        }

        function startEditing() {
            //display the edit view
            $scope.isCreating = false;
            $scope.isEditing = true;
        }

        function cancelEditing() {
            $scope.isEditing = false;
            $scope.editedTodo = null;
        }

        $scope.startEditing = startEditing;
        $scope.cancelEditing = cancelEditing;
        $scope.shouldShowEditing = shouldShowEditing;
    })
;