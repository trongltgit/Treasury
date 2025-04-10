document.getElementById("changePasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Kiểm tra độ dài và ký tự đặc biệt
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
        alert("Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và ký tự đặc biệt.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Mật khẩu xác nhận không trùng khớp.");
        return;
    }

    // Lưu mật khẩu vào LocalStorage
    localStorage.setItem("adminPassword", newPassword);

    alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
    window.location.href = "admin_login.html";
});
