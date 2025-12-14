<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="hero-title-top">The Package Hub for</span>
        <span class="typing-text">Crabby Developers.</span>
      </h1>
      <p class="hero-subtitle">
        Discover, share, and deploy <b>Crabby</b> packages and libraries with reefs.io. 
        Fast, reliable, and built for the future.
      </p>
      <div class="hero-buttons">
        <button class="btn btn-primary">Start Publishing</button>
        <button class="btn btn-secondary">Explore Packages</button>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">N/A</span>
          <span class="stat-label">Packages</span>
        </div>
        <div class="stat">
          <span class="stat-number">N/A</span>
          <span class="stat-label">Developers</span>
        </div>
        <div class="stat">
          <span class="stat-number">N/A</span>
          <span class="stat-label">Uptime</span>
        </div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="floating-card card-1">📦</div>
      <div class="floating-card card-2">🚀</div>
      <div class="floating-card card-3">⚡</div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
  color: #fff;
  padding: 6rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  margin: 0;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: -200px;
  width: 400px;
  height: 400px;
  background: rgba(255, 140, 0, 0.1);
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}

.hero-content {
  z-index: 2;
  position: relative;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero-title-top {
  background: linear-gradient(135deg, #f26727, #f07237);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #ccc;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  max-width: 500px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn {
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #f26727;
  color: #000;
}

.btn-primary:hover {
  background-color: #f07237;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(241, 132, 6, 0.836);
}

.btn-secondary {
  background-color: transparent;
  color: #f26727;
  border: 2px solid #f07237;
}

.btn-secondary:hover {
  background-color: rgba(255, 140, 0, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(233, 107, 4, 0.932);
}

.hero-stats {
  display: flex;
  gap: 3rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #f07237;
}

.stat-label {
  font-size: 0.9rem;
  color: #aaa;
  margin-top: 0.5rem;
}

.hero-visual {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-card {
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(255, 140, 0, 0.1);
  border: 2px solid #f26727;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  animation: float 3s ease-in-out infinite;
}

.card-1 {
  animation-delay: 0s;
  top: 20px;
  left: 40px;
}

.card-2 {
  animation-delay: 1s;
  top: 120px;
  right: 60px;
}

.card-3 {
  animation-delay: 2s;
  bottom: 40px;
  left: 80px;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes typing {
  0% {
    width: 0;
    visibility: visible;
  }
  100% {
    width: 22.5ch;
  }
}

.typing-text {
  font-weight: bold;
  display: inline-block;
  overflow: hidden;
  border-right: 3px solid #f26727;
  white-space: nowrap;
  animation: typing 3.5s steps(23, end) infinite;
  padding-right: 5px;
  background: linear-gradient(135deg, #f26727, #f07237);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .hero-visual {
    height: 250px;
  }

  .floating-card {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
}
</style>
