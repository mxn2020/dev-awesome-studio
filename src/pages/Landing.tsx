// src/pages/Landing.tsx

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Star, Target, Zap, Trophy, User, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, CardContent, Badge, Header, Nav, Section, Span, H1, H2, P, Div, Footer } from '../lib/dev-container';
import { useAuth } from '../components/auth/AuthProvider';
import type { ComponentRegistryId } from '../registry/componentRegistry';

// Helper functions to ensure type safety for dynamic IDs
const getStatCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['stat-card-0', 'stat-card-1', 'stat-card-2', 'stat-card-3'];
  return ids[index] || 'noID';
};

const getFeatureCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['feature-card-0', 'feature-card-1', 'feature-card-2', 'feature-card-3'];
  return ids[index] || 'noID';
};

const getBenefitCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['benefit-card-0', 'benefit-card-1', 'benefit-card-2', 'benefit-card-3'];
  return ids[index] || 'noID';
};

const getTestimonialCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['testimonial-card-0', 'testimonial-card-1', 'testimonial-card-2'];
  return ids[index] || 'noID';
};

export const Landing: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: "Smart Organization",
      description: "Organize your tasks with categories, priorities, and due dates for maximum productivity"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Goal Tracking",
      description: "Set and track your daily, weekly, and monthly goals with visual progress indicators"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Quick Actions",
      description: "Add, edit, and complete tasks with lightning-fast shortcuts and intuitive interface"
    },
    {
      icon: <Trophy className="w-8 h-8 text-purple-500" />,
      title: "Achievement System",
      description: "Earn badges and maintain streaks to stay motivated and celebrate your progress"
    }
  ];

  const stats = [
    { label: "Tasks Completed", value: "10M+" },
    { label: "Active Users", value: "50K+" },
    { label: "Productivity Boost", value: "85%" },
    { label: "User Rating", value: "4.9★" }
  ];

  const benefits = [
    {
      title: "Never Forget Again",
      description: "Smart reminders and notifications ensure you never miss an important task",
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Boost Your Productivity",
      description: "Proven techniques and gamification elements help you accomplish more every day",
      image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Stay Motivated",
      description: "Achievement badges, completion streaks, and progress tracking keep you engaged",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Work Anywhere",
      description: "Access your todos from any device with seamless synchronization across platforms",
      image: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      content: "This todo app transformed how I manage my daily tasks. The gamification keeps me motivated!",
      avatar: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Mike Chen",
      role: "Software Developer",
      content: "Clean interface, powerful features. Perfect for both personal and professional task management.",
      avatar: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Emily Davis",
      role: "Student",
      content: "The streak system is addictive in the best way. I've never been more productive with my studies!",
      avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  return (
    <Container componentId="landing-page-root">
      <Div 
        devId="main-wrapper" 
        devName="Main Wrapper" 
        devDescription="Main page wrapper with colorful gradient background"
        className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
      >
      {/* Header */}
      <Header 
        devId="main-header" 
        devName="Main Header" 
        devDescription="Primary site header with navigation"
        className="container mx-auto px-4 py-6"
      >
        <Nav 
          devId="main-nav" 
          devName="Main Navigation" 
          devDescription="Primary navigation bar"
          className="flex items-center justify-between"
        >
          <Div 
            devId="logo-section" 
            devName="Logo Section" 
            devDescription="Todo app logo and brand name"
            className="flex items-center space-x-2"
          >
            <Div devId="noID" className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </Div>
            <Span 
              devId="brand-name" 
              devName="Brand Name" 
              devDescription="TodoMaster brand name"
              className="text-xl font-bold text-white"
            >
              TodoMaster
            </Span>
          </Div>
          <Div 
            devId="nav-actions" 
            devName="Navigation Actions" 
            devDescription="Navigation buttons and user menu"
            className="flex items-center space-x-4"
          >
            <Button 
              devId="features-button" 
              devName="Features Button" 
              devDescription="Link to features section"
              variant="ghost" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Button>
            {isAuthenticated ? (
              <Div 
                devId="user-section" 
                devName="User Section" 
                devDescription="Authenticated user welcome area"
                className="flex items-center space-x-4"
              >
                <Span 
                  devId="welcome-message" 
                  devName="Welcome Message" 
                  devDescription="Welcome message for authenticated user"
                  className="text-gray-300"
                >
                  Welcome, {user?.name?.split(' ')[0]}!
                </Span>
                <Link to="/dashboard">
                  <Button 
                    devId="nav-dashboard-button"
                    devName="Navigation Dashboard Button"
                    devDescription="Dashboard button in navigation header for authenticated users"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Todos
                  </Button>
                </Link>
              </Div>
            ) : (
              <Div 
                devId="auth-buttons" 
                devName="Authentication Buttons" 
                devDescription="Login and register buttons for unauthenticated users"
                className="flex items-center space-x-2"
              >
                <Link to="/login">
                  <Button 
                    devId="nav-login-button"
                    devName="Navigation Login Button"
                    devDescription="Login button in navigation header"
                    variant="ghost" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    devId="nav-register-button"
                    devName="Navigation Register Button"
                    devDescription="Get started button in navigation header"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Start Free
                  </Button>
                </Link>
              </Div>
            )}
          </Div>
        </Nav>
      </Header>

      {/* Hero Section */}
      <Container componentId="hero-section">
        <Section 
          devId="hero-content" 
          devName="Hero Content" 
          devDescription="Main hero section with title and call-to-action"
          className="container mx-auto px-4 py-20 text-center"
        >
          <Div 
            devId="hero-content-wrapper" 
            devName="Hero Content Wrapper" 
            devDescription="Animated wrapper for hero content"
            className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <H1 
              devId="hero-title" 
              devName="Hero Title" 
              devDescription="Main hero title showcasing the todo app"
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Get Things 
              <Span 
                devId="done-highlight" 
                devName="Done Highlight" 
                devDescription="Highlighted 'Done' text in gradient"
                className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
              >
                {' '}Done
              </Span>
            </H1>
            <P 
              devId="hero-description" 
              devName="Hero Description" 
              devDescription="Hero section description explaining the todo app benefits"
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              The most fun and engaging way to manage your tasks. Turn your productivity into a game 
              with achievements, streaks, and smart organization.
            </P>
            <Div 
              devId="hero-cta-buttons" 
              devName="Hero CTA Buttons" 
              devDescription="Call-to-action buttons in hero section"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button 
                    devId="hero-start-organizing"
                    devName="Start Organizing Button"
                    devDescription="Primary call-to-action button for starting to organize tasks"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Go to My Todos
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button 
                    devId="hero-start-organizing"
                    devName="Start Organizing Button"
                    devDescription="Primary call-to-action button for starting to organize tasks"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Start Organizing
                  </Button>
                </Link>
              )}
              <Button 
                devId="hero-learn-more-button"
                devName="Learn More Button"
                devDescription="Secondary button to learn more about features"
                variant="outline"
                className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Learn More
              </Button>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Stats Section */}
      <Container componentId="stats-section">
        <Section 
          devId="stats-content" 
          devName="Stats Content" 
          devDescription="Statistics section showing app metrics"
          className="container mx-auto px-4 py-12"
        >
          <Div 
            devId="stats-grid" 
            devName="Stats Grid" 
            devDescription="Grid container for statistics cards"
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                devId={getStatCardId(index)}
                devName={`${stat.label} Stat Card`}
                devDescription={`Statistical card showing ${stat.label}: ${stat.value}`}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="text-2xl font-bold text-white mb-2">{stat.value}</Div>
                  <Div devId="noID" className="text-gray-300">{stat.label}</Div>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Features Section */}
      <Container componentId="features-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="text-center mb-16">
            <H2 devId="noID" className="text-4xl font-bold text-white mb-4">Powerful Features for Productivity</H2>
            <P devId="noID" className="text-gray-300 max-w-2xl mx-auto">
              Everything you need to stay organized, motivated, and productive in your daily life
            </P>
          </Div>
          <Div devId="noID" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                devId={getFeatureCardId(index)}
                devName={`${feature.title} Feature Card`}
                devDescription={`Feature card highlighting ${feature.title}: ${feature.description}`}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-green-500/50 transition-all"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="mb-4">{feature.icon}</Div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <P devId="noID" className="text-gray-300">{feature.description}</P>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Benefits Section */}
      <Container componentId="benefits-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="text-center mb-16">
            <H2 devId="noID" className="text-4xl font-bold text-white mb-4">Transform Your Productivity</H2>
            <P devId="noID" className="text-gray-300 max-w-2xl mx-auto">
              See how TodoMaster can revolutionize the way you manage tasks and achieve your goals
            </P>
          </Div>
          <Div devId="noID" className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                devId={getBenefitCardId(index)}
                devName={`${benefit.title} Benefit Card`}
                devDescription={`Benefit card showcasing ${benefit.title}: ${benefit.description}`}
                className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-green-500/50 transition-all"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${benefit.image})` }}></Div>
                  <Div devId="noID" className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <P devId="noID" className="text-gray-300">{benefit.description}</P>
                  </Div>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Testimonials Section */}
      <Container componentId="testimonials-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="text-center mb-16">
            <H2 devId="noID" className="text-4xl font-bold text-white mb-4">What Our Users Say</H2>
            <P devId="noID" className="text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their productivity
            </P>
          </Div>
          <Div devId="noID" className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                devId={getTestimonialCardId(index)}
                devName={`${testimonial.name} Testimonial Card`}
                devDescription={`Testimonial card from ${testimonial.name}: ${testimonial.content}`}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <Div devId="noID">
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <P devId="noID" className="text-gray-400 text-sm">{testimonial.role}</P>
                    </Div>
                  </Div>
                  <P devId="noID" className="text-gray-300 italic">"{testimonial.content}"</P>
                  <Div devId="noID" className="flex text-yellow-400 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </Div>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* CTA Section */}
      <Container componentId="cta-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl p-12 text-center border border-green-500/30">
            <H2 devId="noID" className="text-4xl font-bold text-white mb-4">Ready to Get Organized?</H2>
            <P devId="noID" className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their productivity with TodoMaster. 
              Start your journey to better organization today!
            </P>
            <Div devId="noID" className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                devId="cta-start-free"
                devName="Start Free Button"
                devDescription="Primary CTA button to start using the app for free"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Start Free Today
                </span>
              </Button>
              <Button 
                devId="cta-watch-demo"
                devName="Watch Demo Button"
                devDescription="Secondary CTA button to watch a demo"
                variant="outline"
                className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Watch Demo
                </span>
              </Button>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Footer */}
      <Footer 
        devId="main-footer" 
        devName="Main Footer" 
        devDescription="Site footer with links and copyright"
        className="container mx-auto px-4 py-8 border-t border-white/10"
      >
        <Div devId="noID" className="flex flex-col md:flex-row justify-between items-center">
          <Div devId="noID" className="text-gray-400 mb-4 md:mb-0">
            © 2024 TodoMaster. Built with ❤️ for productivity enthusiasts.
          </Div>
          <Div devId="noID" className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
          </Div>
        </Div>
      </Footer>
      </Div>
    </Container>
  );
};