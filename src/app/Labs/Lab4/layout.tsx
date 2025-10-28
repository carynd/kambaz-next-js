"use client";

import { ReactNode } from "react";
import ReduxProvider from "../ReduxProvider";

export default function Lab4Layout({
  children,
}: {
  children: ReactNode;
}) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
