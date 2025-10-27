
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  const CheckIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden relative border border-gray-700">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        aria-label="Copy code"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <pre className="p-4 text-sm sm:text-base overflow-x-auto">
        <code className="font-mono text-gray-200">
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;