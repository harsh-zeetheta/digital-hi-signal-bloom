
export interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  frequency: number;
  acceptanceRate: number;
  company: string;
  timeframe: string;
  description?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
}

export const mockCompanies: Company[] = [
  { id: 'google', name: 'Google' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'facebook', name: 'Meta' },
  { id: 'apple', name: 'Apple' },
  { id: 'netflix', name: 'Netflix' },
  { id: 'uber', name: 'Uber' },
  { id: 'airbnb', name: 'Airbnb' },
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    frequency: 95,
    acceptanceRate: 49.1,
    company: 'google',
    timeframe: '2024',
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    topics: ['Linked List', 'Math', 'Recursion'],
    frequency: 78,
    acceptanceRate: 38.2,
    company: 'google',
    timeframe: '2024',
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topics: ['Hash Table', 'String', 'Sliding Window'],
    frequency: 85,
    acceptanceRate: 33.8,
    company: 'microsoft',
    timeframe: '2024',
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    topics: ['Array', 'Binary Search', 'Divide and Conquer'],
    frequency: 65,
    acceptanceRate: 35.3,
    company: 'amazon',
    timeframe: '2024',
  },
  {
    id: '5',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    topics: ['String', 'Dynamic Programming'],
    frequency: 72,
    acceptanceRate: 32.8,
    company: 'facebook',
    timeframe: '2024',
  },
  {
    id: '6',
    title: 'Reverse Integer',
    difficulty: 'Medium',
    topics: ['Math'],
    frequency: 68,
    acceptanceRate: 26.8,
    company: 'apple',
    timeframe: '2024',
  },
  {
    id: '7',
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    topics: ['String'],
    frequency: 55,
    acceptanceRate: 16.6,
    company: 'netflix',
    timeframe: '2024',
  },
  {
    id: '8',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    topics: ['Array', 'Two Pointers', 'Greedy'],
    frequency: 88,
    acceptanceRate: 54.1,
    company: 'uber',
    timeframe: '2024',
  },
  {
    id: '9',
    title: '3Sum',
    difficulty: 'Medium',
    topics: ['Array', 'Two Pointers', 'Sorting'],
    frequency: 82,
    acceptanceRate: 32.1,
    company: 'airbnb',
    timeframe: '2024',
  },
  {
    id: '10',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topics: ['String', 'Stack'],
    frequency: 91,
    acceptanceRate: 40.7,
    company: 'google',
    timeframe: '2023',
  },
];

export const timeframes = ['2024', '2023', '2022', '2021'];
export const difficulties = ['Easy', 'Medium', 'Hard'];
export const allTopics = Array.from(new Set(mockQuestions.flatMap(q => q.topics))).sort();
