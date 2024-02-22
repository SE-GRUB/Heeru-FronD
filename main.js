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

async function requestdata(param){
    return fetch(`${histhost}api/${param}`)
        .then(response => response.json())
        .then(data => alldata = data)
}

function initpoin() {
    async function ceknip() {
        var inputField = document.getElementById("nipinput");
        var errortext=document.getElementById("errortext")
           
        if (inputField.value.trim() === "") {
            errortext.innerHTML = "Please input your NIP";
            errortext.classList.remove("hide");
            return false;
        } else {

            await requestdata(`checkuser?nip=${inputField.value}`);
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
                    password = alldata.user['password'];
                    localStorage.setItem('password', password);
                    profile_pic = alldata.user['profile_pic'];
                    localStorage.setItem('profile_pic', profile_pic);
                    window.location.href = "./sign_up2.html";
                    return true;
                } else {
                    errortext.innerHTML = alldata.message;
                    classList.remove("hide");
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
        
        // console.log("Get Element by ID : " + categoryId);
    
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

function formatCurrency(amount) {
    var parts = amount.toFixed(2).split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return "Rp " + parts.join(",");
}


async function initpoin8() {
    await requestdata('counselorList');  

    var sortedUsers = Object.values(alldata.users).sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    var popularDoctor = document.getElementById('popular-doctor-section');

    function displayFilteredUsers(users) {
        var ul = document.getElementById('sortdoctor');
        ul.innerHTML = '';

        users.forEach(function(user) {
            var id = user.user_id;
            var name = user.name;
            var profile_pic = user.profile_pic;
            var rating = user.rating;
            var fare = user.fare;

            var div = document.createElement('div');
            div.className = "sortcard";
            div.id = "card"+id;

            var img = document.createElement('img');
            img.src = profile_pic ? `${histhost}${profile_pic}` : `${histhost}Admin/images/profile.jpg`;

            var div2 = document.createElement('div');
            div2.className = "sortcard-info";

            var h3 = document.createElement('h3');
            h3.textContent = name;

            var ratingDiv = document.createElement('div');
            ratingDiv.className = "rating"

            var ratingElement = document.createElement('i');
            ratingElement.setAttribute('data-rating', rating.toString());

            var ratingValueElement = document.createElement('span');
            ratingValueElement.textContent = rating;

            var fareElement = document.createElement('p')
            fareElement.innerHTML = formatCurrency(parseFloat(fare));

            div2.appendChild(h3);
            ratingElement.appendChild(ratingValueElement);
            ratingDiv.appendChild(ratingElement);
            div2.appendChild(ratingDiv);
            div2.appendChild(fareElement);
            div.appendChild(img);
            div.appendChild(div2)
            ul.appendChild(div);
        });
    }

    var searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function() {
        var searchTerm = searchInput.value.toLowerCase();
        var filteredUsers = sortedUsers.filter(function(user) {
            return user.name.toLowerCase().includes(searchTerm);
        });

        if (searchTerm === '') {
            popularDoctor.style.display = 'block';
        } else {
            popularDoctor.style.display = 'none';
        }

        displayFilteredUsers(filteredUsers);
    });

    var ul = document.getElementById('carouselExample');

    for(var i = 0; i < Object.keys(alldata.users).length; i++){
        var id = alldata.users[i].user_id;
        var name = alldata.users[i].name;
        var rating = alldata.users[i].rating;
        var fare = alldata.users[i].fare;
        var profile_pic = alldata.users[i].profile_pic;


        var li = document.createElement('li');
        li.className = "carousel inner card";
        li.id = id;

        var img = document.createElement('img');
        img.className = "dct_img";
        img.src = profile_pic ? `${histhost}${profile_pic}` : `${histhost}Admin/images/profile.jpg`;

        var div = document.createElement('div');
        div.className = "NamaJob";

        var h5 = document.createElement('h5');
        h5.textContent = name;

        var ratingDiv = document.createElement('div');
        ratingDiv.className = "rating"

        var ratingElement = document.createElement('i');
        ratingElement.setAttribute('data-rating', rating.toString());

        var ratingValueElement = document.createElement('span');
        ratingValueElement.textContent = rating;

        var fareElement = document.createElement('p')
        fareElement.innerHTML = formatCurrency(parseFloat(fare))

        div.appendChild(h5);
        ratingElement.appendChild(ratingValueElement)
        ratingDiv.appendChild(ratingElement);
        div.appendChild(ratingDiv);
        div.appendChild(fareElement);
        li.appendChild(img);
        li.appendChild(div);
        ul.appendChild(li);
    }  

    var ul = document.getElementById('sortdoctor');

    for(var i = 0; i < sortedUsers.length; i++){
        var user = sortedUsers[i];
        var id = user.user_id;
        var name = user.name;
        var profile_pic = user.profile_pic;
        var rating = user.rating;
        var fare = user.fare;

        var div = document.createElement('div');
        div.className = "sortcard";
        div.id = "card"+id;

        var img = document.createElement('img');
        img.src = profile_pic ? `${histhost}${profile_pic}` : `${histhost}Admin/images/profile.jpg`;

        var div2 = document.createElement('div');
        div2.className = "sortcard-info";

        var h3 = document.createElement('h3');
        h3.textContent = name;

        var ratingDiv = document.createElement('div');
        ratingDiv.className = "rating"

        var ratingElement = document.createElement('i');
        ratingElement.setAttribute('data-rating', rating.toString());

        var ratingValueElement = document.createElement('span');
        ratingValueElement.textContent = rating;

        var fareElement = document.createElement('p')
        fareElement.innerHTML = formatCurrency(parseFloat(fare));

        div2.appendChild(h3);
        ratingElement.appendChild(ratingValueElement);
        ratingDiv.appendChild(ratingElement);
        div2.appendChild(ratingDiv);
        div2.appendChild(fareElement);
        div.appendChild(img);
        div.appendChild(div2)
        ul.appendChild(div);
    }  

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        responsive:{
            0:{
                items:1.8
            },
            600:{
                items:3.8
            },
            1000:{
                items:5.8
            }
        }
    })
}

