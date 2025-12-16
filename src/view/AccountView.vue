<script setup>
import { ref } from 'vue'

const userId = ref('')
const user = ref(null)
const loading = ref(false)
const error = ref('')

const fetchUser = async (id) => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch(`/api/user/${id}`)
    const data = await response.json()
    
    if (data.success) {
      user.value = data.user
    } else {
      error.value = data.message
    }
  } catch (err) {
    error.value = 'Failed to fetch user'
  } finally {
    loading.value = false
  }
}

const generateUserId = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch('/api/user/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    const data = await response.json()
    
    if (data.success) {
      userId.value = data.user.id
      user.value = data.user
    } else {
      error.value = data.message
    }
  } catch (err) {
    error.value = 'Failed to generate ID'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="user-container">
    <div class="generate-section">
      <button @click="generateUserId" :disabled="loading">Generate User ID</button>
      <p v-if="userId" class="generated-id">Generated ID: {{ userId }}</p>
    </div>

    <div class="fetch-section">
      <input v-model="userId" placeholder="Enter User ID" />
      <button @click="fetchUser(userId)" :disabled="loading">Fetch User</button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="user" class="user-info">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
  </div>
</template>
