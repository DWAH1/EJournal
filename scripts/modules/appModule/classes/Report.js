class Report {

    constructor(title) {

        this.title = title;

        this.groups = null;
        this.subjects = null;
        this.students = null;
    }

    set setGroups(data) {
        this.groups = data;
    }

    set setSubjects(data) {
        this.subjects = data;
    }

    set setStudents(data) {
        this.students = data;
    }

    getGroups($http) {
        return $http({
            method: 'GET',
            url: API.urls().groups
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    getSubjects($http) {
        return $http({
            method: 'GET',
            url: API.urls().subjects
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    getStudents($http) {
        return $http({
            method: 'GET',
            url: API.urls().students
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    download(dom_element_id, $scope) {

        let quotes = document.getElementById(dom_element_id);
        html2canvas(quotes, {
            onrendered: function(canvas) {
                // make PDF
                let pdf = new jsPDF('p', 'pt', 'letter');

                for (let i = 0; i <= quotes.clientHeight/1380; i++) {
                    //! This is all just html2canvas stuff
                    let srcImg  = canvas;
                    let sX      = 125;
                    let sY      = 1380*i; // start 980 pixels down for every new page
                    let sWidth  = 1300;
                    let sHeight = 1380;
                    let dX      = 0;
                    let dY      = 0;
                    let dWidth  = 1100;
                    let dHeight = 1380;

                    window.onePageCanvas = document.createElement("canvas");
                    onePageCanvas.setAttribute('width', 1300);
                    onePageCanvas.setAttribute('height', 1380);
                    let ctx = onePageCanvas.getContext('2d');
                    // details on this usage of this function: 
                    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                    ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

                    // document.body.appendChild(canvas);
                    let canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

                    let width         = onePageCanvas.width;
                    let height        = onePageCanvas.clientHeight;

                    // If we're on anything other than the first page,
                    // add another page
                    if (i > 0) {
                        pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
                    }
                    // now we declare that we're working on that page
                    pdf.setPage(i+1);
                    // now we add content to that page!
                    pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));

                }
                // after the for loop is finished running - save the pdf.
                pdf.save('test.pdf');
            }
        });

    }

}