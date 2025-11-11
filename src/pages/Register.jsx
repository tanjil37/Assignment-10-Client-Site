import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();

const Register = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+])[A-Za-z\d@$!%*?&#^()\-_=+]{8,}$/;

    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, { displayName: name, photoURL: photo });
      toast.success("Signup successful ");
      navigate("/");
    } catch (e) {
      
       if (e.code === "auth/email-already-in-use") {
        toast.error(
            "User already exists in the database."
          );
        } else if (e.code === "auth/weak-password") {
          toast.error("Bhai tomake at least 6 ta digit er pass dite hobe");
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please check your email.");
        } else if (e.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Wrong password. Please try again.");
        } else if (e.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (e.code === "auth/operation-not-allowed") {
          toast.error("Operation not allowed. Please contact support.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }

    }
  };

  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Google Sign-up successful");
        navigate("/");
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shadow-xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Register your account
        </h2>

        <form onSubmit={handleRegister} className="card-body">
          <label className="label">Your Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered"
            required
          />

          <label className="label">Photo URL</label>
          <input type="text" name="photo" className="input input-bordered" />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered"
            required
          />
          {/* password */}
          <div className="relative">
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                className="input input-bordered w-full pr-10" // extra padding-right for icon
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-600"
              >
                {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4 w-full">
            Register
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="btn bg-white border border-gray-300 w-full flex items-center justify-center gap-2"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          <p className="text-center font-medium mt-3">
            Already Have An Account?{" "}
            <Link to="/login" className="text-indigo-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;