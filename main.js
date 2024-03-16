let alldata = {};
let nip = "";
let no_telp = "";
let user_id = "";
let username = "";
let email = "";
let profile_pic = "";
var histhost;

var datasession = [];
// tanggal expired 1 bulan dari sekarang
var histhost = 'http://127.0.0.1:8000/';    
// var histhost = 'http://172.16.31.107:8000/';
// var histhost = 'http://47.245.121.87/Heeru-BackD/public/';
// var histhost = 'https://enp.lahoras.my.id/';

function poinexp() {
    try {
        var expired = sessionStorage.getItem('timeout');
        // alert(expired);
        if (expired === null || new Date() > new Date(expired)) {
            document.getElementById("wep").innerHTML = "Your session has expired, please login again";
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = 'input_nip.html';
        } else {
            expired = new Date(new Date().setMonth(new Date().getMonth() + 1)).toString();
            sessionStorage.setItem('timeout', expired);
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function showLoading() {
    document.getElementById("loadingContainer").style.display = "flex";
}

function hideLoading() {
    document.getElementById("loadingContainer").style.display = "none";
}

async function requestdata(param) {
    try {
        const response = await fetch(`${histhost}api/${param}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        alldata = data;
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
    return false;
}

async function requestdata2(param) {
    try {
        showLoading();
        const response = await fetch(`${histhost}api/${param}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        alldata = data;
        hideLoading();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        hideLoading();
        throw error;
    }
    return false;
}

function formatCurrency(amount) {
    var parts = amount.toFixed(2).split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return "Rp " + parts.join(",");
}

function timeAgo(dateString) {
    const previousDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - previousDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days + " days ago";
    } else if (hours > 0) {
        return hours + " hours ago";
    } else if (minutes > 0) {
        return minutes + " minutes ago";
    } else {
        return seconds + " seconds ago";
    }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function initpoin() {
    async function ceknip() {
        var inputField = document.getElementById("nipinput");
        var errortext = document.getElementById("errortext");
           
        if (inputField.value.trim() === "") {
            errortext.innerHTML = "Please input your NIP";
            errortext.classList.remove("hide");
            return false;
        } else {
            alldata = await requestdata(`checkuser?nip=${inputField.value}`);
            try {
                if (alldata.success) {
                    nip = alldata.user["nip"];
                    username = alldata.user["name"];
                    localStorage.setItem('username', username);
                    no_telp = alldata.user["no_telp"];
                    localStorage.setItem('no_telp', no_telp);
                    user_id = alldata.user['user_id'];
                    localStorage.setItem('user_id', user_id);
                    email = alldata.user['email'];
                    localStorage.setItem('email', email);
                    profile_pic = alldata.user['profile_pic'];
                    localStorage.setItem('profile_pic', profile_pic);
                    password = alldata.user['password'];
                    localStorage.setItem('password', password);
                    window.location.href = "./sign_up2.html";
                    return true;
                }
                else {
                    errortext.innerHTML = alldata.message;
                    errortext.classList.remove("hide");
                }
                
            } catch (error) {
                errortext.innerHTML = alldata.message;
                errortext.classList.remove("hide");
            }
        }
    }
    
    document.getElementById("submitBtn").addEventListener("click", ceknip);
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
                localStorage.removeItem('no_telp');
                window.location.href="./otp_signup.html";        
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
            localStorage.removeItem('email');
        }

        var togglePassword = document.getElementById('togglePassword');
        var togglePassword2 = document.getElementById('togglePassword2');
        var showPasswordIcon = document.getElementById("showPasswordIcon");
        var showPasswordIcon2 = document.getElementById("showPasswordIcon2");
        var password = document.getElementById('passwordinput');
        var passwordconfirmationinput = document.getElementById('passwordconfirmationinput');

        togglePassword.addEventListener('click', function() {
            var type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);

            if (type === 'text') {
                showPasswordIcon.classList.remove("fa-eye");
                showPasswordIcon.classList.add("fa-eye-slash");
            } else {
                showPasswordIcon.classList.remove("fa-eye-slash");
                showPasswordIcon.classList.add("fa-eye");
            }
        });
        togglePassword2.addEventListener('click', function() {
            var type = passwordconfirmationinput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordconfirmationinput.setAttribute('type', type);

            if (type === 'text') {
                showPasswordIcon2.classList.remove("fa-eye");
                showPasswordIcon2.classList.add("fa-eye-slash");
            } else {
                showPasswordIcon2.classList.remove("fa-eye-slash");
                showPasswordIcon2.classList.add("fa-eye");
            }
        });
    });

    document.getElementById('fileInput').addEventListener('change', function (event) {
        const fileInput = event.target;
        document.getElementById("pensil").style.display = "none";
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('profileImage').src = e.target.result;
                document.getElementById("profileImage").style.display = "block";
            };

            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    document.getElementById("submitBtn").addEventListener("click", async function() {
        var email = document.getElementById("emailinput");
        var password = document.getElementById('passwordinput');
        var password_confirmation = document.getElementById('passwordconfirmationinput');
        var profile_pic = document.getElementById('fileInput');

        var errortext=document.getElementById("errortext");
        var errortext2=document.getElementById("errortext2");
        var errortext3=document.getElementById("errortext3");   
        
        if(profile_pic.files.length === 0){
            errortext3.innerHTML="Choose your photo profile"
            errortext3.classList.remove("hide")
        }else{
            errortext3.classList.add("hide")
        }

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
            }
        }

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
                        }
                    }
                }
            }
        }

        if (password_confirmation.value.trim() === "") {
            errortext3.innerHTML = "Please input your password confirmation";
            errortext3.classList.remove("hide");
        } else {
            
            if (password.value !== password_confirmation.value) {
                    errortext3.innerHTML = "Your password and password confirmation do not match";
                    errortext3.classList.remove("hide");
                } else {
                    profile_pic = profile_pic.files[0];

                    var formData = new FormData();
                    formData.append('profile_pic', profile_pic);
                    formData.append('email', email.value);
                    formData.append('password', password.value);
                    formData.append('user_id', localStorage.getItem('user_id'));

                    await $.ajax({
                        url: `${histhost}api/updateProfile`,
                        method: 'POST',
                        processData: false,
                        contentType: false,
                        data: formData,
                        success: function (response) {
                            if (response.success) {
                                window.location.href = "./MainApk/home.html";
                                return true;
                            } else {
                                // console.error('Error:', response.message);
                                errortext3.innerHTML = "Error in updating your data!";
                                errortext3.classList.remove("hide");
                            }
                        },
                    });
                }
            
        }
        if (password_confirmation.value.trim() === "") {
            errortext3.innerHTML = "Please input your password confirmation";
            errortext3.classList.remove("hide");
        } else {
            if (password.value !== password_confirmation.value) {
                    errortext3.innerHTML = "Your password and password confirmation do not match";
                    errortext3.classList.remove("hide");
                } else {
                    errortext3.classList.add("hide");
                    profile_pic = profile_pic.files[0];

                    var formData = new FormData();
                    formData.append('profile_pic', profile_pic);
                    formData.append('email', email.value);
                    formData.append('password', password.value);
                    formData.append('user_id', localStorage.getItem('user_id'));

                    await $.ajax({
                        url: `${histhost}api/updateProfile`,
                        method: 'POST',
                        processData: false,
                        contentType: false,
                        data: formData,
                        success: function (response) {
                            if (response.success) {
                                window.location.href = "./MainApk/home.html";
                                return true;
                            } else {
                                errortext3.innerHTML = "Error in updating your data!";
                                errortext3.classList.remove("hide");
                            }
                        },
                    });
                }
        }
        return false;
    });
}

