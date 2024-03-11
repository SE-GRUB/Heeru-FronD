let alldata = {};
let nip = "";
let no_telp = "";
let user_id = "";
let username = "";
let email = "";
var histhost;




histhost='http://127.0.0.1:8000/'
// histhost='http://47.245.121.87/Heeru-BackD/public/'
// histhost='https://enp.lahoras.my.id/'

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
    var profile_pic = localStorage.getItem('profile_pic');
    var names = localStorage.getItem('username');
    var dataNama = document.getElementById("databaseName");
    
    document.getElementById('profileImage').src= `${histhost}${profile_pic}`;
    
    dataNama.innerHTML = names;
    
    document.addEventListener("DOMContentLoaded", function() {
        var togglePassword = document.getElementById('togglePassword');
        var showPasswordIcon = document.getElementById("showPasswordIcon");
        var password = document.getElementById('passwordinput');

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
    });
    document.getElementById("submitBtn").addEventListener("click", async function() {
        var password = document.getElementById('passwordinput');
        var errortext=document.getElementById("errortext");     
        
        if (password.value.trim() === "") {
                errortext.innerHTML="Please input your Password"
                errortext.classList.remove("hide")
            }else{
                await requestdata(`checkPass?password=${password.value}&user_id=${localStorage.getItem('user_id')}`)
                if (alldata.success) {
                    window.location.href = "./MainApk/home.html";
                    return true;
                } else {
                    errortext.innerHTML = alldata.message;
                    errortext.classList.remove("hide");
                    return false;
                }
            }
    });
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
    await requestdata('categoryName');

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
    await requestdata('counselorList');      
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
                    <span>${rating.toString()} bintang</span>
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

    listdokter(sortedUsers);
    listdokterowl();
    pencarian();

    $('.owl-carousel').owlCarousel({
        loop:false,
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
        jobpoin: alldata.users.rating + " bintang",
        start: alldata.users.rating + " bintang",
        Harga: "Rp. " + alldata.users.fare,
        success: "0",
        ongoing: "1,2k",
        totalpatien: "1,2k",
        listbit: alldata.users.description,
        imghip: alldata.users.profile_pic ? histhost + alldata.users.profile_pic : histhost + 'Admin/images/profile.jpg'
    };

    console.log(data);

    function initdokter(data) {
        document.getElementById("namedoctor").innerHTML = data.namedoctor;
        document.getElementById("jobpoin").innerHTML = data.jobpoin;
        document.getElementById("start").innerHTML = data.start;
        document.getElementById("Harga").innerHTML = data.Harga;
        document.getElementById("success").innerHTML = data.success;
        document.getElementById("listbit").innerHTML = data.listbit;
        document.getElementById("imghip").src = data.imghip;
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
        var response = await fetch(`https://enp.lahoras.my.id/avp?time=${time}`);
        var data = await response.json();
        notav = data.map(item => parseInt(item.duration));
        notav.forEach((duration) => {
            delete jadwal[duration];
        });

        var selectopt = document.getElementById("selectopt");
        selectopt.innerHTML = ""; // Clear options before appending
        for (var key in jadwal) {
            if (jadwal.hasOwnProperty(key)) {
                selectopt.innerHTML += `<option value="${key}">${jadwal[key]}</option>`;
            }
        }
    }

    function generatepaymend(){
        var iddokter = sessionStorage.getItem('dokter_id');
        var idpasien = localStorage.getItem('user_id');
        var waktu = document.getElementById("Test_DatetimeLocal").value;
        var jam = document.getElementById("selectopt").value;
        var data = {
            iddokter: iddokter, //id si dokter
            idpasien: idpasien, //id si pasien
            waktu: waktu, //tanggal
            jam: jam //slot jam
        };

        // request to server
        var response = fetch(`https://enp.lahoras.my.id/pay?iddokter=${iddokter}&idpasien=${idpasien}&waktu=${waktu}&jam=${jam}`);
        var data = response.json();
        try {
            if (data.success) {
                window.location.href = data.urlpaymend;
            }
        } catch (error) {
            alert("Error in generating payment");            
        }
    }
    initskj();

    // Add event listener to Test_DatetimeLocal
    document.getElementById("Test_DatetimeLocal").addEventListener("change", initskj);
    document.getElementById("orderpay").addEventListener("click", generatepaymend);

    initdokter(data);
}

