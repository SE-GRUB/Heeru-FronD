"use strict";

var crypto = require('crypto'); // Fungsi untuk menghasilkan signature


function generateSignature(method, vaNumber, requestBody, apiKey) {
  var requestBodyHash = crypto.createHash('sha256').update(JSON.stringify(requestBody)).digest('hex').toLowerCase();
  var stringToSign = "".concat(method, ":").concat(vaNumber, ":").concat(requestBodyHash, ":").concat(apiKey);
  var signature = crypto.createHmac('sha256', apiKey).update(stringToSign).digest('hex');
  return signature;
}

function makePayment() {
  var vaNumber, apiKey, method, requestBody, requestOptions, response, result;
  return regeneratorRuntime.async(function makePayment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          vaNumber = "0000001221723861"; // VA iPaymu

          apiKey = "SANDBOXEF649FC8-F90F-4E29-9C47-B33167239B9A-20220326121000"; // Api Key iPaymu (dapatkan dari dashboard iPaymu)

          method = "POST"; // Metode HTTP

          requestBody = {
            name: "Buyer",
            phone: "087848716933",
            email: "commandx183@gmail.com",
            amount: "10000",
            notifyUrl: "https://heeru.cloud",
            expired: "24",
            expiredType: "hours",
            comments: "ini pambayaran untuk pesanan 1",
            referenceId: "1",
            paymentMethod: "va",
            paymentChannel: "bri",
            "product[]": ["konsul 1"],
            "qty[]": ["1"],
            "price[]": ["100000"],
            "weight[]": ["1"],
            "width[]": ["1"],
            "height[]": ["1"],
            "length[]": ["1"],
            deliveryArea: "76111",
            deliveryAddress: "Denpasar"
          }; // Menyisipkan signature ke dalam objek request header

          requestOptions = {
            method: method,
            headers: {
              "Content-Type": "application/json",
              "va": vaNumber,
              "signature": generateSignature(method, vaNumber, requestBody, apiKey),
              "timestamp": new Date().toISOString().replace(/[-:.]/g, '').replace('T', '').slice(0, 14)
            },
            body: JSON.stringify(requestBody),
            redirect: 'follow'
          };
          _context.next = 8;
          return regeneratorRuntime.awrap(fetch("https://sandbox.ipaymu.com/api/v2/payment/direct", requestOptions));

        case 8:
          response = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(response.text());

        case 11:
          result = _context.sent;
          console.log(result);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log('error', _context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
} // Panggil fungsi makePayment untuk melakukan pembayaran


makePayment();