function initpoin4() {

    expired = new Date(new Date().setMonth(new Date().getMonth() + 1)).toString();
    sessionStorage.setItem('timeout', expired);
    
    const profile_pic = localStorage.getItem('profile_pic');
    const names = localStorage.getItem('username');
    const dataNama = document.getElementById("databaseName");
    const profileImage = document.getElementById('profileImage');
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('passwordinput');
    const errortext = document.getElementById("errortext");
    const submitBtn = document.getElementById("submitBtn");
    const showPasswordIcon = document.getElementById("showPasswordIcon");

    profileImage.src = `${histhost}${profile_pic}`;
    dataNama.innerHTML = names;

    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        showPasswordIcon.classList.toggle("fa-eye");
        showPasswordIcon.classList.toggle("fa-eye-slash");
    });

    submitBtn.addEventListener("click", async function() {
        const passwordValue = password.value.trim();
        
        if (passwordValue === "") {
            errortext.innerHTML = "Please input your Password";
            errortext.classList.remove("hide");
        } else {
            try {
                const requestData = await requestdata(`checkPass?password=${passwordValue}&user_id=${localStorage.getItem('user_id')}`);
                
                if (requestData.success) {
                    window.location.href = "./MainApk/home.html";
                    return true;
                } else {
                    errortext.innerHTML = requestData.message;
                    errortext.classList.remove("hide");
                    return false;
                }
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    });

    // 
}

function initpoin6() {

    document.getElementById("nextBtn").addEventListener("click", async function() {
        var title = document.getElementById('title');
        var w1 = document.getElementById('w1');
        var w2 = document.getElementById('w2');
        var w3 = document.getElementById('w3');
        var w4 = document.getElementById('w4');
        var w5 = document.getElementById('w5');
        var h1 = document.getElementById('h1');
        
        var errortext=document.getElementById("errortext");
        var errortext1=document.getElementById("errortext1");
        var errortext2=document.getElementById("errortext2");
        var errortext3=document.getElementById("errortext3");
        var errortext4=document.getElementById("errortext4");
        var errortext5=document.getElementById("errortext5");     
        var errortext6=document.getElementById("errortext6");
        
        if (title.value.trim() === "") {
            errortext.innerHTML="Please provide a title for your report";
            errortext.classList.remove("hide");
        }else{
            errortext.classList.add("hide");
        }
        if (w1.value.trim() === "") {
            errortext1.innerHTML="Please answer this question";
            errortext1.classList.remove("hide");
        }else{
            errortext1.classList.add("hide");
        }
        if(w2.value.trim() === ""){
            errortext2.innerHTML="Please answer this question";
            errortext2.classList.remove("hide");
        }else{
            errortext2.classList.add("hide");
        }
        if(w3.value.trim() === ""){
            errortext3.innerHTML="Please answer this question";
            errortext3.classList.remove("hide");
        }else{
            errortext3.classList.add("hide");
        }
        if(w4.value.trim() === ""){
            errortext4.innerHTML="Please answer this question";
            errortext4.classList.remove("hide");
        }else{
            errortext4.classList.add("hide");
        }
        if(w5.value.trim() === ""){
            errortext5.innerHTML="Please answer this question";
            errortext5.classList.remove("hide");
        }else{
            errortext5.classList.add("hide");
        }
        if(h1.value.trim() === ""){
            errortext6.innerHTML="Please answer this question";
            errortext6.classList.remove("hide");
        }else{
            errortext6.classList.add("hide");
            localStorage.setItem('title', title.value);
            var details = {
                w1: w1.value,
                w2: w2.value,
                w3: w3.value,
                w4: w4.value,
                w5: w5.value,
                h1: h1.value
            };
            var detailsJSON = JSON.stringify(details);
            localStorage.setItem('details', detailsJSON);
            window.location.href = "laporanBukti.html";
            return true;
        }
        return false;
    });
}

async function initpoin5() {
    await requestdata2('categoryName');

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
        
        document.getElementById(categoryId).addEventListener("click", createClickListener(categoryId));
    }

    var currentClickedCategoryId = null;

    function createClickListener(categoryId) {
        return function () {
            var buttonNext = document.getElementById('buttonnext');
            var element = document.getElementById(categoryId);

            if (currentClickedCategoryId !== null) {
                // Remove 'clicked' class from the previously clicked element
                var previousClickedElement = document.getElementById(currentClickedCategoryId);
                previousClickedElement.classList.remove('clicked');
    
                // Reset localStorage and hide the button if the same element is clicked again
                if (currentClickedCategoryId === categoryId) {
                    localStorage.removeItem('category_id');
                    buttonNext.style.display = 'none';
                    currentClickedCategoryId = null;
                    return;
                }
            }

           // Store categoryId in localStorage
            localStorage.setItem('category_id', categoryId);
            // console.log(localStorage.getItem('category_id'));

            // Add 'clicked' class to the clicked element
            element.classList.add('clicked');

            // Toggle the display of the 'buttonnext' element
            buttonNext.style.display = buttonNext.style.display === 'none' ? 'block' : 'none';

            // Update currentClickedCategoryId
            currentClickedCategoryId = categoryId;
        };
    }
}

