"use client"; 

import Image from "next/image";
import { motion } from 'framer-motion';
import { Brain, Gauge, BarChart, Clock, PenTool, Users } from 'lucide-react';
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";
import Features from "./_components/Features";
import Testimonials from "./_components/Testimonials";
import CTASection from "./_components/CTASection";
import CourseShowcase  from "./_components/CourseShowcase";

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};


export default function Home() {
  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <Header />
      <main className="flex-grow">
        <motion.div variants={sectionVariants}>
          <Hero />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Features />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <CourseShowcase />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Testimonials />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <CTASection />
        </motion.div>
      </main>
      <Footer />
    </motion.div>
  );
}
