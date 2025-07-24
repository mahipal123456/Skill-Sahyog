import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { AuthProvider } from './contexts/authcontext.jsx';
// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute.jsx';

// User components 
import Profile from './pages/Profile.jsx';
import AppliedProjects from './pages/AppliedProjects.jsx';
import BrowseProjects from './pages/BrowseProjects.jsx';

// NGO components
import PostedProjects from './pages/PostedProjects.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';
import PostNewProject from './pages/PostNewProject.jsx';
import Applicants from './pages/Applicants.jsx'
import Entries from './pages/Entries.jsx'
import EditProfile from './pages/EditProfile.jsx';
import { MessageProvider } from './contexts/MessageContext';
import MessagePopup from './components/MessagePopup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'profile/:username',
        element: <Profile />
      },
      {
        path: 'edit-profile',
        element: (
          <ProtectedRoute allowedRoles={['user','ngo']}>
            <EditProfile/>
          </ProtectedRoute>
        ),
      },
      {
        path: 'applied-projects',
        element: (
          <ProtectedRoute allowedRoles={['user']}>
            <AppliedProjects />
          </ProtectedRoute>
        ),
      },
      {
        path: 'browse-projects',
        element: (
          <ProtectedRoute allowedRoles={['user']}>
            <BrowseProjects />
          </ProtectedRoute>
        ),
      },
      
      {
        path: 'posted-projects',
        element: (
          <ProtectedRoute allowedRoles={['ngo']}>
            <PostedProjects />
          </ProtectedRoute>
        ),
      },
      {
        path: 'project/:projectId',
        element: (
          <ProtectedRoute allowedRoles={['ngo','user']}>
            < ProjectDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: '/project/:projectId/applicants',
        element: (
          <ProtectedRoute allowedRoles={['user', 'ngo']}>
            <Applicants />
          </ProtectedRoute>
        )
      },

      // {
      //   path: 'posted-projects/:projectId/applicants',
      //   element: (
      //     <ProtectedRoute allowedRoles={['ngo']}>
      //       <Applicants />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: 'Browse-projects/:projectId/applicants',
      //   element: (
      //     <ProtectedRoute allowedRoles={['user']}>
      //       <Applicants />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: 'project/:projectId/entries',
        element: (
          <ProtectedRoute allowedRoles={['ngo']}>
            <Entries/>
          </ProtectedRoute>
        ),
      },
      {
        path: 'post-project',
        element: (
          <ProtectedRoute allowedRoles={['ngo']}>
            <PostNewProject />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MessageProvider>
         <MessagePopup/>
          <RouterProvider router={router} />
      </MessageProvider>
    </AuthProvider>
  </StrictMode>
);