async function initpoin7(){
    $(document).ready(async function(){
        document.getElementById("errortext1").classList.remove("hide");
        var modal = new bootstrap.Modal(document.getElementById("SRmodal"));

        var evidence = document.getElementById("formFileMultiple");
        var errortext = document.getElementById("errortext");
        document.getElementById("submitBtn").addEventListener("click", async function() {
            var username = localStorage.getItem('username');
            if(username){
                document.getElementById('whistleblower').innerHTML = username;
                document.getElementById('whistleblowers').innerHTML = username;
            }
            
            if(evidence.files.length === 0){
                errortext.innerHTML="Eviddence  is required"
                errortext.classList.remove("hide")
            }else{
                errortext.classList.add("hide")
                modal.show();
            }
        });

        $('#acceptTerms').change(function() {
            var isChecked = $(this).prop("checked");
            if (isChecked) {
                document.getElementById("errortext1").classList.add("hide");
            }else{
                document.getElementById("errortext1").classList.remove("hide");
            }
            $("#proceedBtn").prop("disabled", !isChecked);
        });

        document.getElementById("closeBtn").addEventListener("click", function() {
            modal.hide();
        });

        document.getElementById("proceedBtn").addEventListener("click", async function(){
            var title = localStorage.getItem('title');
            var category_id = localStorage.getItem('category_id');
            var user_id = localStorage.getItem('user_id');
            var details = localStorage.getItem('details');
            var files = document.getElementById("formFileMultiple").files;

            var formData = new FormData();
            formData.append('title', title);
            formData.append('details', details);
            formData.append('category_id', category_id);
            formData.append('user_id', user_id);

            for (var i = 0; i < files.length; i++) {
                formData.append('evidence[]', files[i]);
            }

            await $.ajax({
                url: `${histhost}api/makereport`,
                method: 'POST',
                processData: false,
                contentType: false,
                data: formData,
                success: function (response) {
                    if (response.success) {
                        localStorage.removeItem('title');
                        localStorage.removeItem('category_id');
                        localStorage.removeItem('details');
                        window.location.href = "laporanThankyou.html";
                    } else {
                        console.error('Error:', response.message);
                    }
                },
                error: function (error) {
                    console.error('Error:', error);
                }
            });
        });
    })
}

async function initpoin8() {
    // inisiasi globla variable
    await requestdata2('counselorList');      
    var sortedUsers = Object.values(alldata.users).sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    // untuk menggunakan pencarian
    function pencarian() {
        var searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('change', function() {
            var valuenya=this.value.toLowerCase();
            var filteredUsers
            if(valuenya){
                filteredUsers = sortedUsers.filter(function(user) {
                    return user.name.toLowerCase().includes(valuenya);
                });
            }else{
                filteredUsers = sortedUsers;
            }
            listdokter(filteredUsers);
        });
    }

    // list dokter dari counsellorList    
    function listdokterowl() {
        var ul = document.getElementById('carouselExample');
        var template = ''; 
        alldata.users.forEach(index => {
            console.log(index)
            var id = index.user_id;
            var name = index.name;
            var rating = index.rating;
            var fare = index.fare;
            var profile_pic = index.profile_pic;
            profile_pic=profile_pic ? histhost+profile_pic: histhost+'Admin/images/profile.jpg'
            template += `
            <li class="carousel inner card dpilist" id="${id}">
                <img class="dct_img" src="${profile_pic}">
                <div class="NamaJob">
                    <h5>${name}</h5>
                    <div class="rating">
                        <i data-rating="${rating}">
                            <span>${rating}</span>
                        </i>
                    </div>
                    <p>${formatCurrency(parseFloat(fare))}</p>
                </div>
            </li>
            `
        });
        ul.innerHTML = template;
        var dpilist = document.getElementsByClassName('dpilist');  
        for (var i = 0; i < dpilist.length; i++) {
            dpilist[i].addEventListener('click', function(e) {
                var id = this.id
                sessionStorage.setItem('dokter_id', id);
                window.location.href = `./detail_dokter.html?id=${id}`;
            });
        }
    }

    // show dokter yang di sort 
    function listdokter(sortedUsers) {
        var ul = document.getElementById('sortdoctor');
        var template = '';

        sortedUsers.forEach(user => {
            var id = user.user_id;
            var name = user.name;
            var rating = user.rating;
            var fare = user.fare;
            var profile_pic = user.profile_pic;
            profile_pic=profile_pic ? histhost+profile_pic: histhost+'Admin/images/profile.jpg'

            template += `
            <div class="sortcard ndv" id="${id}">
                <img src="${profile_pic}" alt="Doctor avatar">
                <div class="sortcard-info">
                    <h3>${name}</h3>
                    <p>${formatCurrency(parseFloat(fare))}</p>
                    <div class="rating">
                        <i data-rating="${rating}">
                            <span>${rating}</span>
                        </i>
                    </div>
                </div>
            </div>
            `
        });
        ul.innerHTML = template;
        
         var ndv = document.getElementsByClassName('ndv'); 
         for (var i = 0; i < ndv.length; i++) {
             ndv[i].addEventListener('click', function(e) {
                 var id = this.id
                 sessionStorage.setItem('dokter_id', id);
                 window.location.href = `./detail_dokter.html?id=${id}`;
             });
         }
    }

    listdokterowl();
    listdokter(sortedUsers);
    pencarian();

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:5,
        nav:false,
        responsive:{
            0:{
                items:2.3
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
        }
    })
}

