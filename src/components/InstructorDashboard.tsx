'use client'

import React, { useState, useEffect } from 'react';
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
import { createTutoringSession, getInstructorSessions, TutoringSessionData } from '@/app/actions/tutoring';

export function InstructorDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [newSession, setNewSession] = useState<Partial<TutoringSessionData>>({
    subject: '',
    grade: '',
    description: '',
    title: '',
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await getInstructorSessions();
      setSessions(data || []);
    } catch (error) {
      console.error("Failed to load sessions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async () => {
    if (!newSession.subject || !newSession.startTime || !newSession.endTime || !newSession.grade) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const result = await createTutoringSession(newSession as TutoringSessionData);
      if (result.error) {
        alert(result.error);
      } else {
        setIsCreateClassOpen(false);
        loadSessions(); // Refresh list
        // Reset form
        setNewSession({
          subject: '',
          grade: '',
          description: '',
          title: '',
          startTime: '',
          endTime: ''
        });
      }
    } catch (error) {
      console.error("Error creating session", error);
      alert("Failed to create session");
    }
  };

  // Hardcoded for now as we focus on sessions
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
    // ... keep other dummy classes for UI completeness if needed, or remove
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
    // ... keep dummy students
  ];

  const assignments = [
    // ... keep dummy assignments
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
                <span>Schedule Session</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Session</DialogTitle>
                <DialogDescription>Add a new session to your teaching schedule</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="classTitle">Session Title</Label>
                  <Input
                    id="classTitle"
                    placeholder="e.g., Algebra Review"
                    value={newSession.title}
                    onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select onValueChange={(val) => setNewSession({ ...newSession, subject: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Robotics">Robotics</SelectItem>
                      <SelectItem value="Music">Music</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select onValueChange={(val) => setNewSession({ ...newSession, grade: val })}>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="datetime-local"
                      value={newSession.startTime}
                      onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="datetime-local"
                      value={newSession.endTime}
                      onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the session..."
                    value={newSession.description}
                    onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1" onClick={handleCreateSession}>Create Session</Button>
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
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                  <p className="text-2xl">{sessions.length}</p>
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
                  {sessions.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No upcoming sessions scheduled.</p>
                  ) : (
                    sessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{session.subject}</Badge>
                          <Badge variant="secondary">
                            {new Date(session.start_time).toLocaleDateString()}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium">{session.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            {session.student && (
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{session.student.firstname} {session.student.lastname}</span>
                              </div>
                            )}
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
                    ))
                  )}
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
                  {/* Dummy activity for now */}
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm">New student Alex Johnson enrolled in Advanced Mathematics</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            {/* Keep existing dummy content for Classes tab for now */}
            <Card>
              <CardHeader>
                <CardTitle>My Classes</CardTitle>
                <CardDescription>Manage your active classes and view performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classes.map((class_) => (
                    <Card key={class_.id} className="hover:shadow-lg transition-shadow">
                      {/* ... existing card content ... */}
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
            {/* Keep existing dummy content */}
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
                      {/* ... existing student card ... */}
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
                      {/* ... rest of student card ... */}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            {/* Keep existing dummy content */}
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Assignments content placeholder</p>
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
                    {sessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{session.subject}</Badge>
                          <Badge variant="secondary">
                            {new Date(session.start_time).toLocaleDateString()}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">{session.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            {session.student && (
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{session.student.firstname} {session.student.lastname}</span>
                              </div>
                            )}
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