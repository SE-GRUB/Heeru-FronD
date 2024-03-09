"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// required cryptojs untuk enkripsi
// required node-fetch untuk request data
// npm install crypto-js
// npm install node-fetch --save
// adjust with your iPaymu api key & va 
var apikey = "QbGcoO0Qds9sQFDmY0MWg1Tq.xtuh1";
var va = "0000001221723861";
var url = 'https://sandbox.ipaymu.com/api/v2/payment'; // development mode
// var url             = 'https://my.ipaymu.com/api/v2/payment'; // for production mode

var body = {
  "product": ["Jacket"],
  "qty": ["1"],
  "price": ["150000"],
  "amount": "10000",
  "returnUrl": "https://your-website.com/thank-you-page",
  //your thank you page url
  "cancelUrl": "https://your-website.com/cancel-page",
  // your cancel page url
  "notifyUrl": "https://your-website.com/callback-url",
  // your callback url
  "referenceId": "1234",
  // your reference id or transaction id
  "buyerName": "Putu",
  // optional
  "buyerPhone": "08123456789",
  // optional
  "buyerEmail": "buyer@mail.com" // optional

}; // generate signature

var bodyEncrypt = _cryptoJs["default"].SHA256(JSON.stringify(body));

var stringtosign = "POST:" + va + ":" + bodyEncrypt + ":" + apikey;

var signature = _cryptoJs["default"].enc.Hex.stringify(_cryptoJs["default"].HmacSHA256(stringtosign, apikey)); // request


(0, _nodeFetch["default"])(url, {
  method: "POST",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    va: va,
    signature: signature,
    timestamp: '20150201121045'
  },
  body: JSON.stringify(body)
}).then(function (response) {
  return response.json();
}).then(function (responseJson) {
  // response
  console.log(responseJson);
});