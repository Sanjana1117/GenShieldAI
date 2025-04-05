// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const uploadModal = document.getElementById('uploadModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const uploadForm = document.getElementById('uploadForm');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');
const uploadError = document.getElementById('uploadError');
const closeButtons = document.querySelectorAll('.close-modal');
const switchToSignup = document.querySelector('.switch-to-signup');
const switchToLogin = document.querySelector('.switch-to-login');
const getStartedBtn = document.querySelector('.get-started-btn');
const signUpBtn = document.querySelector('.sign-up-btn');
const signInLinks = document.querySelectorAll('.sign-in-link, .hero-sign-in, .cta-sign-in, .mobile-sign-in');
const logoutBtns = document.querySelectorAll('.logout-btn, .mobile-logout');
const uploadButtons = document.querySelectorAll('.upload-content-btn, .cta-upload-btn');
const mobileSignUpBtn = document.querySelector('.mobile-sign-up');
const platformRestrictCheckbox = document.getElementById('platformRestrict');
const platformOptions = document.querySelector('.platform-options');
const contentFileInput = document.getElementById('contentFile');
const filePreview = document.querySelector('.file-preview');
const previewContainer = document.querySelector('.preview-container');
const fileNameDisplay = document.querySelector('.file-name');
const removeFileBtn = document.querySelector('.remove-file');
const yearEl = document.getElementById('current-year');

// Set current year in footer
yearEl.textContent = new Date().getFullYear();

// Mock user database
const users = [
    { email: 'user@example.com', password: 'password123' }
];

// State
let currentUser = null;
let selectedFile = null;

// Check if user is logged in from localStorage
function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    }
}

// Initialize app
function init() {
    checkAuth();
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    // Switch between login and register
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal(registerModal);
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal(loginModal);
        });
    }

    // Open login modal
    signInLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal(loginModal);
        });
    });

    // Open register modal
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal(registerModal);
        });
    }

    if (signUpBtn) {
        signUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal(registerModal);
        });
    }

    if (mobileSignUpBtn) {
        mobileSignUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
            openModal(registerModal);
        });
    }

    // Login form submit
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form submit
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Logout buttons
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });

    // Upload buttons
    uploadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
            openModal(uploadModal);
        });
    });

    // Platform restriction checkbox
    if (platformRestrictCheckbox) {
        platformRestrictCheckbox.addEventListener('change', togglePlatformOptions);
    }

    // File input change
    if (contentFileInput) {
        contentFileInput.addEventListener('change', handleFileSelect);
    }

    // Remove file button
    if (removeFileBtn) {
        removeFileBtn.addEventListener('click', removeSelectedFile);
    }

    // Upload form submit
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUpload);
    }

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // Close modal with Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// UI Functions
function toggleMobileMenu() {
    if (mobileMenu.style.display === 'block') {
        closeMobileMenu();
    } else {
        mobileMenu.style.display = 'block';
    }
}

function closeMobileMenu() {
    mobileMenu.style.display = 'none';
}

function openModal(modal) {
    closeAllModals();
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = '';
}

