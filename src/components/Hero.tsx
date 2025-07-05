import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart, TrendingUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-6 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <BarChart className="w-8 h-8" />
            </div>
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            SentimentScope
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            Unlock the power of customer feedback with AI-driven sentiment analysis. 
            Transform reviews into actionable business insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                View Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl font-bold mb-2">98.5%</div>
              <div className="text-blue-200">Accuracy Rate</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl font-bold mb-2">10M+</div>
              <div className="text-blue-200">Reviews Analyzed</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-blue-200">Happy Businesses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
