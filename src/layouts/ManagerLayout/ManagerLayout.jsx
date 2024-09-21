import React from "react";
import SkeletonLayout from "../SkeletonLayout/SkeletonLayout";
import ManagerHeader from "../../components/ManagerHeader/ManagerHeader";
import ManagerFooter from "../../components/ManagerFooter/ManagerFooter";

export default function ManagerLayout() {
  return (
    <SkeletonLayout header={<ManagerHeader />} footer={<ManagerFooter />} />
  );
}
