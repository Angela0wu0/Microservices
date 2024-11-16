const zmq = require('zeromq');


//wait timer
function sleep(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}

async function main() {
    //JSON setup
    var userObj = {
      "id":"test",
      "to":"test@email.com",
      "from":"test@email.com",
      "subject":"test",
      "body":"hello world!"
  }
  var userObj1 = {
    "id":"test1",
    "to":"test@email.com",
    "from":"test@email.com",
    "subject":"test",
    "body":"hello world 2!"
  }

  //if you have more than one object combine them into one
  var allObj = {userObj, userObj1};
  //this sets the amount of total obj so that the loop can iterate through
  const numItems = Object.keys(allObj);

  //counter
  let i = 0;

  //socket
  const sock = new zmq.Request();

  await sock.connect('tcp://localhost:3000');
  console.log('Client connected to port 3000');


  while(i < numItems.length){
    const key = numItems[i];
    const value = allObj[key];

    var string = JSON.stringify(value)
    //sent to emailClient

    await sock.send([string]);
    await sleep(4000);
    //recieve response from emailmicro
    const response = await sock.receive();
    console.log(response.toString());

    //increment till no objects
    i++;
  }

}



main().catch(console.error);