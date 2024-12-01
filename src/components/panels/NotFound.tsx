import React from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 p-4 w-full h-full">
      <div className="max-w-md w-full bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-zinc-400 mb-6">
          Oops! The page you are looking for seems to have wandered off into the
          digital wilderness. It might have been moved, deleted, or never
          existed in the first place.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={goBack}
            className="px-4 py-2 bg-zinc-800 text-zinc-200 rounded-md hover:bg-zinc-700 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={goHome}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
