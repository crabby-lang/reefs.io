<template>
  <div class="docs-container">
    <!-- Warning Notice Card -->
    <div class="notice-card">
      <div class="notice-header">
        <span class="notice-icon">⚠️</span>
        <h2>Development Notice</h2>
      </div>
      <p class="notice-text">
        reefs.io is currently in active development. Features and documentation may change frequently. 
        We appreciate your patience and feedback as we build this platform.
      </p>
    </div>

    <!-- Main Content -->
    <div class="docs-content">
      <section class="doc-section">
        <h2>About reefs.io</h2>
        <p>
          reefs.io is a centralized package registry and hosting platform for the Crabby programming language. 
          Our mission is to make it easy for developers to discover, share, and manage libraries and tools 
          for the Crabby ecosystem.
        </p>
      </section>

      <section class="doc-section">
        <h2>Getting Started</h2>
        <div class="subsection">
          <h3>What is Crabby?</h3>
          <p>
            <a href="https://github.com/crabby-lang/crabby">Crabby</a> is a modern programming language designed for performance, safety, and developer productivity. 
            reefs.io serves as the hub for all Crabby packages and libraries.
          </p>
        </div>

        <div class="subsection">
          <h3>Finding Packages</h3>
          <p>
            Browse our package registry to discover available libraries. Use the search functionality or 
            browse by category to find exactly what you need for your project.
          </p>
        </div>

        <div class="subsection">
          <h3>Publishing Your Package</h3>
          <p>
            Ready to share your work? Visit our GitHub repository to learn how to publish your package 
            to reefs.io. We welcome contributions from the community!
          </p>
        </div>
      </section>

      <section class="doc-section">
        <h2>Features</h2>
        <ul class="features-list">
          <li>Comprehensive package registry for Crabby</li>
          <li>Version management and semantic versioning</li>
          <li>Dependency resolution and management</li>
          <li>Community-driven package ecosystem</li>
          <li>Detailed package documentation and examples</li>
          <li>Security scanning and package verification</li>
        </ul>
      </section>

      <section class="doc-section">
        <h2>Resources</h2>
        <div class="resources-grid">
          <div class="resource-card">
            <h4>📚 Documentation</h4>
            <p>Learn how to use reefs.io and manage your packages with our comprehensive guides.</p>
          </div>
          <div class="resource-card">
            <h4>🔗 GitHub</h4>
            <p>Check out our source code and contribute to the project on GitHub.</p>
          </div>
          <div class="resource-card">
            <h4>💬 Community</h4>
            <p>Join our community to connect with other developers and get support.</p>
          </div>
          <div class="resource-card">
            <h4>🐛 Report Issues</h4>
            <p>Found a bug? Let us know on our issue tracker so we can improve the platform.</p>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2>FAQ</h2>
        <div class="faq-item">
          <h4>Q: How do I search for packages?</h4>
          <p>A: You can use the search bar on our packages page or navigate through our categories to find what you're looking for.</p>
        </div>
        <div class="faq-item">
          <h4>Q: Is reefs.io free to use?</h4>
          <p>A: Yes! reefs.io is completely free for publishing and using packages in your projects.</p>
        </div>
        <div class="faq-item">
          <h4>Q: How can I contribute?</h4>
          <p>A: We welcome contributions! Please visit our GitHub repository for contribution guidelines and get started.</p>
        </div>
        <div class="faq-item">
          <h4>Q: What if I encounter a bug?</h4>
          <p>A: Please report any issues on our GitHub issue tracker. We appreciate detailed bug reports with reproduction steps.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.docs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 100px);
}

/* ============ Notice Card Styling ============ */

.notice-card {
  background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
  border: 3px solid #000;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
}

/* Striped border design */

.notice-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    #ff8c00 0px,
    #ff8c00 10px,
    #000 10px,
    #000 20px
  );
}

.notice-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    #ff8c00 0px,
    #ff8c00 10px,
    #000 10px,
    #000 20px
  );
}

.notice-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.notice-icon {
  font-size: 2rem;
}

.notice-header h2 {
  color: #000;
  margin: 0;
  font-size: 1.5rem;
}

.notice-text {
  color: #333;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* ============ Main Content ============ */

.docs-content {
  margin-top: 2rem;
}

.doc-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: #fff;
  border-left: 4px solid #ff8c00;
  border-radius: 4px;
}

.doc-section h2 {
  color: #000;
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #ff8c00;
  padding-bottom: 0.5rem;
}

.doc-section p {
  color: #333;
  line-height: 1.8;
  font-size: 1rem;
}

.subsection {
  margin-bottom: 2rem;
}

.subsection h3 {
  color: #000;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.subsection p {
  color: #555;
  margin-left: 0;
}

/* ============ Features List ============ */

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding: 0.75rem 0 0.75rem 2rem;
  color: #333;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
}

.features-list li:last-child {
  border-bottom: none;
}

.features-list li::before {
  content: '▸';
  color: #ff8c00;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* ============ Resources Grid ============ */

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.resource-card {
  background: linear-gradient(135deg, #f9f9f9 0%, #fff 100%);
  border: 2px solid #ff8c00;
  border-radius: 6px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.resource-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: repeating-linear-gradient(
    90deg,
    #ff8c00 0px,
    #ff8c00 8px,
    transparent 8px,
    transparent 16px
  );
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(255, 140, 0, 0.2);
  /* border-color: #000; */
}

.resource-card h4 {
  color: #000;
  margin: 1rem 0 0.5rem 0;
  font-size: 1.1rem;
}

.resource-card p {
  color: #555;
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* ============ FAQ ============ */

.faq-item {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-left: 4px solid #ff8c00;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.faq-item:hover {
  background: #fff;
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.1);
}

.faq-item h4 {
  color: #000;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.faq-item p {
  color: #555;
  margin: 0;
  line-height: 1.6;
}

/* ============ Responsive Design ============ */

@media (max-width: 768px) {
  .docs-container {
    padding: 1rem;
  }

  .notice-card {
    padding: 1.5rem;
  }

  .doc-section {
    padding: 1.5rem;
  }

  .doc-section h2 {
    font-size: 1.5rem;
  }

  .subsection h3 {
    font-size: 1.1rem;
  }

  .resources-grid {
    grid-template-columns: 1fr;
  }

  .notice-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .notice-header h2 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .docs-container {
    padding: 0.75rem;
  }

  .notice-card {
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .doc-section {
    padding: 1rem;
  }

  .doc-section h2 {
    font-size: 1.3rem;
  }

  .notice-icon {
    font-size: 1.5rem;
  }
}
</style>
