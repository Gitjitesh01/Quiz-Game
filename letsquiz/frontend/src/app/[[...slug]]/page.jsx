'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { UserProvider } from '../../context/userContext.jsx';

// Dynamically import the React Router SPA entry point with SSR disabled
const App = dynamic(() => import('../../App.jsx'), { ssr: false });

export default function AppPage() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
