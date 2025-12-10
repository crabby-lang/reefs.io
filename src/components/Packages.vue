<template>
  <section id="packages" class="packages">
    <div class="packages-container">
      <h2 class="section-title">Popular Packages</h2>
      <p class="section-subtitle">Explore some of our most loved packages</p>

      <div class="packages-footer">
        <button class="btn btn-explore">Browse All Packages →</button>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.packages {
  background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
  color: #fff;
  padding: 6rem 2rem;
}

.packages-container {
  width: 100%;
  padding: 0 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  text-align: center;
  color: #aaa;
  font-size: 1.1rem;
  margin: 0 0 3rem 0;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.package-card {
  background: rgba(255, 140, 0, 0.05);
  border: 2px solid rgba(255, 140, 0, 0.2);
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.package-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 140, 0, 0.1), transparent);
  transition: left 0.5s ease;
}

.package-card:hover {
  border-color: #f07237;
  box-shadow: 0 8px 24px rgba(255, 140, 0, 0.2);
  transform: translateY(-5px);
}

.package-card:hover::before {
  left: 100%;
}

.package-card.featured {
  border-color: #f26727;
  background: rgba(255, 140, 0, 0.1);
  transform: scale(1.05);
}

.package-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.package-badge {
  display: inline-block;
  background-color: rgba(255, 140, 0, 0.2);
  color: #f26727;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.featured-badge {
  background-color: #f26727;
  color: #000;
}

.package-downloads {
  font-size: 0.9rem;
  color: #aaa;
  font-weight: 500;
}

.package-card h3 {
  font-size: 1.3rem;
  color: #fff;
  margin: 0.5rem 0;
  font-weight: 700;
}

.package-card p {
  color: #bbb;
  line-height: 1.6;
  margin: 0.5rem 0 1.5rem 0;
  font-size: 0.95rem;
}

.package-meta {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 140, 0, 0.1);
}

.package-version {
  font-size: 0.85rem;
  color: #f26727;
  font-weight: 600;
}

.package-author {
  font-size: 0.85rem;
  color: #888;
}

.packages-footer {
  display: flex;
  justify-content: center;
}

.btn-explore {
  background-color: #f07237;
  color: #000;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-explore:hover {
  background-color: #f26727;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 140, 0, 0.4);
}

@media (max-width: 768px) {
  .packages {
    padding: 3rem 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .packages-grid {
    grid-template-columns: 1fr;
  }

  .package-card.featured {
    transform: scale(1);
  }
}
</style>