async function initpoin9() {
    await requestdata('counselorList');  

    var ul = document.getElementById('carouselExample');

    for(var i = 0; i < Object.keys(alldata.users).length; i++){
        var id = alldata.users[i].user_id;
        var name = alldata.users[i].name;
        var rating = alldata.users[i].rating;
        var fare = alldata.users[i].fare;
        var profile_pic = alldata.users[i].profile_pic;

        var li = document.createElement('li');
        li.className = "carousel inner card";
        li.id = id;

        var img = document.createElement('img');
        img.className = "dct_img";
        img.src = profile_pic ? `${histhost}${profile_pic}` : `${histhost}Admin/images/profile.jpg`;

        var div = document.createElement('div');
        div.className = "NamaJob";

        var h5 = document.createElement('h5');
        h5.textContent = name;

        var rating = 3.4;

        var ratingDiv = document.createElement('div');
        ratingDiv.className = "rating"

        var ratingElement = document.createElement('i');
        ratingElement.setAttribute('data-rating', rating.toString());

        var ratingValueElement = document.createElement('span');
        ratingValueElement.textContent = rating;

        var fareElement = document.createElement('p')
        fareElement.innerHTML = formatCurrency(parseFloat(fare))

        div.appendChild(h5);
        ratingElement.appendChild(ratingValueElement)
        ratingDiv.appendChild(ratingElement);
        div.appendChild(ratingDiv);
        div.appendChild(fareElement);
        li.appendChild(img);
        li.appendChild(div);
        ul.appendChild(li);
    }  

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        responsive:{
            0:{
                items:1.8
            },
            600:{
                items:3.8
            },
            1000:{
                items:5.8
            }
        }
    })
}

