import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as EmailValidator from 'email-validator';
import * as bodyParser from 'body-parser';

/* Initialize the server */
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Listening on port ${PORT}. Press Ctrl+C to stop. Send a GET / request to see the list of commands!\n`)); 

/* Handle all requests */
app.get('/', (req:Request, res:Response) => {
  return res.send(`
      GET /: displays this message</br>
      GET /uuid: generates random UUID</br>
      GET /randomNumber: generates random integer between 0 and 100</br>
      GET /coinFlip: randomly returns "heads" or "tails"</br>
      GET /timestamp: returns current UNIX timestamp</br>
      GET /date: returns current date and time in a human-readable format</br>
      GET /sampleObject: returns an example JSON object with various data types inside</br>
      GET /powerOfTwo/&lt;n&gt;: returns the n-th power of 2</br>
      GET /ip: returns the IP address from which the request originates</br>
      GET /validateEmail/&lt;e-mail&gt;: answers if provided e-mail address is valid in human-readable format</br>
      GET /sentenceCase/&lt;sentence&gt;: returns provided string in Sentence case</br>
      GET /crud: returns a simple string if GET request arrived correctly</br>
      POST /crud: returns a simple string if POST request arrived correctly</br>
      PUT /crud: returns a simple string if PUT request arrived correctly</br>
      DELETE /crud: returns a simple string if DELETE request arrived correctly</br>
      POST /: returns back JSON request body</br>
    `);
});

app.post('/', (req:Request, res:Response) => {
  let postBody = "POST a message to the root endpoint to test if it works\n";

  if (req.body) {
    postBody = req.body;
    console.log(`Received POST message: ${JSON.stringify(req.body)}\n`);
  }

  return res.send(postBody);
});

app.get('/uuid', (req:Request, res:Response) => {
  const id = uuidv4();
  return res.send(id);
});

app.get('/randomNumber', (req:Request, res:Response) => {
  return res.send((Math.floor(Math.random()*101)).toString());
});

app.get('/coinFlip', (req:Request, res:Response) => {
  return res.send((Math.random() < 0.5) ? "heads" : "tails");
});

app.get('/timestamp', (req:Request, res:Response) => {
  return res.send(Date.now().toString());
});

app.get('/date', (req:Request, res:Response) => {
  const date = new Date();
  return res.send(date.toLocaleString());
});

app.get('/sampleObject', (req:Request, res:Response) => {
  const object = {
    anInteger: 123,
    someText: "Lorem ipsum",
    arrayValues: ["some val", "other val", "one more val"],
    alwaysTrue: true,
    nothing: null
  };

  return res.json(object);
});

app.get('/powerOfTwo/:numberToProcess', (req:Request, res:Response) => {
  const parsedInput = parseInt(req.params.numberToProcess);

  if (isNaN(parsedInput)) {
    return res.send("Please specify an integer after the /powerOfTwo/ part of the URI");
  } else {
    return res.send((2**parsedInput).toString());
  }
});

app.get('/ip', (req:Request, res:Response) => {
  return res.send(req.socket.remoteAddress?.toString());
});

app.get('/validateEmail/:email', (req:Request, res:Response) => {
  return res.send((EmailValidator.validate(req.params.email)
    ? "Valid e-mail address"
    : "Invalid e-mail address"));
});

app.get('/sentenceCase/:sentence', (req:Request, res:Response) => {
  let sentence = req.params.sentence;
  sentence = (sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()).replace(/\s+/g,' ').trim();

  return res.send(sentence);
});

app.get('/crud', (req:Request, res:Response) => {
  console.log(`Received GET message\n`);
  return res.send('HTTP method GET received successfully');
});

app.post('/crud', (req:Request, res:Response) => {
  console.log(`Received POST message\n`);
  return res.send('HTTP method POST received successfully');
});

app.put('/crud', (req:Request, res:Response) => {
  console.log(`Received PUT message\n`);
  return res.send('HTTP method PUT received successfully');
});

app.delete('/crud', (req:Request, res:Response) => {
  console.log(`Received DELETE message\n`);
  return res.send('HTTP method DELETE received successfully');
});
