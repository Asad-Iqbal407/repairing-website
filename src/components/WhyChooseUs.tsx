'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Award, Users } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'All repairs come with a 90-day warranty and we use only genuine parts'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Most repairs completed within 24-48 hours with express service available'
    },
    {
      icon: Award,
      title: 'Expert Technicians',
      description: 'Certified professionals with years of experience in device repair'
    },
    {
      icon: Users,
      title: 'Trusted by Thousands',
      description: 'Over 10,000 satisfied customers and 4.9-star rating on reviews'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We stand out from the competition with our commitment to quality,
            speed, and customer satisfaction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-blue-600" />
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
  );
};

export default WhyChooseUs;