async function initpoin9() {
    await requestdata('counselorShow?user_id=' + sessionStorage.getItem('dokter_id'));

    console.log(alldata.users.name);

    var ul = document.getElementById('carouselExample');
    var data = {
        namedoctor: alldata.users.name,
        // jobpoin: alldata.users.rating + " bintang",
        start: alldata.users.rating + " bintang",
        Harga: alldata.users.fare,
        success: "0",
        listbit: alldata.users.description ? alldata.users.description : 'Description not available!',
        imghip: alldata.users.profile_pic ? histhost + alldata.users.profile_pic : histhost + 'Admin/images/profile.jpg'
    };

    function initdokter(data) {
        document.getElementById("namedoctor").innerHTML = data.namedoctor;
        document.getElementById("jobpoin").innerHTML = data.jobpoin;
        document.getElementById("irating").setAttribute("data-rating", data.start);
        document.getElementById("start").innerHTML = "(" + data.start + ")";
        document.getElementById("Harga").innerHTML = data.Harga;
        document.getElementById("listbit").innerHTML = data.listbit;
        document.getElementById("imghip").src = data.imghip;
    }

    async function initPopular() {
        await requestdata2('counselorList');
        var ul = document.getElementById('carouselExample');
        var template = ''; 
        alldata.users.forEach(index => {
            console.log(index)
            var id = index.user_id;
            var name = index.name;
            var rating = index.rating;
            var fare = index.fare;
            var profile_pic = index.profile_pic;
            profile_pic=profile_pic ? histhost+profile_pic: histhost+'Admin/images/profile.jpg'
            template += `
            <li class="carousel inner card dpilist" id="${id}">
                <img class="dct_img" src="${profile_pic}">
                <div class="NamaJob">
                    <h5>${name}</h5>
                    <div class="rating">
                        <i data-rating="${rating}">
                            <span>${rating}</span>
                        </i>
                    </div>
                    <p>${formatCurrency(parseFloat(fare))}</p>
                </div>
            </li>
            `
        });
        ul.innerHTML = template;
        var dpilist = document.getElementsByClassName('dpilist');  
        for (var i = 0; i < dpilist.length; i++) {
            dpilist[i].addEventListener('click', function(e) {
                var id = this.id
                sessionStorage.setItem('dokter_id', id);
                window.location.href = `./detail_dokter.html?id=${id}`;
            });
        }
    }

    async function initskj() {
        var jadwal = {
            1: "08:00-09:00",
            2: "09:00-10:00",
            3: "10:00-11:00",
            4: "11:00-12:00",
            5: "13:00-14:00",
            6: "14:00-15:00",
            7: "15:00-16:00",
            8: "16:00-17:00",
            9: "17:00-18:00"
        };
        var time = document.getElementById("Test_DatetimeLocal").value;
        var notav = [];
        try {
            var response = await fetch(`${histhost}api/counSlot?time=${time}`);
            var data = await response.json();
            console.log(data.time);
            data=data.time;
            notav = data.map(item => parseInt(item.duration));
            notav.forEach((duration) => {
                delete jadwal[duration];
            });

            var selectopt = document.getElementById("selectopt");
            selectopt.innerHTML = "";
            for (var key in jadwal) {
                if (jadwal.hasOwnProperty(key)) {
                    var option = document.createElement("option");
                    option.value = key;
                    option.textContent = jadwal[key];
                    selectopt.appendChild(option);
                }
            }
        } catch (error) {
            console.error("Error fetching or parsing data:", error);
        }
    }

    async function generatepaymend() {
    var iddokter = sessionStorage.getItem('dokter_id');
    var idpasien = localStorage.getItem('user_id');
    var waktu = document.getElementById("Test_DatetimeLocal").value;
    var jam = document.getElementById("selectopt").value;
    // var uri='http://'+window.location.hostname+':5500/Konsultasi_dokter/list.html'
    var uri='http://'+window.location.hostname+':5500/Konsultasi_dokter/list.html'
    var data = {
        iddokter: iddokter,
        idpasien: idpasien,
        waktu: waktu,
        jam: jam,
        success: '"'+uri+'"',
    };

    try {
        var response = await fetch(`${histhost}pembayaran?student_id=${idpasien}&counselor_id=${iddokter}&consultation_date=${waktu}&duration=${jam}&success=${uri}`);
        var responseData = await response.json();
        if (responseData['url']) {
            window.location.href=responseData['url'];
        } else {
            console.error("Error in generating payment:", responseData.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error in generating payment");
    }
}

    await initskj();
    document.getElementById("Test_DatetimeLocal").addEventListener("change", await initskj);
    document.getElementById("orderpay").addEventListener("click", await generatepaymend);
    initdokter(data);
    await initPopular();
}

async function initpoin10() {
    var user_id = localStorage.getItem("user_id");

    await requestdata2(`pponly?user_id=${user_id}`);
    // console.log(alldata.pp)
    var ppPost = alldata.pp['profile_pic'];
    ppPost = ppPost ? histhost + ppPost : histhost + 'Admin/images/profile.jpg';
    document.getElementById("ppModal").src = ppPost;

    document.getElementById('postImage').addEventListener('change', function() {
        updateHeight(98);
        posterContainer.style.display = 'block';
        var file = this.files[0];
        var reader = new FileReader();
        
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
        }
        
        reader.readAsDataURL(file);
    });      

    let posterContainer = document.querySelector(".community-post");
    let btn = document.querySelector("#openBtn");
    let bottomSheet = document.querySelector(".bottom-sheet");
    let overlay = document.querySelector(".overlay");
    let content = document.querySelector(".content");
    let dragIcon = document.querySelector(".drag-icon");
    
    let isDragging = false,
    startY,
    startHeight;
    
    let updateHeight = (height) => {
    //updating sheet height
    content.style.height = `${height}vh`;

    // if the sheet height is equal to 100 then toggling fullsceen class to bottom sheet
    bottomSheet.classList.toggle("fullscreen", height === 100);
    };

    let showSheet = () => {
    bottomSheet.classList.add("show");
    btn.style.display = "none";
    //updating sheet height with default height 50
    updateHeight(50);

    document.body.style.overflow = "hidden";
    };

    let hideSheet = () => {
    bottomSheet.classList.remove("show");
    btn.style.display = "block";
    document.body.style.overflow = "auto";
    };

    let dragStart = (e) => {
    isDragging = true;
    bottomSheet.classList.add("dragging");
    //recording intitial y position and sheet height
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(content.style.height);
    };

    let dragging = (e) => {
    //return if isDragging is false
    if (!isDragging) return;

    //calculating new height of sheet by using starty and start height
    //calling updateHeight function with new height as argument

    let delta = startY - (e.pageY || e.touches?.[0].pageY);
    let newHeight = startHeight + (delta / window.innerHeight) * 100;

    updateHeight(newHeight);
    };

    let dragStop = () => {
    isDragging = false;
    bottomSheet.classList.remove("dragging");

    //setting sheet height based on the sheet current height or position
    let sheetHeight = parseInt(content.style.height);

    sheetHeight < 25
        ? hideSheet()
        : sheetHeight > 75
        ? updateHeight(100)
        : updateHeight(50);

    //if height is greater than 75 making sheet full screen else making it to 50vh
    };

    dragIcon.addEventListener("mousedown", dragStart);
    dragIcon.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    dragIcon.addEventListener("touchstart", dragStart);
    dragIcon.addEventListener("touchmove", dragging);
    document.addEventListener("touchend", dragStop);

    btn.addEventListener("click", showSheet);
    overlay.addEventListener("click", hideSheet);

    document.getElementById("btnPost").addEventListener("click", async function() {
        var poster = document.getElementById("postImage");
        var post_body = document.getElementById("postBody");

        var errortext=document.getElementById("errortext");

        if (post_body.value.trim() === "") {
            errortext.innerHTML = "Please input your post!";
            errortext.classList.remove("hide");
        } else {
            var formData = new FormData();
            if(poster.files.length != 0){
                poster = poster.files[0];
                formData.append('poster', poster);
            }
            formData.append('post_body', post_body.value);
            formData.append('user_id', user_id);
    
            await $.ajax({
                url: `${histhost}api/createPost`,
                method: 'POST',
                processData: false,
                contentType: false,
                data: formData,
                success: function (response) {
                    if (response.success) {
                        window.location.href = "./MainApk/home.html";
                        return true;
                    } else {
                        errortext.innerHTML = "Error in creating your post!";
                        errortext.classList.remove("hide");
                    }
                },
            });
        }
        
    });

    var badanpost = document.getElementById('badanpost');
    var kotp = [];
    var inp = [];



    function loadComments(dataComment) {
        return dataComment.map(oneonone => {
            var comment = oneonone.comment;
            var namacomment = oneonone.user;
            var profilkomen = oneonone.profilkomen ? histhost + oneonone.profilkomen : histhost + 'Admin/images/profile.jpg';
            return `
                <span class="row">
                    <div class="garis"></div>
                    <div class="col-1">
                        <div class="containerfoto">
                            <img id="profileImage" class="photoprofile2 rounded-circle" src="${profilkomen}" alt="">
                        </div>
                    </div>
                    <div class="bagiantext col-11">
                        <span id="isikomen" class="isikomen">
                            <span id="databaseName" class="databaseName namekomen">${namacomment}</span>
                            ${comment}
                        </span>
                    </div>
                </span>`;
        }).join('');
    }

    async function loadMorePosts(currentPage) {
        await requestdata2('postList?page=' + currentPage + '&user_id=' + localStorage.getItem('user_id'));
        var posting = alldata.posts;

        for (const singgaldatapost of posting) {
            var id = singgaldatapost.post_id;
            var post_body = singgaldatapost.post_body;
            var poster = histhost + singgaldatapost.poster;
            var like = singgaldatapost.like;
            var created_at = singgaldatapost.created_at;
            var profile_pic = singgaldatapost.profile_pic ? histhost + singgaldatapost.profile_pic : histhost + 'Admin/images/profile.jpg';
            var timelib = timeAgo(created_at);
            var name = singgaldatapost.name;
            var totalcomend = singgaldatapost.totalcomments;
            var comment = loadComments(singgaldatapost.comments);
            var isLiked = singgaldatapost.isLiked;

            var loadkonten = `
            <div class="kotakpost" id="kotakpost${id}">
                <div class="bioyangpost">
                    <div class="containerfoto">
                        <img id="profileImage${id}" class="photoprofile rounded-circle" src="${profile_pic}" alt="">
                    </div>
                    <div class="bagtext">
                        <span id="databaseName${id}" class="databaseName namepost">${name}</span><br>
                        <span id="waktungepost${id}" class="waktungepost">${timelib}</span>
                    </div>
                </div>
                ${singgaldatapost.poster ? `
                    <div class="community-post">
                        <div class="image-container">
                            <img src="${poster}" id="imagePreview" alt="Community Post Image" class="post-image" onclick="zoomImage()">
                        </div>
                    </div>` : ''}
                <div class="isipost" id="isipost${id}">
                    ${post_body}
                </div>
                <div class="actionpost">
                    <div class="baglike">
                        <span class="material-symbols-outlined like-btn ${isLiked ? '' : 'unlike'}" data-id="${id}" data-type="${isLiked ? 'unlike' : 'like'}"> favorite </span>
                        <span id="databaseJumlahLike${id}" class="databaseJumlahLike">${like}</span>
                    </div>            
                    <div class="bagreply">
                        <span class="material-symbols-outlined"> reply </span>
                        <span id="databaseJumlahReply${id}" class="databaseJumlahReply">${totalcomend}</span>
                    </div>
                </div>
                <div class="bioyangkomen row" id="komenField${id}">
                    ${comment}
                </div>
            </div>`;
        kotp.push(loadkonten);
        }
        badanpost.innerHTML += kotp.join('');
    }

    async function info2(hit, limit) {
        try {
            await requestdata2('showInfografis');
            if (!alldata.infographics) {
                throw new Error('Data infografis tidak tersedia');
            }
            alldata.infographics.forEach((singgaldatainfo) => {
                const id = singgaldatainfo.id;
                const list = singgaldatainfo.images;

                let buttonsHTML = '';
                let carouselItemsHTML = '';

                list.forEach((image, index) => {
                    const activeClass = index === 0 ? 'active' : '';
                    buttonsHTML += `<button type="button" data-bs-target="#carouselExampleIndicators${id}" data-bs-slide-to="${index}" class="${activeClass} buletin" aria-label="Slide ${index + 1}"></button>`;
                    carouselItemsHTML += `<div class="carousel-item ${activeClass}">
                                            <img src="${histhost + image.image_path}" class="d-block w-100 kustom" alt="...">
                                          </div>`;
                });

                const template = `
                    <div class="boxinfografis">
                        <div id="carouselExampleIndicators${id}" class="carousel slide" data-bs-touch="false">
                            <div class="carousel-indicators">
                                ${buttonsHTML}
                            </div>
                            <div class="carousel-inner">
                                ${carouselItemsHTML}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${id}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${id}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>`;
                inp.push(template);
            });
        } catch (error) {
            console.error(error);
        }
    }

    // async function allpost() {
    //     var hit = 1;
    //     var limit = 10;
    //     var allpost = [];

    //     if (sessionStorage.getItem('hitpost')) {
    //         hit = parseInt(sessionStorage.getItem('post')) + 1;
    //         limit = hit * 10;
    //         allpost = JSON.parse(sessionStorage.getItem('allpost'));
    //     } else {
    //         await info2(hit, limit);
    //         await loadPostingan2(hit, limit);
    //         allpost = kotp.concat(inp);
    //         sessionStorage.setItem('hitpost', hit);
    //         sessionStorage.setItem('allpost', JSON.stringify(allpost));
    //     }

    //     allpost = shuffleArray(allpost);
    //     badanpost.innerHTML += allpost.join('');
    // 
    // function initCreatePost(){
    //     document.getElementById("tulispostnya").src = `${histhost}poincreate?user_id=${localStorage.getItem('user_id')}`;
    // }

    async function allpost() {
        var currentPage = 1;
        // initCreatePost();
        await info2();
        await loadMorePosts(currentPage);
        var allpost = kotp.concat(inp);
        
        allpost = shuffleArray(allpost);
    
        allpost.forEach(element => {
            badanpost.innerHTML += element;
        });
        currentPage++;
    }

    $(window).scroll(function() {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            loadMorePosts();
        }
    });

    await allpost();

    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const postId = this.getAttribute('data-id');
            const type = this.getAttribute('data-type');
            const isActive = this.classList.contains('unlike');
            const action = isActive ? 'like' : 'unlike';
    
            try {
                await requestdata(`like?post_id=${postId}&user_id=${localStorage.getItem('user_id')}&action=${action}`);
    
                if (!alldata.success) {
                    throw new Error('Failed to update like/dislike');
                }
    
                this.classList.toggle('unlike');
    
                const likeCountElement = document.getElementById(`databaseJumlahLike${postId}`);
                likeCountElement.textContent = alldata.likeCount;
    
                this.setAttribute('data-type', isActive ? 'unlike' : 'like');
            } catch (error) {
                console.error(error);
            }
        });
    });    
}

