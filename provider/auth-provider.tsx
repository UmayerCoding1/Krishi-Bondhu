'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { createContext, useEffect, useState } from "react"



export type User = {
    _id: string
    name: string
    email: string
    avatar: string
    role: 'admin' | 'user'
    isTwoFactorEnabled: boolean
    isVerified: boolean
    status: string,
    createdAt: string,
    system_config: {
        notification: {
            email: boolean,
            system_notification: boolean,
            safety_alert: boolean,
        }
    }
}
type AuthContextType = {
    user: User | null
    loading: boolean
    isAuthenticated: boolean
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
    setUser: (user: User | null) => void
    loginUser: (user: User) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter()

    const getCurrentUser = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/me`, { withCredentials: true })
            setUser(response.data.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])


    const loginUser = (userData: User) => {
        console.log('context', userData)
        setUser(userData)
        setIsAuthenticated(true)
        setLoading(false)

    }

    const logout = async () => {
        console.log("logout");
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/logout`, {}, { withCredentials: true })
            console.log(response.data);
            if (response.data.statusCode === 200) {
                setUser(null)
                setIsAuthenticated(false)
                setLoading(false)
                router.push('/')
            }
        } catch (err) {
            console.error(err)
        } finally {

        }
    }


    const refreshUser = async () => {
        setLoading(true)
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, logout, refreshUser, setUser, loginUser }}>
            {children}
        </AuthContext.Provider>
    )
}
