'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone, Laptop, Watch } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Professional Repair Services
              <span className="block text-blue-200">For All Your Devices</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
              Fast, reliable, and affordable repairs for mobile phones, laptops, and watches.
              Get your devices back in perfect working condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors group"
              >
                View Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get Quote
              </Link>
            </div>
          </motion.div>

          {/* Services Icons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="grid grid-cols-1 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-colors"
              >
                <Phone className="h-16 w-16 mx-auto mb-4 text-blue-200" />
                <h3 className="text-2xl font-semibold mb-2">Mobile Phones</h3>
                <p className="text-blue-100">Screen repairs, battery replacement, and more</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-colors"
              >
                <Laptop className="h-16 w-16 mx-auto mb-4 text-blue-200" />
                <h3 className="text-2xl font-semibold mb-2">Laptops</h3>
                <p className="text-blue-100">Hardware repairs, software fixes, and upgrades</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-colors"
              >
                <Watch className="h-16 w-16 mx-auto mb-4 text-blue-200" />
                <h3 className="text-2xl font-semibold mb-2">Watches</h3>
                <p className="text-blue-100">Band replacement, glass repair, and servicing</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-12 fill-gray-50">
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;