'use strict';

class API {
    static version () {
        return {ver: 3};
    }
    static urls () {
        return {
            groups: 'https://teacher-journal'+ API.version().ver + '.herokuapp.com/groups.json',
            students: 'https://teacher-journal' + 2 + '.herokuapp.com/students.json',
            subjects: 'https://teacher-journal' + API.version().ver + '.herokuapp.com/subjects.json',
            subject_groups: 'https://teacher-journal3.herokuapp.com/subject_groups.json',
            sign_in: 'https://teacher-journal4.herokuapp.com/auth/sign_in.json',
            students_group: 'http://localhost:3001/groups_students',
            sync: 'http://localhost:3001/sync',
            sync_report: 'http://localhost:3001/sync_report'
        }
    };
}