import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Language, RefactoringSuggestion } from '../types';
import { ArrowPathIcon, LightBulbIcon, XMarkIcon } from '@heroicons/react/24/outline';
import RefactoringSuggestions from './RefactoringSuggestions';

interface CodeEditorProps {
  code: string;
  language: Language;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: Language) => void;
  onReview: () => void;
  onApplyRefactoring: (suggestion: RefactoringSuggestion) => void;
  refactoringSuggestions: RefactoringSuggestion[];
  isLoading: boolean;
  isRefactoring: boolean;
}

const languageOptions: { value: Language; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
];

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onReview,
  onApplyRefactoring,
  refactoringSuggestions,
  isLoading,
  isRefactoring,
}) => {
  const [showRefactoringPanel, setShowRefactoringPanel] = useState(false);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleApplyRefactoring = (suggestion: RefactoringSuggestion) => {
    onApplyRefactoring(suggestion);
    setShowRefactoringPanel(false);
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onCodeChange(value);
    }
  };

  const handleLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(e.target.value as Language);
  };

  if (!isMounted) {
    return <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>;
  }

  const hasRefactoringSuggestions = refactoringSuggestions.length > 0;

  return (
    <div className="h-full flex flex-col">
      {/* Refactoring Panel Toggle */}
      {hasRefactoringSuggestions && (
        <div className="mb-2 flex justify-end">
          <button
            onClick={() => setShowRefactoringPanel(!showRefactoringPanel)}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
              showRefactoringPanel 
                ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            } transition-colors`}
          >
            {showRefactoringPanel ? (
              <XMarkIcon className="h-4 w-4 mr-1" />
            ) : (
              <LightBulbIcon className="h-4 w-4 mr-1" />
            )}
            {showRefactoringPanel ? 'Hide' : 'Show'} Refactoring Suggestions
            {!showRefactoringPanel && hasRefactoringSuggestions && (
              <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {refactoringSuggestions.length}
              </span>
            )}
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Code Editor</h2>
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={handleLanguageSelect}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <button
              onClick={onReview}
              disabled={isLoading || isRefactoring || !code.trim()}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                isLoading || isRefactoring || !code.trim()
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } transition-colors flex items-center`}
            >
              {(isLoading || isRefactoring) && (
                <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Reviewing...' : isRefactoring ? 'Refactoring...' : 'Review Code'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
            padding: { top: 10 },
          }}
        />
      </div>
      
      {/* Refactoring Suggestions Panel */}
      {showRefactoringPanel && hasRefactoringSuggestions && (
        <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              <LightBulbIcon className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />
              Refactoring Suggestions
              <span className="ml-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-semibold px-2 py-0.5 rounded-full">
                {refactoringSuggestions.length} suggestions
              </span>
            </h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <RefactoringSuggestions 
              suggestions={refactoringSuggestions} 
              onApplySuggestion={handleApplyRefactoring}
            />
          </div>
        </div>
      )}

      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        <p>Paste or type your code above and click "Review Code" to get AI-powered feedback.</p>
        {hasRefactoringSuggestions && !showRefactoringPanel && (
          <p className="mt-1">
            <button 
              onClick={() => setShowRefactoringPanel(true)}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View {refactoringSuggestions.length} refactoring suggestion{refactoringSuggestions.length !== 1 ? 's' : ''} available
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
