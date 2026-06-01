import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutOverview from "@/components/about/AboutOverview";
import AboutTraditional from "@/components/about/AboutTraditional";
import OurTeamSection from "@/components/about/OurTeamSection";
import OurValuesSection from "@/components/about/OurValuesSection";
import React from "react";

type Props = {};

export default function AboutPage({}: Props) {
  return (
    <div>
      <AboutHeroSection />
      <AboutTraditional />
      <OurValuesSection />
      <OurTeamSection />
    </div>
  );
}
