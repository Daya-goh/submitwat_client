import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import ClassOverview from "./pages/ClassOverview";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import SubmitwatOverview from "./pages/SubmitWatOverview";

function App() {
  const [token, setToken] = useState<string>("");
  const [classParam, setClassParam] = useState<string>("");

  console.log(token);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/main" element={<Layout />}>
            <Route index element={<MainPage token={token} />} />
            <Route
              path="/main/submitwat"
              element={
                <SubmitwatOverview
                  token={token}
                  setClassParam={setClassParam}
                />
              }
            />
            <Route
              path="/main/submitwat/:id"
              element={<ClassOverview classParam={classParam} token={token} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
