'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Laptop, Watch, ArrowRight, CheckCircle } from 'lucide-react';

const ServicesOverview = () => {
  const services = [
    {
      icon: Phone,
      title: 'Mobile Phone Repairs',
      description: 'Screen replacement, battery repair, charging port fixes, and more',
      features: ['Screen Repair', 'Battery Replacement', 'Charging Issues', 'Camera Repair'],
      color: 'bg-blue-500'
    },
    {
      icon: Laptop,
      title: 'Laptop Repairs',
      description: 'Hardware repairs, software troubleshooting, and system upgrades',
      features: ['Screen Repair', 'Keyboard Replacement', 'Data Recovery', 'Performance Upgrade'],
      color: 'bg-green-500'
    },
    {
      icon: Watch,
      title: 'Watch Repairs',
      description: 'Band replacement, glass repair, and complete servicing',
      features: ['Band Replacement', 'Glass Repair', 'Movement Service', 'Water Damage'],
      color: 'bg-purple-500'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Repair Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive repair services for all your electronic devices.
            Our experienced technicians use quality parts and guarantee satisfaction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors group"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;