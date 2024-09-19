import React from "react";
import ItemList from "../../components/ItemList/ItemList";
import FeatureList from "../../components/FeatureList/FeatureList";
import StepList from "../../components/StepList/StepList";
import AchievementList from "../../components/AchievementList/AchievementList";

export default function LandingPage() {
  return (
    <div className="wrapper">
      <ItemList />
      <FeatureList />
      <StepList />
      <AchievementList />
    </div>
  );
}
