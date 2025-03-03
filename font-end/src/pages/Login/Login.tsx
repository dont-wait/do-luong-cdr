import "./Login.css";
import LoginForm from "./Components/LoginForm/LoginForm";

const Login: React.FC = () => {
  return (
    <div className='login-page container-fluid d-flex flex-column vh-100 p-4'>
      <div className='row flex-grow-1'>
        <div className='col-sm-12 col-md-6 d-flex justify-content-center align-items-center loginBg'>
          <span className='login-text text-center roboto-900 w-[90%]'>
            TRƯỜNG ĐẠI HỌC CÔNG THƯƠNG THÀNH PHỐ HỒ CHÍ MINH (HUIT)
          </span>
        </div>
        <div className='col-sm-12 col-md-6 d-flex justify-content-center align-items-center'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
