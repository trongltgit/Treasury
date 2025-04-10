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

const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware để parse body request
app.use(bodyParser.json());

// Mẫu dữ liệu người dùng, bạn có thể thay thế bằng cơ sở dữ liệu như MongoDB
let users = [
    { id: 1, username: 'user_demo', password: '$2a$10$FS9iBzYrU4vMBU61QvGSEW6e.eC5oe3UlKkAT.MgMB7m7fST9f6My' } // mật khẩu đã mã hóa
];

// API đăng nhập
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Tìm người dùng theo username
    const user = users.find(u => u.username === username);

    if (user) {
        // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                res.json({ message: 'Đăng nhập thành công!' });
            } else {
                res.status(401).json({ message: 'Sai mật khẩu!' });
            }
        });
    } else {
        res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }
});

// API đăng ký người dùng (để lưu mật khẩu mã hóa)
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi mã hóa mật khẩu' });
        }

        // Lưu người dùng với mật khẩu đã mã hóa
        const newUser = { id: users.length + 1, username, password: hashedPassword };
        users.push(newUser);

        res.json({ message: 'Đăng ký thành công!' });
    });
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});

