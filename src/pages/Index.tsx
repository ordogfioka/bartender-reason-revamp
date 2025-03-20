
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-3xl w-full text-center space-y-8"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-2"
        >
          <div className="inline-flex items-center justify-center px-3 py-1 mb-2 rounded-full bg-primary/10 text-primary text-xs font-medium">
            BARTENDER MANAGEMENT
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Order Cancellation System
          </h1>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            A beautifully designed interface to manage reasons why bartenders cancel orders.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/reasons">
            <Button className="group rounded-full px-6 h-12 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-white">
              <span>Manage Cancellation Reasons</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
          <div className="relative glass-morphism rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">About this application</h2>
            <p className="text-muted-foreground">
              This application allows bar managers to configure and organize the list of reasons 
              that bartenders can select when canceling customer orders. You can add new reasons, 
              edit existing ones, delete reasons, and change their order of appearance.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
