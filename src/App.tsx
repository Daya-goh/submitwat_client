import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddClass from "./components/AddClass";
import Layout from "./components/Layout";
import AddHw from "./pages/AddHw";
import ClassOverview from "./pages/ClassHomeworkOverview";
import HomeworkOverview from "./pages/HomeworkOverview";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import SubmitwatOverview from "./pages/SubmitWatOverview";

function App() {
  const [token, setToken] = useState<string>("");
  const [classParam, setClassParam] = useState<string>("");
  const [columnName, setColumnName] = useState<string>("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/main" element={<Layout setToken={setToken} />}>
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
              path="/main/submitwat/addclass"
              element={<AddClass token={token} />}
            />
            <Route
              path="/main/submitwat/:id"
              element={
                <ClassOverview
                  classParam={classParam}
                  token={token}
                  setColumnName={setColumnName}
                />
              }
            />
            <Route
              path="/main/submitwat/:id/addhw/:name"
              element={
                <AddHw
                  columnName={columnName}
                  classParam={classParam}
                  token={token}
                />
              }
            />
            <Route
              path="/main/submitwat/:id/:homework"
              element={
                <HomeworkOverview
                  columnName={columnName}
                  token={token}
                  classParam={classParam}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
