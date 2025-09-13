'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export type UserType = 'student' | 'instructor' | 'parent' | 'admin' | null

interface AuthContextType {
  user: UserType
  isAuthenticated: boolean
  login: (userType: UserType) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLoading: true,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('tutorPlatformUser')
      const storedAuth = localStorage.getItem('tutorPlatformAuth')
      
      if (storedUser && storedAuth === 'true') {
        setUser(storedUser as UserType)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error loading auth state:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = (userType: UserType) => {
    setUser(userType)
    setIsAuthenticated(true)
    
    // Store in localStorage
    localStorage.setItem('tutorPlatformUser', userType || '')
    localStorage.setItem('tutorPlatformAuth', 'true')
    
    // Redirect to appropriate dashboard
    switch (userType) {
      case 'student':
        router.push('/dashboard/student')
        break
      case 'instructor':
        router.push('/dashboard/instructor')
        break
      case 'parent':
        router.push('/dashboard/parent')
        break
      case 'admin':
        router.push('/dashboard/admin')
        break
      default:
        router.push('/')
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    
    // Clear localStorage
    localStorage.removeItem('tutorPlatformUser')
    localStorage.removeItem('tutorPlatformAuth')
    
    router.push('/')
  }

  // Protect dashboard routes
  useEffect(() => {
    if (!isLoading && pathname.startsWith('/dashboard') && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, pathname, router, isLoading])

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}