async function initpoin10() {
    var badanpost = document.getElementById('badanpost');
    var kotp = [];
    var inp = [];

    function loadcomend(datacomend) {
        return datacomend.map(oneonone => {
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

    async function loadpostingan2(hit, limit) {
        await requestdata('postList');
        var posting = alldata.posts;

        for (const singgaldatapost of posting) {
            var id = singgaldatapost.post_id;
            var post_body = singgaldatapost.post_body;
            var poster = singgaldatapost.poster;
            var like = singgaldatapost.like;
            var created_at = singgaldatapost.created_at;
            var profile_pic = singgaldatapost.profile_pic ? histhost + singgaldatapost.profile_pic : histhost + 'Admin/images/profile.jpg';
            var timelib = timeAgo(created_at);
            var name = singgaldatapost.name;
            var totalcomend = singgaldatapost.totalcomments;
            var comment = loadcomend(singgaldatapost.comments);

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
                    <div class="isipost" id="isipost${id}">
                        ${post_body}
                    </div>
                    <div class="actionpost">
                        <div class="baglike">
                            <span class="material-symbols-outlined"> favorite </span>
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
            await requestdata('showInfografis');
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

    async function allpost() {
        var hit = 1;
        var limit = 10;
        var allpost = [];

        if (sessionStorage.getItem('hitpost')) {
            hit = parseInt(sessionStorage.getItem('post')) + 1;
            limit = hit * 10;
            allpost = JSON.parse(sessionStorage.getItem('allpost'));
        } else {
            await info2(hit, limit);
            await loadpostingan2(hit, limit);
            allpost = kotp.concat(inp);
            sessionStorage.setItem('hitpost', hit);
            sessionStorage.setItem('allpost', JSON.stringify(allpost));
        }

        allpost = shuffleArray(allpost);
        badanpost.innerHTML += allpost.join('');
    }
    await allpost();
}


async function initpoin11() {
    var user_id = localStorage.getItem('user_id');
    await requestdata(`userProfile?user_id=${user_id}`);
    console.log(alldata.user);
    var pp = alldata.user.profile_pic;
    pp=pp ? histhost+pp : histhost+'Admin/images/profile.jpg'
    document.getElementById('profileImage').src = pp
    document.getElementById("username").textContent = alldata.user.name;
    document.getElementById("profNama").textContent = alldata.user.name;
    document.getElementById("profNoTelp").textContent = alldata.user.no_telp;
    document.getElementById("profEmail").textContent = alldata.user.email;
}

function initPost(){
    $(document).ready(async function(){
        document.getElementById("errortext1").classList.remove("hide");
        var modal = new bootstrap.Modal(document.getElementById("qui"));
        var user_id = new document.getElementById("user_id");
        var post_body = new document.getElementById("post_body");
        var poster = new document.getElementById("poster");
        document.getElementById("postButton").addEventListener("click", async function() {
            var formData = new FormData();
            formData.append('user_id', title);
            formData.append('post_body', post_body);
            formData.append('poster', poster);
        });

        await $.ajax({
            url: `${histhost}api/createPost`,
            method: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            success: function (response) {
                if (response.success) {
                    localStorage.removeItem('post_body');
                    localStorage.removeItem('poster');
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
    
}

async function initpoin13(){
    const result = await requestdata('getResult');
    document.getElementById('tanggal').innerText = result.consultation_date;
    document.getElementById('nomor').innerText = 'Pesanan ' + result.consultation_id;
    document.getElementById('note').innerText = result.note;
    
}