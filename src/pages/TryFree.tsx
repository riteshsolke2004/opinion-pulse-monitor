
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageSquare, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TryFreePage = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<null | {
    sentiment: string;
    score: number;
    confidence: number;
    keywords: string[];
  }>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate API call with mock analysis
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock sentiment analysis (in real app, this would call your ML API)
    const words = text.toLowerCase().split(' ');
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'wonderful', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'disappointed', 'poor'];
    
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    let sentiment = 'Neutral';
    let score = 50;
    
    if (positiveCount > negativeCount) {
      sentiment = 'Positive';
      score = Math.min(95, 60 + (positiveCount * 10));
    } else if (negativeCount > positiveCount) {
      sentiment = 'Negative';
      score = Math.max(5, 40 - (negativeCount * 10));
    }
    
    const keywords = [...new Set([...words.filter(word => positiveWords.includes(word) || negativeWords.includes(word))])];
    
    setAnalysis({
      sentiment,
      score,
      confidence: Math.random() * 20 + 80, // 80-100%
      keywords: keywords.slice(0, 5)
    });
    
    setIsAnalyzing(false);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'Negative':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-500';
      case 'Negative':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-blue-600 rounded-full">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Try Free Analysis
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Test our AI-powered sentiment analysis with your own text. Enter any customer review, feedback, or comment below.
            </p>
          </div>

          {/* Analysis Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle>Enter Text for Analysis</CardTitle>
              <CardDescription>
                Paste any customer review, feedback, or text you'd like to analyze
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Example: This product is amazing! The quality exceeded my expectations and the customer service was fantastic. I would definitely recommend it to others."
                className="min-h-32 resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {text.length}/1000 characters
                </span>
                <Button
                  onClick={analyzeSentiment}
                  disabled={!text.trim() || isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Sentiment'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {getSentimentIcon(analysis.sentiment)}
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Sentiment */}
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-3">
                      <Badge className={`${getSentimentColor(analysis.sentiment)} text-white`}>
                        {analysis.sentiment}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Sentiment</p>
                  </div>

                  {/* Score */}
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {analysis.score}%
                    </div>
                    <p className="text-sm text-gray-600">Sentiment Score</p>
                  </div>

                  {/* Confidence */}
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {analysis.confidence.toFixed(1)}%
                    </div>
                    <p className="text-sm text-gray-600">Confidence</p>
                  </div>
                </div>

                {/* Keywords */}
                {analysis.keywords.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Key Sentiment Words Detected:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          <div className="text-center mt-12 p-8 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
            <h3 className="text-2xl font-bold mb-4">Ready for More Advanced Analysis?</h3>
            <p className="text-gray-600 mb-6">
              Get detailed insights, batch processing, and real-time monitoring with our full platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View Dashboard
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TryFreePage;
