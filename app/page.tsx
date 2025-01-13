'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PenTool, Brain, Sparkles, MousePointer2 } from 'lucide-react'
import { AuthDrawer, AuthDrawerContent } from '@/components/AuthDrawer'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false)

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  return (
    <main className={`min-h-screen bg-black text-white overflow-hidden`}>
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
            'radial-gradient(circle, rgba(238,174,202,0.5) 0%, rgba(148,187,233,0.5) 100%)',
            'radial-gradient(circle, rgba(174,238,182,1) 0%, rgba(148,233,233,1) 100%)',
            'radial-gradient(circle, rgba(174,238,182,0.5) 0%, rgba(148,233,233,0.5) 100%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />

      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 50%)`
        }}
      />

      <Header />
      
      <HeroSection onTryClick={() => setIsAuthDrawerOpen(true)} />

      <FeaturesSection />

      <HowItWorksSection />

      <GetStartedSection />

      <Footer />

      <motion.div
        className="fixed bottom-4 right-4 text-2xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        🎨
      </motion.div>

      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isAuthDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsAuthDrawerOpen(false)}
      />

      <AuthDrawer isOpen={isAuthDrawerOpen} onClose={() => setIsAuthDrawerOpen(false)}>
        <AuthDrawerContent />
      </AuthDrawer>
    </main>
  )
}

function Header() {
  return (
    <motion.header
      className="py-6 px-4 flex justify-between items-center"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <motion.h1
        className="text-3xl font-bold"
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
      >
        Grapphy
      </motion.h1>
      <nav>
        <ul className="flex space-x-4">
          {['Features', 'How It Works', 'Get Started'].map((item, index) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-yellow-400 transition-colors"
              >
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}

function HeroSection({ onTryClick }: { onTryClick: () => void }) {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      }}
    >
      <div className="text-center z-10">
        <motion.h2
          className="text-6xl font-bold mb-4"
          variants={{
            hidden: { y: -50, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
          }}
        >
          Discover Your Personality
        </motion.h2>
        <motion.h2
          className="text-6xl font-bold mb-4 text-yellow-400"
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.4 } }
          }}
        >
          Through Handwriting
        </motion.h2>
        <motion.p
          className="text-xl mb-8"
          variants={{
            hidden: { scale: 0.8, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.6 } }
          }}
        >
          Grapphy uses AI to analyze your handwriting and reveal insights about your character.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300" onClick={onTryClick}>
            Try Grapphy Now
          </Button>
        </motion.div>
      </div>
      <HandwritingAnimation />
    </motion.section>
  )
}

function HandwritingAnimation() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,50 Q25,25 50,50 T100,50"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
      />
      <motion.path
        d="M0,60 Q35,35 70,60 T100,60"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: 0.5 }}
      />
    </svg>
  )
}

function FeaturesSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const features = [
    { icon: <PenTool className="h-12 w-12" />, title: "Handwriting Analysis", description: "Upload your handwriting sample and get instant insights." },
    { icon: <Brain className="h-12 w-12" />, title: "AI-Powered Insights", description: "Our advanced AI analyzes every curve and stroke of your writing." },
    { icon: <Sparkles className="h-12 w-12" />, title: "Personality Traits", description: "Discover hidden aspects of your personality and character." },
  ]

  return (
    <motion.section
      id="features"
      ref={ref}
      className="py-20"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } }
      }}
    >
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          variants={{
            hidden: { y: -50, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
    >
      <Card className="bg-purple-900 text-white h-full">
        <motion.div
          className="p-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="mb-4 text-yellow-400"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p>{description}</p>
        </motion.div>
      </Card>
    </motion.div>
  )
}

function HowItWorksSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const steps = [
    { number: 1, text: "Upload your handwriting sample" },
    { number: 2, text: "Our AI analyzes your writing" },
    { number: 3, text: "Receive your personality insights" },
  ]

  return (
    <motion.section
      id="how-it-works"
      ref={ref}
      className="py-20 bg-purple-900"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } }
      }}
    >
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-12"
          variants={{
            hidden: { y: -50, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          How It Works
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function StepCard({ number, text }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
    >
      <motion.div
        className="bg-yellow-400 text-purple-900 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4"
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
      >
        {number}
      </motion.div>
      <p className="text-xl">{text}</p>
    </motion.div>
  )
}

function GetStartedSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.section
      id="get-started"
      ref={ref}
      className="py-20 bg-yellow-400 text-purple-900"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      }}
    >
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-8"
          variants={{
            hidden: { y: -50, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { delay: 0.2 } }
          }}
        >
          Ready to Discover Yourself?
        </motion.h2>
        <motion.p
          className="text-xl mb-12"
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { delay: 0.4 } }
          }}
        >
          Join thousands of users who have unlocked the secrets of their personality through Grapphy.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button size="lg" className="bg-purple-900 text-white hover:bg-purple-800">
            Get Started for Free
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}

function Footer() {
  return (
    <motion.footer
      className="bg-purple-900 text-white py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Grapphy. All rights reserved.</p>
      </div>
    </motion.footer>
  )
}

