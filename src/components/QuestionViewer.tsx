import React, { useState, useMemo } from 'react';
import { Search, Filter, Building2, Calendar, TrendingUp, Percent, Moon, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { mockCompanies, mockQuestions, timeframes, difficulties, allTopics, Question } from '@/data/mockData';

const QuestionViewer = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('2024');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'frequency' | 'acceptanceRate'>('frequency');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [solvedQuestions, setSolvedQuestions] = useState<Set<string>>(new Set());

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Toggle solved status for a question
  const toggleSolved = (questionId: string) => {
    const newSolved = new Set(solvedQuestions);
    if (newSolved.has(questionId)) {
      newSolved.delete(questionId);
    } else {
      newSolved.add(questionId);
    }
    setSolvedQuestions(newSolved);
  };

  const filteredQuestions = useMemo(() => {
    let filtered = mockQuestions.filter(question => {
      const matchesCompany = !selectedCompany || selectedCompany === 'all' || question.company === selectedCompany;
      const matchesTimeframe = question.timeframe === selectedTimeframe;
      const matchesSearch = !searchQuery || 
        question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDifficulty = !selectedDifficulty || selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
      const matchesTopics = selectedTopics.length === 0 || 
        selectedTopics.every(topic => question.topics.includes(topic));

      return matchesCompany && matchesTimeframe && matchesSearch && matchesDifficulty && matchesTopics;
    });

    // Sort questions
    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const multiplier = sortOrder === 'desc' ? -1 : 1;
      return (aValue - bValue) * multiplier;
    });

    return filtered;
  }, [selectedCompany, selectedTimeframe, searchQuery, selectedDifficulty, selectedTopics, sortBy, sortOrder]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Hard':
        return 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex-1" />
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">Company Question Viewer</h1>
              <p className="text-muted-foreground">
                View and filter coding interview questions by company and timeframe
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleDarkMode}
                className="ml-auto"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company
                </label>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {mockCompanies.map(company => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Timeframe
                </label>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframes.map(year => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Sort By
                </label>
                <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                  const [field, order] = value.split('-');
                  setSortBy(field as 'frequency' | 'acceptanceRate');
                  setSortOrder(order as 'asc' | 'desc');
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frequency-desc">Frequency (High to Low)</SelectItem>
                    <SelectItem value="frequency-asc">Frequency (Low to High)</SelectItem>
                    <SelectItem value="acceptanceRate-desc">Acceptance Rate (High to Low)</SelectItem>
                    <SelectItem value="acceptanceRate-asc">Acceptance Rate (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </label>
              <Input
                placeholder="Search by title or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Topics</label>
              <div className="flex flex-wrap gap-2">
                {allTopics.map(topic => (
                  <Badge
                    key={topic}
                    variant={selectedTopics.includes(topic) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTopic(topic)}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Questions ({filteredQuestions.length})</span>
              {selectedCompany && selectedCompany !== 'all' && (
                <Badge variant="secondary">
                  {mockCompanies.find(c => c.id === selectedCompany)?.name}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Solved</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Topics</TableHead>
                    <TableHead className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Frequency
                    </TableHead>
                    <TableHead className="flex items-center gap-1">
                      <Percent className="h-4 w-4" />
                      Acceptance
                    </TableHead>
                    <TableHead>Company</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuestions.map(question => (
                    <TableRow key={question.id} className={`hover:bg-muted/50 ${solvedQuestions.has(question.id) ? 'opacity-60' : ''}`}>
                      <TableCell>
                        <Checkbox
                          checked={solvedQuestions.has(question.id)}
                          onCheckedChange={() => toggleSolved(question.id)}
                        />
                      </TableCell>
                      <TableCell className={`font-medium ${solvedQuestions.has(question.id) ? 'line-through text-muted-foreground' : ''}`}>
                        {question.title}
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {question.topics.map(topic => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <div className="w-12 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${question.frequency}%` }}
                            />
                          </div>
                          <span className="text-sm">{question.frequency}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{question.acceptanceRate}%</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {mockCompanies.find(c => c.id === question.company)?.name}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No questions found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionViewer;
