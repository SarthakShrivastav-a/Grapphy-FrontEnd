'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, UserPlus, LogIn, Mail, Lock, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface AuthDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function AuthDrawer({ isOpen, onClose, children }: AuthDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 w-full sm:w-[400px] h-full bg-white text-purple-900 z-50 overflow-hidden"
          style={{
            borderTopRightRadius: '50% 20%',
            borderBottomRightRadius: '25% 50%',
            boxShadow: '0 0 20px rgba(0,0,0,0.3)'
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the drawer
        >
          <div className="h-full overflow-y-auto p-8 flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-purple-900 hover:text-yellow-400 transition-colors"
            >
              <X size={24} />
            </button>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AuthDrawerContent() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col h-full"
    >
      <motion.h2
        className={`font-bold mb-6 text-center text-purple-900 ${
          activeTab === 'login' ? 'text-4xl' : 'text-3xl'
        }`}
        animate={{ fontSize: activeTab === 'login' ? '2.25rem' : '1.875rem' }}
        transition={{ duration: 0.3 }}
      >
        Welcome to Grapphy
      </motion.h2>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900">
            <UserPlus className="mr-2 h-4 w-4" />
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="flex-grow flex flex-col">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register" className="flex-grow flex flex-col">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

function LoginForm() {
  return (
    <motion.form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-4 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Input id="email" type="email" placeholder="your@email.com" className="pl-10 mt-1" />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input id="password" type="password" className="pl-10 mt-1" />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </div>
      <Button type="submit" className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-300">
        Login
      </Button>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <Button type="button" className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
          <path fill="none" d="M1 1h22v22H1z" />
        </svg>
        Login with Google
      </Button>
      <div className="flex-grow"></div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{' '}
        <a href="#" className="text-purple-900 hover:underline">
          Sign up
        </a>
      </p>
    </motion.form>
  )
}

function RegisterForm() {
  return (
    <motion.form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-4 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <div className="relative">
          <Input id="name" type="text" placeholder="Your Name" className="pl-10 mt-1" />
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Input id="email" type="email" placeholder="your@email.com" className="pl-10 mt-1" />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input id="password" type="password" className="pl-10 mt-1" />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </div>
      <Button type="submit" className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-300">
        Register
      </Button>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <Button type="button" className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
          <path fill="none" d="M1 1h22v22H1z" />
        </svg>
        Sign up with Google
      </Button>
      <div className="flex-grow"></div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <a href="#" className="text-purple-900 hover:underline">
          Log in
        </a>
      </p>
    </motion.form>
  )
}

