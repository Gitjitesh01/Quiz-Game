module.exports = {
    fetchUsersQuery: 'select * from [dbo].[USER]',
    fetchUserQuery: (field, value) => `select * from dbo.[User] where ${field}='${value}'`,
    fetchUserCredentialsQuery: (payload) => {
        const { email, password } = payload;
        let query = `select * from dbo.[User] where email='${email}' and password='${password}'`;
        return query;  
    },
    createUserQuery: (payload) => {
        const { firstName, email, password, lastName, type, teach, createdBy, modifiedBy } = payload;
        let col = 'firstName, email, password';
        let val = `'${firstName}', '${email}', '${password}'`;
        if (lastName) {
            col += ', lastName';
            val += `, '${lastName}'`
        }
        if (type) {
            col += ', type';
            val += `, '${type}'`
        }
        if (teach) {
            col += ', teach';
            val += `, '${teach}'`
        }
        if (createdBy) {
            col += ', createdBy';
            val += `, '${createdBy}'`
        }
        if (modifiedBy) {
            col += ', lastName';
            val += `, '${modifiedBy}'`
        }
        let query = 'insert into [dbo].[user] (' + col + ') VALUES (' + val + ')';
        return query;

    },
    createQuizQuery: (payload) => {
        // const { firstName, email, password, lastName, type, teach, createdBy, modifiedBy } = payload;
        let col = Object.keys(payload).toString() //'firstName, email, password';
        let val = Object.values(payload).map(data => `'${data}'`).join(',')
        let query = 'insert into [dbo].[QUIZ] (' + col + ')  OUTPUT Inserted.ID VALUES (' + val + ')';
        return query;

    },
    getAllQuizQuery: 'select * from dbo.[quiz]  QZ JOIN dbo.[questions] Q ON QZ.id = Q.quiz_id left JOIN dbo.[questions_options] O ON Q.id = O.questions_id',
    getAllQuizReportsQuery: 'select * from dbo.[quiz_reports]',
    getQuizReportsByIdQuery: (id) => `select * from dbo.[quiz_reports] where quiz_id=${id}`,
    getQuizByIdQuery: (id) => `select * from dbo.[quiz]  QZ Left JOIN dbo.[questions] Q ON QZ.id = Q.quiz_id JOIN dbo.[questions_options] O ON Q.id = O.questions_id where QZ.id='${id}'`,
    createQuestionQuery: (questions) => {
        // const { firstName, email, password, lastName, type, teach, createdBy, modifiedBy } = payload;
        let col = Object.keys(questions[0]).toString() //'firstName, email, password';
        let val = questions.map(quest => '(' + Object.values(quest).map(data => `'${data}'`).join(',') + ')').join(',')
        let query = `insert into [dbo].[QUESTIONS] (` + col + ')  OUTPUT Inserted.ID VALUES ' + val;
        return query;

    },
    createQuestionOptionsQuery: (options) => {
        // const { firstName, email, password, lastName, type, teach, createdBy, modifiedBy } = payload;
        let col = Object.keys(options[0]).toString() //'firstName, email, password';
        let val = options.map(quest => '(' + Object.values(quest).map(data => `'${data}'`).join(',') + ')').join(',')
        let query = `insert into [dbo].[QUESTIONS_OPTIONS] (` + col + ')  OUTPUT Inserted.ID VALUES ' + val;
        return query;

    },
    createQuestionAnsOptionsQuery: (questions) => {
        // const { firstName, email, password, lastName, type, teach, createdBy, modifiedBy } = payload;
        let col = Object.keys(questions[0]).toString() //'firstName, email, password';
        let val = questions.map(quest => '(' + Object.values(quest).map(data => `'${data}'`).join(',') + ')').join(',')
        let query = `insert into [dbo].[ANSWER_OPTIONS] (` + col + ')  OUTPUT Inserted.ID VALUES ' + val;
        return query;

    },
    createQuizReportQuery: (payload) => {
        // const { firstName, email, password, lastName, type, teach, createdBy, modifiedBy } = payload;
        let col = Object.keys(payload).toString() //'firstName, email, password';
        let val = Object.values(payload).map(data => `'${data}'`).join(',')
        let query = 'insert into [dbo].[QUIZ_REPORTS] (' + col + ')  OUTPUT Inserted.ID VALUES (' + val + ')';
        return query;

    },
    updateQuizReportQuery: (payload) => {

        let col = Object.keys(payload).toString() //'firstName, email, password';
        let val = Object.values(payload).map(data => `'${data}'`).join(',')
        let insertQuery = 'insert into [dbo].[QUIZ_REPORTS] (' + col + ')  OUTPUT Inserted.ID VALUES (' + val + ');';
        let selectQuery = `SELECT * FROM [dbo].[QUIZ_REPORTS] where email='` + payload.email + `' and quiz_id='` + payload.quiz_id + `';`;
        let updateQuery = `UPDATE  [dbo].[QUIZ_REPORTS] set phone='` + payload.phone + `' where email='` + payload.email + `' and quiz_id='` + payload.quiz_id + `';`;
        let query = `IF NOT EXISTS (select 1 from QUIZ_REPORTS where email='` + payload.email + `' and quiz_id='` + payload.quiz_id + `') 
        ` + insertQuery + `
        ELSE
        `+ updateQuery + ` ` + selectQuery + ``;

        return query;
    },
    createQuizResponseQuery: (payload) => {
        // const { firstName, email, password, lastName, type, teach, createdBy, modifiedBy } = payload;
        // let col = Object.keys(payload).toString() //'firstName, email, password';
        // let val = Object.values(payload).map(data => `'${data}'`).join(',')
        // let query = 'insert into [dbo].[QUIZ_RESPONSE] (' + col + ')  OUTPUT Inserted.ID VALUES (' + val + ')';
        return payload;

    },
    updateQuizResponseQuery: (payload) => {
        const { response, questions_id, quiz_id, createdBy } = payload;
        let query = `UPDATE  [dbo].QUIZ_RESPONSE set response=${response}  OUTPUT Inserted.ID where createdBy='${createdBy}' and quiz_id = '${quiz_id}' and questions_id = ${questions_id};`;
        return query;

    },
    getQuizResponseByQuizIdQuery: (email, quizId, questions_id) => {
        const data = {
            createdBy:email,
            quiz_id:quizId,
            questions_id:questions_id,
        }
        return data;
        // return `select * from dbo.QUIZ_RESPONSE where createdBy='${email}' and quiz_id = ${quizId} and questions_id = ${questions_id};`
    },
    getIndividualReportQuery: (id) => {
        return `select min(qz.id) quiz_id,min(qz.name) quiz_name,
        min(qr.name) attender_name, min(qr.email) attender_email, min (qr.phone) attender_phone,
        SUM(CAST(qr.attend_count as numeric)) attend_count,
        min(qz.title) quiz_title,
        min(qz.description) quiz_description
        --sum(((qr.points/qr.totalPoints)*100 >= 50)? 1 : 0) no_of_pass
        --sum(((qr.points/qr.totalPoints)*100 < 50)? 1 : 0) no_of_fail
        
        from
        QUIZ_REPORTS qr
        Left join quiz qz on qz.id=qr.quiz_id
        where qr.quiz_id=${id}
        group by qr.id,qz.id
        order by qz.id`
    },
    getQuizReportQuery: (id) => {
        return `select qz.id, min(qz.name) quiz_name,
        min(qz.title) quiz_title,
        min(qz.description) quiz_description, 
        --sum(((q_report.points/q_report.totalPoints)*100 >= 50)? 1 : 0) no_of_pass
        --sum(((q_report.points/q_report.totalPoints)*100 < 50)? 1 : 0) no_of_fail
        SUM(CAST(q_report.attend_count as numeric)) attend_count
        --certified_quiz as 'certified_quiz'
        
        from quiz qz
        left join QUIZ_REPORTS q_report on qz.id=q_report.quiz_id
        where qz.id='${id}'
        group by qz.id, q_report.quiz_id`
    }
}
