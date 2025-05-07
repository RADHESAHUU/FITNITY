import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { AuthProvider } from './components/ui/AuthContext';
import AppLayout from './components/ui/AppLayout';

// Pages
import DashboardPage from './pages/DashboardPage';
import YogaPage from './pages/YogaPage';
import AccountPage from './pages/AccountPage';
import AssistantPage from './pages/AssistantPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import NutritionPage from './pages/NutritionPage';
import OnboardingPage from './pages/OnboardingPage';
import PremiumPage from './pages/PremiumPage';
import SignupPage from './pages/SignupPage';
import TrackPage from './pages/TrackPage';

// Sentry configuration
Sentry.init({
  dsn: '', // Add your Sentry DSN here
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes - Accessible without authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Root redirect to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected Routes - Require authentication */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/yoga" element={<YogaPage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>

          {/* Catch all route - Redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful');
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}