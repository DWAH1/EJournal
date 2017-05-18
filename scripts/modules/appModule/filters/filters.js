app.filter('rangeC', function() {
    return function(input) {
        let lowBound, highBound;
        switch (input.length) {
            case 1:
                lowBound = 0;
                highBound = parseInt(input[0]) - 1;
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
        }
        let result = [];
        for (let i = lowBound; i <= highBound; i++)
            result.push(i);
        return result;
    };
});