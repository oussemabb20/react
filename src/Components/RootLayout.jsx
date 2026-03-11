import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function RootLayout() {
  return (
    <>
      <NavigationBar />
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default RootLayout;
