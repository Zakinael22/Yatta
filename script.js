// Animasi saat scroll
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    container.classList.add("show");
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(container);
});

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDhoENyGPZK16sak8HSvqfmP4iW0jbQg_Q",
    authDomain: "xvisual-project.firebaseapp.com",
    projectId: "xvisual-project",
    storageBucket: "xvisual-project.firebasestorage.app",
    messagingSenderId: "388837789160",
    appId: "1:388837789160:web:13948797d4bb4fee5e685d"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Setup reCAPTCHA
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': function(response) {
        console.log("reCAPTCHA berhasil diverifikasi!");
    }
});

// Kirim OTP
function sendOTP() {
    let phoneNumber = document.getElementById("phone-number").value;
    let appVerifier = window.recaptchaVerifier;

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            document.getElementById("otp-verification").style.display = "block";
            alert("Kode OTP telah dikirim!");
        }).catch(function (error) {
            alert("Gagal mengirim OTP: " + error.message);
        });
}

// Verifikasi OTP
function verifyOTP() {
    let otpCode = document.getElementById("otp-code").value;

    confirmationResult.confirm(otpCode).then(function (result) {
        alert("Login berhasil!");
        console.log("User: ", result.user);
    }).catch(function (error) {
        alert("Kode OTP salah: " + error.message);
    });
}

// Efek hover di button
const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
        btn.style.boxShadow = "0 0 15px rgba(106, 0, 244, 0.8)";
    });
    btn.addEventListener("mouseout", () => {
        btn.style.boxShadow = "none";
    });
});