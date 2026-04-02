const form = document.getElementById("form");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const reEnterPassword = document.getElementById("reEnterPassword");
const check = document.getElementById("check");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const rePasswordError = document.getElementById("rePasswordError");
const checkError = document.getElementById("checkError");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    let isValid = true;

    resetAll();

    if (firstName.value.trim() === "") {
        showError(firstName, firstNameError, "Họ và tên không được để trống");
        isValid = false;
    }

    if (lastName.value.trim() === "") {
        showError(lastName, lastNameError, "Tên không được để trống");
        isValid = false;
    }

    if (email.value.trim() === "") {
        showError(email, emailError, "Email không được để trống");
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, emailError, "Email không đúng định dạng");
        isValid = false;
    }

    if (password.value.trim() === "") {
        showError(password, passwordError, "Mật khẩu không được để trống");
        isValid = false;
    } else if (password.value.length < 8) {
        showError(password, passwordError, "Mật khẩu tối thiểu 8 ký tự");
        isValid = false;
    }

    if (reEnterPassword.value.trim() === "") {
        showError(reEnterPassword, rePasswordError, "Xác nhận mật khẩu không được để trống");
        isValid = false;
    } else if (password.value !== reEnterPassword.value) {
        showError(reEnterPassword, rePasswordError, "Mật khẩu không trùng khớp");
        isValid = false;
    }

    if (!check.checked) {
        checkError.innerText = "Bạn phải đồng ý với điều khoản";
        isValid = false;
    }

    if (isValid) {
        const user = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            password: password.value
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("registerSuccess", "true");

        window.location.href = "login.html";
    }
});