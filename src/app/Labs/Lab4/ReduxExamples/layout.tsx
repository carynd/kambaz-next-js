"use client";

import { ReactNode } from "react";
import ReduxProvider from "../../ReduxProvider";

export const dynamic = 'force-dynamic';

export default function ReduxExamplesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
