"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 80,
      delay: 0.4
    }
  }
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-100 rounded-bl-full blur-3xl transform -translate-y-1/4 translate-x-1/4"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/10 rounded-tr-full blur-3xl transform translate-y-1/4 -translate-x-1/4"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-200 mb-6">
              <span className="text-xs font-medium text-primary-700">The Future of Education is Here</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="heading-xl text-gradient mb-6">
              Transform Your Learning Experience
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-foreground/70 mb-8 max-w-lg">
              EduPulse helps students master subjects faster with AI-powered personalized learning paths, interactive content, and real-time progress tracking.
            </motion.p>

            {/* Stats Bar */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 mb-10">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-primary-600" />
                <div>
                  <p className="font-bold text-2xl">500+</p>
                  <p className="text-sm text-foreground/60">Courses</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-primary-600" />
                <div>
                  <p className="font-bold text-2xl">50k+</p>
                  <p className="text-sm text-foreground/60">Students</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} className="text-primary-600" />
                <div>
                  <p className="font-bold text-2xl">99%</p>
                  <p className="text-sm text-foreground/60">Satisfaction</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#get-started"
                className="cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
                <ArrowRight size={16} className="ml-2" />
              </motion.a>
              <motion.a
                href="#demo"
                className="secondary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 0.8, 0.7]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute top-0 left-0 w-full h-full bg-primary-600/10 rounded-2xl blur-3xl transform -rotate-6 scale-105"
              ></motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative glass-card overflow-hidden rounded-2xl shadow-xl shadow-primary/10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                  alt="Students learning with EduPulse"
                  className="w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white text-lg font-medium">Interactive learning experiences for every student</p>
                  <div className="flex items-center mt-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                          <img 
                            src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} 
                            alt={`User ${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-white/80 text-sm ml-3">+2.5k students joined this week</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;