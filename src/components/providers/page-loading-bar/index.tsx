"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <ProgressBar
        height="4px"
        color="#00a86b"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </section>
  );
};

export default LoadingProvider;
