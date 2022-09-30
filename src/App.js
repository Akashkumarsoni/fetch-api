import { AppProvider } from "@shopify/polaris";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Tables";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={ <Login />}/> 
            <Route path="/dashboard" element={<Dashboard />}/> 
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
