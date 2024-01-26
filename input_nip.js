let nip='00'

document.getElementById("submitBtn").addEventListener("click", function() {
    var inputField = document.getElementById("exampleFormControlInput1");
    var errortext=document.getElementById("errortext")
       
    if (inputField.value.trim() === "") {
        // alert("Please input your NIP.");
        errortext.innerHTML="Please input your NIP"
        errortext.classList.remove("hide")
        return false; // Prevent form submission
    }else{
        if (inputField.value==nip) {
            // alert("user ada")
            window.location.href="./sign_up2.html"            
        }else{
            errortext.innerHTML="User not found"
            errortext.classList.remove("hide")
        }
    }
    });
      