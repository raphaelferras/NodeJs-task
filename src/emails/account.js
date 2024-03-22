const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'caju.mgames@gmail.com', // Change to your verified sender
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        html: `<strong>Welcome to the app, ${name}. Let me know how you get along with the app.</strong>`,
    }

    sgMail
        .send(msg)
        .then(() => {
            // console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

const sendCancelationEmail = (email, name) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'caju.mgames@gmail.com', // Change to your verified sender
        subject: 'Why are you leaving!??',
        text: `Why are you leaving!??, ${name}. `,
        html: `<strong>Why are you leaving!??, ${name}..</strong>`,
    }

    sgMail
        .send(msg)
        .then(() => {
            //console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
}