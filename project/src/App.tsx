import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import { Dashboard } from './components/Dashboard';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Toaster />
    </>
  );
}

export default App;