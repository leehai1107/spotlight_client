import React from "react";
import SkeletonLayout from "../SkeletonLayout/SkeletonLayout";
import MainFooter from "../../components/MainFooter/MainFooter";
import MainHeader from "../../components/MainHeader/MainHeader";

export default function MainLayout() {
  return <SkeletonLayout header={<MainHeader />} footer={<MainFooter />} />;
}
