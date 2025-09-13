'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  Calculator,
  Microscope,
  Music,
  Cog,
  Globe,
  Palette,
  Zap
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      subject: 'math',
      grade: 'grade-10',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.9,
      students: 156,
      duration: '12 weeks',
      price: 299,
      image: 'https://images.unsplash.com/photo-1584644769698-4762ca337c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lfGVufDF8fHx8MTc1NzQzODkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Master algebra, geometry, and pre-calculus concepts with hands-on problem solving.',
      features: ['Live sessions', 'Practice problems', 'Progress tracking'],
      icon: Calculator
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      subject: 'science',
      grade: 'grade-9',
      instructor: 'Prof. Michael Chen',
      rating: 4.8,
      students: 124,
      duration: '10 weeks',
      price: 249,
      image: 'https://images.unsplash.com/photo-1726226347716-43c040b7fa1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwb25saW5lJTIwdHV0b3Jpbmd8ZW58MXx8fHwxNzU3NDM4OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Explore the fundamental principles of physics through interactive experiments.',
      features: ['Virtual labs', 'Real-world applications', 'Concept mastery'],
      icon: Microscope
    },
    {
      id: 3,
      title: 'Robotics Engineering',
      subject: 'robotics',
      grade: 'grade-8',
      instructor: 'Dr. Emily Rodriguez',
      rating: 5.0,
      students: 89,
      duration: '16 weeks',
      price: 399,
      image: 'https://images.unsplash.com/photo-1603354351149-e97b9124020d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVkdWNhdGlvbiUyMGtpZHN8ZW58MXx8fHwxNzU3NDM4OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Build and program robots while learning engineering and coding principles.',
      features: ['Hands-on projects', 'Programming basics', 'Engineering design'],
      icon: Cog
    },
    {
      id: 4,
      title: 'Music Theory & Piano',
      subject: 'music',
      grade: 'grade-6',
      instructor: 'Ms. Amanda Foster',
      rating: 4.7,
      students: 203,
      duration: '8 weeks',
      price: 199,
      image: 'https://images.unsplash.com/photo-1577877794879-40c77999dc14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGVkdWNhdGlvbiUyMGNoaWxkcmVufGVufDF8fHx8MTc1NzQzODkzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Learn piano fundamentals and music theory through interactive lessons.',
      features: ['One-on-one sessions', 'Sheet music reading', 'Performance practice'],
      icon: Music
    },
    {
      id: 5,
      title: 'Chemistry Basics',
      subject: 'science',
      grade: 'grade-7',
      instructor: 'Dr. Robert Kim',
      rating: 4.6,
      students: 167,
      duration: '12 weeks',
      price: 279,
      image: 'https://images.unsplash.com/photo-1726226347716-43c040b7fa1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwb25saW5lJTIwdHV0b3Jpbmd8ZW58MXx8fHwxNzU3NDM4OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Discover the world of chemistry with safe, virtual laboratory experiments.',
      features: ['Virtual experiments', 'Molecular modeling', 'Real-world chemistry'],
      icon: Zap
    },
    {
      id: 6,
      title: 'Elementary Math',
      subject: 'math',
      grade: 'grade-3',
      instructor: 'Ms. Lisa Thompson',
      rating: 4.9,
      students: 298,
      duration: '6 weeks',
      price: 149,
      image: 'https://images.unsplash.com/photo-1584644769698-4762ca337c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lfGVufDF8fHx8MTc1NzQzODkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Build strong mathematical foundations with fun, interactive activities.',
      features: ['Visual learning', 'Game-based activities', 'Parent progress reports'],
      icon: Calculator
    }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'math', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'robotics', label: 'Robotics' },
    { value: 'music', label: 'Music' }
  ];

  const grades = [
    { value: 'all', label: 'All Grades' },
    ...Array.from({ length: 12 }, (_, i) => ({
      value: `grade-${i + 1}`,
      label: `Grade ${i + 1}`
    }))
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || course.grade === selectedGrade;
    const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;
    
    return matchesSearch && matchesGrade && matchesSubject;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl">Browse Our Courses</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover personalized learning experiences designed to help K-12 students excel in their studies
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search courses, instructors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            return (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Icon className="w-3 h-3" />
                      <span className="capitalize">{course.subject}</span>
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/90">
                      {grades.find(g => g.value === course.grade)?.label}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{course.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({course.students} students)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl">${course.price}</div>
                      <div className="text-sm text-muted-foreground">one-time</div>
                    </div>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students} enrolled</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">Instructor: {course.instructor}</div>
                    <div className="flex flex-wrap gap-1">
                      {course.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Link href="/auth">
                      <Button className="w-full">
                        Enroll Now
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search terms to find more courses.
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedGrade('all');
              setSelectedSubject('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-accent/20 rounded-lg p-12">
          <h2 className="text-2xl md:text-3xl mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We offer custom tutoring programs tailored to your specific needs. 
            Get in touch with our academic advisors to design a personalized learning plan.
          </p>
          <Link href="/auth">
            <Button size="lg">
              Request Custom Program
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}