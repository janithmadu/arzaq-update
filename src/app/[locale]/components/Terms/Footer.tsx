"ues client"
import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations("TopNav");
  return (
    <footer className="text-center text-gray-500 text-sm">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Globe className="w-4 h-4" />
        <span>{t("AvailableInMultipleLanguages")}</span>
      </div>
      <p>© {new Date().getFullYear()} Arzaq. {t("AllRightsReserved")}.</p>
    </footer>
  );
}