async function initpoin11() {
    var user_id = localStorage.getItem('user_id');
    await requestdata2(`userProfile?user_id=${user_id}`);
    var pp = alldata.user.profile_pic;
    pp=pp ? histhost+pp : histhost+'Admin/images/profile.jpg'
    var profile = `
            <div class="atas">
                <div class="judul">
                    Hello, <span id="username">${alldata.user.name}</span>
                </div>                

                <div class="photoprofile mb-">
                    <div class="lingkarannya" id="profileImageContainer">
                          <img id="profileImage" src="${pp}" alt="" />
                          <input type="file" id="fileInput" accept="image/*" style="display: none;" />
                      </label>
                    </div>
                </div>

            </div>

            <div class="bawah">
                <div class="textjudul">
                    Personal Information
                </div>

                <div class="datadiri">
                    <div class="jenis">
                        Name
                    </div>
                    <span id="profNama" class="daridata">
                        ${alldata.user.name}
                    </span>

                    <div class="jenis">
                        No. Hp
                    </div>
                    <span id="profNoTelp"  class="daridata">
                        ${alldata.user.no_telp}
                    </span>

                    <div class="jenis">
                        Email
                    </div>
                    <span id="profEmail"  class="daridata">
                        ${alldata.user.email}
                    </span>
                </div>

                <div class="tombolnya">
                    <a href="confirmPw.html" class="buatedit">
                        <button class="buatedit">
                            Change Password
                        </button>
                    </a>
                </div>

                <div class="tombolnya2">
                    <button class="buatlogout" id="buttonLogout">
                        Logout
                    </button>
                </div>

                <div class="copyright">
                    <p>
                        © 2024 Heeru
                    </p>
                </div>

            </div>
    `
    document.getElementById("badanProfile").innerHTML =  profile;

    document.getElementById("buttonLogout").addEventListener("click", async function() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '../../index.html'
    });
}

