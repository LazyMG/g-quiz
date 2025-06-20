"use client";

import { RecoilRoot } from "recoil";

const RecoilProvider = ({ children }: React.PropsWithChildren) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
