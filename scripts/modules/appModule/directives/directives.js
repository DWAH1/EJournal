app.directive("group", function() {
    return {
        restrict : "AECM",
        template: "<span>{{ number }}</span>",
        link: function (scope, element, attrs) {
            scope.number = attrs.number;
        }
    }
});