function togglePlatformOptions() {
    if (platformRestrictCheckbox.checked) {
        platformOptions.style.display = 'block';
    } else {
        platformOptions.style.display = 'none';
    }
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function updateUIForLoggedInUser() {
    // Update user email displays
    const userEmailElements = document.querySelectorAll('.user-email, .mobile-user-email');
    userEmailElements.forEach(el => {
        el.textContent = currentUser.email;
    });

    // Show/hide elements based on auth state
    document.querySelectorAll('.logged-out-view').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.logged-in-view').forEach(el => el.style.display = 'flex');
    document.querySelectorAll('.auth-logged-out, .mobile-auth-logged-out').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.auth-logged-in, .mobile-auth-logged-in').forEach(el => el.style.display = 'flex');
    document.querySelectorAll('.nav-dashboard, .nav-upload, .mobile-dashboard, .mobile-upload').forEach(el => el.style.display = 'block');
}

function updateUIForLoggedOutUser() {
    document.querySelectorAll('.logged-in-view').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.logged-out-view').forEach(el => el.style.display = 'flex');
    document.querySelectorAll('.auth-logged-in, .mobile-auth-logged-in').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.auth-logged-out, .mobile-auth-logged-out').forEach(el => el.style.display = 'flex');
    document.querySelectorAll('.nav-dashboard, .nav-upload, .mobile-dashboard, .mobile-upload').forEach(el => el.style.display = 'none');
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    selectedFile = file;
    fileNameDisplay.textContent = file.name;
    filePreview.style.display = 'flex';
    
    // Clear previous preview
    previewContainer.innerHTML = '';
    
    // Create preview based on file type
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        previewContainer.appendChild(img);
    } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.controls = true;
        previewContainer.appendChild(video);
    } else {
        // For other file types like documents
        const icon = document.createElement('div');
        icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-center mt-2">${file.type || 'Document'}</p>
        `;
        previewContainer.appendChild(icon);
    }
}

function removeSelectedFile() {
    selectedFile = null;
    contentFileInput.value = '';
    filePreview.style.display = 'none';
    previewContainer.innerHTML = '';
}

// Auth Functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    clearError(loginError);
    
    // Simple validation
    if (!email || !password) {
        showError(loginError, 'Please enter both email and password');
        return;
    }
    
    // Check credentials (in a real app, this would be an API request)
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        currentUser = { email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        closeAllModals();
        
        // Show success message
        alert('Login successful!');
    } else {
        // Try demo account if no match
        if (email === 'demo@example.com' && password === 'demo123') {
            currentUser = { email: 'demo@example.com' };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUIForLoggedInUser();
            closeAllModals();
            alert('Demo login successful!');
        } else {
            showError(loginError, 'Invalid credentials. Try demo@example.com / demo123');
        }
    }
}

function handleRegister(e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    clearError(registerError);
    
    // Simple validation
    if (!email || !password || !confirmPassword) {
        showError(registerError, 'Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        showError(registerError, 'Passwords do not match');
        return;
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        showError(registerError, 'Email already registered');
        return;
    }
    
    // Register user (in a real app, this would be an API request)
    users.push({ email, password });
    
    // Login the new user
    currentUser = { email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUIForLoggedInUser();
    closeAllModals();
    
    // Show success message
    alert('Registration successful!');
}

function handleLogout(e) {
    e.preventDefault();
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUIForLoggedOutUser();
    
    if (e.target.classList.contains('mobile-logout')) {
        closeMobileMenu();
    }
}

function handleUpload(e) {
    e.preventDefault();
    
    if (!selectedFile) {
        showError(uploadError, 'Please select a file to upload');
        return;
    }
    
    const title = document.getElementById('contentTitle').value;
    if (!title) {
        showError(uploadError, 'Please enter a title for your content');
        return;
    }
    
    // Get protection options
    const invisibleWatermark = document.getElementById('invisibleWatermark').checked;
    const visibleWatermark = document.getElementById('visibleWatermark').checked;
    const platformRestrict = document.getElementById('platformRestrict').checked;
    
    let platforms = [];
    if (platformRestrict) {
        document.querySelectorAll('input[name="platform"]:checked').forEach(checkbox => {
            platforms.push(checkbox.value);
        });
        
        if (platforms.length === 0) {
            showError(uploadError, 'Please select at least one platform or disable platform restrictions');
            return;
        }
    }
    
    // In a real app, this would upload the file to a server
    // Simulate success with timeout
    clearError(uploadError);
    
    // Show loading state
    const submitButton = uploadForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Uploading...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        closeAllModals();
        alert('File uploaded successfully with the selected protection options!');
        
        // Reset form
        uploadForm.reset();
        removeSelectedFile();
        platformOptions.style.display = 'none';
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);