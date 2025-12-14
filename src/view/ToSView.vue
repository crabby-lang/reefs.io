<template>
  <div class="tos-container">
    <div class="glow-bar-left"></div>
    <div class="glow-bar-right"></div>
    <div class="tos-content">
      <h1>Terms of Service</h1>
      <p>Last updated: December 12, 2025</p>
      <p>
        By using reefs.io, you agree to the following terms and conditions (the "Terms of Service" or "TOS"). These Terms of Service govern your use of reefs.io and all associated services, features, and content provided by reefs.io.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using reefs.io, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our service. We reserve the right to refuse service to anyone at our discretion.
      </p>

      <h2>2. User Responsibilities</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other breach of security.
      </p>

      <h2>3. Safety</h2>
      <p>
        reefs.io takes the safety of our users very seriously. We take reasonable steps to protect your information from loss, misuse, unauthorized access, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
      </p>
      <p>
        Users agree not to engage in any activity that may compromise the safety or security of reefs.io or its users, including but not limited to hacking, phishing, malware distribution, or any form of cyber attack.
      </p>

      <h2>4. Security</h2>
      <p>
        We use strong password hashing and salting, secure connections (HTTPS/SSL), and regularly review our (and your) code for security vulnerabilities. Our security measures include:
      </p>
      <ul>
        <li>Standard encryption protocols</li>
        <li>Regular security audits and penetration testing</li>
        <li>Secure data transmission and storage</li>
        <li>Two-factor authentication support</li>
      </ul>

      <h2>5. User Content and Intellectual Property</h2>
      <p>
        You retain all rights to any content you submit, post, or display on reefs.io. By submitting packages or libs to reefs.io, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, and distribute your content for the purposes of operating and improving our service.
      </p>
      <p>
        You agree not to submit any content that infringes upon the intellectual property rights of others or violates any applicable laws.
      </p>

      <h2>6. Prohibited Activities</h2>
      <p>
        You agree not to engage in any of the following prohibited activities:
      </p>
      <ul>
        <li>Harassing, threatening, or abusing other users</li>
        <li>Posting spam, unsolicited content, or advertisements</li>
        <li>Attempting to gain unauthorized access to our systems</li>
        <li>Reverse engineering or attempting to discover our source code</li>
        <li>Using automated tools to scrape or collect data from reefs.io</li>
        <li>Violating any applicable laws or regulations</li>
      </ul>

      <h2>7. Limitation of Liability</h2>
      <p>
        In no event shall reefs.io, its owners, operators, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of reefs.io or these Terms of Service. This includes but is not limited to damages for lost profits, loss of data, or business interruption.
      </p>

      <h2>8. Accountability</h2>
      <p>
        We will not be liable for any loss or damage arising from your failure to comply with these Terms of Service. You assume all responsibility and risk for your use of reefs.io and any content accessed through the service.
      </p>

      <h2>9. Third-Party Links and Services</h2>
      <p>
        reefs.io may contain links to third-party websites and services. We are not responsible for the content, accuracy, or practices of these external sites. Your use of third-party services is governed by their respective terms and conditions.
      </p>

      <h2>10. Termination of Service</h2>
      <p>
        We reserve the right to terminate or suspend your account and access to reefs.io at any time, with or without cause, and with or without notice. This includes but is not limited to violations of these Terms of Service or engagement in prohibited activities.
      </p>

      <h2>11. Changes to Terms of Service</h2>
      <p>
        We reserve the right to modify or replace these Terms of Service at any time without notice. If we make material changes to these Terms, we will update the "Last updated" date at the top of this page and notify users through our platform.
      </p>
      <p>
        Your continued use of reefs.io following the posting of changes to these Terms of Service will confirm your acceptance of the changes.
      </p>

      <h2>12. Governing Law</h2>
      <p>
        These Terms of Service are governed by and construed in accordance with applicable law, and you irrevocably submit to the exclusive jurisdiction of the courts located in the applicable jurisdiction.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        If you have any questions about these Terms of Service or reefs.io, please <a href="/contact">Contact Us</a> through our contact form or support channels. We are committed to resolving any concerns or disputes promptly and fairly.
      </p>
    </div>
  </div>
</template>

<style scoped>
.tos-container {
  position: relative;
  min-height: calc(100vh - 100px);
  padding: 2rem;
  background-color: #fff;
  color: #000;
  border-left: 5px solid #ff8c00;
  border-right: 5px solid #ff8c00;
  box-shadow: inset 0 0 20px rgba(255, 140, 0, 0.1), 0 0 30px rgba(255, 140, 0, 0.2);
}

.tos-container .glow-bar-left {
  position: absolute;
  top: 0;
  left: -5px;
  width: 5px;
  height: 100%;
  background: linear-gradient(to bottom, #ff8c00, transparent, #ff8c00);
  animation: glowLeft 3s ease-in-out infinite;
  box-shadow: 0 0 15px rgba(255, 140, 0, 0.8), inset 0 0 10px rgba(255, 140, 0, 0.5);
}

.tos-container .glow-bar-right {
  position: absolute;
  top: 0;
  right: -5px;
  width: 5px;
  height: 100%;
  background: linear-gradient(to bottom, #ff8c00, transparent, #ff8c00);
  animation: glowRight 3s ease-in-out infinite;
  animation-delay: 1.5s;
  box-shadow: 0 0 15px rgba(255, 140, 0, 0.8), inset 0 0 10px rgba(255, 140, 0, 0.5);
}

.tos-content {
  margin: 0 auto;
  max-width: 1000px;
  position: relative;
  z-index: 1;
}

.tos-content h1 {
  color: #ff8c00;
  font-weight: bold;
  font-size: 2.5rem;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.3);
  margin-bottom: 0.5rem;
}

.tos-content h2 {
  color: #ff8c00;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 140, 0, 0.3);
  text-shadow: 0 0 8px rgba(255, 140, 0, 0.2);
}

.tos-content p {
  color: #000;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tos-content ul {
  margin: 1rem 0 1rem 2rem;
  color: #000;
}

.tos-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

@keyframes glowLeft {
  0%, 100% {
    opacity: 0.6;
    box-shadow: 0 0 15px rgba(255, 140, 0, 0.6), inset 0 0 10px rgba(255, 140, 0, 0.3);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 25px rgba(255, 140, 0, 1), inset 0 0 15px rgba(255, 140, 0, 0.6);
  }
}

@keyframes glowRight {
  0%, 100% {
    opacity: 0.6;
    box-shadow: 0 0 15px rgba(255, 140, 0, 0.6), inset 0 0 10px rgba(255, 140, 0, 0.3);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 25px rgba(255, 140, 0, 1), inset 0 0 15px rgba(255, 140, 0, 0.6);
  }
}

</style>
