import React from 'react';
import { CodeSuggestion, RefactoringSuggestion } from '../types';
import { CheckCircleIcon, ArrowPathIcon, ClockIcon, CodeBracketIcon, LightBulbIcon, ShieldCheckIcon, BugAntIcon } from '@heroicons/react/24/outline';

interface RefactoringSuggestionsProps {
  suggestions: RefactoringSuggestion[];
  onApplySuggestion: (suggestion: RefactoringSuggestion) => void;
}

const getSuggestionIcon = (type: string) => {
  switch (type) {
    case 'refactor':
      return <ArrowPathIcon className="h-5 w-5 text-blue-500" />;
    case 'optimization':
      return <LightBulbIcon className="h-5 w-5 text-green-500" />;
    case 'bug':
      return <BugAntIcon className="h-5 w-5 text-red-500" />;
    case 'security':
      return <ShieldCheckIcon className="h-5 w-5 text-purple-500" />;
    default:
      return <CodeBracketIcon className="h-5 w-5 text-gray-500" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const RefactoringSuggestions: React.FC<RefactoringSuggestionsProps> = ({
  suggestions,
  onApplySuggestion,
}) => {
  if (suggestions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No refactoring suggestions available for this code.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {suggestion.title}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(suggestion.difficulty)}`}>
                {suggestion.difficulty}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {suggestion.description}
            </p>
            
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>~{suggestion.estimatedTime} min</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {suggestion.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Original Code</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md overflow-x-auto text-sm">
                  <code className="text-red-600 dark:text-red-400">{suggestion.originalCode}</code>
                </pre>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Refactored Code</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md overflow-x-auto text-sm">
                  <code className="text-green-600 dark:text-green-400">{suggestion.refactoredCode}</code>
                </pre>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Improvements</h4>
              <ul className="space-y-1">
                {suggestion.improvements.map((improvement, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Explanation</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion.explanation}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 text-right sm:px-6">
            <button
              type="button"
              onClick={() => onApplySuggestion(suggestion)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowPathIcon className="-ml-1 mr-2 h-4 w-4" />
              Apply Refactoring
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RefactoringSuggestions;
