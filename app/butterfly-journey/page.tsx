'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LifecycleStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  image: string;
  color: string;
  icon: string;
}

const lifecycleStages: LifecycleStage[] = [
  {
    id: 'egg',
    title: 'Egg Stage',
    subtitle: 'The Beginning of Life',
    description: 'A tiny, oval-shaped egg is laid by the female butterfly on a host plant. The egg contains the developing embryo and is protected by a hard outer shell. This stage typically lasts 3-7 days depending on the species and environmental conditions.',
    duration: '3-7 days',
    image: '/butterfly-lifecycle/butterfly-egg.jpg',
    color: 'from-blue-50 to-blue-100',
    icon: '🥚'
  },
  {
    id: 'larva',
    title: 'Larva (Caterpillar)',
    subtitle: 'The Growing Phase',
    description: 'The caterpillar emerges from the egg and begins its voracious eating phase. It grows rapidly, shedding its skin multiple times as it increases in size. This is the most destructive stage for plants, as caterpillars can consume enormous amounts of vegetation.',
    duration: '2-4 weeks',
    image: '/butterfly-lifecycle/monarch-caterpillar.jpg',
    color: 'from-green-50 to-green-100',
    icon: '🐛'
  },
  {
    id: 'pupa',
    title: 'Pupa (Chrysalis)',
    subtitle: 'The Transformation',
    description: 'The caterpillar forms a protective casing around itself and undergoes complete metamorphosis. Inside the chrysalis, the caterpillar\'s body breaks down and reorganizes into the adult butterfly structure. This stage can last from a few days to several months.',
    duration: '1-2 weeks',
    image: '/butterfly-lifecycle/chrysalis-stage.jpg',
    color: 'from-purple-50 to-purple-100',
    icon: '🦋'
  },
  {
    id: 'adult',
    title: 'Adult Butterfly',
    subtitle: 'The Final Form',
    description: 'The adult butterfly emerges from the chrysalis with fully developed wings. It will spend its time feeding on nectar, mating, and laying eggs to continue the cycle. Adult butterflies typically live for 2-4 weeks, though some species can live for months.',
    duration: '2-4 weeks',
    image: '/butterfly-lifecycle/adult-stage.jpg',
    color: 'from-yellow-50 to-yellow-100',
    icon: '🦋'
  }
];

