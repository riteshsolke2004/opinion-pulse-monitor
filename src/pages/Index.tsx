
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import SentimentAnalyzer from '../components/SentimentAnalyzer';
import Dashboard from '../components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Hero />
      <SentimentAnalyzer />
      <Features />
      <Dashboard />
    </div>
  );
};

export default Index;
