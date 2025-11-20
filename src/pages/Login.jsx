import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";
import GoogleLogin from "../ui/GoogleLogin";

const Login = () => {
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data?.email, data?.password)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h3 className="text-3xl font-bold mt-8 text-center">Welcome back</h3>
        <p className="text-center">Plase Login</p>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  Password must be 6 characters or longer
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500">
                  Password mus have least one uppercase one lowercase one
                  special characters and one number
                </span>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
              <p className="text-center">
                New to Zap shift{" "}
                <Link className="text-blue-400" to="/register">
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};
export default Login;
