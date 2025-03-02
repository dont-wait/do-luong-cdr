import "./Login.css";
import LoginForm from "./Components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className='flex h-full w-full justify-center items-center'>
      <div className='flex-1 h-screen loginBg flex justify-center items-center roboto-900 '>
        <span className='text-center w-[80%]'>
          TRƯỜNG ĐẠI HỌC CÔNG THƯƠNG THÀNH PHỐ HỒ CHÍ MINH (HUIT)
        </span>
      </div>
      <div className='flex-1 h-screen flex justify-center items-center'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
