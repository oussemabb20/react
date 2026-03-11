import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './Components/RootLayout';

// Lazy loading des composants
const Events = lazy(() => import('./Components/Events.jsx'));
const EventDetails = lazy(() => import('./Components/EventDetails.jsx'));
const AddEvent = lazy(() => import('./Components/AddEvent.jsx'));
const UpdateEvent = lazy(() => import('./Components/UpdateEvent.jsx'));
const NotFound = lazy(() => import('./Components/NotFound.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Events />,
      },
      {
        path: 'event/:eventName',
        element: <EventDetails />,
      },
      {
        path: 'add-event',
        element: <AddEvent />,
      },
      {
        path: 'update-event/:eventId',
        element: <UpdateEvent />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
