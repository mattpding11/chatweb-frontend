import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Chat from '../pages/Chat.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/chat" element={<Chat />} />
    </Route>
  </Routes>
);
export default Router;