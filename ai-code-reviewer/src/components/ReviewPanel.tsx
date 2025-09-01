import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeReview } from '../types';

interface ReviewPanelProps {
  reviews: CodeReview[];
  isLoading: boolean;
  language: string;
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ reviews, isLoading, language }) => {
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

  const [expandedRefactors, setExpandedRefactors] = useState<Record<string, boolean>>({});

  const toggleRefactor = (reviewId: string) => {
    setExpandedRefactors(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  // Helper function to render code diff
  const renderDiff = (original: string, refactored: string) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <div className="text-xs font-medium text-red-600 mb-1">Original</div>
          <div className="text-xs bg-gray-900 p-2 rounded overflow-auto max-h-40">
            <SyntaxHighlighter
              language={language}
              style={atomDark}
              customStyle={{
                margin: 0,
                fontSize: '0.75rem',
                lineHeight: '1.2',
                background: 'transport',
              }}
              showLineNumbers
            >
              {original}
            </SyntaxHighlighter>
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-green-600 mb-1">Refactored</div>
          <div className="text-xs bg-gray-900 p-2 rounded overflow-auto max-h-40">
            <SyntaxHighlighter
              language={language}
              style={atomDark}
              customStyle={{
                margin: 0,
                fontSize: '0.75rem',
                lineHeight: '1.2',
                background: 'transparent',
              }}
              showLineNumbers
            >
              {refactored}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Code Reviews</h2>
      
      <div className="space-y-6 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {reviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded">
                    {review.language}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.timestamp).toLocaleString()}
                  </span>
                </div>
                {review.refactoringSuggestions && review.refactoringSuggestions.length > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    ✓ Refactored
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Code:</h4>
              <div className="text-sm mb-4 overflow-x-auto">
                <SyntaxHighlighter
                  language={review.language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    background: '#1e1e1e',
                  }}
                  showLineNumbers
                >
                  {review.code}
                </SyntaxHighlighter>
              </div>
              
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Feedback:</h4>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md text-sm text-gray-800 dark:text-gray-200 mb-4">
                {review.feedback}
              </div>
              
              {review.suggestions.length > 0 && (
                <>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Suggestions:</h4>
                  <ul className="space-y-2">
                    {review.suggestions.map((suggestion, index) => (
                      <li key={suggestion.id || index} className="flex items-start">
                        <span className="text-green-500 dark:text-green-400 mr-2">•</span>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <div className="font-medium">{suggestion.description}</div>
                          {suggestion.explanation && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {suggestion.explanation}
                            </div>
                          )}
                          {suggestion.suggestedFix && (
                            <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                              {suggestion.suggestedFix}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              
              {review.refactoringSuggestions && review.refactoringSuggestions.length > 0 && (
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <button
                    onClick={() => toggleRefactor(review.id)}
                    className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    {expandedRefactors[review.id] ? 'Hide Refactoring Details' : 'Show Refactoring Details'}
                    <span className="ml-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2 py-0.5 rounded-full">
                      {review.refactoringSuggestions?.length || 0}
                    </span>
                  </button>
                  
                  {expandedRefactors[review.id] && (
                    <div className="mt-3 space-y-4">
                      {review.refactoringSuggestions?.map((refactor, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                            {refactor.improvements?.[0] || 'Code Improvement'}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                            {refactor.explanation}
                          </div>
                          {renderDiff(refactor.originalCode, refactor.refactoredCode)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPanel;
