import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Cars } from './pages/Cars'
import { Services } from './pages/Services'
import { CrewMembers } from './pages/CrewMembers'
import { ServicePackages } from './pages/ServicePackages'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/services" element={<Services />} />
          <Route path="/crew" element={<CrewMembers />} />
          <Route path="/packages" element={<ServicePackages />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App