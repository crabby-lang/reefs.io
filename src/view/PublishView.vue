<template>
  <div class="publish-container">
    <div v-if="isAuthenticated" class="publish-panel">
      <div class="welcome-section">
        <h1>Publish Your Package</h1>
        <p class="user-greeting">Welcome, <span class="username">{{ currentUser?.username }}</span>! 🚀</p>
      </div>

      <div class="publish-content">
        <section class="form-section">
          <h2>Package Information</h2>
          <form @submit.prevent="handlePublish">
            <div class="form-group">
              <label for="packageName">Package Name</label>
              <input
                id="packageName"
                v-model="formData.packageName"
                type="text"
                placeholder="e.g., my-awesome-lib"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="version">Version</label>
                <input
                  id="version"
                  v-model="formData.version"
                  type="text"
                  placeholder="1.0.0"
                  pattern="\d+\.\d+\.\d+"
                  required
                />
              </div>
              <div class="form-group">
                <label for="license">License</label>
                <select id="license" v-model="formData.license" required>
                  <option value="">Select a license</option>
                  <option value="MIT">MIT</option>
                  <option value="Apache-2.0">Apache 2.0</option>
                  <option value="GPL-3.0">GPL 3.0</option>
                  <option value="BSD-3-Clause">BSD 3-Clause</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                v-model="formData.description"
                placeholder="Describe your package..."
                rows="4"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label for="repository">Repository URL</label>
              <input
                id="repository"
                v-model="formData.repository"
                type="url"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div class="form-group">
              <label for="keywords">Keywords (comma-separated)</label>
              <input
                id="keywords"
                v-model="formData.keywords"
                type="text"
                placeholder="crabby, lib, utility"
              />
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                <span v-if="!isPublishing">Publish Package</span>
                <span v-else>Publishing...</span>
              </button>
              <button type="reset" class="btn btn-secondary">Clear Form</button>
            </div>

            <div v-if="successMessage" class="alert alert-success">
              {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="alert alert-error">
              {{ errorMessage }}
            </div>
          </form>
        </section>

        <section class="guidelines-section">
          <h2>Publishing Guidelines</h2>
          <div class="guidelines-list">
            <div class="guideline-item">
              <span class="check-icon">✓</span>
              <div>
                <h4>Clear Documentation</h4>
                <p>Ensure your package has clear README and API documentation</p>
              </div>
            </div>
            <div class="guideline-item">
              <span class="check-icon">✓</span>
              <div>
                <h4>Semantic Versioning</h4>
                <p>Follow semantic versioning (MAJOR.MINOR.PATCH)</p>
              </div>
            </div>
            <div class="guideline-item">
              <span class="check-icon">✓</span>
              <div>
                <h4>Tests Included</h4>
                <p>Include unit tests with your package</p>
              </div>
            </div>
            <div class="guideline-item">
              <span class="check-icon">✓</span>
              <div>
                <h4>Proper License</h4>
                <p>Choose an appropriate license for your package</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div v-else class="error-panel">
      <div class="error-content">
        <div class="error-message">
          <h1>Access Denied !!</h1>
          <p>You need to be logged in to publish packages.</p>
          <p class="error-description">
            Oops! It seems you're not authenticated. Please log in or create an account to publish your packages on reefs.
          </p>
          <router-link to="/" class="btn btn-primary">Go Home</router-link>
        </div>

        <div class="cat-image-container">
          <div v-if="catLoading" class="loading-cat">
            <p>🐱 Loading a random cat for you...</p>
          </div>
          <img v-else-if="catImageUrl" :src="catImageUrl" :alt="catFact" class="cat-image" />
          <p v-if="catFact" class="cat-fact">{{ catFact }}</p>
          <button @click="loadRandomCat" class="btn btn-secondary">Load Another Cat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SessionManager from '../lib/sessionManager'
import type { User } from '../lib/types/user'

const router = useRouter()

const isAuthenticated = ref(false)
const currentUser = ref<User | null>(null)

const formData = ref({
  packageName: '',
  version: '1.0.0',
  description: '',
  license: '',
  repository: '',
  keywords: ''
})

const isPublishing = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const catImageUrl = ref('')
const catFact = ref('')
const catLoading = ref(false)

async function loadRandomCat() {
  catLoading.value = true
  catImageUrl.value = ''
  catFact.value = ''

  try {
    const imageResponse = await fetch('https://api.thecatapi.com/v1/images/search?limit=1')
    const imageData = await imageResponse.json()

    if (imageData && imageData[0]) {
      catImageUrl.value = imageData[0].url
    }

    const factResponse = await fetch('https://catfact.ninja/fact')
    const factData = await factResponse.json()

    if (factData && factData.fact) {
      catFact.value = factData.fact
    }
  } catch (error) {
    console.error('Error loading cat data:', error)
    catFact.value = 'Failed to load cat data, but here is a random cat image anyway! 🐱'
  } finally {
    catLoading.value = false
  }
}

async function handlePublish() {
  isPublishing.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Publishing package:', formData.value)

    successMessage.value = `✓ Package "${formData.value.packageName}" v${formData.value.version} published successfully!`

    // Reset form
    setTimeout(() => {
      formData.value = {
        packageName: '',
        version: '1.0.0',
        description: '',
        license: '',
        repository: '',
        keywords: ''
      }
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    errorMessage.value = 'Failed to publish package. Please try again.'
    console.error('Publishing error:', error)
  } finally {
    isPublishing.value = false
  }
}

onMounted(() => {
  const user = SessionManager.getUser()
  isAuthenticated.value = !!user
  currentUser.value = user

  if (!isAuthenticated.value) {
    loadRandomCat()
  }
})
</script>

<style scoped>
.publish-container {
  min-height: calc(100vh - 100px);
  padding: 2rem;
}

/* ============ Authenticated View ============ */

.publish-panel {
  max-width: 1000px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-section h1 {
  color: #000;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
}

.user-greeting {
  color: #555;
  font-size: 1.1rem;
  margin: 0;
}

.username {
  color: #ff8c00;
  font-weight: bold;
}

.publish-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.form-section,
.guidelines-section {
  background: #fff;
  border: 2px solid #ff8c00;
  border-radius: 8px;
  padding: 2rem;
}

.form-section h2,
.guidelines-section h2 {
  color: #000;
  margin-top: 0;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #ff8c00;
  padding-bottom: 0.5rem;
}

/* ============ Form Styles ============ */

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #000;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff8c00;
  box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%);
  color: #fff;
  flex: 1;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f0f0f0;
  color: #000;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

/* ============ Alerts ============ */

.alert {
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  font-weight: 500;
}

.alert-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* ============ Guidelines ============ */

.guidelines-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.guideline-item {
  display: flex;
  gap: 1rem;
}

.check-icon {
  color: #ff8c00;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.guideline-item h4 {
  color: #000;
  margin: 0 0 0.25rem 0;
  font-size: 0.95rem;
}

.guideline-item p {
  color: #666;
  margin: 0;
  font-size: 0.85rem;
}

/* ============ Error View / Not Authenticated ============ */

.error-panel {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
}

.error-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  width: 100%;
}

.error-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.error-message h1 {
  color: #000;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
}

.error-message p {
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.error-description {
  color: #666;
  margin-bottom: 2rem !important;
}

.error-message .btn-primary {
  width: fit-content;
}

/* ============ Cat Image Container ============ */

.cat-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
  border: 3px solid #ff8c00;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(255, 140, 0, 0.2);
}

.cat-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cat-fact {
  color: #555;
  text-align: center;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

.loading-cat {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #ff8c00;
  font-size: 1.2rem;
}

/* ============ Responsive Design ============ */

@media (max-width: 968px) {
  .publish-content {
    grid-template-columns: 1fr;
  }

  .error-content {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .publish-container {
    padding: 1rem;
  }

  .welcome-section h1 {
    font-size: 1.8rem;
  }

  .form-section,
  .guidelines-section {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .error-message h1 {
    font-size: 1.8rem;
  }

  .error-message p {
    font-size: 0.95rem;
  }

  .cat-image {
    max-height: 300px;
  }
}

@media (max-width: 480px) {
  .publish-container {
    padding: 0.75rem;
  }

  .welcome-section h1 {
    font-size: 1.5rem;
  }

  .form-section,
  .guidelines-section {
    padding: 1rem;
  }

  .error-message h1 {
    font-size: 1.5rem;
  }

  .error-panel {
    min-height: auto;
    padding: 1rem 0;
  }

  .cat-image {
    max-height: 250px;
  }
}

/* ============ Animations ============ */

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.publish-panel,
.error-panel {
  animation: slideIn 0.3s ease-out;
}
</style>