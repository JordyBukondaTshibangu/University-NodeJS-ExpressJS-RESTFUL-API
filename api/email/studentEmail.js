const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

const WelcomeStudent = (email, name) => {
    sgMail.send({
        to : email,
        from : 'jordytshibss@gmail.com',
        subject : 'Welcome To jordy\'s Task-Manager-API ',
        text : `Welcome to to the app, ${name}, Rate the app please !!!`,
        html : '<div style="margin: 0 auto; width: 800px; height: 300px; background: aqua; text-align: center; padding-top: 50px; margin-top : 100px; "> <h1> Welcome to Jordy\'s Task-manager App</h1> <div style="margin-top: 30px; background: red; height: 100px; margin : 50px 100px 100px; padding-top: 30px;"> <h3> We hope your enjoy the app</h3></div><h2> ... see you then !!!</h2></div>'

    })
}
const sendCancelEmail = (email, name) =>{
    sgMail.send({
        to : email,
        from : 'jordytshibss@gmail.com',
        subject : 'Cancelation To jordy\'s Task-Manager-API ',
        text : `Cancel account to the app, from ${name}, Tell us what went wrong please !!!`,
        html : '<div style="margin: 0 auto; width: 800px; height: 300px; background: aqua; text-align: center; padding-top: 50px; margin-top : 100px; "> <h1> Cancelation account to Jordy\'s Task-manager App</h1> <div style="margin-top: 30px; background: red; height: 100px; margin : 50px 100px 100px; padding-top: 30px;"> <h3> Tell us what went wrong with the app</h3></div><h2> ... Hope you come back !!!</h2></div>'
    })
}
module.exports = {
    WelcomeStudent,
    sendCancelEmail
}