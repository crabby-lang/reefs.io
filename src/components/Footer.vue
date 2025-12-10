<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>reefs.io</h4>
          <p>The modern package hosting platform for crabby developers.</p>
          <div class="social-links">
            <a href="https://github.com/crabby-lang/reefs.io" aria-label="GitHub">🐙</a>
            <a href="" aria-label="Twitter">𝕏</a>
            <a href="" aria-label="Discord">💬</a>
          </div>
        </div>

        <div class="footer-section">
          <h5>Product</h5>
          <ul>
            <li><a href="/features">Features</a></li>
            <li><a href="/packages">Packages</a></li>
            <li><a href="/docs">Documentation</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h5>Community</h5>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/status">Status</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h5>Legal</h5>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2025 reefs.io. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #000;
  color: #fff;
  padding: 4rem 2rem 2rem;
  border-top: 2px solid rgba(255, 140, 0, 0.2);
}

.footer-container {
  width: 100%;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h4 {
  font-size: 1.3rem;
  color: #f07237;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.footer-section h5 {
  font-size: 0.95rem;
  color: #fff;
  margin: 0 0 1rem 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-section p {
  color: #aaa;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 140, 0, 0.1);
  border: 2px solid rgba(255, 140, 0, 0.3);
  border-radius: 50%;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-links a:hover {
  background-color: #f26727;
  border-color: #f26727;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.75rem;
}

.footer-section ul a {
  color: #aaa;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.footer-section ul a:hover {
  color: #f26727;
  padding-left: 5px;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 140, 0, 0.1);
  padding-top: 2rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 1.5rem;
  }

  .footer-content {
    gap: 2rem;
  }

  .footer-section {
    grid-column: 1 / -1;
  }
}
</style>
