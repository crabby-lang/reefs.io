<template>
    <div class="contact-container">
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
    max-width: 500px;
    margin: 40px auto;
    padding: 25px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

h1 {
    text-align: center;
    color: black;
    margin-bottom: 20px;
}

.contact-form {
    font-weight: bold;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
}

select {
    width: 50%;
    margin: 3px;
    padding: 7px;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    transition: 0.3s
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
}

input, textarea {
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
    transition: 0.3s
}

input:focus, textarea:focus {
    border-color: orangered;
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
    transition: 0.4s
}

.submit-btn:hover {
    background: black;
    color: white;
}

</style>
