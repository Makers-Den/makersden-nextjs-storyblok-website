'use client';
import { type ReactNode } from 'react';
import React from 'react';
import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer';

function CommonContextProviders({ children }: { children: ReactNode }) {
  return <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>;
}

export default CommonContextProviders;
