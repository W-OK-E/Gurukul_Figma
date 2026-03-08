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
  Zap,
  Info,
  GraduationCap,
  Calendar
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageWithFallback } from './figma/ImageWithFallback'
import { supabase } from "@/lib/supabaseClient";


type Course = {
  id: number
  title: string
  subject: string
  grade: string
  instructor: string
  rating: number
  students: number
  duration: string
  price: number
  image?: string
  description?: string
  features?: string[]
  icon?: string
  syllabus?: string
  curriculums?: string
  instructor_id?: string
  instructor_bio?: string
}

export function CoursesPage({ initialcourses }: { initialcourses: Course[] }) {
  const [courses, setcourses] = useState(initialcourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // const courses = [
  //   {
  //     id: 1,
  //     title: 'Advanced Mathematics',
  //     subject: 'math',
  //     grade: 'grade-10',
  //     instructor: 'Dr. Sarah Johnson',
  //     rating: 4.9,
  //     students: 156,
  //     duration: '12 weeks',
  //     price: 299,
  //     image: 'https://images.unsplash.com/photo-1584644769698-4762ca337c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lfGVufDF8fHx8MTc1NzQzODkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  //     description: 'Master algebra, geometry, and pre-calculus concepts with hands-on problem solving.',
  //     features: ['Live sessions', 'Practice problems', 'Progress tracking'],
  //     icon: Calculator
  //   },
  //   {
  //     id: 2,
  //     title: 'Physics Fundamentals',
  //     subject: 'science',
  //     grade: 'grade-9',
  //     instructor: 'Prof. Michael Chen',
  //     rating: 4.8,
  //     students: 124,
  //     duration: '10 weeks',
  //     price: 249,
  //     image: 'https://images.unsplash.com/photo-1726226347716-43c040b7fa1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwb25saW5lJTIwdHV0b3Jpbmd8ZW58MXx8fHwxNzU3NDM4OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  //     description: 'Explore the fundamental principles of physics through interactive experiments.',
  //     features: ['Virtual labs', 'Real-world applications', 'Concept mastery'],
  //     icon: Microscope
  //   },
  //   {
  //     id: 3,
  //     title: 'Robotics Engineering',
  //     subject: 'robotics',
  //     grade: 'grade-8',
  //     instructor: 'Dr. Emily Rodriguez',
  //     rating: 5.0,
  //     students: 89,
  //     duration: '16 weeks',
  //     price: 399,
  //     image: 'https://images.unsplash.com/photo-1603354351149-e97b9124020d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVkdWNhdGlvbiUyMGtpZHN8ZW58MXx8fHwxNzU3NDM4OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  //     description: 'Build and program robots while learning engineering and coding principles.',
  //     features: ['Hands-on projects', 'Programming basics', 'Engineering design'],
  //     icon: Cog
  //   },
  //   {
  //     id: 4,
  //     title: 'Music Theory & Piano',
  //     subject: 'music',
  //     grade: 'grade-6',
  //     instructor: 'Ms. Amanda Foster',
  //     rating: 4.7,
  //     students: 203,
  //     duration: '8 weeks',
  //     price: 199,
  //     image: 'https://images.unsplash.com/photo-1577877794879-40c77999dc14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGVkdWNhdGlvbiUyMGNoaWxkcmVufGVufDF8fHx8MTc1NzQzODkzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  //     description: 'Learn piano fundamentals and music theory through interactive lessons.',
  //     features: ['One-on-one sessions', 'Sheet music reading', 'Performance practice'],
  //     icon: Music
  //   },
  //   {
  //     id: 5,
  //     title: 'Chemistry Basics',
  //     subject: 'science',
  //     grade: 'grade-7',
  //     instructor: 'Dr. Robert Kim',
  //     rating: 4.6,
  //     students: 167,
  //     duration: '12 weeks',
  //     price: 279,
  //     image: 'https://images.unsplash.com/photo-1726226347716-43c040b7fa1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwb25saW5lJTIwdHV0b3Jpbmd8ZW58MXx8fHwxNzU3NDM4OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  //     description: 'Discover the world of chemistry with safe, virtual laboratory experiments.',
  //     features: ['Virtual experiments', 'Molecular modeling', 'Real-world chemistry'],
  //     icon: Zap
  //   },
  //   {
  //     id: 6,
  //     title: 'Elementary Math',
  //     subject: 'math',
  //     grade: 'grade-3',
  //     instructor: 'Ms. Lisa Thompson',
  //     rating: 4.9,
  //     students: 298,
  //     duration: '6 weeks',
  //     price: 149,
  //     image: 'https://images.unsplash.com/photo-1584644769698-4762ca337c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lfGVufDF8fHx8MTc1NzQzODkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  //     description: 'Build strong mathematical foundations with fun, interactive activities.',
  //     features: ['Visual learning', 'Game-based activities', 'Parent progress reports'],
  //     icon: Calculator
  //   }
  // ];

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

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  React.useEffect(() => {
    console.log('CoursesPage mounted. initialcourses:', initialcourses.length);
  }, [initialcourses]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = (course.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (course.instructor?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (course.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesGrade = selectedGrade === 'all' || course.grade === selectedGrade;
    const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;

    return matchesSearch && matchesGrade && matchesSubject;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Course Detail Sheet */}
      <Sheet open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedCourse && (
            <>
              <SheetHeader>
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={selectedCourse.image}
                      alt={selectedCourse.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <SheetTitle className="text-2xl">{selectedCourse.title}</SheetTitle>
                    <SheetDescription className="flex items-center gap-2">
                      <Badge variant="secondary">{selectedCourse.subject}</Badge>
                      <Badge variant="outline">{grades.find(g => g.value === selectedCourse.grade)?.label}</Badge>
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <Tabs defaultValue="overview" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" /> About Course
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedCourse.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-accent/20 space-y-1">
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Duration
                      </div>
                      <div className="font-semibold">{selectedCourse.duration}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-accent/20 space-y-1">
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Users className="h-4 w-4" /> Students
                      </div>
                      <div className="font-semibold">{selectedCourse.students}+ enrolled</div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-semibold">Key Highlights</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedCourse.features?.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Zap className="h-4 w-4 text-yellow-500 fill-current" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold">${selectedCourse.price}</div>
                      <div className="text-sm text-muted-foreground">one-time payment</div>
                    </div>
                    <Link href="/register">
                      <Button className="w-full text-lg py-6" onClick={() => setSelectedCourse(null)}>
                        Enroll Now
                      </Button>
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="syllabus" className="pt-6 space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" /> Course Syllabus
                  </h3>
                  <div className="bg-muted/50 p-6 rounded-xl prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-muted-foreground font-medium">
                      {selectedCourse.syllabus || 'No detailed syllabus available yet. Please contact us for details.'}
                    </p>
                  </div>
                  {selectedCourse.curriculums && (
                    <div className="p-4 border border-dashed border-primary/20 rounded-lg bg-primary/5">
                      <div className="text-xs font-bold text-primary uppercase mb-1">Aligned with</div>
                      <div className="text-sm font-semibold">{selectedCourse.curriculums}</div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="instructor" className="pt-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedCourse.instructor}</h3>
                      <div className="flex items-center text-sm text-yellow-600">
                        <Star className="h-4 w-4 fill-current mr-1" /> {selectedCourse.rating} Instructor Rating
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Professional Background</h4>
                    <p className="text-muted-foreground italic border-l-4 border-primary/20 pl-4 py-1">
                      {selectedCourse.instructor_bio || 'Experienced education faculty specializing in ' + selectedCourse.subject + ' programs for K-12 students.'}
                    </p>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/teachers">View Faculty Profile</Link>
                  </Button>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 pt-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Browse Our Courses</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover personalized learning experiences designed to help K-12 students excel in their studies
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card className="p-6 border-primary/5 shadow-xl bg-card/50 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search courses, instructors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="h-11">
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
                  <SelectTrigger className="h-11">
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
                    src={course.image || 'https://images.unsplash.com/photo-1544377103-33bcadbb3ee9?q=80&w=1080'}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      {course.subject === 'math' && <Calculator className="w-3 h-3" />}
                      {course.subject === 'science' && <Microscope className="w-3 h-3" />}
                      {course.subject === 'robotics' && <Cog className="w-3 h-3" />}
                      {course.subject === 'music' && <Music className="w-3 h-3" />}
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
                      {course.features?.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    {course.syllabus && (
                      <div className="text-xs text-muted-foreground mt-2">
                        <strong>Syllabus:</strong> {course.syllabus}
                      </div>
                    )}
                    {course.curriculums && (
                      <div className="text-xs text-muted-foreground">
                        <strong>Curriculums:</strong> {course.curriculums}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 space-y-2">
                    <Link href="/register">
                      <Button className="w-full">
                        Enroll Now
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedCourse(course)}>
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
          <Link href="/register">
            <Button size="lg">
              Request Custom Program
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}