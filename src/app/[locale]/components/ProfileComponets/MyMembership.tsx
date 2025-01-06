import { useTranslations } from "next-intl";
import GetVerified from "./GetVerified";

type Membership = {
  verifiedSeller?: boolean;
  member?: boolean;
};

function MyMembership({ verifiedSeller, member }: Membership) {
  const t = useTranslations("TopNav");
  return (
    <div className="flex min-w-full min-h-full justify-center items-center">
      {verifiedSeller && member ? (
        <div className="flex flex-col gap-y-3 items-start">
          <h1 className="text-bodylarge font-semibold text-green-600">
            {t("VerifiedMember")}
          </h1>
          <p className="text-sm text-gray-600">{t("VerifiedDescription")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-y-3 items-start">
          <h1 className="text-bodylarge font-semibold">
            {t("NotVerifiedYet")}
          </h1>
          <p className="text-sm">{t("GetVerifiedDescription")}</p>

          <GetVerified />
        </div>
      )}
    </div>
  );
}

export default MyMembership;
