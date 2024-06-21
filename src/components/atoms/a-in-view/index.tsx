"use client";

import React from "react";
import { IntersectionOptions, useInView } from "react-intersection-observer";

interface Props {
  opts?: IntersectionOptions;
  inView?: CallableFunction;
}

const InView: React.FC<Props> = ({ opts, inView: outInView }) => {
  const { ref, inView } = useInView(opts);

  React.useEffect(() => {
    if (inView) {
      outInView && outInView();
    }
  }, [inView, outInView]);

  return <div ref={ref}></div>;
};

export default InView;
