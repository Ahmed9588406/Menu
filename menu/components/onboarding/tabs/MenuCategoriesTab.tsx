"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface MenuCategoriesTabProps {
  onNext?: () => void;
}

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
}

export default function MenuCategoriesTab({ onNext }: MenuCategoriesTabProps) {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const { toast } = useToast();

  const colors = {
    darkBlue: "#1A3263",
    mediumBlue: "#547792",
    gold: "#FAB95B",
    cream: "#E8E2DB",
  };

  // Generate confetti on mount
  useEffect(() => {
    const confettiPieces: Confetti[] = [];
    const emojis = ["🎉", "🎊", "✨", "🌟", "⭐", "🎈", "🎁"];

    for (let i = 0; i < 30; i++) {
      confettiPieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }

    setConfetti(confettiPieces);

    // Clear confetti after animation completes
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    toast({
      title: "✓ تم بنجاح",
      description: "تم استلام الكريديت المجاني",
      duration: 2000,
    });

    setTimeout(() => {
      onNext?.();
    }, 500);
  };

  return (
    <div className="w-full relative" dir="rtl">
      {/* Confetti Animation */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed pointer-events-none text-3xl"
          style={{
            left: `${piece.left}%`,
            top: "-50px",
            animation: `fall ${piece.duration}s linear ${piece.delay}s forwards`,
            zIndex: 50,
          }}
        >
          {piece.emoji}
        </div>
      ))}

      {/* Main Content */}
      <div className="space-y-6">
        {/* Credit Card Box */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            backgroundColor: colors.cream + "40",
            border: `2px solid ${colors.mediumBlue}`,
          }}
        >
          {/* Credit Amount Box */}
          <div
            className="inline-block rounded-2xl p-6 mb-6"
            style={{
              backgroundColor: "white",
              border: `3px solid ${colors.mediumBlue}`,
            }}
          >
            <p style={{ color: colors.gold }} className="text-5xl font-bold">
              350
            </p>
            <p style={{ color: colors.darkBlue }} className="text-lg font-semibold mt-1">
              SP
            </p>
          </div>

          {/* Welcome Message */}
          <h2 style={{ color: colors.darkBlue }} className="text-3xl font-bold mb-4">
            مرحباً بك!
          </h2>

          {/* Description */}
          <p style={{ color: colors.mediumBlue }} className="text-sm mb-6 leading-relaxed">
            لقد حصلت على كريديت مجاني لاستخدام خدماتنا على الفور
          </p>

          {/* Details Section */}
          <div
            className="rounded-xl p-6 text-right space-y-4"
            style={{
              backgroundColor: "white",
            }}
          >
            {/* Credit Details */}
            <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: colors.cream }}>
              <div className="text-right">
                <p style={{ color: colors.mediumBlue }} className="text-xs mb-1">
                  استخدم هذا الكريديت في ما يلي:
                </p>
                <p style={{ color: colors.darkBlue }} className="text-sm font-semibold">
                  خدمات متقدمة وميزات إضافية
                </p>
              </div>
              <div
                className="text-3xl font-bold px-4 py-2 rounded-lg"
                style={{
                  color: colors.gold,
                  backgroundColor: colors.gold + "15",
                }}
              >
                SP 350
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-xl" style={{ color: colors.gold }}>✓</span>
                <span style={{ color: colors.darkBlue }} className="text-sm font-medium">
                  استخدم الكريديت في أي وقت
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl" style={{ color: colors.gold }}>✓</span>
                <span style={{ color: colors.darkBlue }} className="text-sm font-medium">
                  لا ينتهي الكريديت بسهولة
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl" style={{ color: colors.gold }}>✓</span>
                <span style={{ color: colors.darkBlue }} className="text-sm font-medium">
                  استمتع بجميع الميزات المتقدمة
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div
          className="p-4 rounded-lg border-r-4 text-right"
          style={{
            backgroundColor: colors.gold + "15",
            borderColor: colors.gold,
          }}
        >
          <p style={{ color: colors.darkBlue }} className="text-sm font-semibold">
            💡 نصيحة: احفظ هذا الكريديت واستخدمه بحكمة
          </p>
          <p style={{ color: colors.mediumBlue }} className="text-xs mt-2">
            يمكنك استخدام الكريديت لتفعيل الخدمات المتقدمة والحصول على ميزات إضافية
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleContinue}
          className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
          style={{
            backgroundColor: colors.gold,
            color: colors.darkBlue,
          }}
        >
          حفظ والمتابعة
        </button>
      </div>

      {/* CSS for confetti animation */}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}