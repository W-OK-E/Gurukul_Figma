'use client'

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  CreditCard,
  Bell,
  MessageSquare,
  Award,
  BookOpen,
  Clock,
  Star,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Eye
} from 'lucide-react';

export function ParentDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const children = [
    {
      id: 1,
      name: 'Alex Johnson',
      grade: 'Grade 10',
      age: 15,
      avatar: 'AJ',
      courses: [
        { name: 'Advanced Mathematics', progress: 85, grade: 'A-', instructor: 'Dr. Sarah Johnson' },
        { name: 'Physics Fundamentals', progress: 78, grade: 'B+', instructor: 'Prof. Michael Chen' }
      ],
      upcomingClasses: [
        { title: 'Advanced Mathematics', time: '2:00 PM - 3:00 PM', date: 'Today' },
        { title: 'Physics Lab', time: '4:00 PM - 5:00 PM', date: 'Tomorrow' }
      ],
      recentActivity: [
        'Completed lesson "Quadratic Equations"',
        'Submitted Physics assignment',
        'Received grade A- for Math quiz'
      ],
      overallGrade: 'A-',
      attendanceRate: 95,
      assignmentsCompleted: 24,
      totalAssignments: 28
    },
    {
      id: 2,
      name: 'Emma Johnson',
      grade: 'Grade 7',
      age: 12,
      avatar: 'EJ',
      courses: [
        { name: 'Mathematics Basics', progress: 92, grade: 'A', instructor: 'Ms. Lisa Thompson' },
        { name: 'Science Fundamentals', progress: 88, grade: 'A-', instructor: 'Dr. Robert Kim' }
      ],
      upcomingClasses: [
        { title: 'Mathematics Basics', time: '10:00 AM - 11:00 AM', date: 'Today' },
        { title: 'Science Lab', time: '2:00 PM - 3:00 PM', date: 'Today' }
      ],
      recentActivity: [
        'Completed science experiment',
        'Perfect score on math quiz',
        'Attended all classes this week'
      ],
      overallGrade: 'A',
      attendanceRate: 98,
      assignmentsCompleted: 18,
      totalAssignments: 20
    }
  ];

  const payments = [
    {
      id: 1,
      date: '2025-01-01',
      amount: 299,
      description: 'Advanced Mathematics - Monthly',
      status: 'paid',
      child: 'Alex Johnson'
    },
    {
      id: 2,
      date: '2025-01-01',
      amount: 249,
      description: 'Physics Fundamentals - Monthly',
      status: 'paid',
      child: 'Alex Johnson'
    },
    {
      id: 3,
      date: '2025-01-01',
      amount: 199,
      description: 'Mathematics Basics - Monthly',
      status: 'paid',
      child: 'Emma Johnson'
    },
    {
      id: 4,
      date: '2025-02-01',
      amount: 299,
      description: 'Advanced Mathematics - Monthly',
      status: 'pending',
      child: 'Alex Johnson'
    }
  ];

  const communications = [
    {
      id: 1,
      from: 'Dr. Sarah Johnson',
      subject: 'Alex\'s Progress Update',
      message: 'Alex is doing exceptionally well in Advanced Mathematics. His understanding of quadratic equations has improved significantly.',
      date: '2025-01-08',
      child: 'Alex Johnson',
      type: 'progress'
    },
    {
      id: 2,
      from: 'Prof. Michael Chen',
      subject: 'Physics Lab Performance',
      message: 'Alex showed great enthusiasm during today\'s physics lab. His experimental approach was methodical and accurate.',
      date: '2025-01-07',
      child: 'Alex Johnson',
      type: 'feedback'
    },
    {
      id: 3,
      from: 'Ms. Lisa Thompson',
      subject: 'Emma\'s Outstanding Performance',
      message: 'Emma continues to excel in mathematics. She completed all assignments ahead of schedule and helped other students.',
      date: '2025-01-06',
      child: 'Emma Johnson',
      type: 'praise'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Parent Dashboard</h1>
          <p className="text-muted-foreground">Monitor your children's learning progress and manage their education</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Children Enrolled</p>
                  <p className="text-2xl">{children.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-2xl">{children.reduce((sum, child) => sum + child.courses.length, 0)}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Performance</p>
                  <p className="text-2xl">A-</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Cost</p>
                  <p className="text-2xl">$747</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="communication">Messages</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Children Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Children Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {children.map((child) => (
                    <div key={child.id} className="space-y-4 border-b border-border pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{child.avatar}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{child.name}</h4>
                            <p className="text-sm text-muted-foreground">{child.grade} • {child.age} years old</p>
                          </div>
                        </div>
                        <Badge variant="outline">{child.overallGrade}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Attendance: </span>
                          <span>{child.attendanceRate}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Assignments: </span>
                          <span>{child.assignmentsCompleted}/{child.totalAssignments}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {child.courses.map((course, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{course.name}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={course.progress} className="w-20 h-2" />
                              <Badge variant="outline" className="text-xs">{course.grade}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Messages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Recent Messages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {communications.slice(0, 3).map((comm) => (
                    <div key={comm.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-sm">{comm.from}</h5>
                        <Badge 
                          variant={
                            comm.type === 'praise' ? 'default' :
                            comm.type === 'progress' ? 'secondary' : 'outline'
                          }
                          className="text-xs"
                        >
                          {comm.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{comm.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{comm.message}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{comm.child}</span>
                        <span>{comm.date}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">View All Messages</Button>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Classes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Classes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {children.flatMap(child => 
                    child.upcomingClasses.map((class_, index) => (
                      <div key={`${child.id}-${index}`} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{child.name}</Badge>
                          <Badge variant={class_.date === 'Today' ? 'default' : 'secondary'}>
                            {class_.date}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium">{class_.title}</h4>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{class_.time}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="children" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {children.map((child) => (
                <Card key={child.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium">{child.avatar}</span>
                        </div>
                        <div>
                          <CardTitle className="text-xl">{child.name}</CardTitle>
                          <CardDescription>{child.grade} • {child.age} years old</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-lg px-3 py-1">{child.overallGrade}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-accent/20 rounded-lg">
                        <div className="text-2xl">{child.attendanceRate}%</div>
                        <div className="text-sm text-muted-foreground">Attendance</div>
                      </div>
                      <div className="text-center p-3 bg-accent/20 rounded-lg">
                        <div className="text-2xl">{child.assignmentsCompleted}/{child.totalAssignments}</div>
                        <div className="text-sm text-muted-foreground">Assignments</div>
                      </div>
                    </div>

                    {/* Course Progress */}
                    <div className="space-y-4">
                      <h5 className="font-medium">Course Progress</h5>
                      {child.courses.map((course, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">{course.name}</span>
                              <p className="text-sm text-muted-foreground">{course.instructor}</p>
                            </div>
                            <Badge variant="outline">{course.grade}</Badge>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{course.progress}% complete</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <h5 className="font-medium">Recent Activity</h5>
                      {child.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full">View Detailed Report</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment History</span>
                </CardTitle>
                <CardDescription>View and manage your payment history and upcoming bills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{payment.description}</h4>
                          <p className="text-sm text-muted-foreground">{payment.child}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-medium">${payment.amount}</div>
                          <Badge 
                            variant={
                              payment.status === 'paid' ? 'default' :
                              payment.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Date: {payment.date}</p>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Total Monthly Cost</h4>
                      <p className="text-sm text-muted-foreground">Next billing date: February 1, 2025</p>
                    </div>
                    <div className="text-2xl font-bold">$747</div>
                  </div>
                  <Button className="w-full mt-4">Manage Payment Methods</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Communications</span>
                </CardTitle>
                <CardDescription>Messages and updates from your children's instructors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communications.map((comm) => (
                    <div key={comm.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{comm.from}</h4>
                          <p className="text-sm text-muted-foreground">{comm.child}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={
                              comm.type === 'praise' ? 'default' :
                              comm.type === 'progress' ? 'secondary' : 'outline'
                            }
                          >
                            {comm.type}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{comm.date}</p>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium">{comm.subject}</h5>
                        <p className="text-sm text-muted-foreground mt-1">{comm.message}</p>
                      </div>
                      <Button size="sm" variant="outline">Reply</Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send New Message
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Family Schedule</span>
                </CardTitle>
                <CardDescription>View all your children's upcoming classes and sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {children.map((child) => (
                    <div key={child.id} className="space-y-4">
                      <div className="flex items-center space-x-3 pb-2 border-b border-border">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{child.avatar}</span>
                        </div>
                        <h4 className="font-medium text-lg">{child.name}</h4>
                        <Badge variant="outline">{child.grade}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {child.upcomingClasses.map((class_, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium">{class_.title}</h5>
                              <Badge variant={class_.date === 'Today' ? 'default' : 'secondary'}>
                                {class_.date}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{class_.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center pt-6">
                  <Button size="lg" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Full Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}