/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Utensils, 
  ChefHat, 
  Calendar, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Check, 
  Star, 
  MessageSquare, 
  ArrowUp, 
  X,
  Clock,
  ExternalLink,
  Users,
  Award,
  ChevronRight,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const COLORS = {
  maroon: '#4a0404',
  gold: '#D4AF37',
};

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Banquet', href: '#banquet' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

const SERVICES = [
  { 
    title: 'Family Dining', 
    desc: 'Exquisite cuisines for memorable family moments in a royal setting.', 
    icon: <Utensils className="w-8 h-8" /> 
  },
  { 
    title: 'Catering', 
    desc: 'Professional catering services for all types of events and gatherings.', 
    icon: <ChefHat className="w-8 h-8" /> 
  },
  { 
    title: 'Group Booking', 
    desc: 'Ideal space for large groups with customized menu options.', 
    icon: <Users className="w-8 h-8" /> 
  },
  { 
    title: 'Corporate Dining', 
    desc: 'Sophisticated ambiance for business lunches and corporate dinners.', 
    icon: <Award className="w-8 h-8" /> 
  },
];

const EVENTS = [
  { name: 'Wedding', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop' },
  { name: 'Birthday', img: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=800&auto=format&fit=crop' },
  { name: 'Anniversary', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop' },
  { name: 'Corporate Meeting', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop' },
];

const MENU_CATEGORIES = [
  { name: 'North Indian', items: ['Butter Chicken', 'Dal Makhani', 'Paneer Tikka', 'Tandoori Roti'] },
  { name: 'Chinese', items: ['Hakka Noodles', 'Manchurian', 'Chilly Paneer', 'Spring Rolls'] },
  { name: 'Tandoori', items: ['Sizzling Kebab', 'Murg Malai Tikka', 'Seekh Kebab', 'Fish Tikka'] },
  { name: 'Desserts', items: ['Gulab Jamun', 'Rasmalai', 'Vanilla Brownie', 'Moong Dal Halwa'] },
];

// --- Sub-Components ---

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-16 px-4">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-natural-gold font-sans font-bold tracking-[0.3em] text-xs uppercase mb-3 block`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-3xl md:text-5xl font-serif font-black ${light ? 'text-white' : 'text-natural-maroon'} mb-4 uppercase tracking-tight`}
    >
      {children}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="h-1.5 bg-natural-gold mx-auto"
    />
  </div>
);

const Navbar = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-natural-gold/30 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-natural-maroon rounded-full flex items-center justify-center text-natural-gold border-2 border-natural-gold font-bold text-lg">V</div>
          <div className="flex flex-col">
            <span className={`text-xl font-serif font-black tracking-tight uppercase leading-none ${isScrolled ? 'text-natural-maroon' : 'text-white md:text-natural-maroon'}`}>VASUDHA</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-natural-gold font-sans font-bold">Restaurant & Banquet</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {NAV_LINKS.map(link => (
            <a key={link.name} href={link.href} className={`transition-colors text-[11px] uppercase tracking-widest font-sans font-bold ${isScrolled ? 'text-natural-text opacity-70 hover:opacity-100' : 'text-white opacity-80 hover:opacity-100 md:text-natural-text'}`}>
              {link.name}
            </a>
          ))}
          <button 
            onClick={onOpenBooking}
            className="px-6 py-2 border border-natural-gold text-natural-maroon text-xs font-bold uppercase tracking-widest hover:bg-natural-gold hover:text-white transition-all"
          >
            BOOK EVENT
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-gold-400" onClick={() => setIsMobileMenuOpen(true)}>
          <Utensils className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-maroon-900 z-[60] flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-serif font-bold text-gold-400">VASUDHA</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gold-400">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col space-y-8">
              {NAV_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-white hover:text-gold-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onOpenBooking(); }}
                className="premium-button text-gold-400 text-xl w-full"
              >
                <span>BOOK EVENT</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    eventType: 'Wedding',
    guests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Vasudha Restaurant & Banquet! I'm interested in booking an event:%0A%0A*Event Type:* ${formData.eventType}%0A*Date:* ${formData.date}%0A*Guests:* ${formData.guests}%0A*Name:* ${formData.firstName} ${formData.lastName}%0A*Email:* ${formData.email}%0A%0APlease get back to me with the packages.`;
    window.open(`https://wa.me/919835351860?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="bg-natural-maroon p-8 text-center relative">
              <button onClick={onClose} className="absolute top-4 right-4 text-natural-gold hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-serif text-natural-gold mb-2 uppercase font-black">Book Your Celebration</h3>
              <p className="text-natural-beige opacity-60 text-xs uppercase tracking-widest font-sans">Details will be sent via WhatsApp</p>
            </div>
            <form className="p-8 space-y-4 bg-natural-bg" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-natural-maroon uppercase tracking-widest">First Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full border-b border-natural-gold/30 bg-transparent py-2 focus:border-natural-gold outline-none transition-colors font-sans text-sm" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-natural-maroon uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full border-b border-natural-gold/30 bg-transparent py-2 focus:border-natural-gold outline-none transition-colors font-sans text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-natural-maroon uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border-b border-natural-gold/30 bg-transparent py-2 focus:border-natural-gold outline-none transition-colors font-sans text-sm" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-natural-maroon uppercase tracking-widest">Event Date</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full border-b border-natural-gold/30 bg-transparent py-2 focus:border-natural-gold outline-none transition-colors font-sans text-sm" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-natural-maroon uppercase tracking-widest">Event Type</label>
                  <select 
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                    className="w-full border-b border-natural-gold/30 bg-transparent py-2 focus:border-natural-gold outline-none transition-colors font-sans text-sm"
                  >
                    <option>Wedding</option>
                    <option>Birthday</option>
                    <option>Corporate</option>
                    <option>Anniversary</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-natural-maroon uppercase tracking-widest">Guest Count</label>
                <input 
                  type="number" 
                  placeholder="Approx" 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full border-b border-natural-gold/30 bg-transparent py-2 focus:border-natural-gold outline-none transition-colors font-sans text-sm" 
                  required
                />
              </div>
              <button type="submit" className="w-full bg-natural-gold text-natural-text py-4 font-bold tracking-[0.2em] mt-4 hover:shadow-xl transition-all uppercase text-xs flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                GET PACKAGES ON WHATSAPP
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Hero = ({ onOpenBooking }: { onOpenBooking: () => void }) => (
  <section id="home" className="relative h-screen overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop" 
        className="w-full h-full object-cover scale-105 animate-slow-zoom"
        alt="Vasudha Banquet Hall"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-natural-maroon/95 via-natural-maroon/70 to-transparent" />
      
      {/* Decorative Pattern from design */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
    </div>
    
    <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl"
      >
        <span className="text-natural-gold font-sans font-bold tracking-[0.3em] text-xs uppercase mb-6 block">Premium Event Venue</span>
        <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-[1.1] font-bold italic">
          The Royal <br />
          <span className="text-natural-gold not-italic">Tradition</span> <br />
          of Dhanbad
        </h1>
        <p className="text-natural-beige font-sans opacity-80 text-lg md:text-xl max-w-md mb-12 font-medium leading-relaxed">
          Exquisite family dining and luxury banquet hosting at Lohar Kulli, Saraidhella. Experience hospitality redefined.
        </p>
        
        <div className="flex flex-wrap gap-6">
          <button 
            onClick={onOpenBooking}
            className="bg-natural-gold text-natural-text px-10 py-5 font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:-translate-y-1 transition-all"
          >
            BOOK EVENT
          </button>
          <a 
            href="tel:+919835351860"
            className="border border-white/40 px-10 py-5 font-black text-xs uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all flex items-center"
          >
            CALL NOW
          </a>
        </div>
      </motion.div>
    </div>

    {/* Scroll Indicator */}
    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-400 flex flex-col items-center"
    >
      <span className="text-[10px] tracking-[0.3em] font-bold mb-2">SCROLL</span>
      <div className="w-px h-12 bg-gradient-to-b from-gold-400 to-transparent" />
    </motion.div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-natural-bg">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="aspect-square rounded-full overflow-hidden border-[12px] border-natural-gold/20"
        >
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="About Vasudha"
          />
        </motion.div>
        <div className="absolute -bottom-6 -right-6 bg-natural-maroon p-10 rounded-2xl shadow-2xl hidden md:block border-4 border-natural-bg">
          <span className="text-5xl font-serif text-natural-gold block mb-2 font-black italic">15+</span>
          <span className="text-white text-[10px] tracking-widest uppercase font-bold">Years of Tradition</span>
        </div>
      </div>
      
      <div className="space-y-8">
        <SectionHeading subtitle="Discover Our Story">Crafting Memories</SectionHeading>
        <p className="text-natural-text font-serif text-lg leading-loose opacity-80">
          Vasudha Restaurant and Banquet stands as a beacon of luxury and culinary excellence in the heart of Dhanbad. We combine traditional Indian hospitality with modern amenities to create an unparalleled experience for our guests.
        </p>
        <p className="text-natural-text font-serif text-lg leading-loose opacity-80">
          Our family dining area offers a serene atmosphere for intimate gatherings, while our magnificent banquet hall is designed to host the grandest celebrations of your life.
        </p>
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="flex items-center space-x-3">
            <div className="text-natural-gold"><Check className="w-5 h-5" /></div>
            <span className="font-bold font-sans text-[11px] text-natural-maroon uppercase tracking-widest">Royal Atmosphere</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-natural-gold"><Check className="w-5 h-5" /></div>
            <span className="font-bold font-sans text-[11px] text-natural-maroon uppercase tracking-widest">Expert Chefs</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-natural-gold"><Check className="w-5 h-5" /></div>
            <span className="font-bold font-sans text-[11px] text-natural-maroon uppercase tracking-widest">Prime Location</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-natural-gold"><Check className="w-5 h-5" /></div>
            <span className="font-bold font-sans text-[11px] text-natural-maroon uppercase tracking-widest">Vast Menu</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-24 bg-natural-bg relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative">
      <SectionHeading subtitle="What We Offer">Premium Services</SectionHeading>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((s, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white p-8 border border-natural-gold/20 shadow-sm transition-all duration-300"
          >
            <div className="text-natural-maroon opacity-50 transition-opacity mb-6">
              {s.icon}
            </div>
            <h3 className="text-sm font-sans font-bold text-natural-maroon uppercase tracking-widest border-b border-natural-gold/20 pb-2 mb-4">{s.title}</h3>
            <p className="text-gray-600 text-xs leading-relaxed font-sans font-medium">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BanquetEvents = () => (
  <section id="banquet" className="py-24 bg-white uppercase tracking-[0.1em]">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading subtitle="Grand Celebrations">Banquet Events</SectionHeading>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {EVENTS.map((e, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-natural-gold hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="h-48 mb-6 overflow-hidden rounded">
               <img src={e.img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt={e.name} />
            </div>
            <h3 className="text-natural-maroon text-lg font-bold mb-1 uppercase tracking-tighter">{e.name}</h3>
            <p className="text-[10px] font-sans font-bold text-natural-gold">PREMIUM HOSTING</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const MenuHighlights = () => (
  <section id="menu" className="py-24 bg-natural-bg">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-12">
            <SectionHeading subtitle="Taste Luxury">Menu Highlights</SectionHeading>
        </div>
        <div className="lg:col-span-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENU_CATEGORIES.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded shadow-sm border border-natural-gold/10"
              >
                <h4 className="text-natural-maroon font-bold text-sm mb-4 uppercase tracking-widest border-b border-natural-gold/20 pb-2">{cat.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(item => <span key={item} className="px-3 py-1 bg-natural-maroon/5 text-natural-maroon rounded-full text-[10px] font-bold font-sans">{item}</span>)}
                </div>
              </motion.div>
            ))}
        </div>
        <div className="lg:col-span-12 text-center pt-10 flex flex-wrap justify-center gap-4">
          <button className="bg-natural-gold text-natural-text px-12 py-5 font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:-translate-y-1 transition-all">
            FULL BROCHURE
          </button>
          <a 
            href="https://wa.me/919835351860?text=Hello Vasudha Restaurant! I would like to place an order from your menu."
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#25D366] text-[#25D366] px-12 py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            ORDER ON WHATSAPP
          </a>
        </div>
      </div>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading subtitle="Our Excellence">Why Choose Us</SectionHeading>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
        {[
          { icon: <MapPin />, title: 'Prime Location', desc: 'Heart of Dhanbad' },
          { icon: <MessageSquare />, title: 'Delish Food', desc: 'By Master Chefs' },
          { icon: <Clock />, title: '24/7 Service', desc: 'Always for you' },
          { icon: <Star />, title: 'Luxury Decor', desc: 'Royal experience' },
          { icon: <Award />, title: 'Best Pricing', desc: 'Premium value' },
        ].map((item, idx) => (
          <div key={idx} className="text-center p-6 bg-natural-bg rounded-lg shadow-sm border border-natural-gold/10 hover:border-natural-gold transition-colors">
            <div className="text-natural-maroon mb-4 flex justify-center opacity-70">
              {React.cloneElement(item.icon as React.ReactElement, { className: 'w-10 h-10' })}
            </div>
            <h4 className="font-serif font-black text-natural-maroon text-lg mb-1 uppercase tracking-tight">{item.title}</h4>
            <p className="text-natural-gold text-[10px] uppercase font-sans font-bold tracking-widest">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-natural-bg">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <SectionHeading subtitle="Happy Guests">Guest Experiences</SectionHeading>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative p-12 bg-natural-maroon rounded-lg text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl"
      >
        <div className="w-24 h-24 rounded-full bg-natural-gold flex-shrink-0 flex items-center justify-center font-serif font-black text-6xl border-4 border-white/10 text-natural-maroon leading-none">“</div>
        <div className="text-left">
          <p className="text-lg italic opacity-90 leading-relaxed mb-6 font-serif">
            "Amazing food and staff behavior. The banquet hall is very spacious and well-maintained. Best venue in Dhanbad for family events. Truly a royal experience."
          </p>
          <div className="flex flex-col">
            <span className="text-[11px] font-sans font-black uppercase tracking-[0.3em] text-natural-gold">Ramesh Kumar</span>
            <span className="text-[9px] text-white/50 uppercase tracking-widest mt-1">Local Guide, Dhanbad</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 bg-natural-bg">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading subtitle="Get In Touch">Contact Us</SectionHeading>
          <div className="space-y-10">
            <div className="flex items-start space-x-6">
              <div className="bg-natural-maroon/10 p-4 rounded-full text-natural-maroon">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-serif font-black text-natural-maroon uppercase tracking-tight mb-2">Our Location</h4>
                <p className="text-natural-text opacity-60 font-sans font-medium text-sm leading-relaxed max-w-xs">
                  Lohar Kulli, Saraidhella, <br />
                  Dhanbad, Jharkhand - 826001
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="bg-natural-maroon/10 p-4 rounded-full text-natural-maroon">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-serif font-black text-natural-maroon uppercase tracking-tight mb-2">Phone & WhatsApp</h4>
                <p className="text-natural-text opacity-60 font-sans font-bold text-sm mb-4">+91 98353 51860</p>
                <a 
                  href="https://wa.me/919835351860" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#25D366] text-white px-6 py-2 shadow-lg hover:scale-105 transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP NOW</span>
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-natural-maroon/10 p-4 rounded-full text-natural-maroon">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-serif font-black text-natural-maroon uppercase tracking-tight mb-2">Opening Hours</h4>
                <p className="text-natural-text opacity-60 font-sans font-medium text-sm">Everyday: 11:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-[450px] rounded-sm overflow-hidden shadow-sm border border-natural-gold/30">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.158522204558!2d86.4385!3d23.8157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzU2LjUiTiA4NsKwMjYnMTguNiJF!5e0!3m2!1sen!2sin!4v1714110000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
          />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-natural-gold/20 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-12 h-12 bg-natural-maroon rounded-full flex items-center justify-center text-natural-gold border-2 border-natural-gold font-bold text-xl">V</div>
           <div className="flex flex-col">
              <span className="text-2xl font-serif font-black text-natural-maroon tracking-tight uppercase">VASUDHA</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-natural-gold font-sans font-bold">Restaurant & Banquet</span>
           </div>
        </div>
        <p className="text-natural-text opacity-60 leading-relaxed max-w-sm mb-8 font-sans font-medium text-sm">
          Premiere venue for luxury dining and grand celebrations in Dhanbad. We bring you the perfect blend of tradition, taste, and hospitality.
        </p>
      </div>
      
      <div>
        <h4 className="text-natural-maroon font-sans font-bold text-xs uppercase tracking-[0.3em] mb-8">Quick Links</h4>
        <ul className="space-y-4">
          {NAV_LINKS.map((link, idx) => (
            <li key={idx}><a href={link.href} className="text-natural-text opacity-50 hover:opacity-100 hover:text-natural-maroon transition-all text-sm font-sans font-semibold uppercase tracking-widest">{link.name}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-natural-maroon font-sans font-bold text-xs uppercase tracking-[0.3em] mb-8">Connect With Us</h4>
        <div className="flex gap-4">
          <a 
            href="https://wa.me/919835351860" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg cursor-pointer text-white hover:scale-110 transition-transform"
          >
             <MessageSquare className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 bg-natural-maroon rounded-full flex items-center justify-center shadow-lg cursor-pointer text-natural-gold hover:scale-110 transition-transform"
          >
             <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="https://maps.google.com/?q=Vasudha+Restaurant+and+Banquet+Dhanbad" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-[#EA4335] rounded-full flex items-center justify-center shadow-lg cursor-pointer text-white hover:scale-110 transition-transform"
          >
             <MapPin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 border-t border-natural-gold/10 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-400 text-[10px] font-sans font-bold uppercase tracking-[0.2em]">
      <div className="mb-4 md:mb-0">© 2024 Vasudha Restaurant & Banquet</div>
      <div className="flex gap-8">
        <span>Open: 11:00 AM - 11:00 PM</span>
        <span>Ph: +91 98353 51860</span>
      </div>
    </div>
  </footer>
);

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521017432531-fbd92d744264?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
];

const Gallery = () => (
  <section id="gallery" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading subtitle="Captured Moments">Photo Gallery</SectionHeading>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {GALLERY_IMAGES.map((img, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="break-inside-avoid rounded-lg overflow-hidden border border-natural-gold/10 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <img src={img} className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105" alt={`Vasudha Gallery ${idx}`} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main App ---

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans antialiased bg-white selection:bg-gold-400 selection:text-maroon-900">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      
      <main>
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        <About />
        <Services />
        <BanquetEvents />
        <MenuHighlights />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* Extras */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      
      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-[80] flex flex-col space-y-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white border-2 border-natural-maroon text-natural-maroon w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-2xl cursor-pointer z-50 hover:bg-natural-maroon hover:text-white transition-all"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
        <a 
          href="https://wa.me/919835351860" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white w-12 h-12 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        >
          <MessageSquare className="w-7 h-7" />
        </a>
      </div>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
      `}</style>
    </div>
  );
}
