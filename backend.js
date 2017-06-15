var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

var books = [
    {
        name: "Hello"
    },
    {
        name: "Hello2"
    }
];

var groupStudents = {
    "942": [
                {
                    id: 1,
                    name: "Student1",
                    marks: [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
                    pk_1: 40,
                    pk_2: 50,
                    attends: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: 2,
                    name: "Student2",
                    marks: [0, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
                    pk_1: 30,
                    pk_2: 40,
                    attends: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "O", 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: 3,
                        name: "Student3",
                    marks: [0, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0],
                    pk_1: 30,
                    pk_2: 50,
                    attends: [0, 0, 0, "H", 0, 0, 0, 0, "HH", 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: 4,
                        name: "Student4",
                    marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0]
                },
                {
                    id: 5,
                        name: "Student5",
                    marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 4, 3, 0, 0]
                },
                {
                    id: 6,
                        name: "Student6",
                    marks: [4, 0, 4, 0, 0, 3, 0, 0, 4, 0, 0, 0, 0, 3, 0, 0],
                    attends: [0, 0, 0, "H", 0, 0, 0, 0, "HH", 0, 0, 0, 0, 0, "O", 0, 0, "H"]
                },
                {
                    id: 7,
                        name: "Student7",
                    marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0]
                },
                {
                    id: 8,
                        name: "Student8",
                    marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0],
                    pk_1: 25
                },
                {
                    id: 9,
                        name: "Student9",
                    marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0]
                },
                {
                    id: 10,
                        name: "Student10",
                    marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0]
                }
            ],
    "742": [
        {
            id: 1,
            name: "Student1",
            marks: [1, 1, 1, 0, 1, 0, 1, 0, 5, 0, 0, 0, 0, 1, 0, 0],
            attends: ["H", "H", "H", "H", "H", "H", "H", "O", "H", "H", "H", "H", "H", "H", "H", "H", 0, 0]
        },
        {
            id: 2,
            name: "Student2",
            marks: [0, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
            attends: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "O", 0, 0, 0, 0, 0, 0, 0]
        },
        {
            id: 3,
            name: "Student3",
            marks: [0, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0],
            pk_1: 30,
            pk_2: 50,
            attends: [0, 0, 0, "H", 0, 0, 0, 0, "HH", 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            id: 4,
            name: "Student4",
            marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0]
        },
        {
            id: 5,
            name: "Student5",
            marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 4, 3, 0, 0]
        },
        {
            id: 6,
            name: "Student6",
            marks: [4, 0, 4, 0, 0, 3, 0, 0, 4, 0, 0, 0, 0, 3, 0, 5],
            attends: [0, 0, 0, "H", 0, 0, "O", 0, "HH", 0, 0, 0, 0, 0, "O", 0, 0, "H"]
        },
        {
            id: 7,
            name: "Student7 Studentov",
            marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0],
            pk_1: 10,
            pk_2: 20,
        },
        {
            id: 8,
            name: "Student8",
            marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0],
            pk_1: 25
        },
        {
            id: 9,
            name: "Student9",
            marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0]
        },
        {
            id: 10,
            name: "Student10",
            marks: [1, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 3, 0, 0]
        }
    ],
    "842": []
};

app.get('/books', function (req, res) {
    res.send(books);
});

app.get('/groups_students', function (req, res) {
    res.send(groupStudents['942']);
});

app.get('/sync', function (req, res) {
    console.log("!");
    setTimeout(function () {res.send(groupStudents);}, 1000);
});

app.post('/groups_students', function (req, res) {
    console.log(req.body.number);
    console.log(groupStudents[req.body.number]);
    res.send(200, groupStudents[req.body.number]);
});

var server = app.listen(3001, function() {
   console.log('backend started!');
});