// function initPost(){
//     $(document).ready(async function(){
//         document.getElementById("errortext1").classList.remove("hide");
//         var modal = new bootstrap.Modal(document.getElementById("qui"));
//         var user_id = new document.getElementById("user_id");
//         var post_body = new document.getElementById("post_body");
//         var poster = new document.getElementById("poster");
//         document.getElementById("postButton").addEventListener("click", async function() {
//             var formData = new FormData();
//             formData.append('user_id', title);
//             formData.append('post_body', post_body);
//             formData.append('poster', poster);
//         });

//         await $.ajax({
//             url: `${histhost}api/createPost`,
//             method: 'POST',
//             processData: false,
//             contentType: false,
//             data: formData,
//             success: function (response) {
//                 if (response.success) {
//                     localStorage.removeItem('post_body');
//                     localStorage.removeItem('poster');
//                     window.location.href = "home.html";
//                 } else {
//                     console.error('Error:', response.message);
//                 }
//             },
//             error: function (error) {
//                 console.error('Error:', error);
//             }
//         });
//     });
    
// }

async function initpoin13(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    var user_id = localStorage.getItem('user_id');

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });
    
    // Call the requestdata function with the id as an argument
    const result = await requestdata('getResult?id='+id);
    // document.getElementById('note').innerText = alldata.result.note;
    // document.getElementById('paymentNominal').innerText = 'Price'+ '\t\t\t' +  formatter.format(alldata.result.paymentNominal);
    // document.getElementById('time').innerText = 'Time\t\t\t' + alldata.result.time;
    var pp = alldata.result.counselor_profile ? histhost + alldata.result.counselor_profile : histhost + 'Admin/images/profile.jpg';

    var detail = `
            <div class="photoprofile mb-">
                <div class="lingkarannya" id="profileImageContainer">
                    <img id="profileImage" src="${pp}" alt="" />
                </label>
                </div>
            </div>
            <div class="kasihrate">
                <h3 id="kasihrating">Rate Your Counselor</h3>
                <input type="hidden" name="consultation_id" value="${alldata.result.consultation_id}">
                <input type="hidden" name="student_id" value="${user_id}">
                <input type="hidden" name="counselor_id" value="${alldata.result.counselor_id}">
                <div class="rating">
                    <label>
                        <input type="radio" name="stars" value="1" />
                        <span class="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="2" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="3" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>   
                    </label>
                    <label>
                        <input type="radio" name="stars" value="4" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="5" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                    </label>
                </div>
                <div class="reviewtext">
                    <textarea name="review" id="review" class="form-control"></textarea>
                </div>
                <button class="btn btn-success">Submit</button>
                <div class="buttons px-4 mt-0">
                </div>

            </div>
            <div class="datadiri">
                <div class="jenis">
                    Counselor Name
                </div>
                <span id="counselorName" class="daridata">Dr. ${alldata.result.counselorName}</span>

                <div class="jenis">
                    Counselor Email
                </div>
                <span id="counselorEmail"  class="daridata">${alldata.result.counselorEmail}</span>

                <div class="jenis">
                    Consultation Date
                </div>
                <span id="tanggal" class="daridata">${alldata.result.consultation_date}</span>

                <div class="jenis">
                    Consultation Time
                </div>
                <span id="tanggal" class="daridata">${alldata.result.duration}</span>

                <div class="jenis">
                    Consultation ID
                </div>
                <span id="nomor"  class="daridata">${alldata.result.consultation_id}</span>
                
                <div class="jenis">
                    Counselor Note
                </div>
                <div id="note" class="enlarged-textarea" readonly>${alldata.result.note ? alldata.result.note : 'Counselor Note not available'}</div>
            </div>
            <div class="textjudul">
            <h2>Payment</h2>
            </div>
            <div class="datadiri2">
                <div class="Nominal">
                    <div class = "PaymentNominal"> Payment Nominal</div>
                    <div class = "NominalRupiah">${formatter.format(alldata.result.paymentNominal)}</div>

                </div>
                <div class="Time">
                    <div class = "PaymentTime"> Payment Time</div>
                    <div class = "Timedate">${alldata.result.time}</div>
                </div>

                
            </div>
    `
    document.getElementById('kontenDetail').innerHTML = detail
    function initRating(){
        $(document).ready(async function(){
            document.getElementById("errortext1").classList.remove("hide");
            var modal = new bootstrap.Modal(document.getElementById("qui"));
            var rating = new document.getElementById("rating");
            var review = new document.getElementById("review");
            document.getElementById("ratingButton").addEventListener("click", async function() {
                var formData = new FormData();
                formData.append('rating', rating);
                formData.append('review', review);
            });
    
            await $.ajax({
                url: `${histhost}api/createRating`,
                method: 'POST',
                processData: false,
                contentType: false,
                data: formData,
                success: function (response) {
                    if (response.success) {
                        localStorage.removeItem('rating');
                        localStorage.removeItem('review');
                        window.location.href = "home.html";
                    } else {
                        console.error('Error:', response.message);
                    }
                },
                error: function (error) {
                    console.error('Error:', error);
                }
            });
        });
        
};
}


