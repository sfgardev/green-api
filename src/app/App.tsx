import { Navigate, Route, Routes } from 'react-router'
import { Suspense } from 'react'
import Login from '@/pages/login'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Suspense>
  )
}

export default App
