import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useEffect } from "react";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { saveUser } from "../../utils";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { loginUser, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const onSubmit = async (data) => {
    try {
      const { user } = await loginUser(data.email, data.password);
      await saveUser({
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      });
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.code || "Login failed!");
      // console.log(error);
    }
  };

  if (loading && user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-3xl p-8 space-y-6 border border-base-300">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-primary">Login</h2>
          <p className="text-base-content/60">
            Welcome back! Please login to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered w-full focus:input-primary transition-all"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full focus:input-secondary transition-all"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <div className="flex justify-end mt-1">
              <Link
                to="#"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full text-white font-semibold text-lg hover:shadow-lg transition-all"
          >
            Login
          </button>

          {/* Demo Login */}
          <div className="divider text-xs text-base-content/50">
            Demo Access
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setValue("email", "citizen@gmail.com");
                setValue("password", "abc@25N#");
              }}
              className="btn btn-outline btn-accent btn-sm"
            >
              Demo Citizen
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("email", "abc@gmail.com");
                setValue("password", "abc@25N#");
              }}
              className="btn btn-outline btn-secondary btn-sm"
            >
              Demo Admin
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-base-content/70 mt-4">
          New here?{" "}
          <Link
            to="/register"
            className="text-primary font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-base-300" />
          <span className="text-xs text-base-content/50">or continue with</span>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
