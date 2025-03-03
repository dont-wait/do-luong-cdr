import { useState } from "react";
import "./LoginForm.css";

interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.email || !formData.password) {
      setError("Email and Password are required.");
      return;
    }

    // If form is valid, proceed with the login process
    console.log("Login attempt:", formData);
    setError(null);

    // handle login here
  };

  return (
    <div className='login-form backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-10 mx-6 my-10 sm:mx-0 sm:my-0'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>
          Đăng nhập
        </h1>
        <p className='text-gray-600 dark:text-gray-300 text-[16px] p-[5px]'>
          Vui lòng đăng nhập để tiếp tục
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8 my-[10px]'>
        {/* Error message */}
        {error && (
          <div className='text-red-500 text-sm text-center mb-5'>{error}</div>
        )}

        {/* Email Field */}
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-6 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-300 focus:ring-4 focus:ring-blue-200/30 text-base transition-all'
            placeholder='example@email.com'
            required
          />
        </div>

        {/* Password Field */}
        <div className='mb-7'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
            Mật khẩu
          </label>
          <div className='relative'>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-6 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-300 focus:ring-4 focus:ring-blue-200/30 text-base pr-14'
              placeholder='••••••••'
              required
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200'
              aria-label='Toggle password visibility'>
              <i
                className={`fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } text-base`}></i>
            </button>
          </div>
        </div>

        {/* Remember & Forgot Password */}
        <div className='flex items-center justify-between mt-6'>
          <div className='flex items-center gap-3'>
            <input
              id='remember'
              name='remember'
              type='checkbox'
              checked={formData.remember}
              onChange={handleChange}
              className='h-5 w-5 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 rounded cursor-pointer bg-gray-100 dark:bg-gray-700'
            />
            <label
              htmlFor='remember'
              className='text-sm text-gray-700 dark:text-gray-300'>
              Ghi nhớ đăng nhập
            </label>
          </div>
          <a
            href='#'
            className='text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200'>
            Quên mật khẩu?
          </a>
        </div>

        {/* Submit Button */}
        <div className='mt-10'>
          <button
            type='submit'
            className='submit-btn w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200/40 text-white font-semibold text-[16px] transition-all duration-200 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600'>
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
