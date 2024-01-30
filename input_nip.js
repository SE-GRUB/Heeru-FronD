let alldata = {};
let nip = "0";
let nomor = "0";

function requestdata(param){
    return fetch(`http://localhost:8000/${param}`)
        .then(response => response.json())
        .then(data => alldata = data);
}

document.getElementById("submitBtn").addEventListener("click", function() {
    var inputField = document.getElementById("nipinput");
    var errortext=document.getElementById("errortext")
       
    if (inputField.value.trim() === "") {
        errortext.innerHTML = "Please input your NIP";
        errortext.classList.remove("hide");
        return false;
    } else {
        // requestdata(`ceknip?nip=${inputField.value}`);
        // nip = alldata.data["NIP"];
        // nomor = alldata.data["NOMOR"];
        // if (inputField.value == nip) {
        //     errortext.innerHTML = "User not found";
        //     errortext.classList.remove("hide");
        //     window.location.href = "./sign_up2.html";
        // } else {
        //     errortext.innerHTML = alldata.message;
        //     errortext.classList.remove("hide");
        // }


        if (inputField.value==nip) {
            // alert("user ada")
            window.location.href="./sign_up2.html"            
        }else{
            errortext.innerHTML="User not found"
            errortext.classList.remove("hide")
        }

    }
});