async function initpoin15(){
    var email = document.getElementById('emailinput');
    var Oldpassword = document.getElementById('passwordinput');
    var user_id = localStorage.getItem('user_id');
    
    var errortext=document.getElementById("errortext");
    var errortext1=document.getElementById("errortext1");
    document.getElementById("submitBtn").addEventListener("click", async function() {
        if(email.value.trim() === ""){
            errortext.innerHTML="Please provide your registered email"
            errortext.classList.remove("hide")
        }else{
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                errortext.innerHTML = "Email address is not valid";
                errortext.classList.remove("hide");
            }else{
                errortext.classList.add("hide")
            }
        }

        if(Oldpassword.value.trim() === ""){
            errortext1.innerHTML="Please input your password"
            errortext1.classList.remove("hide")
        }else{
            errortext1.classList.add("hide")
            if (email.value.trim() !== "" && Oldpassword.value.trim() !== "") {
                await requestdata(`changePass?user_id=${user_id}&email=${email.value}&old_password=${Oldpassword.value}`)
                if(alldata.success){
                    window.location.href = "changePw.html";
                }else{
                    errortext1.innerHTML=alldata.message;
                    errortext1.classList.remove("hide")
                }
            }
        }
    });

    var togglePassword = document.getElementById('togglePassword');
    var showPasswordIcon = document.getElementById("showPasswordIcon");

    togglePassword.addEventListener('click', function() {
        var type = Oldpassword.getAttribute('type') === 'password' ? 'text' : 'password';
        Oldpassword.setAttribute('type', type);

        if (type === 'text') {
            showPasswordIcon.classList.remove("fa-eye");
            showPasswordIcon.classList.add("fa-eye-slash");
        } else {
            showPasswordIcon.classList.remove("fa-eye-slash");
            showPasswordIcon.classList.add("fa-eye");
        }
    });
}

async function initpoin16(){
    var password = document.getElementById('passwordconfirmationinput');
    var passwordconfirmationinput = document.getElementById('newpasswordconfirmationinput');
    var user_id = localStorage.getItem('user_id');
    
    var errortext=document.getElementById("errortext");
    var errortext1=document.getElementById("errortext1");
    document.getElementById("submitBtn").addEventListener("click", async function() {
        if(password.value.trim() === ""){
            errortext.innerHTML="Please input your new password"
            errortext.classList.remove("hide")
        }else{
            if(!/[A-Z]/.test(password.value)){
                errortext.innerText = "Your password must contain at least one uppercase letter";
                errortext.classList.remove("hide");
            }{
                if (password.value.length < 8 ) {
                    errortext.innerHTML = "Password must be at least 8 characters long";
                    errortext.classList.remove("hide");
                } else {
                    if(!/[a-z]/.test(password.value)){
                        errortext.innerText = "Your password must contain at least one lowercase letter";
                        errortext.classList.remove("hide");
                    }else{
                        if(!/\d/.test(password.value)){
                            errortext.innerText = "Your password must contain at least one number.";
                            errortext.classList.remove("hide");
                        }else{
                            errortext.classList.add('hide');
                        }
                    }
                }
            }
        }

        if(passwordconfirmationinput.value.trim() === ""){
            errortext1.innerHTML="Please input your confirmation password"
            errortext1.classList.remove("hide")
        }else{
            errortext1.classList.add("hide")
            if (password.value.trim() !== "" && passwordconfirmationinput.value.trim() !== "") {
                if(password.value == passwordconfirmationinput.value){
                    errortext1.classList.add("hide")
                    await requestdata(`changePassword?user_id=${user_id}&new_password=${password.value}`)
                    if(alldata.success){
                        window.location.href = "profile.html";
                    }else{
                        errortext1.innerHTML=alldata.message;
                        errortext1.classList.remove("hide")
                    }
                }else{
                    errortext1.innerHTML="Check again your confirmation password"
                    errortext1.classList.remove("hide")
                }
            }
        }
    });

    var togglePassword = document.getElementById('togglePassword');
    var togglePassword2 = document.getElementById('togglePassword2');
    var showPasswordIcon = document.getElementById("showPasswordIcon");
    var showPasswordIcon2 = document.getElementById("showPasswordIcon2");

    togglePassword.addEventListener('click', function() {
        var type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        if (type === 'text') {
            showPasswordIcon.classList.remove("fa-eye");
            showPasswordIcon.classList.add("fa-eye-slash");
        } else {
            showPasswordIcon.classList.remove("fa-eye-slash");
            showPasswordIcon.classList.add("fa-eye");
        }
    });
    togglePassword2.addEventListener('click', function() {
        var type = passwordconfirmationinput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordconfirmationinput.setAttribute('type', type);

        if (type === 'text') {
            showPasswordIcon2.classList.remove("fa-eye");
            showPasswordIcon2.classList.add("fa-eye-slash");
        } else {
            showPasswordIcon2.classList.remove("fa-eye-slash");
            showPasswordIcon2.classList.add("fa-eye");
        }
    });
}

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
}

