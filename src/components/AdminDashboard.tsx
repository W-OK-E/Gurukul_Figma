'use client'

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign,
  UserCheck,
  UserX,
  Settings,
  BarChart3,
  Shield,
  Database,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const systemStats = {
    totalUsers: 15420,
    activeStudents: 12850,
    totalInstructors: 487,
    totalParents: 8930,
    totalCourses: 156,
    activeClasses: 89,
    totalRevenue: 284750,
    systemUptime: 99.9
  };

  const recentUsers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@email.com',
      type: 'student',
      status: 'active',
      joinDate: '2025-01-08',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Dr. Emily Johnson',
      email: 'emily@email.com',
      type: 'instructor',
      status: 'pending',
      joinDate: '2025-01-08',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Sarah Wilson',
      email: 'sarah@email.com',
      type: 'parent',
      status: 'active',
      joinDate: '2025-01-07',
      lastActive: '30 minutes ago'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      students: 156,
      status: 'active',
      rating: 4.9,
      revenue: 15600,
      category: 'Math'
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      instructor: 'Prof. Michael Chen',
      students: 124,
      status: 'active',
      rating: 4.8,
      revenue: 12400,
      category: 'Science'
    },
    {
      id: 3,
      title: 'Robotics Engineering',
      instructor: 'Dr. Emily Rodriguez',
      students: 89,
      status: 'active',
      rating: 5.0,
      revenue: 8900,
      category: 'Robotics'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Server Load',
      message: 'Server CPU usage is at 85%. Consider scaling resources.',
      timestamp: '2025-01-09 14:30',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Instructor Application',
      message: 'Dr. Emily Johnson has submitted instructor application.',
      timestamp: '2025-01-09 12:15',
      priority: 'low'
    },
    {
      id: 3,
      type: 'success',
      title: 'Payment Processed',
      message: 'Monthly payment batch processed successfully - $45,230',
      timestamp: '2025-01-09 10:00',
      priority: 'low'
    }
  ];

  const revenueData = [
    { month: 'Jan', amount: 45230 },
    { month: 'Feb', amount: 52180 },
    { month: 'Mar', amount: 48920 },
    { month: 'Apr', amount: 58450 },
    { month: 'May', amount: 63200 },
    { month: 'Jun', amount: 68750 }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management tools</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl">{systemStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-2xl">{systemStats.totalCourses}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl">${systemStats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                  <p className="text-2xl">{systemStats.systemUptime}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-6 w-full max-w-4xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>System Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                          {alert.type === 'info' && <Clock className="w-4 h-4 text-blue-500" />}
                          {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                          <h5 className="font-medium">{alert.title}</h5>
                        </div>
                        <Badge 
                          variant={
                            alert.priority === 'high' ? 'destructive' :
                            alert.priority === 'medium' ? 'secondary' : 'outline'
                          }
                        >
                          {alert.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Users */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>Recent Users</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">{user.name}</h5>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="capitalize">{user.type}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{user.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={user.status === 'active' ? 'default' : 'secondary'}
                        >
                          {user.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">Last active: {user.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Top Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Top Performing Courses</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        </div>
                        <Badge variant="outline">{course.category}</Badge>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm">{course.students}</div>
                          <div className="text-xs text-muted-foreground">Students</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{course.rating}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm">${course.revenue.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all users in the system</CardDescription>
                  </div>
                  <Button className="flex items-center space-x-1">
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl">{systemStats.activeStudents.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Active Students</div>
                  </div>
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl">{systemStats.totalInstructors}</div>
                    <div className="text-sm text-muted-foreground">Instructors</div>
                  </div>
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl">{systemStats.totalParents.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Parents</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="capitalize">{user.type}</Badge>
                          <Badge 
                            variant={user.status === 'active' ? 'default' : 'secondary'}
                          >
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Joined: {user.joinDate} • Last active: {user.lastActive}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Management</CardTitle>
                    <CardDescription>Manage all courses and instructors</CardDescription>
                  </div>
                  <Button className="flex items-center space-x-1">
                    <Plus className="w-4 h-4" />
                    <span>Add Course</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-lg">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{course.category}</Badge>
                          <Badge variant="default">{course.status}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-accent/20 rounded-lg">
                          <div className="text-xl">{course.students}</div>
                          <div className="text-xs text-muted-foreground">Students</div>
                        </div>
                        <div className="text-center p-3 bg-accent/20 rounded-lg">
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-xl">{course.rating}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                        <div className="text-center p-3 bg-accent/20 rounded-lg">
                          <div className="text-xl">${course.revenue.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                        </div>
                        <div className="text-center p-3 bg-accent/20 rounded-lg">
                          <div className="text-xl">89%</div>
                          <div className="text-xs text-muted-foreground">Completion</div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Revenue Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{data.month}</span>
                        <div className="flex items-center space-x-3 flex-1 mx-4">
                          <Progress value={(data.amount / 70000) * 100} className="flex-1" />
                          <span className="text-sm font-medium">${data.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Students</span>
                      <div className="flex items-center space-x-3">
                        <Progress value={85} className="w-24" />
                        <span className="text-sm">+15% this month</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Instructors</span>
                      <div className="flex items-center space-x-3">
                        <Progress value={70} className="w-24" />
                        <span className="text-sm">+8% this month</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Parents</span>
                      <div className="flex items-center space-x-3">
                        <Progress value={90} className="w-24" />
                        <span className="text-sm">+12% this month</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <div className="flex items-center space-x-3">
                      <Progress value={65} className="w-24" />
                      <span className="text-sm">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <div className="flex items-center space-x-3">
                      <Progress value={78} className="w-24" />
                      <span className="text-sm">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Disk Usage</span>
                    <div className="flex items-center space-x-3">
                      <Progress value={45} className="w-24" />
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network I/O</span>
                    <div className="flex items-center space-x-3">
                      <Progress value={32} className="w-24" />
                      <span className="text-sm">32%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Failed Login Attempts</span>
                    <Badge variant="outline">12 today</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SSL Certificate</span>
                    <Badge variant="default">Valid</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Firewall Status</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Security Scan</span>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>System Settings</span>
                </CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">General Settings</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Configuration
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Security Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Database className="w-4 h-4 mr-2" />
                        Database Management
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">System Maintenance</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        System Backup
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Performance Monitoring
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Error Logs
                      </Button>
                    </div>
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