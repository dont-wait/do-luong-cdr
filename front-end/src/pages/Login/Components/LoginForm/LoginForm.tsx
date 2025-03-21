// LoginForm.tsx
import { useRef, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormData } from "../../../../types/types";
import useAuth from "../../../../hook/useAuth";
import { useToast } from "../../../../hook/useToast";
import InputField from "../../../../components/InputField";
import Checkbox from "../../../../components/Checkbox";
import { loginHanle } from "../../../../services/auth";
import "./LoginForm.css";

const LOCAL_STORAGE_KEY = "userRoles";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();
  const { showToast } = useToast();
  const from = location.state?.from?.pathname || "/";

  const refs = {
    user: useRef<HTMLInputElement>(null),
    error: useRef<HTMLParagraphElement>(null),
  };

  const [loginState, setLoginState] = useState<{
    formData: FormData;
    showPassword: boolean;
    roles?: number[];
  }>(() => {
    const savedRoles = localStorage.getItem(LOCAL_STORAGE_KEY);
    return {
      formData: { email: "", password: "", remember: false },
      showPassword: false,
      roles: savedRoles ? JSON.parse(savedRoles) : undefined,
    };
  });

  useEffect(() => {
    refs.user.current?.focus();
  }, [refs.user]);

  useEffect(() => {
    const roles = loginState.roles;
    if (!roles) return;

    setAuth({
      user: loginState.formData.email,
      pwd: loginState.formData.password,
      roles: roles,
    });

    const routes = {
      2001: "/admin",
      2002: "/lecturer",
    };

    const destination =
      Object.entries(routes).find(([role]) =>
        roles.includes(Number(role))
      )?.[1] || from;

    navigate(destination, { replace: true });
  }, [
    loginState.roles,
    navigate,
    from,
    loginState.formData.email,
    loginState.formData.password,
    setAuth,
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const togglePasswordVisibility = () => {
    setLoginState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, remember } = loginState.formData;
    if (!email || !password) {
      showToast("Email and Password are required.", "error");
      return;
    }

    try {
      const response = await loginHanle();

      if (response) {
        const newRoles = [2001];

        setLoginState({
          formData: { email: "", password: "", remember: false },
          showPassword: false,
          roles: newRoles,
        });

        if (remember) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRoles));
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }

        showToast("Login successful!", "success");
      } else {
        showToast("Incorrect email or password!", "info");
      }
    } catch {
      showToast("Server Not Found", "error");
      refs.error.current?.focus();
    }
  };

  const { formData, showPassword } = loginState;

  return (
    <div className='login-form backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-10 mx-6 my-10 sm:mx-0 sm:my-0'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-gray-800'>Đăng nhập</h1>
        <p className='text-gray-600 text-[16px] p-[5px]'>
          Vui lòng đăng nhập để tiếp tục
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8 my-[10px]'>
        <InputField
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='example@email.com'
          ref={refs.user}
        />

        <InputField
          type={showPassword ? "text" : "password"}
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='••••••••'
          showPasswordToggle={togglePasswordVisibility}
          showPasswordIcon={showPassword ? false : true}
        />

        <div className='flex items-center justify-between mt-6'>
          <Checkbox
            id='remember'
            name='remember'
            checked={formData.remember}
            onChange={handleChange}
            label='Ghi nhớ đăng nhập'
          />
          <Link
            to='/forgot-password'
            className='text-sm font-medium text-blue-600 hover:text-blue-500'>
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type='submit'
          className='submit-btn w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200'>
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
