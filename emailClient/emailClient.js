//required modules
const zmq = require("zeromq"); //message tool
const nodemailer = require('nodemailer'); // this is a email sender pckg
const fs = require('fs'); // access files

//Global port num
//You can change the port number here and it will be applied through out the code
//this saves from having to change each the number for each instance the port is called for
const PORT = 3000;

//global variable 

//wait timer
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

//function start
async function main() {
    //create socket
    const sock = new zmq.Reply();
    
    //binds to TCP port 3000;
    //port number can be changed
    await sock.bind(`tcp://localhost:${PORT}`);
    console.log(`Bound to port ${PORT}`);

    //wait for requests
    for await (const [msg] of sock) {
        //save .JSON data
        const retrievedData =  JSON.parse(msg.toString());
        
        //extract specific data and stored to corresponding const vars
        const requestID = retrievedData.id;
        const email = retrievedData.to;
        const myContact = retrievedData.from;
        const subject = retrievedData.subject;
        const response = retrievedData.body;
       

        //call function to send the email
        emailSender(requestID, email, myContact, subject, response);
        
        //equivalent to python time.sleep function
        //you can choose to change the wait time in ms 
        await sleep(2000);

        //response to client
        await sock.send(`Email sent to <${requestID}>, check log for more details...`);}
    
}

//call to start the main function
main().catch(console.error);

//email function
function emailSender(ID, to, from, subject, response){

    //creates the test account to send mail
        nodemailer.createTestAccount((err, account) => {
        //error if failed
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        //if success then continue...
        console.log('Credentials obtained, sending message to:', ID);

        //verifies the account the email will be sent from
        //this is a temp account for testing purpose only if you would like to bind it to an account
        //please use this link: https://ethereal.email/
        //copy and replace it ino the transporter
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        //email content
        let message = {
            from: `<${from}>`,
            to: `<${to}>`,
            subject: `<${subject}>`,
            text: `${response}`
        };

        //send the email and creates url 
        transporter.sendMail(message, (err, info,) => {

            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
        
            //send email URL to log into emailLog.txt
            const email = nodemailer.getTestMessageUrl(info);
            const messageID = info.messageId;
            createLog(messageID, email);
           
            //dispays the 
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}

//log information by appending to file 
function createLog(messageID, email) {
    const timestamp = new Date().toISOString(); 

    fs.appendFile('emailLog.txt', `${timestamp}: <${messageID}> EMAILURL: ${email}\n`, (err) => {
        
        if (err) {
            console.error(err);
            return;
        }

        console.log(`<${messageID}>: has been logged`);

    });
    

  }
  