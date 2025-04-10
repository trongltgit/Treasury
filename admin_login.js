document.getElementById("adminLoginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const password = document.getElementById("adminPassword").value;
    const storedPassword = localStorage.getItem("adminPassword");

    if (password === "Vcb@1234") {
        // Nếu lần đầu đăng nhập, buộc đổi mật khẩu
        window.location.href = "admin_change_password.html";
    } else if (storedPassword && password === storedPassword) {
        // Nếu đã đổi mật khẩu thành công trước đó
        window.location.href = "admin.html";
    } else {
        alert("Sai mật khẩu!");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Giả sử dữ liệu user được lưu trong localStorage hoặc lấy từ backend
    const userData = JSON.parse(localStorage.getItem("user")) || { id: "N/A", department: "N/A" };

    // Hiển thị thông tin user
    document.getElementById("username").textContent = userData.id;
    document.getElementById("department").textContent = userData.department;
});

// Hàm đăng xuất (xóa dữ liệu user và chuyển về trang login)
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html"; // Điều hướng về trang login
}

// Hàm đổi mật khẩu (chỉ hiển thị modal hoặc form đổi mật khẩu)
function showChangePassword() {
    alert("Chức năng đổi mật khẩu đang phát triển!");
}
