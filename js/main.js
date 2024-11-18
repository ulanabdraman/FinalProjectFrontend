// Dark/Light Mode Toggle
const toggleMode = () => {
    const currentMode = localStorage.getItem('theme');
    if (currentMode === 'dark') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
};

// On page load, set the theme based on localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
    }

    // Add event listener for toggling theme
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleMode);
    }

    // Login form logic
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form logic
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

// Handle login
const handleLogin = (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email exists and the password matches
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Store user's email and set the logged-in flag
        localStorage.setItem('loggedInEmail', email);
        localStorage.setItem('isLoggedIn', true);  // Flag indicating user is logged in
        
        alert('Login successful!');
        window.location.href = 'index.html';  // Redirect to home page after successful login
    } else {
        alert('Invalid email or password!');
    }
};

// Handle signup
const handleSignup = (event) => {
    event.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    if (users.find(user => user.email === email)) {
        alert('This email is already registered. Please log in.');
        return;
    }

    // Add new user
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign Up successful!');
    window.location.href = 'login.html';  // Redirect to login page after successful signup
};
document.addEventListener('DOMContentLoaded', () => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';  // Check if the user is logged in

    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const signOutBtn = document.getElementById('sign-out-btn');
    const welcomeSection = document.getElementById('welcome-section');

    // If user is logged in, display their email and show the Sign Out button
    if (isLoggedIn && loggedInEmail) {
        welcomeSection.innerHTML = `<h1>Welcome to Mercedes-Benz, ${loggedInEmail}!</h1>`;
        signOutBtn.style.display = 'inline-block';  // Show Sign Out button
        loginBtn.style.display = 'none';  // Hide Login button
        signupBtn.style.display = 'none';  // Hide Sign Up button
    } else {
        welcomeSection.innerHTML = '<h1>Welcome to Mercedes-Benz! Please log in to see personalized content.</h1>';
        signOutBtn.style.display = 'none';  // Hide Sign Out button
    }

    // Sign Out button logic
    if (signOutBtn) {
        signOutBtn.addEventListener('click', handleSignOut);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';  // Check if the user is logged in

    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const signOutBtn = document.getElementById('sign-out-btn');
    const welcomeSection = document.getElementById('welcome-section');

    // If user is logged in, display their email and show the Sign Out button
    if (isLoggedIn && loggedInEmail) {
        welcomeSection.innerHTML = `<h1>Welcome to Mercedes-Benz, ${loggedInEmail}!</h1>`;
        signOutBtn.style.display = 'inline-block';  // Show Sign Out button
        loginBtn.style.display = 'none';  // Hide Login button
        signupBtn.style.display = 'none';  // Hide Sign Up button
    } else {
        welcomeSection.innerHTML = '<h1>Welcome to Mercedes-Benz! Please log in to see personalized content.</h1>';
        signOutBtn.style.display = 'none';  // Hide Sign Out button
    }

    // Sign Out button logic
    if (signOutBtn) {
        signOutBtn.addEventListener('click', handleSignOut);
    }
});

// Handle Sign Out
const handleSignOut = () => {
    // Clear login state
    localStorage.removeItem('loggedInEmail');
    localStorage.setItem('isLoggedIn', false);

    // Hide the Sign Out button and show Login/Signup buttons again
    document.getElementById('sign-out-btn').style.display = 'none';
    document.getElementById('login-btn').style.display = 'inline-block';
    document.getElementById('signup-btn').style.display = 'inline-block';

    // Redirect to home page after logout
    window.location.href = 'index.html';
};

function filterModels() {
    const selectedClass = document.getElementById('car-class').value.toLowerCase();
    const modelCards = document.querySelectorAll('.model-card');

    modelCards.forEach(card => {
        const carClass = card.getAttribute('data-class').toLowerCase();

        if (selectedClass === "" || carClass === selectedClass) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const carousel = document.querySelector('.carousel');
    let currentIndex = 0;

    // Функция для обновления позиции карусели
    const updateCarousel = () => {
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        const offset = -currentIndex * 100; // Сдвиг карусели
        carousel.style.transform = `translateX(${offset}%)`;
    };

    // Обработчик для кнопки "влево"
    prevButton.addEventListener('click', () => {
        const totalItems = document.querySelectorAll('.carousel-item').length;
        currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1; // Если первый, то идем к последнему
        updateCarousel();
    });

    // Обработчик для кнопки "вправо"
    nextButton.addEventListener('click', () => {
        const totalItems = document.querySelectorAll('.carousel-item').length;
        currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1; // Если последний, то идем к первому
        updateCarousel();
    });
});

