<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <span class="logo-icon">🪸</span>
        <span class="logo-text">reefs.io</span>
      </router-link>
      <ul class="nav-menu">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/packages" class="nav-link">Packages</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/features" class="nav-link">Features</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/docs" class="nav-link">Docs</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/community" class="nav-link">Community</router-link>
        </li>
      </ul>
      <button class="nav-btn" @click="navigateToGetStarted">Get Started</button>
    </div>
  </nav>
</template>

<script setup>
const navigateToGetStarted = () => {
  window.open('https://github.com', '_blank')
}
</script>

<style scoped>
.navbar {
  background-color: #000;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(255, 140, 0, 0.1);
}

.nav-container {
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f26727;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-logo:hover {
  color: #f07237;
}

.logo-icon {
  font-size: 1.8rem;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #f07237;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #f07237;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-btn {
  background-color: #f07237;
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.nav-btn:hover {
  background-color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
}

@media (max-width: 768px) {
  .nav-menu {
    gap: 1rem;
  }

  .nav-container {
    padding: 0 1rem;
  }
}
</style>
