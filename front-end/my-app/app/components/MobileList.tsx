import React from "react";

export const MobileList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="divide-y divide-slate-300">{children}</ul>;
};
