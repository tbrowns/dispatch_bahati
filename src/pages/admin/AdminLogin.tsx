import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Truck } from 'lucide-react';

const ADMIN_PASSWORD = 'bahati2024'; // You can change this password

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a brief delay for security feel
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('bahati-admin-auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#edb88b]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#edb88b]/5 rounded-full blur-2xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#edb88b] rounded-xl mb-4">
            <Truck className="w-8 h-8 text-black" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            BAHATI
          </h1>
          <p className="text-gray-400">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="card-dark p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#edb88b]/10 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#edb88b]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-white">Secure Access</h2>
              <p className="text-gray-500 text-sm">Enter password to continue</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="admin-input pr-12"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#edb88b] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Access Admin Panel'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#2a2a2a] text-center">
            <a href="/" className="text-gray-500 hover:text-[#edb88b] text-sm transition-colors">
              ← Back to Website
            </a>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Protected Area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
