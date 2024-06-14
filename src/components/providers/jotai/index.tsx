"use client";

import { Provider } from "jotai";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

const JotaiProvider: React.FC<Props> = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProvider;
