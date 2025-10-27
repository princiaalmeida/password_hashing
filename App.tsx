import React, { useState } from 'react';
import HashingDemo from './components/HashingDemo';
import CodeBlock from './components/CodeBlock';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';

const theoryContent = {
  hashing: `A hash function is a one-way mathematical algorithm that takes an input (like a password) and produces a fixed-size string of characters, which is the 'hash'.
- One-Way: It's computationally infeasible to reverse the process and get the original input from the hash.
- Deterministic: The same input will always produce the same hash.
- Avalanche Effect:A tiny change in the input produces a completely different hash.`,
  problem: `If two users have the same password ("password123"), they will have the same hash. Attackers use pre-computed 'rainbow tables' which are massive dictionaries of common passwords and their corresponding hashes. By looking up a hash from a stolen database, they can quickly find the original password.`,
  salt: `A salt is a unique, random string of data that is added to a password before it's hashed. This salt is then stored alongside the hash in the database.`,
  howSaltHelps: `By adding a unique salt to each password, even identical passwords will have completely different hashes. This makes rainbow table attacks ineffective because the attacker would need a separate table for every possible salt, which is practically impossible.`
};

const procedureContent = `
 1. User signs up with a password
    const userPassword = "MySecurePassword_123";

 2. Generate a cryptographically secure random salt
    const salt = generateRandomSalt(); // e.g., "a1b2c3d4e5f6"

 3. Combine the password and the salt
    const combined = userPassword + salt;

 4. Hash the combined string
    const hash = sha256(combined); // e.g., "e8a3..."

 5. Store the hash AND the salt in the database
    db.saveUser({ username: "alex", hash: hash, salt: salt });
`;

const verificationContent = `
 1. User tries to log in
    const enteredPassword = "MySecurePassword_123";

 2. Retrieve the user's hash and salt from the database
    const { hash, salt } = db.findUser("alex");

 3. Combine the entered password with the stored salt
    const combined = enteredPassword + salt;

 4. Hash the new combined string
    const newHash = sha256(combined);

 5. Compare the new hash with the stored hash
  if (newHash === hash) {
     Passwords match! Log the user in.
  } else {
     Invalid credentials.
  }
`;

const App: React.FC = () => {
  const TABS = ['Home', 'Aim', 'Theory', 'Procedure', 'Demo', 'Conclusion'];
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomePage onNavigate={setActiveTab} />;
      case 'Aim':
        return (
          <div className="bg-brand-secondary rounded-xl p-6 sm:p-8 shadow-lg border border-gray-700">
            <p className="text-lg text-gray-300">
              To understand and demonstrate the critical importance of using a cryptographic <strong>salt</strong> when hashing passwords. We will explore how this technique enhances security and protects against common attack vectors like rainbow table attacks.
            </p>
          </div>
        );
      case 'Theory':
        return (
          <div className="bg-brand-secondary rounded-xl p-6 sm:p-8 shadow-lg border border-gray-700">
             <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-200 mb-2">What is Hashing?</h3>
                <p className="text-gray-300 whitespace-pre-line">{theoryContent.hashing}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-200 mb-2">The Problem with Simple Hashing</h3>
                <p className="text-gray-300">{theoryContent.problem}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-200 mb-2">What is a Salt?</h3>
                <p className="text-gray-300">{theoryContent.salt}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-200 mb-2">How Does Salt Help?</h3>
                <p className="text-gray-300">{theoryContent.howSaltHelps}</p>
              </div>
            </div>
          </div>
        );
      case 'Procedure':
        return (
          <div className="bg-brand-secondary rounded-xl p-6 sm:p-8 shadow-lg border border-gray-700">
            <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-cyan-200 mb-2">User Registration</h3>
                  <p className="text-gray-300 mb-4">The process of creating a secure credential when a user signs up.</p>
                  <CodeBlock code={procedureContent} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-200 mb-2">User Verification (Login)</h3>
                  <p className="text-gray-300 mb-4">How to verify a user's password without ever storing it in plaintext.</p>
                  <CodeBlock code={verificationContent} />
                </div>
            </div>
          </div>
        );
      case 'Demo':
        return <HashingDemo />;
      case 'Conclusion':
        return (
          <div className="bg-brand-secondary rounded-xl p-6 sm:p-8 shadow-lg border border-gray-700">
            <p className="text-lg text-gray-300">
              Salting passwords is not optional; it is a fundamental requirement for secure password storage. It provides a robust defense against pre-computation attacks, ensuring that even if a database is compromised, user credentials remain significantly harder to crack.
            </p>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <>
      <Navbar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      {/* The main content area is now a flex container to handle centering */}
      <div className={`min-h-[calc(100vh-65px)] w-full flex flex-col text-gray-200 p-4 sm:p-8 ${activeTab === 'Home' ? 'items-center justify-center' : 'items-center justify-start'}`}>
        <div className="max-w-7xl mx-auto w-full">
         {activeTab !== 'Home' && (
            <header className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-200">
                {activeTab}
              </h1>
            </header>
         )}

          <main>
            <div key={activeTab} className="fade-in">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;