async function initpoin10(){
    await requestdata('postList');  
    var badanpost = document.getElementById('badanpost')

    // console.log(alldata.comments)

    for(var i = 0; i < Object.keys(alldata.posts).length; i++){
        var id = alldata.posts[i].post_id;
        var post_body = alldata.posts[i].post_body;
        var poster = alldata.posts[i].poster;
        var like = alldata.posts[i].like;
        var created_at = alldata.posts[i].created_at;

        var profile_pic = alldata.users[i].profile_pic;
        var name = alldata.users[i].name;

        var kotakpostdiv = document.createElement('div');
        kotakpostdiv.className = 'kotakpost';
        kotakpostdiv.id = id;

        var biodiv = document.createElement('div');
        biodiv.className = 'bioyangpost';

        var photodiv = document.createElement('div');
        photodiv.className = 'photoprofile';

        var bagtextdiv = document.createElement('div');
        bagtextdiv.className = 'bagtext';

        var namepostdiv = document.createElement('span');
        namepostdiv.className = 'databaseName namepost';
        namepostdiv.textContent = name;

        var waktungepostdiv = document.createElement('span');
        waktungepostdiv.className = 'waktungepost';
        waktungepostdiv.textContent = created_at;

        var brBagText = document.createElement('br');

        var isipostdiv = document.createElement('div');
        isipostdiv.className = 'isipost';
        isipostdiv.textContent = post_body;

        var actionpostdiv = document.createElement('div');
        actionpostdiv.className = 'actionpost';

        var baglikediv = document.createElement('div');
        baglikediv.className = 'baglike';

        var materialspan = document.createElement('span');
        materialspan.className = 'material-symbols-outlined';
        materialspan.textContent = ' favorite '

        var likespan = document.createElement('span');
        likespan.className = 'databaseJumlahLike';
        likespan.textContent = like;

        var bagreplydiv = document.createElement('div');
        bagreplydiv.className = 'bagreply';

        var replyspan = document.createElement('span');
        replyspan.className = 'material-symbols-outlined';
        replyspan.textContent = ' reply '

        var jumlahreplyspan = document.createElement('span');
        jumlahreplyspan.textContent = Object.keys(alldata.comments).length;

        var baglikediv = document.createElement('div');
        baglikediv.className = 'baglike';

        var garisDiv = document.createElement('div');
        garisDiv.className = 'garis';

        biodiv.appendChild(photodiv);
        bagtextdiv.appendChild(namepostdiv);
        bagtextdiv.appendChild(brBagText);
        bagtextdiv.appendChild(waktungepostdiv);
        biodiv.appendChild(bagtextdiv);
        kotakpostdiv.appendChild(biodiv);
        kotakpostdiv.appendChild(isipostdiv);
        baglikediv.appendChild(materialspan);
        baglikediv.appendChild(likespan);
        actionpostdiv.appendChild(baglikediv);
        bagreplydiv.appendChild(replyspan);
        bagreplydiv.appendChild(jumlahreplyspan);
        actionpostdiv.appendChild(bagreplydiv);
        kotakpostdiv.appendChild(actionpostdiv);
        // kotakpostdiv.appendChild(garisDiv);
        // kotakpostdiv.appendChild(biokomendiv);
        // var bioyangkomendiv = document.getElementById('komenField'+id);
        
        
        for(var j = 0; j < Object.keys(alldata.comments).length; j++){ 
            kotakpostdiv.appendChild(garisDiv);
            var comment = alldata.comments[j].comment;
            var namacomment = alldata.comments[j].user;
            var profilkomen = alldata.comments[j].profilkomen;

            var biokomendiv = document.createElement('div');
            biokomendiv.className = 'bioyangkomen row ';

            var garisdiv = document.createElement('div');
            garisdiv.className = 'garis';
            // biokomendiv.id = 'komenField' + id;
   
            var coldiv = document.createElement('div');
            coldiv.className = 'col-1';

            var photoprofile2div = document.createElement('div');
            photoprofile2div.className = 'photoprofile2  rounded-circle';
            
            var bagiantextdiv = document.createElement('div');
            bagiantextdiv.className = 'bagiantext col-11';
            
            var isikomendiv = document.createElement('span');
            isikomendiv.className = 'isikomen';
            // isikomendiv.textContent = comment ;
            
            var namekomenspan = document.createElement('span');
            namekomenspan.className = 'databaseName namekomen ';
            namekomenspan.textContent = namacomment ;
    
            isikomendiv.appendChild(namekomenspan); // Append the author's name
            isikomendiv.appendChild(document.createTextNode(comment)); // Append the comment text

            // Append elements to the comment container
            coldiv.appendChild(photoprofile2div);
            bagiantextdiv.appendChild(isikomendiv);

            // Append elements to the comment container
            if(j !== Object.keys(alldata.comments).length-1){
                biokomendiv.appendChild(garisdiv); 
            }
            biokomendiv.appendChild(coldiv); // Append the profile picture container
            biokomendiv.appendChild(bagiantextdiv); // Append the comment text container

            // Append the comment container to the post container
            kotakpostdiv.appendChild(biokomendiv);
        }
        
        badanpost.appendChild(kotakpostdiv);
    }
    
}
