import { Clock, Mail, Phone } from "lucide-react"
import { useTranslations } from "next-intl";
const Contact = () => {
    const t = useTranslations("TopNav");
    return(
       <div>
          {/* Hero Header */}
      <div className="relative h-[200px] mb-12">
      <div className="absolute inset-0 bg-[url('/photo-1521737711867-e3b97375f90xcontact.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative h-full container mx-auto px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44">
        <div className="flex flex-col justify-center items-center h-full text-white space-y-4">
          <h1 className="text-4xl font-bold">{t("Contact")}</h1>
          <div className="flex items-center gap-2 text-sm">
            <p className="text-center">
            {t("ContactDescription")}
            </p>
          </div>
        </div>
      </div>
    </div>

    <main className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Email Card */}
        <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">{t("Email")}</h2>
          </div>
          <p className="text-muted-foreground mb-2">
          {t("SendUsEmail")}
          </p>
          <a
            href="mailto:info@q8arzaq.com"
            className="text-primary hover:underline font-medium"
          >
            info@q8arzaq.com
          </a>
        </div>

        {/* Phone Card */}
        <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">{t("Phone")}</h2>
          </div>
          <p className="text-muted-foreground mb-2">{t("CallUs")}</p>
          <a
            href="tel:+96597397310"
            className="text-primary hover:underline font-medium"
          >
            +965 97397310
          </a>
        </div>

        {/* Office Hours Card */}
        <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">{t("OfficeHours")}</h2>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground">{t("SundayToThursday")}</p>
            <p className="font-medium">{t("SundayToThursdayHours")}</p>
            <p className="text-muted-foreground mt-2">{t("FridayToSaturday")}</p>
            <p className="font-medium">{t("FridayToSaturdayHours")}</p>
          </div>
        </div>
      </div>
    </main>

    {/* Full-width Map Section */}
    <div className="w-full h-[400px] mt-12">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d222883.49215880052!2d47.82375385!3d29.3375863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9c8ce8db396d%3A0x6747a130779f0bc0!2sKuwait%20City%2C%20Kuwait!5e0!3m2!1sen!2s!4v1659528527015!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
       </div>
  
    )
};

export default Contact;
