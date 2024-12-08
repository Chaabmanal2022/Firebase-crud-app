import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from './components/auth';
import Departments from './components/departments';
import AddDepartment from "./components/AddDepartment";
import EditDepartment from "./components/EditDepartment";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          {/* Route protégée pour /departments */}
          <Route
            path="/departments"
            element={
              <ProtectedRoute>
                <Departments />
              </ProtectedRoute>
            }
          />
          {/* Routes protégées pour /add-department et /edit-department */}
           <Route
          path="/add-department"
          element={
            <ProtectedRoute>
              <AddDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-department/:id"
          element={
            <ProtectedRoute>
              <EditDepartment />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
