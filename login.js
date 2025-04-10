document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const loginID = document.getElementById("loginID").value;
    const loginPassword = document.getElementById("loginPassword").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.id === loginID && u.password === loginPassword);

    if (user) {
        // alert("Đăng nhập thành công!");

        if (user.role === "pth") {
            window.location.href = "pth_homepage.html";
        } else {
            // User phòng sẽ vào đúng phòng ban
            switch (user.department) {
                case "bgd":
                    window.location.href = "user_bgd.html";
                    break;                
                default:
                    window.location.href = "user_homepage.html";
                    break;
            }
        }
    } else {
        alert("Sai ID hoặc mật khẩu!");
    }
});
