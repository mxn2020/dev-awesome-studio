import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession, signOut } from '../../lib/auth-client';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  LogOut, 
  User, 
  Plus, 
  CheckCircle, 
  Circle, 
  Calendar, 
  Flag, 
  Home, 
  Trash2, 
  Edit3,
  Target,
  Trophy,
  Flame,
  Filter,
  Search
} from 'lucide-react';
import { Container } from '../../lib/dev-container';

// Mock data - in a real app, this would come from your database
const mockTodos = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and submit the Q4 project proposal for the new client',
    completed: false,
    priority: 'high',
    category: 'Work',
    dueDate: '2024-01-15',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, and vegetables for the week',
    completed: true,
    priority: 'medium',
    category: 'Personal',
    dueDate: '2024-01-12',
    createdAt: '2024-01-11'
  },
  {
    id: '3',
    title: 'Exercise routine',
    description: '30 minutes cardio and strength training',
    completed: false,
    priority: 'medium',
    category: 'Health',
    dueDate: '2024-01-13',
    createdAt: '2024-01-12'
  },
  {
    id: '4',
    title: 'Read chapter 5',
    description: 'Continue reading "Atomic Habits" book',
    completed: true,
    priority: 'low',
    category: 'Learning',
    dueDate: '2024-01-14',
    createdAt: '2024-01-13'
  }
];

const mockCategories = [
  { id: '1', name: 'Work', color: '#3b82f6' },
  { id: '2', name: 'Personal', color: '#10b981' },
  { id: '3', name: 'Health', color: '#f59e0b' },
  { id: '4', name: 'Learning', color: '#8b5cf6' }
];

