# WRap(i)
##### Witness Report api


## Requirements

### Runtime

This project uses [NodeJS 18+][download_nodejs] as runtime.


## Setup

To install dependencies and build app, type:
```
npm install

npm run build
```
Config file is .env. Easiest way to generate it is to copy env.template file.
```
cp env.template .env
```
***Populate .env file with values*** (you can use example values from comments before each row).
## Usage
To start server, type:
```
npm run start
```
To run tests, type:
```
npm run test
```
To access api, send POST request to http://localhost:port/report endpoint.
Request body:
```
{
  "name": "<case title name>",
  "phone": "<phone number>"
}
```
## Author
 - Boban Lukic : bbnlkc@gmail.com

[download_nodejs]: https://nodejs.org/en/download/current/
