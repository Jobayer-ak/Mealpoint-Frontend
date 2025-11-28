/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ReactNode } from 'react';
import SessionWrapper from './SessionWrapper';

interface Props {
  children: ReactNode;
  session: any;
}

export default function ClientLayoutWrapper({ children, session }: Props) {
  return <SessionWrapper session={session}>{children}</SessionWrapper>;
}
