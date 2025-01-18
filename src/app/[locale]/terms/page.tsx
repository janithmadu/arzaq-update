
import { useTranslations } from 'next-intl';
import TermsMain from '../components/Terms/TermsMain';
import { Metadata } from 'next';
export const revalidate = 1;

export const metadata: Metadata = {
  title:
    "Terms and Conditions - Q8ARZAQ | Guidelines for Using Our Ad Platform in Kuwait",
  description:
    "Review the terms and conditions of using Q8ARZAQ’s platform. Understand the rules and guidelines for posting ads, buying, selling, and using our services securely and responsibly.",
};


const Page = () => {
  const t = useTranslations("TopNav");
    return (
        <div>
          <TermsMain/>
        </div>
    );
}

export default Page;
