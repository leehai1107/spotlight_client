import React from "react";
import { Outlet } from "react-router-dom";

// Layout Component
export default function SkeletonLayout({ header, footer }) {
  return (
    <>
      {header}
      <main>
        <Outlet /> {/* This will render the child route's element */}
      </main>
      {footer}
    </>
  );
}
