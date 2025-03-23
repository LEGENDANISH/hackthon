import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Signup failed. Try again.");
      }
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1541630987550-3c7b4f2e4d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80')",
      }}
    >
      <div className="p-8 max-w-md w-full bg-white/90 rounded-xl shadow-lg space-y-6 backdrop-blur-sm">
        <h2 className="text-3xl font-extrabold text-center text-green-800">
          Join the Farming Community
        </h2>
        <p className="text-sm text-center text-gray-600">
          Grow together with us!
        </p>
        {error && (
          <p
            className="text-sm text-red-500 text-center animate-pulse"
            role="alert"
          >
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { field: "username", icon: "🌾" },
            { field: "firstName", icon: "🌱" },
            { field: "lastName", icon: "🌿" },
            { field: "password", icon: "🔒" },
          ].map(({ field, icon }) => (
            <div key={field} className="relative">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {field}
              </label>
              <div className="mt-1 relative">
                <input
                  id={field}
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-300"
                  required
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                  {icon}
                </span>
              </div>
            </div>
          ))}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;