let alldata = {};
let nip = "";
let no_telp = "";
let user_id = "";
let username = "";
let email = "";

var histhost

histhost='http://127.0.0.1:8000/'
// histhost='http://47.245.121.87/Heeru-BackD/public/'
// histhost='https://enp.lahoras.my.id/'

async function requestdata(param){
    return fetch(`${histhost}api/${param}`)
        .then(response => response.json())
        .then(data => alldata = data)
}

function initpoin() {
    // alert("jalan 1")
    async function ceknip() {
        // alert("Jalan 2")
        var inputField = document.getElementById("nipinput");
        var errortext=document.getElementById("errortext")
           
        if (inputField.value.trim() === "") {
            errortext.innerHTML = "Please input your NIP";
            errortext.classList.remove("hide");
            return false;
        } else {
            await requestdata(`checkuser?nip=${inputField.value}`);
            try {
                // alert("Ga Jelas")
                nip = alldata.user["nip"];
                username = alldata.user["name"];
                localStorage.setItem('username', username);
                no_telp = alldata.user["no_telp"];
                localStorage.setItem('no_telp', no_telp);
                user_id = alldata.user['id'];
                localStorage.setItem('user_id', user_id);
                email = alldata.user['email'];
                localStorage.setItem('email', email);
                password = alldata.user['password'];
                localStorage.setItem('password', password);
                if (inputField.value == nip) {
                    // errortext.classList.remove("hide");
                    window.location.href = "./sign_up2.html";
                } 
            } catch (error) {
                errortext.innerHTML = alldata.message;
                errortext.classList.remove("hide");
            }
        }
    }
    
    document.getElementById("submitBtn").addEventListener("click",ceknip);
}

function initpoin2(){
    let phonenumber=localStorage.getItem('no_telp');

    document.getElementById("submitBtn").addEventListener("click", function() {
        var inputField = document.getElementById("PhoneNumberinput");
        var errortext = document.getElementById("errortext")
        
        var phoneNumber = inputField.value.trim();
        if (phoneNumber === "") {
            errortext.innerHTML="Please input your Phone Number"
            errortext.classList.remove("hide")
            return false;
        }else{
            if (phoneNumber.charAt(0) === '8') {
                inputField.value = '0' + phoneNumber;
            }

            if (inputField.value==phonenumber) {
                window.location.href="./otp_signup.html"            
            }else{
                inputField.value = phoneNumber;
                errortext.innerHTML="Phone number is not registered, please contact your PIC"
                errortext.classList.remove("hide")
            }
        }
    });

}

