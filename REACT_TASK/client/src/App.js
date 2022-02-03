import logo from './logo.svg';
import './App.css';
import Employee from './page/employee';
import { BrowserRouter , Route , Routes , Navigate } from "react-router-dom"
import BankDetail from './page/bankDetail';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/employee-form" element={<Employee />} />
            <Route path="/bank-detail" element={<BankDetail />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
