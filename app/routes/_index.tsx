import { MetaFunction } from "@remix-run/node";
import LandingPageNavigation from "@molecules/m-landing-page-navigation";
import LandingPageHero from "@molecules/m-landing-page-hero";
import LandingPageWhatWeDo from "@molecules/m-landing-page-what-we-do";
import LandingPageHowWeDoIt from "@molecules/m-landing-page-how-we-do-it";
import LandingPageWhyChooseUs from "@molecules/m-landing-page-why-choose-us";
import LandingPageQAndA from "@molecules/m-landing-page-q-and-a";
import LandingPageFooter from "@molecules/m-landing-page-footer";
import LandingPageGetStarted from "@molecules/m-landing-page-get-started";

export const meta: MetaFunction = () => {
  return [
    { title: "Zaibatsu" },
    {
      name: "description",
      content:
        "Bridging the gap between decentralized and centralized currencies",
    },
  ];
};

export default function Index() {
  return (
    <div className="font-trispace w-screen overflow-hidden z-0 transition-all">
      <div className="p-7">
        <LandingPageNavigation />
        <LandingPageHero />
        <LandingPageWhatWeDo />
        <LandingPageHowWeDoIt />
        <LandingPageWhyChooseUs />
      </div>
      <LandingPageQAndA />
      <LandingPageGetStarted />
      <LandingPageFooter />
    </div>
  );
}
