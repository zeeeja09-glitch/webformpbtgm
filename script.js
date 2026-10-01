document.addEventListener('DOMContentLoaded', () => {
    // Elemen Halaman Cover & Form
    const coverPage = document.getElementById('coverPage');
    const formPage = document.getElementById('formPage');
    const btnToForm = document.getElementById('btnToForm');
    const btnBackToCover = document.getElementById('btnBackToCover');

    // Elemen Form & Input
    const form = document.getElementById('registrationForm');
    const alertBox = document.getElementById('alertBox');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const extracurricularSelect = document.getElementById('extracurricular');

    // Navigasi Antar Halaman
    btnToForm.addEventListener('click', () => {
        coverPage.classList.add('hidden');
        formPage.classList.remove('hidden');
    });

    btnBackToCover.addEventListener('click', () => {
        formPage.classList.add('hidden');
        coverPage.classList.remove('hidden');
    });

    // Validasi Nama Lengkap (min 3 karakter)
    function validateFullName() {
        const val = fullNameInput.value.trim();
        const err = document.getElementById('fullNameError');
        if (val === '') {
            showError(fullNameInput, err, 'Bagian ini harus diisi');
            return false;
        } else if (val.length < 3) {
            showError(fullNameInput, err, 'Nama lengkap minimal 3 karakter');
            return false;
        } else {
            showSuccess(fullNameInput, err);
            return true;
        }
    }

    // Validasi Email
    function validateEmail() {
        const val = emailInput.value.trim();
        const err = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val === '') {
            showError(emailInput, err, 'Bagian ini harus diisi');
            return false;
        } else if (!emailRegex.test(val)) {
            showError(emailInput, err, 'Format email tidak valid');
            return false;
        } else {
            showSuccess(emailInput, err);
            return true;
        }
    }

    // Validasi Password (min 8 karakter)
    function validatePassword() {
        const val = passwordInput.value;
        const err = document.getElementById('passwordError');
        if (val === '') {
            showError(passwordInput, err, 'Bagian ini harus diisi');
            return false;
        } else if (val.length < 8) {
            showError(passwordInput, err, 'Password minimal 8 karakter');
            return false;
        } else {
            showSuccess(passwordInput, err);
            return true;
        }
    }

    // Validasi Konfirmasi Password
    function validateConfirmPassword() {
        const val = confirmPasswordInput.value;
        const passVal = passwordInput.value;
        const err = document.getElementById('confirmPasswordError');
        if (val === '') {
            showError(confirmPasswordInput, err, 'Bagian ini harus diisi');
            return false;
        } else if (val !== passVal) {
            showError(confirmPasswordInput, err, 'Konfirmasi password tidak cocok');
            return false;
        } else {
            showSuccess(confirmPasswordInput, err);
            return true;
        }
    }

    // Validasi Ekstrakurikuler
    function validateExtracurricular() {
        const val = extracurricularSelect.value;
        const err = document.getElementById('extracurricularError');
        if (val === '') {
            showError(extracurricularSelect, err, 'Bagian ini harus diisi');
            return false;
        } else {
            showSuccess(extracurricularSelect, err);
            return true;
        }
    }

    // Helper Tampilkan Error (Border Merah)
    function showError(input, errorEl, msg) {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorEl.textContent = msg;
    }

    // Helper Tampilkan Sukses (Border Hijau)
    function showSuccess(input, errorEl) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorEl.textContent = '';
    }

    // Real-time Event Listener saat Diisi/Diubah
    fullNameInput.addEventListener('input', validateFullName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    extracurricularSelect.addEventListener('change', validateExtracurricular);

    // Bola Voli sebagai pilihan utama otomatis berstatus valid
    validateExtracurricular();

    // Event Submit Form
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const v1 = validateFullName();
        const v2 = validateEmail();
        const v3 = validatePassword();
        const v4 = validateConfirmPassword();
        const v5 = validateExtracurricular();

        const isFormValid = v1 && v2 && v3 && v4 && v5;

        if (isFormValid) {
            alertBox.className = 'alert alert-success';
            alertBox.textContent = 'form berhasil terkirim';
            alertBox.classList.remove('hidden');
        } else {
            alertBox.className = 'alert alert-danger';
            alertBox.textContent = 'form tidak dapat terkirim';
            alertBox.classList.remove('hidden');
        }
    });
});