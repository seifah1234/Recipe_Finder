const loginForm = document.querySelector('.login-form form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const adminCheckbox = document.getElementById('adminLogin');
const rememberCheckbox = document.getElementById('rememberMe');

class User {
    constructor(id, name, email, password, isAdmin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}

const users = [
    new User(1, 'Seif', 'seif@gmail.com', '123456', true),
    new User(2, 'Sama', 'sama@gmail.com', '123456', true),
    new User(3, 'Menna', 'menna@gmail.com', '123456', true),
    new User(4, 'Merehan', 'merehan@gmail.com', '123456', false),
    new User(5, 'Yassmen', 'yassmen@gmail.com', '123456', true)
];

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim(); 
    const isAdminLogin = adminCheckbox.checked;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password == "") {
        alert('Please Enter your password.');
        return;
    }

    const user = users.find(user => user.email === email && user.password === password);
    
    if (!user) {
        alert('Invalid email or password.');
        return;
    }

    if (isAdminLogin && !user.isAdmin) {
        alert('This account Is not an admin.');
        adminCheckbox.checked = false; // Uncheck the admin login checkbox
        return;
    }

    if (!isAdminLogin && user.isAdmin) {
        alert('This account Is not an normal user.');
        return;
    }

    console.log('User authenticated:', { 
        email, 
        adminLogin: isAdminLogin, 
        remember: rememberCheckbox.checked 
    });
    
    alert('Login successful!');

    localStorage.setItem('userId', JSON.stringify(user.id));
    
    // Store user data if "Remember me" is checked
    if (rememberCheckbox.checked) {
        localStorage.setItem('rememberedUser', JSON.stringify({
            email: user.email,
            name: user.name
        }));
    } else {
        localStorage.removeItem('rememberedUser');
    }
    
    // Redirect or submit form
    window.location.href = isAdminLogin ? 'admin.html' : 'user.html';
});


document.addEventListener('DOMContentLoaded', function() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        const user = JSON.parse(rememberedUser);
        emailInput.value = user.email;
        rememberCheckbox.checked = true;
    }
});