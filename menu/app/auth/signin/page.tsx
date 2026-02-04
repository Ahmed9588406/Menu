'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Language, getTranslation, isRTL } from '@/lib/i18n';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export default function SignInPage() {
  const [language, setLanguage] = useState<Language>('ar');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const t = getTranslation(language);
  const rtl = isRTL(language);

  const colors = {
    darkBlue: '#1A3263',
    mediumBlue: '#547792',
    gold: '#FAB95B',
    cream: '#E8E2DB',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} style={{ backgroundColor: colors.cream }} className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav style={{ backgroundColor: colors.darkBlue, borderColor: colors.gold }} className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold" style={{ color: colors.gold }}>
              {getTranslation('ar').common.appName}
            </div>
          </Link>
          
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            style={{ backgroundColor: colors.mediumBlue, color: colors.cream }}
            className="px-4 py-2 rounded-lg hover:opacity-90 transition-colors font-semibold"
          >
            {language === 'ar' ? 'EN' : 'AR'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div style={{ backgroundColor: colors.cream, borderColor: colors.mediumBlue }} className="border-2 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors.gold }}>
                <LogIn size={32} style={{ color: colors.darkBlue }} />
              </div>
              <h1 style={{ color: colors.darkBlue }} className="text-3xl font-bold mb-2">
                {t.auth.signIn.title}
              </h1>
              <p style={{ color: colors.mediumBlue }}>
                {language === 'ar' ? 'رحبا بعودتك' : 'Welcome back'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-2">
                  {t.auth.signIn.email}
                </label>
                <div className="relative">
                  <Mail size={20} style={{ color: colors.mediumBlue }} className="absolute left-3 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: colors.mediumBlue,
                      color: colors.darkBlue,
                      backgroundColor: colors.cream,
                      '--tw-ring-color': colors.gold
                    } as any}
                    placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-2">
                  {t.auth.signIn.password}
                </label>
                <div className="relative">
                  <Lock size={20} style={{ color: colors.mediumBlue }} className="absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: colors.mediumBlue,
                      color: colors.darkBlue,
                      backgroundColor: colors.cream,
                      '--tw-ring-color': colors.gold
                    } as any}
                    placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5"
                    style={{ color: colors.mediumBlue }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: colors.gold }}
                  />
                  <span style={{ color: colors.mediumBlue }} className="text-sm font-medium">
                    {t.auth.signIn.rememberMe}
                  </span>
                </label>
                <Link href="#" style={{ color: colors.gold }} className="text-sm font-semibold hover:opacity-80 transition-opacity">
                  {t.auth.signIn.forgotPassword}
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: colors.gold, color: colors.darkBlue }}
                className="w-full py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <LogIn size={20} />
                {loading ? (language === 'ar' ? 'جاري التحميل...' : 'Loading...') : t.auth.signIn.submit}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p style={{ color: colors.mediumBlue }}>
                {t.auth.signIn.noAccount}{' '}
                <Link href="/auth/signup" style={{ color: colors.gold }} className="font-semibold hover:opacity-80 transition-opacity">
                  {t.auth.signIn.signUpLink}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
