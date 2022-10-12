import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Admin from "../components/login/Admin";
import LoginHeaders from "../components/login/AdminHeaders";
import PageContainer from "../components/wrapper/PageContainer";

const LoginAdmin = () => {
  return (
    <>
      <PageContainer>
        <LoginHeaders />
        <Admin />
      </PageContainer>
    </>
  );
};
export default LoginAdmin;
