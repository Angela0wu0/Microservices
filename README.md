# READ ME

## Things To Know First 
The Email Microservice utalize ZeroMQ Socket API where the built-in Request-reply ZeroMQ pattern is used. The Microservice is the server that creates a zmq.Reply() socket that is binded to a TCP Port.  

## How To Programmatically REQUEST and RECEIVE Data From Microservice

### Programmatically REQUEST
In order to be able to programmatically REQUEST Data you **MUST** first create a zmq.Request() socket that connects to the port the Microservice is binded too in a async function. It is also **important** to note when connecting the socket to the Microservice socket that it uses the keyword **await**. This is also nessesary when either sending and requesting data.

**Javascript example:**
```
    async function main() {

        const sock = new zmq.Request();
        await sock.connect('tcp://....'); //connect to the port that the Microservice is binded to 
        
    }
```
Now that the socket is set up to be connected to the Microservice to REQUEST data, a data must now be sent to the Microservice to make the REQUEST. For this Microservice, the sent data is **required** to be a JSON data in the format of:
``` 
    {
        "id":" ", //userID, messageID, etc.
        "to":" ",  //recipients email
        "from":" ", //sending from email
        "subject":" ", //email subject
        "body":" " //the content of the email
    }
```
**Example Call(Javascript):**
```
//create async function
    async function main() {

        //create request() socket
        const sock = new zmq.Request();

        // await to connect to the Microservice port
        await sock.connect('tcp://....'); //connect to the port that the Microservice is binded to 
        
        //create JSON object
         var userObj = {
            "id":"test",
            "to":"recipient@email.com",
            "from":"test@email.com",
            "subject":"test",
            "body":"hello world!"
            }

        //stringify the JSON data before sending it or else the Microservice will recieve buffers
        var string = JSON.stringify(userObj)

        //send the request with the data with await keyword
        await sock.send(string);
    }
```


### Programmatically RECEIVE
It is important to understand in a server and client ZeroMQ socket pattern that the client side must wait and recieve a data back before a new request can be made.
```
     async function main() {
        //create socket and await connect to port...
        //create JSON data...
        //stringify JSON data...


        //sends await request with stringify JSON data
        await sock.send(string);

        //wait for function from Microservice to process...
        await sleep(4000); 

        //recieve data from Microservice and store into const variable
        const response = await sock.recieve();

        //display to console...
        console.log(response);
     }
```



## 
The zmq library has already been added into this folder so just make sure to copy the folder to your workspace.
Things to download in cmd:
- npm install //node package manager
- npm install nodemailer  //email system
 
## 
 
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

