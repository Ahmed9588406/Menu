'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Language, getTranslation, isRTL } from '@/lib/i18n';
import { Mail, Lock, Phone, Store, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';

export default function SignUpPage() {
  const [language, setLanguage] = useState<Language>('ar');
  const [formData, setFormData] = useState({
    restaurantName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const t = getTranslation(language);
  const rtl = isRTL(language);

  const colors = {
    darkBlue: '#1A3263',
    mediumBlue: '#547792',
    gold: '#FAB95B',
    cream: '#E8E2DB',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

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
                <UserPlus size={32} style={{ color: colors.darkBlue }} />
              </div>
              <h1 style={{ color: colors.darkBlue }} className="text-3xl font-bold mb-2">
                {t.auth.signUp.title}
              </h1>
              <p style={{ color: colors.mediumBlue }}>
                {language === 'ar' ? 'ابدأ رحلتك معنا اليوم' : 'Start your journey with us today'}
              </p>
            </div>

            {error && (
              <div style={{ backgroundColor: colors.gold, borderColor: colors.gold }} className="mb-6 p-4 rounded-lg border-2 flex items-center gap-2">
                <AlertCircle size={20} style={{ color: colors.darkBlue }} />
                <p style={{ color: colors.darkBlue }} className="text-sm font-semibold">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Restaurant Name */}
              <div>
                <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-2">
                  {t.auth.signUp.restaurantName}
                </label>
                <div className="relative">
                  <Store size={20} style={{ color: colors.mediumBlue }} className="absolute left-3 top-3.5" />
                  <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: colors.mediumBlue,
                      color: colors.darkBlue,
                      backgroundColor: colors.cream,
                      '--tw-ring-color': colors.gold
                    } as any}
                    placeholder={language === 'ar' ? 'اسم مطعمك' : 'Your restaurant name'}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-2">
                  {t.auth.signUp.email}
                </label>
                <div className="relative">
                  <Mail size={20} style={{ color: colors.mediumBlue }} className="absolute left-3 top-3.5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: colors.mediumBlue,
                      color: colors.darkBlue,
                      backgroundColor: colors.cream,
                      '--tw-ring-color': colors.gold
                    } as any}
                    placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-2">
                  {t.auth.signUp.phone}
                </label>
                <div className="relative">
                  <Phone size={20} style={{ color: colors.mediumBlue }} className="absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: colors.mediumBlue,
                      color: colors.darkBlue,
                      backgroundColor: colors.cream,
                      '--tw-ring-color': colors.gold
                    } as any}
                    placeholder={language === 'ar' ? 'رقم هاتفك' : 'Your phone number'}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-2">
                  {t.auth.signUp.password}
                </label>
                <div className="relative">
                  <Lock size={20} style={{ color: colors.mediumBlue }} className="absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: colors.mediumBlue,
                      color: colors.darkBlue,
                      backgroundColor: colors.cream,
                      '--tw-ring-color': colors.gold
                    } as any}
                    placeholder={language === 'ar' ? 'كلمة المرور' : 'Password'}
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

              {/* Confirm Password */}
              <div>
                <label style={{ color: colors.darkBlue }} className="block text-sm font-semibold mb-2">
                  {t.auth.signUp.confirmPassword}
                </label>
                <div className="relative">
                  <Lock size={20} style={{ color: colors.mediumBlue }} className="absolute left-3 top-3.5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: colors.mediumBlue,
                      color: colors.darkBlue,
                      backgroundColor: colors.cream,
                      '--tw-ring-color': colors.gold
                    } as any}
                    placeholder={language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5"
                    style={{ color: colors.mediumBlue }}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: colors.gold, color: colors.darkBlue }}
                className="w-full py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
              >
                <UserPlus size={20} />
                {loading ? (language === 'ar' ? 'جاري الإنشاء...' : 'Creating...') : t.auth.signUp.submit}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p style={{ color: colors.mediumBlue }}>
                {t.auth.signUp.haveAccount}{' '}
                <Link href="/auth/signin" style={{ color: colors.gold }} className="font-semibold hover:opacity-80 transition-opacity">
                  {t.auth.signUp.signInLink}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
