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
    "id":"test",
    "to":"test@email.com",
    "from":"test@email.com",
    "subject":"test",
    "body":"hello world 2!"
  }

  //convert to readable string format
 
  var allObj = {userObj, userObj1};
  const keys = Object.keys(allObj);
  let i = 0;

  //socket
  const sock = new zmq.Request();

  await sock.connect('tcp://localhost:3000');
  console.log('Client connected to port 3000');


  while(i < keys.length){
    const key = keys[i];
    const value = allObj[key];

    var string = JSON.stringify(value)
    //sent to emailClient

    await sock.send([string]);
    await sleep(3000);
    //recieve response from emailmicro
    const response = await sock.receive();
    console.log(response.toString());

    //increment till no objects
    i++;
  }

}



main().catch(console.error);