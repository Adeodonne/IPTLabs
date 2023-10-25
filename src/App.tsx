import React from 'react';
import Lab1 from "../src/features/Lab1/Lab1.components";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import InProgresPage from "../src/features/InProgresPage/InProgresPage.component";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route path="lab1" element={<Lab1 />} />
                    <Route path="*" element={<InProgresPage />} />
                </Route>
            </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
