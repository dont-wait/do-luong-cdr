import { useRef, useState, useEffect } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hook/useAuth";
import { useToast } from "../../../../hook/useToast";
import { loginHanle } from "../../../../services/auth";
import { USER_ID, USER_ROLE } from "../../../../types/local";
import { AccountData, AuthData } from "../../../../types/types";
import { routes } from "../../../../types/roles";
import "./LoginForm.css";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useState<{
    id: string;
    userRole: number;
  }>();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AccountData>();

  const refs = {
    user: useRef<HTMLInputElement>(null),
    error: useRef<HTMLParagraphElement>(null),
  };

  useEffect(() => {
    const authData: AuthData = {
      user: "",
      role: 2000,
    };

    if (loginState) {
      authData["user"] = loginState.id;
      authData["role"] = loginState.userRole;
    } else {
      authData["user"] = JSON.parse(localStorage.getItem(USER_ID) ?? '""');
      authData["role"] = JSON.parse(localStorage.getItem(USER_ROLE) ?? "2000");
    }

    setAuth(authData);
    if (authData.role !== 2000) showToast("Login successful!", "success");
    navigate(routes[authData.role ?? 2000], { replace: true });
    refs.user.current?.focus();
  }, [refs.user, navigate, loginState, setAuth, showToast]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: AccountData) => {
    try {
      setLoading(true);
      const { id, role } = await loginHanle(data);
      if (data.remember) {
        localStorage.setItem(USER_ID, JSON.stringify(id));
        localStorage.setItem(USER_ROLE, JSON.stringify(role));
      }

      setLoginState({
        id: id,
        userRole: role,
      });
    } catch {
      showToast("Incorrect ID or password!", "error");
      refs.error.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className='login-form backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-10 mx-6 my-10 sm:mx-0 sm:my-0'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>Đăng nhập</h1>
          <p className='text-gray-600 text-[16px] p-[5px]'>
            Vui lòng đăng nhập để tiếp tục
          </p>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} className='space-y-8 my-[10px]'>
          <Form.Group>
            <Form.Label>Lecturer ID</Form.Label>
            <Form.Control
              type='text'
              id='lecturer_id'
              autoComplete='username'
              className='p-3'
              {...register("id", { required: "Lecturer ID is required" })}
            />
            {errors.id && (
              <p className='text-danger p-1 font-medium'>{errors.id.message}</p>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <div className='relative'>
              <Form.Control
                type={showPassword ? "text" : "password"}
                id='password'
                className='p-3 pr-10'
                autoComplete='current-password'
                {...register("password", { required: "Password is required" })}
                placeholder='••••••••'
              />
              <span className='absolute inset-y-0 right-3 flex items-center cursor-pointer'>
                {showPassword ? (
                  <FaEye onClick={togglePasswordVisibility} />
                ) : (
                  <FaEyeSlash onClick={togglePasswordVisibility} />
                )}
              </span>
            </div>
            {errors.password && (
              <p className='text-danger p-1 font-medium'>
                {errors.password.message}
              </p>
            )}
          </Form.Group>

          {/* Bootstrap Form.Check for Remember Me */}
          <Form.Group controlId='rememberMe' className='mt-3 w-full'>
            <Form.Check
              type='checkbox'
              label='Ghi nhớ đăng nhập'
              {...register("remember")}
            />
          </Form.Group>

          <Button
            style={{ width: "100%" }}
            type='submit'
            className='submit-btn py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200'>
            Đăng nhập
          </Button>
        </Form>
      </Card>

      {loading && (
        <div className='spinner-overlay'>
          <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center space-x-3'>
            <Spinner animation='border' role='status' variant='primary' />
            <span>Processing...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
