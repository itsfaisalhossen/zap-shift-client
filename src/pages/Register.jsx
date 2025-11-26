import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";
import GoogleLogin from "../ui/GoogleLogin";
import axios from "axios";

const Register = () => {
  const {
    // watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateProfileFunc } = useAuth();

  const handleRegister = (data) => {
    console.log("after register", data.photo[0]);
    const profileImage = data.photo[0];

    registerUser(data?.email, data?.password)
      .then((result) => {
        console.log(result);
        // 1. store the image form data
        const formData = new FormData();
        formData.append("image", profileImage);

        // 2. Send the photo to store and get the url
        const image_api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;
        axios.post(image_api_url, formData).then((res) => {
          console.log("after image upload", res.data.data.url);

          //  update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateProfileFunc(userProfile)
            .then(() => {
              console.log("user profile Updated done");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h3 className="text-3xl font-bold mt-8 text-center">Welcome back</h3>
        <p className="text-center">Plase Register</p>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="name"
                {...register("name", { required: true })}
                className="input"
                placeholder="Name"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
              {/* Photo */}
              <label className="label">Photo</label>
              <input
                type="file"
                className="file-input"
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <span className="text-red-500">This field is required</span>
              )}
              {/* email */}
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
              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
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
              <button className="btn btn-neutral mt-4">Register</button>
              <p className="text-center">
                Al ready have an Account{" "}
                <Link className="text-blue-400" to="/login">
                  Login
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
export default Register;
