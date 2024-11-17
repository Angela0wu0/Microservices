import '@github/clipboard-copy-element'
READ ME

This is an Email Microservices that can: \n
    - send email \n
    - log when email was sent and URL link to content  \n \n

The zmq library has already been added into this folder so just make sure to copy the folder to your workspace. \n
Things to download in cmd: \n
 - npm install //node package manager \n
 - npm install nodemailer  //email system \n
 
 
In order for the email to be sent the JSON obj must be in the format of:
{
     var userObj = {
      "id":"test",
      "to":"test@email.com",
      "from":"test@email.com",
      "subject":"test",
      "body":"hello world!"
     }

}
The contents of the information must then be convereted by:

    - var string = JSON.stringify([object])

TO RUN MICROSERVICE:
    when running the instance in cmd please use:
        - fnm env --use-on-cd | Out-String | Invoke-Expression
    first then followed by:
        - node --watch .\[filename.extention] 
This is a convenient way to elimiate the need of having to rerun the file after a change is made.

A example demo run has been created to demonstrate how to utalize the Microservice...

![Alt text](images/sequenceUML.png)
