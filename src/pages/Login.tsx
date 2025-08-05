

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--c-neutral-100))] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center gradient-text">
          Seller Login
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="seller@example.com"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
            />
          </div>
          <div className="flex justify-between items-center text-sm text-[rgb(var(--c-neutral-600))]">
            <div>
              <input type="checkbox" className="mr-2" />
              Remember me
            </div>
            <a href="/forget-password" className="text-[rgb(var(--c-primary-500))] hover:underline">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
        <p className="text-center text-sm text-[rgb(var(--c-neutral-600))] mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-[rgb(var(--c-secondary-500))] hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
