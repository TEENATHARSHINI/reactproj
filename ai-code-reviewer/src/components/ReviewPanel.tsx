import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeReview } from '../types';

interface ReviewPanelProps {
  reviews: CodeReview[];
  isLoading: boolean;
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ reviews, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-indigo-200 rounded-full mb-4"></div>
          <div className="text-gray-600">Analyzing your code...</div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No reviews yet</h3>
        <p className="text-gray-500 max-w-md">
          Submit your code for review to see AI-powered feedback and suggestions for improvement.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Code Reviews</h2>
      
      <div className="space-y-6 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
                    {review.language}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-2">Code:</h4>
              <div className="text-sm mb-4 overflow-x-auto">
                <SyntaxHighlighter
                  language={review.language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                  }}
                  showLineNumbers
                >
                  {review.code}
                </SyntaxHighlighter>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">Feedback:</h4>
              <div className="bg-blue-50 p-3 rounded-md text-sm text-gray-800 mb-4">
                {review.feedback}
              </div>
              
              {review.suggestions.length > 0 && (
                <>
                  <h4 className="font-medium text-gray-900 mb-2">Suggestions:</h4>
                  <ul className="space-y-2">
                    {review.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-sm text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPanel;