export const Dashboard: React.FC = () => {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('todos');
  const [todos, setTodos] = useState(mockTodos);
  const [categories] = useState(mockCategories);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Personal',
    dueDate: ''
  });

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const addTodo = () => {
    if (!newTodo.title.trim()) return;
    
    const todo = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      priority: newTodo.priority,
      category: newTodo.category,
      dueDate: newTodo.dueDate,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTodos([...todos, todo]);
    setNewTodo({ title: '', description: '', priority: 'medium', category: 'Personal', dueDate: '' });
    setShowAddTodo(false);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && todo.completed) ||
      (filter === 'pending' && !todo.completed) ||
      (filter === todo.priority);
    
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    streak: 7 // Mock streak data
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 border-red-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      case 'low': return 'text-green-500 border-green-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || '#6b7280';
  };

  if (isPending) {
    return (
      <Container componentId="dashboard-loading">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your todos...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container componentId="dashboard-unauthorized">
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                <p className="text-muted-foreground mb-4">
                  Please log in to access your todos.
                </p>
                <Button onClick={() => navigate('/login')} className="w-full">
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  const user = session.user;

  return (
    <Container componentId="dashboard-page">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Container componentId="dashboard-header">
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <h1 className="text-xl font-bold text-gray-900">TodoMaster</h1>
                  </div>
                  <nav className="flex space-x-4">
                    <Button
                      variant={activeTab === 'todos' ? 'default' : 'ghost'}
                      onClick={() => setActiveTab('todos')}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      My Todos
                    </Button>
                    <Button
                      variant={activeTab === 'stats' ? 'default' : 'ghost'}
                      onClick={() => setActiveTab('stats')}
                      className="flex items-center gap-2"
                    >
                      <Trophy className="h-4 w-4" />
                      Stats
                    </Button>
                  </nav>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container componentId="dashboard-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'todos' && (
              <div className="space-y-6">
                {/* Welcome Section */}
                <Container componentId="welcome-section">
                  <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">
                            Welcome back, {user.name?.split(' ')[0] || 'User'}! 🎉
                          </h2>
                          <p className="text-green-100">
                            You have {stats.pending} pending tasks. Let's get them done!
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{stats.streak}</div>
                            <div className="text-sm text-green-100">Day Streak</div>
                          </div>
                          <Flame className="h-8 w-8 text-orange-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Container>

                {/* Quick Stats */}
                <Container componentId="quick-stats">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <div className="text-sm text-muted-foreground">Total Tasks</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{stats.completed}</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Circle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{stats.pending}</div>
                        <div className="text-sm text-muted-foreground">Pending</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Trophy className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{Math.round((stats.completed / stats.total) * 100) || 0}%</div>
                        <div className="text-sm text-muted-foreground">Completion</div>
                      </CardContent>
                    </Card>
                  </div>
                </Container>

                {/* Todo Management */}
                <Container componentId="todo-management">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          My Tasks
                        </CardTitle>
                        <Button
                          onClick={() => setShowAddTodo(true)}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Task
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Filters and Search */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search tasks..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <Select value={filter} onValueChange={setFilter}>
                          <SelectTrigger className="w-full sm:w-48">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Filter tasks" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Tasks</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="high">High Priority</SelectItem>
                            <SelectItem value="medium">Medium Priority</SelectItem>
                            <SelectItem value="low">Low Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Add Todo Form */}
                      {showAddTodo && (
                        <Card className="border-2 border-dashed border-green-300">
                          <CardContent className="p-4 space-y-4">
                            <Input
                              placeholder="Task title..."
                              value={newTodo.title}
                              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                            />
                            <Textarea
                              placeholder="Task description (optional)..."
                              value={newTodo.description}
                              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <Select value={newTodo.priority} onValueChange={(value) => setNewTodo({ ...newTodo, priority: value })}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">High Priority</SelectItem>
                                  <SelectItem value="medium">Medium Priority</SelectItem>
                                  <SelectItem value="low">Low Priority</SelectItem>
                                </SelectContent>
                              </Select>
                              <Select value={newTodo.category} onValueChange={(value) => setNewTodo({ ...newTodo, category: value })}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map(category => (
                                    <SelectItem key={category.id} value={category.name}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Input
                                type="date"
                                value={newTodo.dueDate}
                                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={addTodo} className="flex-1">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Task
                              </Button>
                              <Button variant="outline" onClick={() => setShowAddTodo(false)}>
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Todo List */}
                      <div className="space-y-3">
                        {filteredTodos.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No tasks found. {filter === 'all' ? 'Add your first task!' : 'Try adjusting your filters.'}</p>
                          </div>
                        ) : (
                          filteredTodos.map((todo) => (
                            <Card key={todo.id} className={`transition-all ${todo.completed ? 'opacity-75 bg-gray-50' : 'hover:shadow-md'}`}>
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleTodo(todo.id)}
                                    className="mt-1 p-0 h-6 w-6"
                                  >
                                    {todo.completed ? (
                                      <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                      <Circle className="h-5 w-5 text-gray-400" />
                                    )}
                                  </Button>
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <h3 className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                                          {todo.title}
                                        </h3>
                                        {todo.description && (
                                          <p className={`text-sm mt-1 ${todo.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                                            {todo.description}
                                          </p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                          <Badge 
                                            variant="outline" 
                                            className={getPriorityColor(todo.priority)}
                                          >
                                            <Flag className="h-3 w-3 mr-1" />
                                            {todo.priority}
                                          </Badge>
                                          <Badge 
                                            style={{ backgroundColor: getCategoryColor(todo.category) + '20', color: getCategoryColor(todo.category) }}
                                          >
                                            {todo.category}
                                          </Badge>
                                          {todo.dueDate && (
                                            <Badge variant="outline" className="text-blue-600 border-blue-600">
                                              <Calendar className="h-3 w-3 mr-1" />
                                              {new Date(todo.dueDate).toLocaleDateString()}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setEditingTodo(todo.id)}
                                          className="h-8 w-8 p-0"
                                        >
                                          <Edit3 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => deleteTodo(todo.id)}
                                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Container>
              </div>
            )}

            {activeTab === 'stats' && (
              <Container componentId="stats-section">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        Your Productivity Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
                          <CardContent className="p-6 text-center">
                            <Flame className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                            <div className="text-3xl font-bold text-orange-600">{stats.streak}</div>
                            <div className="text-muted-foreground">Day Streak</div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Keep it up! You're on fire! 🔥
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-6 text-center">
                            <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                            <div className="text-3xl font-bold text-blue-600">{stats.completed}</div>
                            <div className="text-muted-foreground">Tasks Completed</div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Great job staying productive!
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-6 text-center">
                            <Trophy className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                            <div className="text-3xl font-bold text-purple-600">
                              {Math.round((stats.completed / stats.total) * 100) || 0}%
                            </div>
                            <div className="text-muted-foreground">Completion Rate</div>
                            <p className="text-sm text-muted-foreground mt-2">
                              {stats.completed / stats.total > 0.8 ? 'Excellent!' : 'Keep going!'}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Category Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {categories.map(category => {
                          const categoryTodos = todos.filter(t => t.category === category.name);
                          const completed = categoryTodos.filter(t => t.completed).length;
                          const total = categoryTodos.length;
                          const percentage = total > 0 ? (completed / total) * 100 : 0;
                          
                          return (
                            <div key={category.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: category.color }}
                                />
                                <span className="font-medium">{category.name}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-sm text-muted-foreground">
                                  {completed}/{total} completed
                                </div>
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="h-2 rounded-full transition-all"
                                    style={{ 
                                      width: `${percentage}%`,
                                      backgroundColor: category.color 
                                    }}
                                  />
                                </div>
                                <div className="text-sm font-medium w-12 text-right">
                                  {Math.round(percentage)}%
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Container>
            )}
          </div>
        </Container>
      </div>
    </Container>
  );
};