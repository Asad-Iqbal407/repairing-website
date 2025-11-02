'use client';

import { motion } from 'framer-motion';
import { Phone, Laptop, Watch, CheckCircle, Clock, Shield, Star } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: Phone,
      title: 'Mobile Phone Repairs',
      description: 'Comprehensive repair services for all mobile devices',
      repairs: [
        { name: 'Screen Replacement', price: 'From $49', time: '30-60 min' },
        { name: 'Battery Replacement', price: 'From $29', time: '15-30 min' },
        { name: 'Charging Port Repair', price: 'From $39', time: '45-60 min' },
        { name: 'Camera Repair', price: 'From $59', time: '60-90 min' },
        { name: 'Speaker/Microphone', price: 'From $35', time: '30-45 min' },
        { name: 'Water Damage Repair', price: 'From $79', time: '2-4 hours' }
      ],
      color: 'bg-blue-500'
    },
    {
      icon: Laptop,
      title: 'Laptop Repairs',
      description: 'Professional laptop repair and maintenance services',
      repairs: [
        { name: 'Screen Replacement', price: 'From $99', time: '1-2 hours' },
        { name: 'Keyboard Replacement', price: 'From $49', time: '30-60 min' },
        { name: 'Hard Drive Replacement', price: 'From $69', time: '45-90 min' },
        { name: 'RAM Upgrade', price: 'From $39', time: '15-30 min' },
        { name: 'Data Recovery', price: 'From $99', time: '2-24 hours' },
        { name: 'Virus Removal', price: 'From $49', time: '30-60 min' }
      ],
      color: 'bg-green-500'
    },
    {
      icon: Watch,
      title: 'Watch Repairs',
      description: 'Expert watch repair and restoration services',
      repairs: [
        { name: 'Band Replacement', price: 'From $25', time: '15-30 min' },
        { name: 'Glass Replacement', price: 'From $39', time: '30-45 min' },
        { name: 'Movement Service', price: 'From $89', time: '2-4 hours' },
        { name: 'Water Resistance', price: 'From $49', time: '1-2 hours' },
        { name: 'Battery Replacement', price: 'From $19', time: '10-15 min' },
        { name: 'Complete Restoration', price: 'From $149', time: '4-8 hours' }
      ],
      color: 'bg-purple-500'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: '90-Day Warranty',
      description: 'All repairs come with a comprehensive warranty'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Most repairs completed within 24-48 hours'
    },
    {
      icon: Star,
      title: 'Quality Parts',
      description: 'We use only genuine and high-quality replacement parts'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Repair Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Professional repair services for all your electronic devices.
              Fast, reliable, and affordable with quality guaranteed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, serviceIndex) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: serviceIndex * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mr-6`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 text-lg">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {service.repairs.map((repair, index) => (
                      <motion.div
                        key={repair.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {repair.name}
                        </h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-blue-600">
                            {repair.price}
                          </span>
                          <span className="text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {repair.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional repair services with quality guarantees and fast turnaround times.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Your Device Fixed?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us today for a free quote and fast repair service.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Get Free Quote
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;