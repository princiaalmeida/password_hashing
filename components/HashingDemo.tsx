import React, { useState, useCallback } from 'react';
import { hashPassword, generateSalt } from '../services/cryptoService';

const HashingDemo: React.FC = () => {
  const [password, setPassword] = useState('password123');
  const [salt, setSalt] = useState('');
  const [hashedWithSalt, setHashedWithSalt] = useState('');
  const [hashedWithoutSalt, setHashedWithoutSalt] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleHash = useCallback(async () => {
    if (!password) {
      alert("Please enter a password.");
      return;
    }
    setIsLoading(true);

    // Simulate async operation for better UX
    await new Promise(res => setTimeout(res, 300));

    const newSalt = generateSalt();
    const hashWithout = await hashPassword(password, ''); // Use empty salt for "no salt"
    const hashWith = await hashPassword(password, newSalt);

    setSalt(newSalt);
    setHashedWithoutSalt(hashWithout);
    setHashedWithSalt(hashWith);
    setIsLoading(false);
  }, [password]);

  const ResultDisplay: React.FC<{ title: string; value: string; highlight?: boolean }> = ({ title, value, highlight }) => (
    <div>
      <h4 className="font-semibold text-gray-400">{title}</h4>
      <div className={`mt-1 p-3 font-mono text-sm break-all rounded-md bg-gray-900 border ${highlight ? 'border-cyan-500' : 'border-gray-700'}`}>
        {value || <span className="text-gray-500">...</span>}
      </div>
    </div>
  );
  
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
  );


  return (
    <div className="bg-brand-secondary rounded-xl p-6 sm:p-8 shadow-lg border border-gray-700">
        <p className="text-gray-300 mb-6">Enter a password and click the button. Notice how the "Hashed Without Salt" value is always the same for the same password, but the "Hashed With Salt" value is different every time due to the new, random salt.</p>
        <div className="space-y-4">
            <div>
                <label htmlFor="password-input" className="block text-sm font-medium text-gray-300 mb-1">Password Input</label>
                <div className="relative">
                    <input
                        id="password-input"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Enter a password"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
            </div>

            <button
                onClick={handleHash}
                disabled={isLoading}
                className="w-full flex justify-center items-center bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : 'Generate & Hash'}
            </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg">
                <h3 className="text-lg font-bold text-red-400">Insecure: Hashing Without Salt</h3>
                <ResultDisplay title="Password" value={password} />
                <ResultDisplay title="SHA-256 Hash (Deterministic)" value={hashedWithoutSalt} />
            </div>
            <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg border-2 border-green-500">
                <h3 className="text-lg font-bold text-green-400">Secure: Hashing With Salt</h3>
                <ResultDisplay title="Password" value={password} />
                <ResultDisplay title="Generated Salt (Random)" value={salt} highlight />
                <ResultDisplay title="SHA-256 Hash (password + salt)" value={hashedWithSalt} highlight />
            </div>
        </div>
    </div>
  );
};

export default HashingDemo;