function initpoin3() {
    var names = localStorage.getItem('username');
    var dataNama = document.getElementById("databaseName");

    dataNama.innerHTML = names;

    document.addEventListener('DOMContentLoaded', function() {
        var emailInput = document.getElementById("emailinput");
        var storedEmail = localStorage.getItem('email');
        if (storedEmail !== null) {
            emailInput.value = storedEmail;
        }
    });

    document.getElementById("submitBtn").addEventListener("click", async function() {
        var email = document.getElementById("emailinput");
        var password = document.getElementById('passwordinput');
        var password_confirmation = document.getElementById('passwordconfirmationinput');


        var errortext=document.getElementById("errortext");
        var errortext2=document.getElementById("errortext2");
        var errortext3=document.getElementById("errortext3");        
        
        
        if (email.value.trim() === "") {
            errortext.innerHTML = "Please input your email address";
            errortext.classList.remove("hide");
            // return false;
        } else {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                errortext.innerHTML = "Email address is not valid";
                errortext.classList.remove("hide");
                // return false;
            }else{
                errortext.classList.add('hide');
                if (password.value.trim() === "") {
                    errortext2.innerHTML="Please input your Password"
                    errortext2.classList.remove("hide")
                }else{
                    if(!/[A-Z]/.test(password.value)){
                        errortext2.innerText = "Your password must contain at least one uppercase letter";
                        errortext2.classList.remove("hide");
                    }{
                        if (password.value.length < 8 ) {
                            errortext2.innerHTML = "Password must be at least 8 characters long";
                            errortext2.classList.remove("hide");
                        } else {
                            if(!/[a-z]/.test(password.value)){
                                errortext2.innerText = "Your password must contain at least one lowercase letter";
                                errortext2.classList.remove("hide");
                            }else{
                                if(!/\d/.test(password.value)){
                                    errortext2.innerText = "Your password must contain at least one number.";
                                    errortext2.classList.remove("hide");
                                }else{
                                    errortext2.classList.add('hide');
                                    if (password_confirmation.value.trim() === "") {
                                        errortext3.innerHTML = "Please input your password confirmation";
                                        errortext3.classList.remove("hide");
                                        // return false;
                                    } else {
                                        
                                        if (password.value !== password_confirmation.value) {
                                                errortext3.innerHTML = "Your password and password confirmation do not match";
                                                errortext3.classList.remove("hide");
                                            } else {
                                                await requestdata(`updateProfile?user_id=${localStorage.getItem('user_id')}&email=${email.value}&password=${password.value}`)
                                                window.location.href = "./MainApk/home.html";
                                                return true;
                                            }
                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    });
}

function initpoin4() {
    var names = localStorage.getItem('username');
    var dataNama = document.getElementById("databaseName");

    dataNama.innerHTML = names;

    document.getElementById("submitBtn").addEventListener("click", async function() {
        var password = document.getElementById('passwordinput');
        var pass = localStorage.getItem('password');
        var errortext=document.getElementById("errortext");     
        
        
         if (password.value.trim() === "") {
                errortext.innerHTML="Please input your Password"
                errortext.classList.remove("hide")
            }else{
                await requestdata(`checkPass?password=${password.value}&pass=${pass}`)

                if (alldata[0] === 200) {
                    errortext.classList.add("hide");
                    window.location.href = "./MainApk/home.html";
                    return true;
                } else {
                    errortext.innerHTML = "Password Incorrect";
                    errortext.classList.remove("hide");
                }
            }
        return false;
    });
}


async function initpoin5() {
    await requestdata(`categoryName`)

    var container = document.getElementById('containerisi');


    for(var i = 0; i < Object.keys(alldata.report_categories).length; i+=3){
        var row = document.createElement('div');
        row.className = 'row';
        for(var j = 0; j < 3 && (i + j) < Object.keys(alldata.report_categories).length; j++){
            var weight = alldata.report_categories[i + j].weight;
            var category_name = alldata.report_categories[i + j].category_name;
            var category_id = alldata.report_categories[i + j].id;


            var colElement = document.createElement('button');
            colElement.className = 'col bobot' + weight;
            colElement.id = category_id;

            var teksElement = document.createElement('div');
            teksElement.className = 'teks';
            teksElement.id = 'col bobot' + weight;
            teksElement.textContent = category_name;

            colElement.appendChild(teksElement);
            row.appendChild(colElement);
        }
        container.appendChild(row);
    }

    
    for (var i = 0; i < Object.keys(alldata.report_categories).length; i++) {
        var categoryId = alldata.report_categories[i].id;
        
        console.log("Get Element by ID : " + categoryId);
    
        document.getElementById(categoryId).addEventListener("click", createClickListener(categoryId));
    }

    var currentClickedElement = null;
    document.getElementById('buttonnext').style.display = 'none';

    function createClickListener(categoryId) {
        return function () {
            var element = document.getElementById(categoryId);

            if (currentClickedElement !== null) {
                // Remove 'clicked' class from the previously clicked element
                currentClickedElement.classList.remove('clicked');
            }

            // If the clicked element is not the currently clicked one
            if (currentClickedElement !== element) {
                localStorage.setItem('category_id', categoryId);
                document.getElementById('buttonnext').style.display = 'block';
                element.classList.add('clicked');
                currentClickedElement = element;
            } else {
                // Toggle the display of the 'buttonnext' element if the same element is clicked again
                var buttonNext = document.getElementById('buttonnext');
                buttonNext.style.display = buttonNext.style.display === 'none' ? 'block' : 'none';
            }
        };
    }

}
    


