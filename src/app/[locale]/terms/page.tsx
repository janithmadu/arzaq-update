import React from 'react';

import { Book, Shield, Scale, MessageSquare, AlertCircle, CheckCircle2, Handshake, BadgeAlert } from 'lucide-react';
import { PageHeader } from '../components/Terms/PageHeader';
import { Section } from '../components/Terms/Section';
import { BulletList } from '../components/Terms/BulletList';
import { Footer } from '../components/Terms/Footer';
import { useTranslations } from 'next-intl';
import TermsMain from '../components/Terms/TermsMain';



const Page = () => {
  const t = useTranslations("TopNav");
    return (
        <div>
          <TermsMain/>
        </div>
    );
}

export default Page;
