import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotImplemented = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="max-w-md w-full bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl p-8 text-center mx-auto my-auto">
      <div className="flex justify-center mb-6">
        <AlertTriangle
          className="h-16 w-16 text-yellow-500"
          strokeWidth={1.5}
        />
      </div>
      <h1 className="text-2xl font-bold text-zinc-100 mb-4">
        Feature Not Implemented
      </h1>
      <p className="text-zinc-400 mb-6">
        We apologize, but this feature is currently under development. Please
        check back later.
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
  );
};

export default NotImplemented;
