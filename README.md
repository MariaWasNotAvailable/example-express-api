# example-express-api

## Description
Simple REST API made with Node.js, Express and TypeScript

## Installation

Requires Node.js v0.10+.

```
git clone https://github.com/MariaWasNotAvailable/example-express-api.git
cd example-express-api
npm install
```

## Usage
```
npm start
```

```
GET /: displays this message
GET /uuid: generates random UUID
GET /randomNumber: generates random integer between 0 and 100
GET /coinFlip: randomly returns "heads" or "tails"
GET /timestamp: returns current UNIX timestamp
GET /date: returns current date and time in a human-readable format
GET /sampleObject: returns an example JSON object with various data types inside
GET /powerOfTwo/<n>: returns the n-th power of 2
GET /ip: returns the IP address from which the request originates
GET /validateEmail/<e-mail>: answers if provided e-mail address is valid in human-readable format
GET /sentenceCase/<sentence>: returns provided string in Sentence case
GET /crud: returns a simple string if GET request arrived correctly
POST /crud: returns a simple string if POST request arrived correctly
PUT /crud: returns a simple string if PUT request arrived correctly
DELETE /crud: returns a simple string if DELETE request arrived correctly
POST /: returns back JSON request body
```
