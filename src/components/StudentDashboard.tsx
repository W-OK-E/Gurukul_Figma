'use client'

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  BookOpen,
  Calendar,
  Video,
  Clock,
  Award,
  TrendingUp,
  Play,
  FileText,
  MessageSquare,
  Bell,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { getStudentSessions } from '@/app/actions/tutoring';

export function StudentDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await getStudentSessions();
        setSessions(data || []);
      } catch (error) {
        console.error("Failed to load sessions", error);
      } finally {
        setLoading(false);
      }
    };
    loadSessions();
  }, []);

  // Hardcoded for now
  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      grade: 'A-',
      nextAssignment: 'Quadratic Equations Quiz',
      dueDate: '2025-01-12'
    },
    // ... keep dummy courses
  ];

  const assignments = [
    // ... keep dummy assignments
  ];

  const recentActivity = [
    // ... keep dummy activity
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Here's what's happening with your learning journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-2xl">{courses.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Classes</p>
                  <p className="text-2xl">{sessions.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Grade</p>
                  <p className="text-2xl">A-</p>
                </div>
                <Award className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Progress</p>
                  <p className="text-2xl">68%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Classes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>Upcoming Classes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessions.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No upcoming classes.</p>
                  ) : (
                    sessions.slice(0, 3).map((session) => (
                      <div key={session.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{session.subject}</Badge>
                          <Badge variant="secondary">
                            {new Date(session.start_time).toLocaleDateString()}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium">{session.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {session.tutor ? `Instructor: ${session.tutor.firstname} ${session.tutor.lastname}` : 'TBA'}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <Button
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <Play className="w-4 h-4" />
                            <span>Join Class</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Dummy activity */}
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">Completed lesson "Linear Equations"</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Your progress across all enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{course.grade}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {course.completedLessons}/{course.totalLessons} lessons
                          </p>
                        </div>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{course.progress}% complete</span>
                        <span>Next: {course.nextAssignment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            {/* Keep dummy courses */}
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Manage your enrolled courses and track progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{course.grade}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {course.progress}% complete
                          </span>
                        </div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.instructor}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Progress value={course.progress} className="h-2" />
                        <div className="text-sm text-muted-foreground">
                          {course.completedLessons} of {course.totalLessons} lessons completed
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Next Assignment:</h5>
                          <p className="text-sm">{course.nextAssignment}</p>
                          <p className="text-xs text-muted-foreground">Due: {course.dueDate}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">Continue Learning</Button>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            {/* Keep dummy assignments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Assignments</span>
                </CardTitle>
                <CardDescription>Track your assignments and submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Assignments placeholder</p>
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
                <CardDescription>View and manage your upcoming classes</CardDescription>
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
                          <p className="text-muted-foreground">
                            {session.tutor ? `Instructor: ${session.tutor.firstname} ${session.tutor.lastname}` : 'TBA'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            className="flex-1 flex items-center space-x-1"
                          >
                            <Play className="w-4 h-4" />
                            <span>Join Class</span>
                          </Button>
                          <Button variant="outline">Reschedule</Button>
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