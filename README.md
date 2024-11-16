This is an Email Microservices that can:
- send email
- log when email was sent and URL link to content

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

var string = JSON.stringify([object])

A example demo run has been created to demonstrate how to utalize the Microservice...

