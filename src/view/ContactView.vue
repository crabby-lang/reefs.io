<template>
    <div class="contact-container">
        <div class="contact-wrapper">
            <div class="form-section">
                <h1>Contact Us! 📧</h1>
                
                <form @submit.prevent="submitForm" class="contact-form">
                    <label>Username</label>
                    <input 
                      v-model="form.username"
                      id="name"
                      type="text"
                      placeholder="Username"
                      required
                    />

                    <label>Email</label>
                    <input 
                      v-model="form.email"
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                    />

                    <label>Subject</label>
                    <select id="subject" v-model="form.subject" required>
                        <option value="Feedback">Feedback</option>
                        <option value="Bug-Report">Bug Report</option>
                        <option value="Suggestions">Suggestions</option>
                        <option value="Packages / Libraries">Packages / Libraries</option>
                        <option value="Security Issues">Security Issues</option>
                    </select>

                    <label>Message</label>
                    <textarea v-model="form.message" id="text" placeholder="Write your message or feedback..." required></textarea>

                    <button type="submit" class="submit-btn">Send</button>
                </form>
            </div>

            <div class="bubbles-section">
                <div class="bubble" style="animation-delay: 0s;"></div>
                <div class="bubble" style="animation-delay: 1s;"></div>
                <div class="bubble" style="animation-delay: 2s;"></div>
                <div class="bubble" style="animation-delay: 3s;"></div>
                <div class="bubble" style="animation-delay: 1.5s;"></div>
                <div class="bubble" style="animation-delay: 2.5s;"></div>
                <div class="bubble" style="animation-delay: 0.5s;"></div>
                <div class="bubble" style="animation-delay: 3.5s;"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ContactView",

    data() {
        return {
            form: {
                username: "",
                email: "",
                subject: "",
                message: ""
            }
        };
    },

    methods: {
        submitForm() {
            console.log("Form submitted!", this.form);
            alert("Thank you! :) Your message has been sent.");

            this.form = {
                username: "",
                email: "",
                subject: "",
                message: ""
            };
        }
    }
};
</script>

<style scoped>
.contact-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
    padding: 20px;
}

.contact-wrapper {
    display: flex;
    width: 100%;
    max-width: 1200px;
    height: 600px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    overflow: hidden;
}

.form-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 40px;
    justify-content: center;
    overflow-y: auto;
}

.bubbles-section {
    flex: 1;
    position: relative;
    background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
    overflow: hidden;
}

h1 {
    text-align: left;
    color: black;
    margin-bottom: 30px;
    font-size: 28px;
}

.contact-form {
    font-weight: bold;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

select {
    width: 100%;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
    font-size: 16px;
}

option {
    font-family: "Maple Mono";
    src: url('../assets/fonts/MapleMono-SemiBold.ttf') format('truetype');
    font-weight: 12px;
    background-color: black;
    color: white;
    border: 2px solid #fff;
    border-radius: 10px;
    outline: black;
    transition: 0.5s;
}

label {
    font-weight: bold;
    color: #333;
    margin-top: 8px;
}

input, textarea {
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
    transition: 0.3s;
    font-family: inherit;
}

input:focus, textarea:focus {
    border-color: orangered;
    box-shadow: 0 0 8px rgba(255, 69, 0, 0.3);
}

.submit-btn {
    background: orangered;
    color: black;
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
}

.submit-btn:hover {
    background: black;
    color: white;
}

.bubble {
    position: absolute;
    bottom: -50px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #ff6b4a, #ff4500);
    box-shadow: 0 0 20px rgba(255, 69, 0, 0.8), inset -2px -2px 5px rgba(0, 0, 0, 0.2);
    animation: floatUp 6s ease-in infinite;
    opacity: 0.8;
}

.bubble:nth-child(2) {
    width: 35px;
    height: 35px;
    left: 15%;
}

.bubble:nth-child(3) {
    width: 50px;
    height: 50px;
    left: 35%;
}

.bubble:nth-child(4) {
    width: 30px;
    height: 30px;
    left: 55%;
}

.bubble:nth-child(5) {
    width: 45px;
    height: 45px;
    left: 75%;
}

.bubble:nth-child(6) {
    width: 35px;
    height: 35px;
    left: 20%;
}

.bubble:nth-child(7) {
    width: 40px;
    height: 40px;
    left: 65%;
}

.bubble:nth-child(8) {
    width: 48px;
    height: 48px;
    left: 85%;
}

@keyframes floatUp {
    0% {
        bottom: -50px;
        opacity: 0;
        transform: translateX(0) scale(0.8);
    }
    10% {
        opacity: 0.8;
    }
    50% {
        opacity: 0.8;
        filter: brightness(1.2);
    }
    90% {
        opacity: 0.3;
    }
    100% {
        bottom: 100vh;
        opacity: 0;
        transform: translateX(20px) scale(1);
    }
}

@media (max-width: 768px) {
    .contact-wrapper {
        flex-direction: column;
        height: auto;
    }

    .form-section {
        flex: 1;
        padding: 30px 20px;
    }

    .bubbles-section {
        min-height: 300px;
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    .contact-form {
        gap: 12px;
    }

    select {
        width: 100%;
    }
}

</style>
