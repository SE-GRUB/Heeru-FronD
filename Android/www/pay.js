const crypto = require('crypto');

// Fungsi untuk menghasilkan signature
function generateSignature(method, vaNumber, requestBody, apiKey) {
    const requestBodyHash = crypto.createHash('sha256').update(JSON.stringify(requestBody)).digest('hex').toLowerCase();
    const stringToSign = `${method}:${vaNumber}:${requestBodyHash}:${apiKey}`;
    const signature = crypto.createHmac('sha256', apiKey).update(stringToSign).digest('hex');
    return signature;
}

async function makePayment() {
    try {
        const vaNumber = "0000001221723861"; // VA iPaymu
        const apiKey = "SANDBOXEF649FC8-F90F-4E29-9C47-B33167239B9A-20220326121000"; // Api Key iPaymu (dapatkan dari dashboard iPaymu)
        const method = "POST"; // Metode HTTP
        const requestBody = {
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
        };

        // Menyisipkan signature ke dalam objek request header
        const requestOptions = {
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

        const response = await fetch("https://sandbox.ipaymu.com/api/v2/payment/direct", requestOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
}

// Panggil fungsi makePayment untuk melakukan pembayaran
makePayment();
