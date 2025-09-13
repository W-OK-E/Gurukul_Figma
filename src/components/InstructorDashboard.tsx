'use client'

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Video, 
  Plus,
  Clock,
  Star,
  TrendingUp,
  FileText,
  MessageSquare,
  Award,
  Settings,
  Upload,
  Play,
  Edit
} from 'lucide-react';

export function InstructorDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);

  const classes = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      subject: 'Mathematics',
      grade: 'Grade 10',
      students: 24,
      nextSession: '2025-01-10 2:00 PM',
      status: 'active',
      rating: 4.9,
      completionRate: 85
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      subject: 'Science',
      grade: 'Grade 9',
      students: 18,
      nextSession: '2025-01-11 3:00 PM',
      status: 'active',
      rating: 4.7,
      completionRate: 92
    },
    {
      id: 3,
      title: 'Algebra Basics',
      subject: 'Mathematics',
      grade: 'Grade 8',
      students: 32,
      nextSession: '2025-01-12 1:00 PM',
      status: 'active',
      rating: 4.8,
      completionRate: 78
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      time: '2:00 PM - 3:00 PM',
      date: 'Today',
      students: 24,
      type: 'Live Class'
    },
    {
      id: 2,
      title: 'Physics Lab Session',
      time: '4:00 PM - 5:00 PM',
      date: 'Today',
      students: 18,
      type: 'Lab Session'
    },
    {
      id: 3,
      title: 'Algebra Review',
      time: '1:00 PM - 2:00 PM',
      date: 'Tomorrow',
      students: 32,
      type: 'Review Session'
    }
  ];

  const students = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@email.com',
      grade: 'Grade 10',
      courses: ['Advanced Mathematics'],
      progress: 85,
      lastActive: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@email.com',
      grade: 'Grade 9',
      courses: ['Physics Fundamentals'],
      progress: 92,
      lastActive: '1 day ago',
      status: 'active'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@email.com',
      grade: 'Grade 8',
      courses: ['Algebra Basics'],
      progress: 67,
      lastActive: '3 days ago',
      status: 'at-risk'
    }
  ];

  const assignments = [
    {
      id: 1,
      title: 'Quadratic Equations Quiz',
      course: 'Advanced Mathematics',
      dueDate: '2025-01-15',
      submissions: 18,
      totalStudents: 24,
      graded: 12,
      status: 'active'
    },
    {
      id: 2,
      title: 'Motion Lab Report',
      course: 'Physics Fundamentals',
      dueDate: '2025-01-18',
      submissions: 14,
      totalStudents: 18,
      graded: 8,
      status: 'active'
    },
    {
      id: 3,
      title: 'Linear Equations Worksheet',
      course: 'Algebra Basics',
      dueDate: '2025-01-12',
      submissions: 32,
      totalStudents: 32,
      graded: 32,
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2">Instructor Dashboard</h1>
            <p className="text-muted-foreground">Manage your classes and track student progress</p>
          </div>
          <Dialog open={isCreateClassOpen} onOpenChange={setIsCreateClassOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create New Class</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogDescription>Add a new class to your teaching schedule</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="classTitle">Class Title</Label>
                  <Input id="classTitle" placeholder="e.g., Advanced Calculus" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="robotics">Robotics</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={`grade-${i + 1}`}>
                          Grade {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of the class..." />
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">Create Class</Button>
                  <Button variant="outline" onClick={() => setIsCreateClassOpen(false)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl">{students.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Classes</p>
                  <p className="text-2xl">{classes.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl">4.8</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl">85%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">My Classes</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>Upcoming Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{session.type}</Badge>
                        <Badge variant={session.date === 'Today' ? 'default' : 'secondary'}>
                          {session.date}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium">{session.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{session.students} students</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 flex items-center space-x-1">
                          <Play className="w-4 h-4" />
                          <span>Start Session</span>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Class Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Class Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {classes.map((class_) => (
                    <div key={class_.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{class_.title}</h4>
                          <p className="text-sm text-muted-foreground">{class_.students} students</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{class_.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{class_.completionRate}% completion</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm">New student Alex Johnson enrolled in Advanced Mathematics</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm">Assignment "Quadratic Equations Quiz" was submitted by 18 students</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm">Physics Fundamentals class completed with 18 attendees</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Classes</CardTitle>
                <CardDescription>Manage your active classes and view performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classes.map((class_) => (
                    <Card key={class_.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{class_.subject}</Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{class_.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{class_.title}</CardTitle>
                        <CardDescription>{class_.grade}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{class_.students} students</span>
                          </div>
                          <span>{class_.completionRate}% completion</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Next session: {class_.nextSession}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">Manage</Button>
                          <Button size="sm" variant="outline">Settings</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Student Management</span>
                </CardTitle>
                <CardDescription>Monitor student progress and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={student.status === 'active' ? 'default' : 'destructive'}>
                            {student.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{student.grade}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Progress: </span>
                          <span>{student.progress}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Active: </span>
                          <span>{student.lastActive}</span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Courses: </span>
                        {student.courses.join(', ')}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">View Progress</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Assignment Management</span>
                    </CardTitle>
                    <CardDescription>Create and grade student assignments</CardDescription>
                  </div>
                  <Button className="flex items-center space-x-1">
                    <Plus className="w-4 h-4" />
                    <span>New Assignment</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        </div>
                        <Badge variant={assignment.status === 'completed' ? 'default' : 'secondary'}>
                          {assignment.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Due: </span>
                          <span>{assignment.dueDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Submissions: </span>
                          <span>{assignment.submissions}/{assignment.totalStudents}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Graded: </span>
                          <span>{assignment.graded}/{assignment.submissions}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">Grade Submissions</Button>
                        <Button size="sm" variant="outline">Edit Assignment</Button>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Class Schedule</span>
                </CardTitle>
                <CardDescription>Manage your teaching schedule and sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{session.type}</Badge>
                          <Badge variant={session.date === 'Today' ? 'default' : 'secondary'}>
                            {session.date}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">{session.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{session.students} students</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button className="flex-1 flex items-center space-x-1">
                            <Play className="w-4 h-4" />
                            <span>Start Session</span>
                          </Button>
                          <Button variant="outline">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center py-8">
                    <Button variant="outline" size="lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Full Calendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}