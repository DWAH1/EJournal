app.directive("group", function() {
    return {
        restrict : "AECM",
        template: "<span>{{ number }}</span>",
        link: function (scope, element, attrs) {
            scope.number = attrs.number;
        }
    }
});

app.directive("limitToMax", function() {
    return {
        link: function(scope, element, attributes) {

            element.on("keydown keyup", function(e) {
                // alert(e.keyCode);
                if (e.keyCode == 189 || e.keyCode == 109 || e.keyCode == 69 || e.keyCode == 107 || e.keyCode == 187) {
                    e.preventDefault();
                }
                if (Number(element.val()) > Number(attributes.max) &&
                    e.keyCode != 46 // delete
                    &&
                    e.keyCode != 8 // backspace
                ) {
                    e.preventDefault();
                    element.val(attributes.max);
                    return false;
                }

                if (Number(element.val()) < Number(attributes.min) &&
                    e.keyCode != 46 // delete
                    &&
                    e.keyCode != 8 && e.keyCode == 48// backspace
                ) {
                    e.preventDefault();
                    element.val(attributes.min);
                }
            });

        }
    };
});