export default function ButterflyJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  useEffect(() => {
    setIsVisible(true);
    
    // GSAP animations for timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

    tl.fromTo(".stage-card", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const nextStage = () => {
    setActiveStage((prev) => (prev + 1) % lifecycleStages.length);
  };

  const prevStage = () => {
    setActiveStage((prev) => (prev - 1 + lifecycleStages.length) % lifecycleStages.length);
  };

  const getFunFact = (stageId: string) => {
    switch (stageId) {
      case 'egg':
        return 'Butterflies lay their eggs on the underside of leaves or stems of host plants. The eggs are often laid in clusters or rows.';
      case 'larva':
        return 'Caterpillars are voracious eaters and can consume up to 80% of their body weight in a single day. They have a unique digestive system that allows them to process large amounts of plant material.';
      case 'pupa':
        return 'The chrysalis is a protective casing that the caterpillar forms around itself. It is often found on the underside of leaves or in crevices.';
      case 'adult':
        return 'Adult butterflies have a short lifespan, typically 2-4 weeks, depending on the species. They are active during the day and feed on nectar from flowers.';
      default:
        return 'No fun fact available for this stage.';
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Global Background Image */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/40"></div>
        <img 
          src="/photo-1599631438215-75bc2640feb8.jpeg" 
          alt="Global Background"
          className="w-full h-full object-cover opacity-25"
        />
      </div>
      {/* Enhanced Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden min-h-screen flex items-center justify-center"
      >
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-pink-900/60"></div>
          <img 
            src="/photo-1599631438215-75bc2640feb8.jpeg" 
            alt="Butterfly Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Particles */}
          <motion.div
            animate={{ 
              y: [0, -100, 0],
              x: [0, 50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full shadow-lg opacity-60"
          />
          <motion.div
            animate={{ 
              y: [0, -80, 0],
              x: [0, -30, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            className="absolute top-40 right-32 w-1.5 h-1.5 bg-pink-400 rounded-full shadow-lg opacity-50"
          />
          <motion.div
            animate={{ 
              y: [0, -120, 0],
              x: [0, 40, 0],
              rotate: [0, 90, 180]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: 4
            }}
            className="absolute bottom-40 left-32 w-1 h-1 bg-blue-400 rounded-full shadow-lg opacity-40"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Main Title with Enhanced Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 px-4 drop-shadow-2xl">
              Butterfly Journey
            </h1>
            
            {/* Subtitle with Enhanced Typography */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl text-white max-w-4xl mx-auto leading-relaxed px-4 font-light drop-shadow-lg"
            >
              Embark on a magical journey through the complete lifecycle of a butterfly, 
              from the tiny egg to the magnificent winged creature
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-lg md:text-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 border-white/20 backdrop-blur-sm"
            >
              🦋 Start Your Journey 🦋
            </motion.button>
          </motion.div>

          {/* Enhanced Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Main Butterfly */}
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-8 md:left-16 text-5xl md:text-6xl opacity-80 hidden sm:block"
            >
              🦋
            </motion.div>
            
            {/* Secondary Butterfly */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, -15, 15, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-32 right-8 md:right-16 text-3xl md:text-4xl opacity-60 hidden sm:block"
            >
              🦋
            </motion.div>

            {/* Small Butterfly */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 20, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-32 left-1/4 text-2xl opacity-50 hidden sm:block"
            >
              🦋
            </motion.div>

            {/* Sparkles */}
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/3 left-1/3 text-2xl opacity-70"
            >
              ✨
            </motion.div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-1/3 right-1/3 text-xl opacity-60"
            >
              ✨
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white text-center"
            >
              <div className="text-2xl mb-2">⬇️</div>
              <div className="text-sm opacity-80">Scroll to explore</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Lifecycle Timeline */}
      <div ref={containerRef} className="container mx-auto px-4 py-16">
        <motion.div 
          style={{ y, opacity }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            The Complete Lifecycle
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each stage is a marvel of nature's engineering, showcasing the incredible 
            transformation that occurs during metamorphosis
          </p>
        </motion.div>

        {/* Enhanced Timeline Lifecycle */}
        <div className="relative mb-20 z-10">

          {/* Timeline Connector with Enhanced Design */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 h-full rounded-full hidden lg:block z-20">
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 h-full rounded-full blur-sm opacity-50"></div>
            {/* Floating Particles */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"
            />
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-lg"
            />
            <motion.div
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-lg"
            />
          </div>
          
          {/* Timeline Nodes with Enhanced Design */}
          {lifecycleStages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -150 : 150, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.4 }}
              className={`relative mb-20 lg:mb-32 ${
                index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2'
              }`}
            >
              {/* Enhanced Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-2xl z-10 hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-75"></div>
                {/* Node Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Enhanced Content Container */}
              <div className={`bg-white/98 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-3xl border border-white/30 ${
                index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'
              }`}>
                {/* Enhanced Stage Header */}
                <div className={`p-8 md:p-10 ${stage.color} relative overflow-hidden`}>
                  {/* Animated Background Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/15 rounded-full blur-2xl"></div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-6 right-6 text-3xl opacity-60"
                  >
                    ✨
                  </motion.div>
                  
                  <div className="relative z-10">
                    {/* Stage Number Badge */}
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
                      Phase {index + 1} of {lifecycleStages.length}
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-6xl md:text-7xl"
                      >
                        {stage.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{stage.title}</h3>
                        <p className="text-xl text-gray-600 mb-4">{stage.subtitle}</p>
                        
                        {/* Enhanced Stage Info */}
                        <div className="flex flex-wrap gap-3">
                          <span className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-md">
                            ⏱️ {stage.duration}
                          </span>
                          <span className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-md">
                            🎯 {stage.id.charAt(0).toUpperCase() + stage.id.slice(1)} Stage
                          </span>
                          <span className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-md">
                            🔄 {index === lifecycleStages.length - 1 ? 'Final' : 'Transforms'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Stage Content */}
                <div className="p-8 md:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Enhanced Image Section */}
                    <div className="relative group">
                      <motion.div
                        key={`${stage.id}-${activeStage}`}
                        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-2xl shadow-2xl"
                      >
                        <img
                          src={stage.image}
                          alt={stage.title}
                          className="w-full h-72 md:h-96 object-cover transform group-hover:scale-110 transition-transform duration-1000"
                        />
                        
                        {/* Enhanced Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* Image Info Cards */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-800 font-medium">{stage.title}</p>
                                <p className="text-xs text-gray-600">{stage.duration}</p>
                              </div>
                              <div className="text-2xl">{stage.icon}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Corner Badge */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </motion.div>
                      
                      {/* Enhanced Floating Elements */}
                      <motion.div
                        animate={{ 
                          y: [0, -20, 0],
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -top-3 -right-3 text-3xl opacity-80"
                      >
                        ✨
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, -10, 10, 0],
                          scale: [1, 0.8, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                        className="absolute -bottom-2 -left-2 text-2xl opacity-60"
                      >
                        🌟
                      </motion.div>
                    </div>

                    {/* Enhanced Content Section */}
                    <div className="space-y-6">
                      <motion.div
                        key={`content-${stage.id}-${activeStage}`}
                        initial={{ opacity: 0, y: 30, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                          <span className="text-3xl">🔍</span>
                          What Happens in This Stage?
                        </h4>
                        
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-l-4 border-blue-500 mb-6">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {stage.description}
                          </p>
                        </div>
                        
                        {/* Enhanced Stage Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-2xl">⏱️</span>
                              <h5 className="font-bold text-blue-800">Duration</h5>
                            </div>
                            <p className="text-blue-700 font-semibold">{stage.duration}</p>
                          </motion.div>
                          
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-2xl">🎯</span>
                              <h5 className="font-bold text-purple-800">Stage Type</h5>
                            </div>
                            <p className="text-purple-700 font-semibold">{stage.subtitle}</p>
                          </motion.div>
                        </div>
                        
                        {/* Fun Fact */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">💡</span>
                            <p className="text-sm text-yellow-800 font-medium">
                              <strong>Did you know?</strong> {getFunFact(stage.id)}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Connection Elements */}
                {index < lifecycleStages.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-center py-6 bg-gradient-to-r from-blue-50 to-purple-50"
                  >
                    {/* Transformation Arrow */}
                    <div className="inline-flex items-center gap-4 text-purple-600 font-bold">
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-2xl"
                      >
                        ⬇️
                      </motion.div>
                      
                      <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-purple-200">
                        <span className="text-lg">🔄</span>
                        <span className="ml-2 text-sm">Transforms to next stage</span>
                      </div>
                      
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                        className="text-2xl"
                      >
                        ⬇️
                      </motion.div>
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="mt-4">
                      <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 1 }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {Math.round(((index + 1) / lifecycleStages.length) * 100)}% Complete
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative z-10"
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Your Journey Progress
            </h3>
            <div className="flex items-center justify-between mb-4 px-2">
              {lifecycleStages.map((stage, index) => (
                <div key={stage.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold mb-2 transition-all duration-300 ${
                    index <= activeStage 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs text-gray-600 text-center max-w-16 md:max-w-20 hidden sm:block">{stage.title}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((activeStage + 1) / lifecycleStages.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Interactive Stage Viewer */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-4 md:p-8 mb-16 border border-white/30 relative z-10"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Interactive Stage Explorer
          </h3>
          
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
            {/* Image Section */}
            <div className="flex-1 relative w-full">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl"
              >
                <img
                  src={lifecycleStages[activeStage].image}
                  alt={lifecycleStages[activeStage].title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl md:text-2xl font-bold">{lifecycleStages[activeStage].title}</h4>
                  <p className="text-base md:text-lg opacity-90">{lifecycleStages[activeStage].subtitle}</p>
                </div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="flex-1">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-3xl font-bold text-gray-800 mb-4">
                  {lifecycleStages[activeStage].title}
                </h4>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {lifecycleStages[activeStage].description}
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                  <p className="text-gray-700 font-semibold">
                    <span className="text-blue-600">Duration:</span> {lifecycleStages[activeStage].duration}
                  </p>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                <button
                  onClick={prevStage}
                  className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  ← Previous
                </button>
                <div className="flex gap-2 order-first sm:order-none">
                  {lifecycleStages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeStage 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextStage}
                  className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fun Facts Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white text-center relative z-10 shadow-2xl"
        >
          <h3 className="text-3xl font-bold mb-6">Amazing Butterfly Facts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">🦋</div>
              <h4 className="text-lg md:text-xl font-bold mb-2">Wing Span</h4>
              <p className="text-white/90 text-sm md:text-base">Some butterflies can have wingspans up to 12 inches!</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">🌍</div>
              <h4 className="text-lg md:text-xl font-bold mb-2">Migration</h4>
              <p className="text-white/90 text-sm md:text-base">Monarch butterflies can migrate up to 3,000 miles!</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">👁️</div>
              <h4 className="text-lg md:text-xl font-bold mb-2">Vision</h4>
              <p className="text-white/90 text-sm md:text-base">Butterflies can see ultraviolet light invisible to humans!</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveStage(0)}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center text-2xl"
          title="Back to Start"
        >
          🦋
        </motion.button>
      </motion.div>

              {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-16 text-center relative z-10"
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 md:p-12 shadow-2xl border border-white/30">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Ready to Explore More?
          </h3>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Discover the fascinating world of butterflies and their incredible journey 
            through metamorphosis. Nature's most beautiful transformation awaits!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-base md:text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
