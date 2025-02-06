import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import { SignupPage } from "./pages/signup";
import { SigninPage } from "./pages/signin";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SigninPage />} path="/signin" />
      <Route element={<SignupPage />} path="/signup" />
    </Routes>
  );
}

export default App;
