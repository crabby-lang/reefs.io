import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import SessionManager from './sessionManager'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const isAuthenticated = SessionManager.isValidSession()

  if (isAuthenticated) {
    next()
  } else {
    next()
  }
}

export function verifySessionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const isValid = SessionManager.isValidSession()

  if (!isValid) {
    SessionManager.clearSession()
  }

  next()
}
