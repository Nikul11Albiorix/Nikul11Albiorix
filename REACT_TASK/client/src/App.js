import logo from './logo.svg';
import './App.css';
import Employee from './page/employee';
import { BrowserRouter , Route , Routes , Navigate } from "react-router-dom"
import BankDetail from './page/bankDetail';
import ProfessionalDetails from './page/professionalDetail';
import CurrentStatus from './page/CurrentStatus';
import ExperienceDetails from './page/AddNewExperie';
import EducationalDetails from './page/EducationalDetails';
import AllEmployee from './page/ShowEmployees/allEmployees';
import UpdateEmployeeForm from './page/UpdateEmployee.js/employee';
import UpdateBankDetail from './page/UpdateEmployee.js/bankDetail';
import UpdateProfessionalDetails from './page/UpdateEmployee.js/professionalDetail';
import UpdateCurrentStatus from './page/UpdateEmployee.js/CurrentStatus';
import UpdateExperienceDetails from './page/UpdateEmployee.js/AddNewExperie';
import UpdateEducationalDetails from './page/UpdateEmployee.js/EducationalDetails';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/employee-form" element={<Employee />} />
            <Route path="/bank-detail" element={<BankDetail />} />
            <Route path="/professional-details" element={<ProfessionalDetails />} />
            <Route path="/currentStatus" element={<CurrentStatus />} />
            <Route path="/experienceDetails" element={<ExperienceDetails />} />
            <Route path="/educationaldetails" element={<EducationalDetails />} />
            <Route path="/" element={<AllEmployee />} />
            <Route path="/" element={<AllEmployee />} />
            
            <Route path="/update-EmployeeForm" element={<UpdateEmployeeForm />} />
            <Route path="/update-BankDetail" element={<UpdateBankDetail />} />
            <Route path="/update-ProfessionalDetails" element={<UpdateProfessionalDetails />} />
            <Route path="/update-CurrentStatus" element={<UpdateCurrentStatus />} />
            <Route path="/update-experienceDetails" element={<UpdateExperienceDetails />} />
            <Route path="/update-EducationalDetails" element={<UpdateEducationalDetails />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
