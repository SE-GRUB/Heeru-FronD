"use strict";

var alldata = {};
var nip = "";
var no_telp = "";
var user_id = "";
var username = "";
var email = "";
var histhost; // histhost='http://127.0.0.1:8000/'
// histhost='http://47.245.121.87/Heeru-BackD/public/'

histhost = 'https://enp.lahoras.my.id/';

function requestdata(param) {
  return regeneratorRuntime.async(function requestdata$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", fetch("".concat(histhost, "api/").concat(param)).then(function (response) {
            return response.json();
          }).then(function (data) {
            return alldata = data;
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function formatCurrency(amount) {
  var parts = amount.toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return "Rp " + parts.join(",");
}

function initpoin() {
  function ceknip() {
    var inputField, errortext;
    return regeneratorRuntime.async(function ceknip$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            inputField = document.getElementById("nipinput");
            errortext = document.getElementById("errortext");

            if (!(inputField.value.trim() === "")) {
              _context2.next = 8;
              break;
            }

            errortext.innerHTML = "Please input your NIP";
            errortext.classList.remove("hide");
            return _context2.abrupt("return", false);

          case 8:
            _context2.next = 10;
            return regeneratorRuntime.awrap(requestdata("checkuser?nip=".concat(inputField.value)));

          case 10:
            _context2.prev = 10;

            if (!alldata.success) {
              _context2.next = 29;
              break;
            }

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
            return _context2.abrupt("return", true);

          case 29:
            errortext.innerHTML = alldata.message;
            classList.remove("hide");

          case 31:
            _context2.next = 37;
            break;

          case 33:
            _context2.prev = 33;
            _context2.t0 = _context2["catch"](10);
            errortext.innerHTML = alldata.message;
            errortext.classList.remove("hide");

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[10, 33]]);
  }

  document.getElementById("submitBtn").addEventListener("click", ceknip);
}

function initpoin2() {
  var phonenumber = localStorage.getItem('no_telp');
  document.getElementById("submitBtn").addEventListener("click", function () {
    var inputField = document.getElementById("PhoneNumberinput");
    var errortext = document.getElementById("errortext");
    var phoneNumber = inputField.value.trim();

    if (phoneNumber === "") {
      errortext.innerHTML = "Please input your Phone Number";
      errortext.classList.remove("hide");
      return false;
    } else {
      if (phoneNumber.charAt(0) === '8') {
        inputField.value = '0' + phoneNumber;
      }

      if (inputField.value == phonenumber) {
        localStorage.removeItem('no_telp');
        window.location.href = "./otp_signup.html";
      } else {
        inputField.value = phoneNumber;
        errortext.innerHTML = "Phone number is not registered, please contact your PIC";
        errortext.classList.remove("hide");
      }
    }
  });
}

function initpoin3() {
  var names = localStorage.getItem('username');
  var dataNama = document.getElementById("databaseName");
  dataNama.innerHTML = names;
  document.addEventListener('DOMContentLoaded', function () {
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
    togglePassword.addEventListener('click', function () {
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
    togglePassword2.addEventListener('click', function () {
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
    var fileInput = event.target;
    document.getElementById("pensil").style.display = "none";

    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        document.getElementById('profileImage').src = e.target.result;
        document.getElementById("profileImage").style.display = "block";
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  });
  document.getElementById("submitBtn").addEventListener("click", function _callee() {
    var email, password, password_confirmation, profile_pic, errortext, errortext2, errortext3, emailRegex, formData;
    return regeneratorRuntime.async(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = document.getElementById("emailinput");
            password = document.getElementById('passwordinput');
            password_confirmation = document.getElementById('passwordconfirmationinput');
            profile_pic = document.getElementById('fileInput');
            errortext = document.getElementById("errortext");
            errortext2 = document.getElementById("errortext2");
            errortext3 = document.getElementById("errortext3");

            if (profile_pic.files.length === 0) {
              errortext3.innerHTML = "Choose your photo profile";
              errortext3.classList.remove("hide");
            } else {
              errortext3.classList.add("hide");
            }

            if (email.value.trim() === "") {
              errortext.innerHTML = "Please input your email address";
              errortext.classList.remove("hide"); // return false;
            } else {
              emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              if (!emailRegex.test(email.value)) {
                errortext.innerHTML = "Email address is not valid";
                errortext.classList.remove("hide"); // return false;
              } else {
                errortext.classList.add('hide');
              }
            }

            if (password.value.trim() === "") {
              errortext2.innerHTML = "Please input your Password";
              errortext2.classList.remove("hide");
            } else {
              if (!/[A-Z]/.test(password.value)) {
                errortext2.innerText = "Your password must contain at least one uppercase letter";
                errortext2.classList.remove("hide");
              }

              {
                if (password.value.length < 8) {
                  errortext2.innerHTML = "Password must be at least 8 characters long";
                  errortext2.classList.remove("hide");
                } else {
                  if (!/[a-z]/.test(password.value)) {
                    errortext2.innerText = "Your password must contain at least one lowercase letter";
                    errortext2.classList.remove("hide");
                  } else {
                    if (!/\d/.test(password.value)) {
                      errortext2.innerText = "Your password must contain at least one number.";
                      errortext2.classList.remove("hide");
                    } else {
                      errortext2.classList.add('hide');
                    }
                  }
                }
              }
            }

            if (!(password_confirmation.value.trim() === "")) {
              _context3.next = 15;
              break;
            }

            errortext3.innerHTML = "Please input your password confirmation";
            errortext3.classList.remove("hide");
            _context3.next = 28;
            break;

          case 15:
            if (!(password.value !== password_confirmation.value)) {
              _context3.next = 20;
              break;
            }

            errortext3.innerHTML = "Your password and password confirmation do not match";
            errortext3.classList.remove("hide");
            _context3.next = 28;
            break;

          case 20:
            profile_pic = profile_pic.files[0];
            formData = new FormData();
            formData.append('profile_pic', profile_pic);
            formData.append('email', email.value);
            formData.append('password', password.value);
            formData.append('user_id', localStorage.getItem('user_id'));
            _context3.next = 28;
            return regeneratorRuntime.awrap($.ajax({
              url: "".concat(histhost, "api/updateProfile"),
              method: 'POST',
              processData: false,
              contentType: false,
              data: formData,
              success: function success(response) {
                if (response.success) {
                  window.location.href = "./MainApk/home.html";
                  return true;
                } else {
                  // console.error('Error:', response.message);
                  errortext3.innerHTML = "Error in updating your data!";
                  errortext3.classList.remove("hide");
                }
              }
            }));

          case 28:
            if (!(password_confirmation.value.trim() === "")) {
              _context3.next = 33;
              break;
            }

            errortext3.innerHTML = "Please input your password confirmation";
            errortext3.classList.remove("hide");
            _context3.next = 47;
            break;

          case 33:
            if (!(password.value !== password_confirmation.value)) {
              _context3.next = 38;
              break;
            }

            errortext3.innerHTML = "Your password and password confirmation do not match";
            errortext3.classList.remove("hide");
            _context3.next = 47;
            break;

          case 38:
            errortext3.classList.add("hide");
            profile_pic = profile_pic.files[0];
            formData = new FormData();
            formData.append('profile_pic', profile_pic);
            formData.append('email', email.value);
            formData.append('password', password.value);
            formData.append('user_id', localStorage.getItem('user_id'));
            _context3.next = 47;
            return regeneratorRuntime.awrap($.ajax({
              url: "".concat(histhost, "api/updateProfile"),
              method: 'POST',
              processData: false,
              contentType: false,
              data: formData,
              success: function success(response) {
                if (response.success) {
                  window.location.href = "./MainApk/home.html";
                  return true;
                } else {
                  errortext3.innerHTML = "Error in updating your data!";
                  errortext3.classList.remove("hide");
                }
              }
            }));

          case 47:
            return _context3.abrupt("return", false);

          case 48:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
}

function initpoin4() {
  var profile_pic = localStorage.getItem('profile_pic');
  var names = localStorage.getItem('username');
  var dataNama = document.getElementById("databaseName");
  document.getElementById('profileImage').src = "".concat(histhost).concat(profile_pic);
  dataNama.innerHTML = names;
  document.addEventListener("DOMContentLoaded", function () {
    var togglePassword = document.getElementById('togglePassword');
    var showPasswordIcon = document.getElementById("showPasswordIcon");
    var password = document.getElementById('passwordinput');
    togglePassword.addEventListener('click', function () {
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
  document.getElementById("submitBtn").addEventListener("click", function _callee2() {
    var password, errortext;
    return regeneratorRuntime.async(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            password = document.getElementById('passwordinput');
            errortext = document.getElementById("errortext");

            if (!(password.value.trim() === "")) {
              _context4.next = 7;
              break;
            }

            errortext.innerHTML = "Please input your Password";
            errortext.classList.remove("hide");
            _context4.next = 17;
            break;

          case 7:
            _context4.next = 9;
            return regeneratorRuntime.awrap(requestdata("checkPass?password=".concat(password.value, "&user_id=").concat(localStorage.getItem('user_id'))));

          case 9:
            if (!alldata.success) {
              _context4.next = 14;
              break;
            }

            window.location.href = "./MainApk/home.html";
            return _context4.abrupt("return", true);

          case 14:
            errortext.innerHTML = alldata.message;
            errortext.classList.remove("hide");
            return _context4.abrupt("return", false);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
}

function initpoin6() {
  document.getElementById("nextBtn").addEventListener("click", function _callee3() {
    var title, w1, w2, w3, w4, w5, h1, errortext, errortext1, errortext2, errortext3, errortext4, errortext5, errortext6, details, detailsJSON;
    return regeneratorRuntime.async(function _callee3$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            title = document.getElementById('title');
            w1 = document.getElementById('w1');
            w2 = document.getElementById('w2');
            w3 = document.getElementById('w3');
            w4 = document.getElementById('w4');
            w5 = document.getElementById('w5');
            h1 = document.getElementById('h1');
            errortext = document.getElementById("errortext");
            errortext1 = document.getElementById("errortext1");
            errortext2 = document.getElementById("errortext2");
            errortext3 = document.getElementById("errortext3");
            errortext4 = document.getElementById("errortext4");
            errortext5 = document.getElementById("errortext5");
            errortext6 = document.getElementById("errortext6");

            if (title.value.trim() === "") {
              errortext.innerHTML = "Please provide a title for your report";
              errortext.classList.remove("hide");
            } else {
              errortext.classList.add("hide");
            }

            if (w1.value.trim() === "") {
              errortext1.innerHTML = "Please answer this question";
              errortext1.classList.remove("hide");
            } else {
              errortext1.classList.add("hide");
            }

            if (w2.value.trim() === "") {
              errortext2.innerHTML = "Please answer this question";
              errortext2.classList.remove("hide");
            } else {
              errortext2.classList.add("hide");
            }

            if (w3.value.trim() === "") {
              errortext3.innerHTML = "Please answer this question";
              errortext3.classList.remove("hide");
            } else {
              errortext3.classList.add("hide");
            }

            if (w4.value.trim() === "") {
              errortext4.innerHTML = "Please answer this question";
              errortext4.classList.remove("hide");
            } else {
              errortext4.classList.add("hide");
            }

            if (w5.value.trim() === "") {
              errortext5.innerHTML = "Please answer this question";
              errortext5.classList.remove("hide");
            } else {
              errortext5.classList.add("hide");
            }

            if (!(h1.value.trim() === "")) {
              _context5.next = 25;
              break;
            }

            errortext6.innerHTML = "Please answer this question";
            errortext6.classList.remove("hide");
            _context5.next = 32;
            break;

          case 25:
            errortext6.classList.add("hide");
            localStorage.setItem('title', title.value);
            details = {
              w1: w1.value,
              w2: w2.value,
              w3: w3.value,
              w4: w4.value,
              w5: w5.value,
              h1: h1.value
            };
            detailsJSON = JSON.stringify(details);
            localStorage.setItem('details', detailsJSON);
            window.location.href = "laporanBukti.html";
            return _context5.abrupt("return", true);

          case 32:
            return _context5.abrupt("return", false);

          case 33:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
}

function initpoin5() {
  var container, i, row, j, weight, category_name, category_id, colElement, teksElement, categoryId, currentClickedCategoryId, createClickListener;
  return regeneratorRuntime.async(function initpoin5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          createClickListener = function _ref(categoryId) {
            return function () {
              var buttonNext = document.getElementById('buttonnext');
              var element = document.getElementById(categoryId);

              if (currentClickedCategoryId !== null) {
                // Remove 'clicked' class from the previously clicked element
                var previousClickedElement = document.getElementById(currentClickedCategoryId);
                previousClickedElement.classList.remove('clicked'); // Reset localStorage and hide the button if the same element is clicked again

                if (currentClickedCategoryId === categoryId) {
                  localStorage.removeItem('category_id');
                  buttonNext.style.display = 'none';
                  currentClickedCategoryId = null;
                  return;
                }
              } // Store categoryId in localStorage


              localStorage.setItem('category_id', categoryId); // console.log(localStorage.getItem('category_id'));
              // Add 'clicked' class to the clicked element

              element.classList.add('clicked'); // Toggle the display of the 'buttonnext' element

              buttonNext.style.display = buttonNext.style.display === 'none' ? 'block' : 'none'; // Update currentClickedCategoryId

              currentClickedCategoryId = categoryId;
            };
          };

          _context6.next = 3;
          return regeneratorRuntime.awrap(requestdata('categoryName'));

        case 3:
          container = document.getElementById('containerisi');

          for (i = 0; i < Object.keys(alldata.report_categories).length; i += 3) {
            row = document.createElement('div');
            row.className = 'row';

            for (j = 0; j < 3 && i + j < Object.keys(alldata.report_categories).length; j++) {
              weight = alldata.report_categories[i + j].weight;
              category_name = alldata.report_categories[i + j].category_name;
              category_id = alldata.report_categories[i + j].id;
              colElement = document.createElement('button');
              colElement.className = 'col bobot' + weight;
              colElement.id = category_id;
              teksElement = document.createElement('div');
              teksElement.className = 'teks';
              teksElement.id = 'col bobot' + weight;
              teksElement.textContent = category_name;
              colElement.appendChild(teksElement);
              row.appendChild(colElement);
            }

            container.appendChild(row);
          }

          for (i = 0; i < Object.keys(alldata.report_categories).length; i++) {
            categoryId = alldata.report_categories[i].id; // console.log("Get Element by ID : " + categoryId);

            document.getElementById(categoryId).addEventListener("click", createClickListener(categoryId));
          }

          currentClickedCategoryId = null;

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function initpoin7() {
  return regeneratorRuntime.async(function initpoin7$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          $(document).ready(function _callee6() {
            var modal, evidence, errortext;
            return regeneratorRuntime.async(function _callee6$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    document.getElementById("errortext1").classList.remove("hide");
                    modal = new bootstrap.Modal(document.getElementById("SRmodal"));
                    evidence = document.getElementById("formFileMultiple");
                    errortext = document.getElementById("errortext");
                    document.getElementById("submitBtn").addEventListener("click", function _callee4() {
                      var username;
                      return regeneratorRuntime.async(function _callee4$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              username = localStorage.getItem('username');

                              if (username) {
                                document.getElementById('whistleblower').innerHTML = username;
                                document.getElementById('whistleblowers').innerHTML = username;
                              }

                              if (evidence.files.length === 0) {
                                errortext.innerHTML = "Eviddence  is required";
                                errortext.classList.remove("hide");
                              } else {
                                errortext.classList.add("hide");
                                modal.show();
                              }

                            case 3:
                            case "end":
                              return _context7.stop();
                          }
                        }
                      });
                    });
                    $('#acceptTerms').change(function () {
                      var isChecked = $(this).prop("checked");

                      if (isChecked) {
                        document.getElementById("errortext1").classList.add("hide");
                      } else {
                        document.getElementById("errortext1").classList.remove("hide");
                      }

                      $("#proceedBtn").prop("disabled", !isChecked);
                    });
                    document.getElementById("closeBtn").addEventListener("click", function () {
                      modal.hide();
                    });
                    document.getElementById("proceedBtn").addEventListener("click", function _callee5() {
                      var title, category_id, user_id, details, files, formData, i;
                      return regeneratorRuntime.async(function _callee5$(_context8) {
                        while (1) {
                          switch (_context8.prev = _context8.next) {
                            case 0:
                              title = localStorage.getItem('title');
                              category_id = localStorage.getItem('category_id');
                              user_id = localStorage.getItem('user_id');
                              details = localStorage.getItem('details');
                              files = document.getElementById("formFileMultiple").files;
                              formData = new FormData();
                              formData.append('title', title);
                              formData.append('details', details);
                              formData.append('category_id', category_id);
                              formData.append('user_id', user_id);

                              for (i = 0; i < files.length; i++) {
                                formData.append('evidence[]', files[i]);
                              }

                              _context8.next = 13;
                              return regeneratorRuntime.awrap($.ajax({
                                url: "".concat(histhost, "api/makereport"),
                                method: 'POST',
                                processData: false,
                                contentType: false,
                                data: formData,
                                success: function success(response) {
                                  if (response.success) {
                                    localStorage.removeItem('title');
                                    localStorage.removeItem('category_id');
                                    localStorage.removeItem('details');
                                    window.location.href = "laporanThankyou.html";
                                  } else {
                                    console.error('Error:', response.message);
                                  }
                                },
                                error: function error(_error) {
                                  console.error('Error:', _error);
                                }
                              }));

                            case 13:
                            case "end":
                              return _context8.stop();
                          }
                        }
                      });
                    });

                  case 8:
                  case "end":
                    return _context9.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function initpoin8() {
  var sortedUsers, pencarian, listdokterowl, listdokter;
  return regeneratorRuntime.async(function initpoin8$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          listdokter = function _ref4(sortedUsers) {
            var ul = document.getElementById('sortdoctor');
            var template = '';
            sortedUsers.forEach(function (user) {
              var id = user.user_id;
              var name = user.name;
              var rating = user.rating;
              var fare = user.fare;
              var profile_pic = user.profile_pic;
              profile_pic = profile_pic ? histhost + profile_pic : histhost + 'Admin/images/profile.jpg';
              template += "\n            <div class=\"sortcard ndv\" id=\"".concat(id, "\">\n                <img src=\"").concat(profile_pic, "\" alt=\"Doctor avatar\">\n                <div class=\"sortcard-info\">\n                    <h3>").concat(name, "</h3>\n                    <p>").concat(formatCurrency(parseFloat(fare)), "</p>\n                    <span>").concat(rating.toString(), " bintang</span>\n                </div>\n            </div>\n            ");
            });
            ul.innerHTML = template; // add event listener to each card

            var ndv = document.getElementsByClassName('ndv');

            for (var i = 0; i < ndv.length; i++) {
              ndv[i].addEventListener('click', function (e) {
                var id = this.id;
                sessionStorage.setItem('dokter_id', id);
                window.location.href = "./detail_dokter.html?id=".concat(id);
              });
            }
          };

          listdokterowl = function _ref3() {
            var ul = document.getElementById('carouselExample');
            var template = '';
            alldata.users.forEach(function (index) {
              console.log(index);
              var id = index.user_id;
              var name = index.name;
              var rating = index.rating;
              var fare = index.fare;
              var profile_pic = index.profile_pic;
              profile_pic = profile_pic ? histhost + profile_pic : histhost + 'Admin/images/profile.jpg';
              template += "\n            <li class=\"carousel inner card dpilist\" id=\"".concat(id, "\">\n                <img class=\"dct_img\" src=\"").concat(profile_pic, "\">\n                <div class=\"NamaJob\">\n                    <h5>").concat(name, "</h5>\n                    <div class=\"rating\">\n                    <i data-rating=\"").concat(rating, "\">\n                        <span>").concat(rating, "</span>\n                    </i>\n                    </div>\n                    <p>").concat(formatCurrency(parseFloat(fare)), "</p>\n                </div>\n            </li>\n            ");
            });
            ul.innerHTML = template;
            var dpilist = document.getElementsByClassName('dpilist');

            for (var i = 0; i < dpilist.length; i++) {
              dpilist[i].addEventListener('click', function (e) {
                var id = this.id;
                sessionStorage.setItem('dokter_id', id);
                window.location.href = "./detail_dokter.html?id=".concat(id);
              });
            }
          };

          pencarian = function _ref2() {
            var searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('change', function () {
              var valuenya = this.value.toLowerCase();
              var filteredUsers;

              if (valuenya) {
                filteredUsers = sortedUsers.filter(function (user) {
                  return user.name.toLowerCase().includes(valuenya);
                });
              } else {
                filteredUsers = sortedUsers;
              }

              listdokter(filteredUsers);
            });
          };

          _context11.next = 5;
          return regeneratorRuntime.awrap(requestdata('counselorList'));

        case 5:
          sortedUsers = Object.values(alldata.users).sort(function (a, b) {
            return a.name.localeCompare(b.name);
          }); // untuk menggunakan pencarian

          listdokter(sortedUsers);
          listdokterowl();
          pencarian();
          $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            responsive: {
              0: {
                items: 1.8
              },
              600: {
                items: 3.8
              },
              1000: {
                items: 5.8
              }
            }
          });

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  });
}

function initpoin9() {
  var ul, i, id, name, rating, fare, profile_pic, li, img, div, h5, ratingDiv, ratingElement, ratingValueElement, fareElement;
  return regeneratorRuntime.async(function initpoin9$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(requestdata('counselorList'));

        case 2:
          ul = document.getElementById('carouselExample');

          for (i = 0; i < Object.keys(alldata.users).length; i++) {
            id = alldata.users[i].user_id;
            name = alldata.users[i].name;
            rating = alldata.users[i].rating;
            fare = alldata.users[i].fare;
            profile_pic = alldata.users[i].profile_pic;
            li = document.createElement('li');
            li.className = "carousel inner card";
            li.id = id;
            img = document.createElement('img');
            img.className = "dct_img";
            img.src = profile_pic ? "".concat(histhost).concat(profile_pic) : "".concat(histhost, "Admin/images/profile.jpg");
            div = document.createElement('div');
            div.className = "NamaJob";
            h5 = document.createElement('h5');
            h5.textContent = name;
            rating = 3.4;
            ratingDiv = document.createElement('div');
            ratingDiv.className = "rating";
            ratingElement = document.createElement('i');
            ratingElement.setAttribute('data-rating', rating.toString());
            ratingValueElement = document.createElement('span');
            ratingValueElement.textContent = rating;
            fareElement = document.createElement('p');
            fareElement.innerHTML = formatCurrency(parseFloat(fare));
            div.appendChild(h5);
            ratingElement.appendChild(ratingValueElement);
            ratingDiv.appendChild(ratingElement);
            div.appendChild(ratingDiv);
            div.appendChild(fareElement);
            li.appendChild(img);
            li.appendChild(div);
            ul.appendChild(li);
          }

          $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            responsive: {
              0: {
                items: 1.8
              },
              600: {
                items: 3.8
              },
              1000: {
                items: 5.8
              }
            }
          });

        case 5:
        case "end":
          return _context12.stop();
      }
    }
  });
}

function initpoin10() {
  var badanpost, i, id, post_body, poster, like, created_at, profile_pic, name, kotakpostdiv, biodiv, photodiv, bagtextdiv, namepostdiv, waktungepostdiv, brBagText, isipostdiv, actionpostdiv, baglikediv, materialspan, likespan, bagreplydiv, replyspan, jumlahreplyspan, garisDiv, j, comment, namacomment, profilkomen, biokomendiv, garisdiv, coldiv, photoprofile2div, bagiantextdiv, isikomendiv, namekomenspan;
  return regeneratorRuntime.async(function initpoin10$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(requestdata('postList'));

        case 2:
          badanpost = document.getElementById('badanpost'); // console.log(alldata.comments)

          for (i = 0; i < Object.keys(alldata.posts).length; i++) {
            id = alldata.posts[i].post_id;
            post_body = alldata.posts[i].post_body;
            poster = alldata.posts[i].poster;
            like = alldata.posts[i].like;
            created_at = alldata.posts[i].created_at;
            profile_pic = alldata.users[i].profile_pic;
            name = alldata.users[i].name;
            kotakpostdiv = document.createElement('div');
            kotakpostdiv.className = 'kotakpost';
            kotakpostdiv.id = id;
            biodiv = document.createElement('div');
            biodiv.className = 'bioyangpost';
            photodiv = document.createElement('div');
            photodiv.className = 'photoprofile';
            bagtextdiv = document.createElement('div');
            bagtextdiv.className = 'bagtext';
            namepostdiv = document.createElement('span');
            namepostdiv.className = 'databaseName namepost';
            namepostdiv.textContent = name;
            waktungepostdiv = document.createElement('span');
            waktungepostdiv.className = 'waktungepost';
            waktungepostdiv.textContent = created_at;
            brBagText = document.createElement('br');
            isipostdiv = document.createElement('div');
            isipostdiv.className = 'isipost';
            isipostdiv.textContent = post_body;
            actionpostdiv = document.createElement('div');
            actionpostdiv.className = 'actionpost';
            baglikediv = document.createElement('div');
            baglikediv.className = 'baglike';
            materialspan = document.createElement('span');
            materialspan.className = 'material-symbols-outlined';
            materialspan.textContent = ' favorite ';
            likespan = document.createElement('span');
            likespan.className = 'databaseJumlahLike';
            likespan.textContent = like;
            bagreplydiv = document.createElement('div');
            bagreplydiv.className = 'bagreply';
            replyspan = document.createElement('span');
            replyspan.className = 'material-symbols-outlined';
            replyspan.textContent = ' reply ';
            jumlahreplyspan = document.createElement('span');
            jumlahreplyspan.textContent = Object.keys(alldata.comments).length;
            baglikediv = document.createElement('div');
            baglikediv.className = 'baglike';
            garisDiv = document.createElement('div');
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
            kotakpostdiv.appendChild(actionpostdiv); // kotakpostdiv.appendChild(garisDiv);
            // kotakpostdiv.appendChild(biokomendiv);
            // var bioyangkomendiv = document.getElementById('komenField'+id);

            for (j = 0; j < Object.keys(alldata.comments).length; j++) {
              kotakpostdiv.appendChild(garisDiv);
              comment = alldata.comments[j].comment;
              namacomment = alldata.comments[j].user;
              profilkomen = alldata.comments[j].profilkomen;
              biokomendiv = document.createElement('div');
              biokomendiv.className = 'bioyangkomen row ';
              garisdiv = document.createElement('div');
              garisdiv.className = 'garis'; // biokomendiv.id = 'komenField' + id;

              coldiv = document.createElement('div');
              coldiv.className = 'col-1';
              photoprofile2div = document.createElement('div');
              photoprofile2div.className = 'photoprofile2  rounded-circle';
              bagiantextdiv = document.createElement('div');
              bagiantextdiv.className = 'bagiantext col-11';
              isikomendiv = document.createElement('span');
              isikomendiv.className = 'isikomen'; // isikomendiv.textContent = comment ;

              namekomenspan = document.createElement('span');
              namekomenspan.className = 'databaseName namekomen ';
              namekomenspan.textContent = namacomment;
              isikomendiv.appendChild(namekomenspan); // Append the author's name

              isikomendiv.appendChild(document.createTextNode(comment)); // Append the comment text
              // Append elements to the comment container

              coldiv.appendChild(photoprofile2div);
              bagiantextdiv.appendChild(isikomendiv); // Append elements to the comment container

              if (j !== Object.keys(alldata.comments).length - 1) {
                biokomendiv.appendChild(garisdiv);
              }

              biokomendiv.appendChild(coldiv); // Append the profile picture container

              biokomendiv.appendChild(bagiantextdiv); // Append the comment text container
              // Append the comment container to the post container

              kotakpostdiv.appendChild(biokomendiv);
            }

            badanpost.appendChild(kotakpostdiv);
          }

        case 4:
        case "end":
          return _context13.stop();
      }
    }
  });
}