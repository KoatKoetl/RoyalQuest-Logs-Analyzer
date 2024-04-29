import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import routes from './utils/routes';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="h-full flex justify-center items-center">Loading page...</div>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  </React.StrictMode>
);
