<template>
  <div class="packages-page">
    
    <section class="packages-header">
      <div class="packages-header-content">
        <h1>Crabby Packages</h1>
        <p>Explore our collection of amazing packages for Crabby and beyond</p>
        <div class="search-bar">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search packages..." 
            class="search-input"
          />
          <button class="search-btn">🔍</button>
        </div>
      </div>
    </section>

    <section class="packages-container">
      <aside class="sidebar">
        <div class="filter-group">
          <h3>Categories</h3>
          <label class="filter-item" v-for="category in categories" :key="category">
            <input 
              type="checkbox" 
              :value="category" 
              v-model="selectedCategories"
            />
            <span>{{ category }}</span>
          </label>
        </div>

        <div class="filter-group">
          <h3>Sort By</h3>
          <select v-model="sortBy" class="sort-select">
            <option value="downloads">Most Downloaded</option>
            <option value="recent">Recently Updated</option>
            <option value="name">Name (A-Z)</option>
            <option value="trending">Trending</option>
          </select>
        </div>

        <div class="stats">
          <h3>Statistics</h3>
          <div class="stat-item">
            <span class="stat-label">Total Packages</span>
            <span class="stat-value">{{ totalPackages }}</span>
          </div>
        </div>
      </aside>

      <main class="packages-main">
        <div class="packages-grid">
          <div 
            v-for="pkg in filteredPackages" 
            :key="pkg.name" 
            class="package-item"
          >
            <div class="package-header">
              <span class="package-badge" :class="pkg.category.toLowerCase()">
                {{ pkg.category }}
              </span>
              <span class="package-downloads">⬇️ {{ formatNumber(pkg.downloads) }}</span>
            </div>
            
            <h3 class="package-name">{{ pkg.name }}</h3>
            <p class="package-description">{{ pkg.description }}</p>
            
            <div class="package-meta">
              <div class="meta-item">
                <span class="meta-label">Version</span>
                <span class="meta-value">{{ pkg.version }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Author</span>
                <span class="meta-value">{{ pkg.author }}</span>
              </div>
            </div>

            <button class="package-btn">View Package →</button>
          </div>
        </div>

        <div v-if="filteredPackages.length === 0" class="no-packages">
          <p>No packages found. Try adjusting your filters.</p>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Package {
  _id?: string;
  name: string;
  version: string;
  description: string;
  author: string;
  downloads: number;
  category: string;
  badge: string;
  language: string;
}

const packages = ref<Package[]>([])
const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const sortBy = ref('downloads')
const totalPackages = ref(0)

const categories = [
  'Framework',
  'Utility',
  'UI Library',
  'Tools',
  'Testing',
  'Analytics',
  'Database',
  'Other'
]

// Mock data - will be changed once the API has been constructed
const mockPackages: Package[] = [
  {
    name: 'WebCrab',
    version: 'v0.0',
    description: 'A web framework for building web applications in Crabby with a focus on simplicity and performance.',
    author: 'Team',
    downloads: 0,
    category: 'Framework',
    badge: 'Framework',
    language: 'Crabby'
  },
  {
    name: 'DataSync',
    version: 'v0.0',
    description: 'Real-time data synchronization and state management for Crabby.',
    author: 'Team',
    downloads: 0,
    category: 'Utility',
    badge: 'Utility',
    language: 'Crabby'
  }
]

const filteredPackages = computed(() => {
  let result = packages.value

  // Filter by search query
  if (searchQuery.value) {
    result = result.filter(pkg =>
      pkg.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      pkg.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by categories
  if (selectedCategories.value.length > 0) {
    result = result.filter(pkg =>
      selectedCategories.value.includes(pkg.category)
    )
  }

  // Sort
  if (sortBy.value === 'downloads') {
    result.sort((a, b) => b.downloads - a.downloads)
  } else if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'recent') {
    result.reverse()
  }

  return result
})

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

onMounted(async () => {
  // Load packages
  packages.value = mockPackages
  totalPackages.value = mockPackages.length

})
</script>

<style scoped>
.packages-page {
  width: 100%;
  background-color: #fff;
}

.packages-header {
  background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
  color: #fff;
  padding: 4rem 2rem;
  width: 100%;
}

.packages-header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.packages-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #f26727, #f07237);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.packages-header p {
  font-size: 1.1rem;
  color: #aaa;
  margin: 0 0 2rem 0;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  max-width: 500px;
}

.search-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid rgba(255, 140, 0, 0.3);
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: #888;
}

.search-input:focus {
  outline: none;
  border-color: #f26727;
  background-color: rgba(0, 0, 0, 0.5);
}

.search-btn {
  padding: 0.8rem 1.5rem;
  background-color: #f26727;
  color: #000;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background-color: #f07237;
  transform: translateY(-2px);
}

.packages-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 3rem;
}

.sidebar {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-group {
  margin-bottom: 2rem;
}

.filter-group h3 {
  font-size: 1rem;
  color: #000;
  margin: 0 0 1rem 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #f26727;
  padding-bottom: 0.5rem;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  color: #666;
  font-size: 0.9rem;
}

.filter-item input[type="checkbox"] {
  cursor: pointer;
  accent-color: #f26727;
}

.filter-item:hover {
  color: #f26727;
}

.sort-select {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #f0f0f0;
  border-radius: 6px;
  background-color: #fff;
  color: #000;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-select:hover,
.sort-select:focus {
  border-color: #f26727;
  outline: none;
}

.stats {
  background-color: #fff;
  padding: 1rem;
  border-radius: 6px;
  border: 2px solid #f0f0f0;
  margin-top: 2rem;
}

.stats h3 {
  font-size: 0.9rem;
  color: #000;
  margin: 0 0 1rem 0;
  font-weight: 700;
  text-transform: uppercase;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stat-label {
  color: #666;
  font-size: 0.85rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #f26727;
}

.packages-main {
  width: 100%;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.package-item {
  background: #fff;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.package-item:hover {
  border-color: #f26727;
  box-shadow: 0 10px 30px rgba(242, 103, 39, 0.15);
  transform: translateY(-5px);
}

.package-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.package-badge {
  display: inline-block;
  background-color: rgba(242, 103, 39, 0.1);
  color: #f26727;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.package-downloads {
  font-size: 0.85rem;
  color: #888;
  font-weight: 500;
}

.package-name {
  font-size: 1.3rem;
  color: #000;
  margin: 0.5rem 0;
  font-weight: 700;
}

.package-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0.5rem 0 1.5rem 0;
  flex-grow: 1;
}

.package-meta {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin: 1rem 0;
  font-size: 0.85rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.meta-label {
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.meta-value {
  color: #f26727;
  font-weight: 600;
  margin-top: 0.25rem;
}

.package-btn {
  background-color: #f26727;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.package-btn:hover {
  background-color: #f07237;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(242, 103, 39, 0.3);
}

.no-packages {
  font-weight: bold;
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #000000;
  font-size: 1.1rem;
}

@media (max-width: 1024px) {
  .packages-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .packages-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .packages-header h1 {
    font-size: 2rem;
  }

  .packages-header p {
    font-size: 1rem;
  }

  .search-bar {
    flex-direction: column;
  }

  .packages-grid {
    grid-template-columns: 1fr;
  }

  .packages-container {
    padding: 1.5rem;
  }
}
</style>
