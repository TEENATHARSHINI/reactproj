export type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'csharp' | 'go' | 'rust' | 'php' | 'ruby' | 'swift' | 'kotlin' | 'scala' | 'html' | 'css' | 'json';

export interface CodeSuggestion {
  id: string;
  description: string;
  type: 'refactor' | 'optimization' | 'bug' | 'style' | 'security';
  severity: 'low' | 'medium' | 'high';
  lineNumber?: number;
  codeSnippet?: string;
  suggestedFix?: string;
  explanation?: string;
}

export interface CodeReview {
  id: string;
  code: string;
  language: Language;
  feedback: string;
  suggestions: CodeSuggestion[];
  timestamp: string;
  refactoringSuggestions?: {
    originalCode: string;
    refactoredCode: string;
    explanation: string;
    improvements: string[];
  }[];
}

export interface RefactoringSuggestion {
  id: string;
  title: string;
  description: string;
  originalCode: string;
  refactoredCode: string;
  language: Language;
  explanation: string;
  improvements: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  tags: string[];
}
