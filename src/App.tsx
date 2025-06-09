import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CarsPage } from './pages/CarsPage'
import { ServicesPage } from './pages/ServicesPage'
import { CrewPage } from './pages/CrewPage'
import { PackagesPage } from './pages/PackagesPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CarsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/crew" element={<CrewPage />} />
          <Route path="/packages" element={<PackagesPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App