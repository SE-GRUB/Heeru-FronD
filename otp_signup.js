import 'main.js'

async function initotp(){
    await requestdata('checkOTP');
    document.getElementById("submitBtn").addEventListener("click", function() {
        var inputField = document.getElementById("otpinput");
        var errortext=document.getElementById("errortext")
           
        if (inputField.value.trim() === "") {
            // alert("Please input your NIP.");
            errortext.innerHTML="Please input your OTP code"
            errortext.classList.remove("hide")
            return false; // Prevent form submission
        }else{
            if (inputField.value==otp) {
                // alert("user ada")
                var pass = localStorage.getItem('password')
                if(pass == ''){
                    localStorage.removeItem('password');
                    window.location.href="./setup.html"          
                } else{
                    localStorage.removeItem('password');
                    window.location.href="./login.html"          
                }
            }else{
                errortext.innerHTML="Error! OTP code incorrect"
                errortext.classList.remove("hide")
            }
        }
        });
}