async function initpoin17(){
    var onprogress = document.getElementById('onProgress');
    var done = document.getElementById('done');
    var user_id = localStorage.getItem('user_id');
    getongoing();
    const tabOnProgress = document.getElementById('tabOnProgress');
    const tabDone = document.getElementById('tabDone');
    const onProgressContent = document.getElementById('onProgress');
    const doneContent = document.getElementById('done');
    const line = document.querySelector('.line');

    tabOnProgress.addEventListener('click', () => {
        tabOnProgress.classList.add('active');
        tabDone.classList.remove('active');
        line.style.width = tabOnProgress.offsetWidth + "px";
        line.style.left = tabOnProgress.offsetLeft + "px";
        onProgressContent.classList.add('active');
        doneContent.classList.remove('active');
        getongoing();
    });

    tabDone.addEventListener('click', () => {
        tabDone.classList.add('active');
        tabOnProgress.classList.remove('active');
        line.style.width = tabDone.offsetWidth + "px";
        line.style.left = tabDone.offsetLeft + "px";
        doneContent.classList.add('active');
        onProgressContent.classList.remove('active');
        getdone();
    });

    async function getongoing(){
        await requestdata2(`riwayatOngoing?user_id=${user_id}`)
        var onprogressContent = '';
        alldata.reports.forEach(report => {
            var kotak = `
            <div class="kotak" id="OP${report.id}">
                <div class="tulisan">
                    <p class="status">${report.isProcess == 0 ? 'Report Submitted' : 'Report Under Review'}</p>
                    <p class="title">${report.title}</p>
                    <p class="date">${formatDate(report.created_at)}</p>
                </div>
                <div class="tombol">
                    <span class="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </div>
            </div>
            `;
            onprogressContent += kotak;
        });
        onprogress.innerHTML = onprogressContent;
    }

    async function getdone(){
        await requestdata2(`riwayatDone?user_id=${user_id}`)
        var doneContent = '';
        alldata.reports.forEach(report => {
            var kotak = `
            <div class="kotak" id= "D${report.id}" >
                <div class="tulisan">
                    <p class="status">Done</p>
                    <p class="title">${report.title}</p>
                    <p class="date">${formatDate(report.created_at)}</p>
                </div>
                <div class="tombol">
                    <span class="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </div>
            </div>
            `;
            doneContent += kotak;
        });
        done.innerHTML = doneContent;
    }
}

function formatTimeRemaining(remainingMinutes) {
    const days = Math.floor(remainingMinutes / (60 * 24));
    const hours = Math.floor((remainingMinutes % (60 * 24)) / 60);
    const minutes = remainingMinutes % 60;

    let formattedTime = '';

    if (days > 0) {
        formattedTime += `${days} days `;
    }
    if (hours > 0) {
        formattedTime += `${hours} hours `;
    }
    if (minutes > 0) {
        formattedTime += `${minutes} minutes`;
    }

    return formattedTime.trim();
}

async function initpoin18(){
    var onprogress = document.getElementById('onProgress');
    var done = document.getElementById('done');
    var user_id = localStorage.getItem('user_id');
    getongoing();
    const tabOnProgress = document.getElementById('tabOnProgress');
    const tabDone = document.getElementById('tabDone');
    const onProgressContent = document.getElementById('onProgress');
    const doneContent = document.getElementById('done');
    const line = document.querySelector('.line');

    tabOnProgress.addEventListener('click', () => {
        tabOnProgress.classList.add('active');
        tabDone.classList.remove('active');
        line.style.width = tabOnProgress.offsetWidth + "px";
        line.style.left = tabOnProgress.offsetLeft + "px";
        onProgressContent.classList.add('active');
        doneContent.classList.remove('active');
        getongoing();
    });

    tabDone.addEventListener('click', () => {
        tabDone.classList.add('active');
        tabOnProgress.classList.remove('active');
        line.style.width = tabDone.offsetWidth + "px";
        line.style.left = tabDone.offsetLeft + "px";
        doneContent.classList.add('active');
        onProgressContent.classList.remove('active');
        getdone();
    });

    async function getongoing(){
        await requestdata2(`konsulOngoing?user_id=${user_id}`)
        var onprogressContent = '';
        alldata.consultations.forEach(consultation => {
            var kotak;
            if (consultation.endIn) {
                sessionStorage.setItem("uid", 'dh1');
                kotak = `
                <a href="/CHAT/last.html">
                    <div class="kotak" id="OP_CON${consultation.id}">
                        <div class="tulisan">
                            <p class="status">
                                End in ${formatTimeRemaining(consultation.endIn)}
                            </p>              
                            <p class="title">Dr. ${consultation.name}</p>
                            <p class="date">${consultation.consultation_date}</p>
                        </div>
                        <div class="tombol">
                                <span class="material-symbols-outlined">arrow_forward_ios</span>
                        </div>
                    </div>
                </a>
                `;
            } else {
                kotak = `
                <div class="kotak" id="OP_CON${consultation.id}">
                    <div class="tulisan">
                        <p class="status">
                            Start in ${formatTimeRemaining(consultation.time)}
                        </p>              
                        <p class="title">Dr. ${consultation.name}</p>
                        <p class="date">${consultation.consultation_date}</p>
                    </div>
                    <div class="tombol">
                        <span class="material-symbols-outlined">schedule</span>
                    </div>
                </div>
                `;
            }
            onprogressContent += kotak;
        });        
        onprogress.innerHTML = onprogressContent;
    }
    
    async function getdone(){
        await requestdata2(`konsulDone?user_id=${user_id}`)
        var doneContent = '';
        alldata.consultations.forEach(consultation => {
            var kotak = `
            <a href="../Konsultasi_dokter/detail_konsul.html?id=${consultation.id}">
                <div class="kotak" id= "D_CON${consultation.id}" >
                    <div class="tulisan">
                        <div class="rating">
                            <i data-rating="${consultation.rating}">
                                <span>${consultation.rating}</span>
                            </i>
                        </div>
                        <p class="title">Dr. ${consultation.name}</p>
                        <p class="date">${consultation.consultation_date}</p>
                    </div>
                    <div class="tombol">
                        <span class="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
            </a>
            `;
            doneContent += kotak;
        });
        done.innerHTML = doneContent;
    }
}
