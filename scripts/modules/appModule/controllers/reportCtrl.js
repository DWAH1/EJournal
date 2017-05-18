'use strict';

app.controller('reportCtrl', ['$scope', '$routeParams', '$http', 'reportsFactory',
    function ($scope, $routeParams, $http, reportsFactory) {

    $http({
        method: 'GET',
        url: 'https://teacher-journal2.herokuapp.com/students.json'
    }).then(function successCallback(response) {

        console.log('r', response);
        let reportId = Number($routeParams.reportId);

        $scope.report = new Report(
            reportId,
            _.find(reportsFactory, {id: reportId}).name,
            response.data
        );

        console.log("RA", $scope.report);


    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    $scope.printReport = function () {
        // alert("PRINT");
        window.print();
    };

    $scope.downloadReport = function () {
        let pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        let source = $('#customers')[0];

        console.log("source", source);

        // we support special element handlers. Register them with jQuery-style
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors
        // (class, of compound) at this time.
        let specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        let margins = {
            top: 10,
            bottom: 60,
            left: 40,
            width: 700
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }, margins);
    };

}]);

class Report {

    constructor(id, name, data) {
        this.id = id;
        this.name = name;
        this.data = data;
    }

    render() {
        alert("Here is render!");
        $("table").html("I'm");
    }

}





