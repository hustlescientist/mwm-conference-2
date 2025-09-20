import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Menu, X, Calendar, MapPin, Users, Star, CheckCircle, ArrowRight, Play, Pause } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Import assets
import mwmLogo from './assets/MWMlogo.png'
import marquettaPhoto from './assets/marquettadeville.com(1).jpeg'
import kingPhoto from './assets/kingwepayingitforwardphoto(1).jpeg'
import eliasPhoto from './assets/eliasbphotokcep(1).jpeg'
import stevenPhoto from './assets/stevenness(1).jpeg'
import jonPhoto from './assets/jons(1).jpeg'
import tiffanyMelvinPhoto from './assets/tiffanywardanddr.melvinkingofinspireworkshr(1).jpeg'
import kingMarquettaSplit from './assets/kingmarquettasquarehorizontalsplit.png'
import betonChip from './assets/BetonMWMmainchip.png'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const speakers = [
    {
      name: "Marquetta DeVille",
      title: "International Speaker, Author, Educator, Minister",
      image: marquettaPhoto,
      description: "Marquetta DeVille is on a mission to inspire others to rise above adversity and embrace possibility. Blending ministry with proven wealth mindset principles, she empowers you to 'Bet On You' and build lasting generational wealth."
    },
    {
      name: "King Jermaine Jones",
      title: "Entrepreneur, VC, Philanthropist",
      image: kingPhoto,
      description: "From adversity, King Jermaine Jones emerged with purpose. His journey is the ultimate 'Bet On You' story, building a successful empire against all odds. He now inspires others to cultivate generosity, resilience, and architect wealthy, purposeful lives."
    }
  ]

  const featuredSpeakers = [
    {
      name: "Elias B.",
      title: "Media Personality",
      image: eliasPhoto,
      description: "As a well-known media personality, Elias B. uses his platform to share stories of success and inspire a wealth-building mindset."
    },
    {
      name: "Steven Ness",
      title: "Growth Strategist",
      image: stevenPhoto,
      description: "Steven is a passionate growth strategist who helps entrepreneurs and business owners unlock their full potential."
    },
    {
      name: "Jon S.",
      title: "Entrepreneur and Business Coach",
      image: jonPhoto,
      description: "Jon S. is a seasoned entrepreneur and business coach dedicated to helping others navigate the path to financial freedom."
    },
    {
      name: "Dr. Melvin King & Tiffany Ward",
      title: "Founders of Inspire Works HR",
      image: tiffanyMelvinPhoto,
      description: "As founders of Inspire Works HR, Dr. King and Tiffany empower businesses and leaders to build strong teams and foster growth."
    }
  ]

  const ticketTiers = [
    {
      name: "General Admission",
      price: "$197",
      features: [
        "Full Conference Access",
        "Keynotes, Panels & Sessions",
        "Networking Opportunities",
        "Conference Materials",
        "Light Refreshments"
      ],
      popular: false
    },
    {
      name: "VIP Experience",
      price: "$497",
      features: [
        "Everything in General Admission",
        "VIP Seating",
        "Meet & Greet with Speakers",
        "Exclusive VIP Networking",
        "Premium Conference Swag",
        "Priority Access"
      ],
      popular: true
    },
    {
      name: "Platinum Package",
      price: "$997",
      features: [
        "Everything in VIP Experience",
        "Private Dinner with Founders",
        "1-on-1 Photo Opportunities",
        "Exclusive Mastermind Session",
        "Lifetime Access to Recordings",
        "Personal Success Consultation"
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <img src={mwmLogo} alt="MWM Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                MWM Conference
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['About', 'Speakers', 'Tickets', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-yellow-400 transition-colors font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden mt-4 space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {['About', 'Speakers', 'Tickets', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-300 hover:text-yellow-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${kingMarquettaSplit})`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img 
              src={betonChip} 
              alt="Bet on MWM" 
              className="w-32 h-32 mx-auto mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Millionaire Wealth Mindset
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-white">
              Conference 2025
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 text-xl">
              <div className="flex items-center gap-2">
                <Calendar className="text-yellow-400" size={24} />
                <span>November 16, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-yellow-400" size={24} />
                <span>Cox Pavilion, Las Vegas, NV</span>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              A transformative, full-day immersive experience designed for individuals ready to 
              <span className="text-yellow-400 font-semibold"> ignite inner power</span>, 
              <span className="text-yellow-400 font-semibold"> amplify mindset</span>, and 
              <span className="text-yellow-400 font-semibold"> invest in their impact</span> across life, business, and finances.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-12 py-6 rounded-full shadow-2xl"
              >
                Secure Your Spot Now
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Transform Your Mindset, Transform Your Life
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The Millionaire Wealth Mindset Conference is a faith-driven event designed to empower entrepreneurs, 
              leaders, and visionaries. Our mission is to build generational wealth through purpose and strategy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="text-yellow-400" size={48} />,
                title: "Join a Tribe of Visionaries",
                description: "Connect with 3000+ ambitious individuals committed to betting big on their future and building legacies."
              },
              {
                icon: <Star className="text-yellow-400" size={48} />,
                title: "Fuel Your Growth Mindset",
                description: "Immerse in an environment celebrating personal growth and decisive action, attracting those ready to invest in their potential."
              },
              {
                icon: <CheckCircle className="text-yellow-400" size={48} />,
                title: "Align Purpose, Power & Profits",
                description: "Discover how self-belief and clear purpose drive generational wealth and profound fulfillment."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-yellow-400/50 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-yellow-400">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="speakers" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Meet Your Founders
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {speakers.map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-yellow-400/50 transition-all duration-300 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{speaker.name}</CardTitle>
                    <CardDescription className="text-yellow-400 text-lg font-medium">
                      {speaker.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{speaker.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Featured Speakers */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
              Featured Speakers
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredSpeakers.map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-yellow-400/50 transition-all duration-300 h-full">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{speaker.name}</CardTitle>
                    <CardDescription className="text-yellow-400 text-sm">
                      {speaker.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm">{speaker.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Choose Your Experience
            </h2>
            <p className="text-xl text-gray-300">
              Select the package that best fits your journey to wealth and success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ticketTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-1">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full ${
                  tier.popular 
                    ? 'bg-gradient-to-b from-yellow-400/10 to-orange-500/10 border-yellow-400' 
                    : 'bg-gray-800/50 border-gray-700'
                } hover:border-yellow-400/50 transition-all duration-300`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white mb-2">{tier.name}</CardTitle>
                    <div className="text-4xl font-bold text-yellow-400 mb-4">{tier.price}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                    <Button 
                      className={`w-full mt-6 ${
                        tier.popular
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black'
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      } font-bold py-3`}
                    >
                      Select {tier.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Don't wait for tomorrow to start building your millionaire mindset. 
              Join us in Las Vegas for a life-changing experience.
            </p>
            
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-12 py-6 rounded-full shadow-2xl"
                >
                  Get Your Tickets Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>
              
              <p className="text-gray-400">
                Questions? Contact us at{' '}
                <a href="mailto:info@mwmconference.com" className="text-yellow-400 hover:text-yellow-300">
                  info@mwmconference.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={mwmLogo} alt="MWM Logo" className="h-8 w-auto" />
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Millionaire Wealth Mindset Conference
              </span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 Millionaire Wealth Mindset Conference. All rights reserved.</p>
              <p className="mt-2">November 16, 2025 | Cox Pavilion, Las Vegas, NV</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
