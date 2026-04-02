let users = JSON.parse(localStorage.getItem("users")) || [];

function register(e) {
    e.preventDefault();

    let isValid = true;

    let first_name = document.getElementById("firstName").value.trim();
    let last_name = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let checkBox = document.getElementById("terms");
    let message = document.getElementById("message");

    // Name
    if (first_name === "" || last_name === "") {
        showErrorName("Họ và tên không được để trống", "block");
        isValid = false;
    } else {
        showErrorName("", "none");
    }

    // Email
    if (email === "") {
        showErrorEmail("Email không được để trống", "block");
        isValid = false;
    } else if (!validateEmail(email)) {
        showErrorEmail("Email không đúng định dạng", "block");
        isValid = false;
    } else if (users.some(u => u.email === email)) {
        showErrorEmail("Email này đã tồn tại", "block");
        isValid = false;
    } else {
        showErrorEmail("", "none");
    }

    if (password.length < 8) {
        document.querySelector(".error-password").style.display = "block";
        isValid = false;
    } else {
        document.querySelector(".error-password").style.display = "none";
    }

    if (password !== confirmPassword) {
        document.querySelector(".error-confirm-password").style.display = "block";
        isValid = false;
    } else {
        document.querySelector(".error-confirm-password").style.display = "none";
    }

    // Term
    if (!checkBox.checked) {
        message.innerText = "Vui lòng xác nhận điều khoản";
        isValid = false;
    } else {
        message.innerText = "";
    }

    if (!isValid) return;

    let user = {
        first_name,
        last_name,
        email,
        password
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "login.html";
}


function showErrorEmail(errorEmail, display) {
    document.querySelector(".error-email").textContent = errorEmail;
    document.querySelector(".error-email").style.display = display;
}

function showErrorName(errorName, display) {
    document.querySelector(".error-name").textContent = errorName;
    document.querySelector(".error-name").style.display = display;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}