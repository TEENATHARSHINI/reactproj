export type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'csharp' | 'go' | 'rust' | 'php' | 'ruby' | 'swift' | 'kotlin' | 'scala' | 'html' | 'css' | 'json';

export interface CodeReview {
  id: string;
  code: string;
  language: Language;
  feedback: string;
  suggestions: string[];
  timestamp: string;
}
