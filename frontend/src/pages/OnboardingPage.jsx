import React from 'react';
import { UserCircle, BrainCircuit, BarChart3, Mic, Share2, Crown } from 'lucide-react';

const iconMap = {
  'user-circle': UserCircle,
  'brain-circuit': BrainCircuit,
  'bar-chart-3': BarChart3,
  'mic': Mic,
  'share': Share2,
  'crown': Crown,
};

const steps = [
  {
    title: 'Create Your Profile',
    description: 'Choose your fitness goal, diet, and activity level.',
    icon: 'user-circle',
    illustration: '/path/to/profile-illustration.svg',
    colors: 'from-blue-500 to-purple-600',
  },
  {
    title: 'Get Your Plan from AI',
    description: 'AI recommends personalized workouts & meals.',
    icon: 'brain-circuit',
    illustration: '/path/to/ai-plan-illustration.svg',
    colors: 'from-green-500 to-teal-600',
  },
  {
    title: 'Track Daily Progress',
    description: 'Check water, yoga, sleep, and weight charts.',
    icon: 'bar-chart-3',
    illustration: '/path/to/progress-illustration.svg',
    colors: 'from-yellow-500 to-orange-600',
  },
  {
    title: 'Talk to Fitnity (Voice Support)',
    description: 'Say “Hey Fitnity” to ask anything (English/Hindi).',
    icon: 'mic',
    illustration: '/path/to/voice-support-illustration.svg',
    colors: 'from-pink-500 to-red-600',
  },
  {
    title: 'Share on WhatsApp',
    description: 'Share daily workout or transformation cards.',
    icon: 'share',
    illustration: '/path/to/share-illustration.svg',
    colors: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Upgrade for Premium',
    description: 'Unlock smart yoga, advanced tracking, goal AI.',
    icon: 'crown',
    illustration: '/path/to/premium-illustration.svg',
    colors: 'from-gold-500 to-yellow-600',
  },
];

const OnboardingPage = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white font-inter p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Fitnity</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => {
          const IconComponent = iconMap[step.icon];
          return (
            <div
              key={index}
              className={`rounded-2xl shadow-[0_0_20px_#00c6ff80] p-6 bg-gradient-to-r ${step.colors} hover:scale-105 transition-transform`}
            >
              <div className="flex flex-col items-center">
                <IconComponent className="text-4xl mb-4" />
                <img
                  src={step.illustration}
                  alt={step.title}
                  className="w-32 h-32 mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">{step.title}</h2>
                <p className="text-center text-white/80">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full text-white font-semibold shadow-xl hover:scale-105 transition-transform">
          Let&apos;s Get Started
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;