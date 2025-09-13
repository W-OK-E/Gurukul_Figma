'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  BookOpen, 
  Users, 
  Video, 
  Award, 
  Clock, 
  Star,
  Play,
  CheckCircle,
  Globe,
  Shield,
  Zap,
  TrendingUp
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function HomePage() {
  const features = [
    {
      icon: Video,
      title: 'Live Online Classes',
      description: 'Interactive video sessions with experienced tutors via Zoom integration'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: 'K-12 subjects including Math, Science, Robotics, and Music'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Real-time monitoring of student performance and learning milestones'
    },
    {
      icon: Users,
      title: 'Expert Tutors',
      description: 'Qualified instructors with specialized knowledge in their subjects'
    },
    {
      icon: Shield,
      title: 'Safe Learning Environment',
      description: 'Secure platform with parental controls and monitored interactions'
    },
    {
      icon: Zap,
      title: 'Flexible Scheduling',
      description: 'Choose class timings that fit your schedule with easy rescheduling'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      rating: 5,
      comment: "My daughter's math skills have improved dramatically since joining Gurukul. The interactive lessons keep her engaged!"
    },
    {
      name: 'Michael Chen',
      role: 'Student',
      rating: 5,
      comment: "The robotics classes are amazing! I've learned so much about programming and building robots."
    },
    {
      name: 'Emily Rodriguez',
      role: 'Parent',
      rating: 5,
      comment: "Great platform with excellent teachers. The progress tracking helps me stay involved in my son's learning."
    }
  ]

  const subjects = [
    {
      title: 'Mathematics',
      description: 'From basic arithmetic to advanced calculus',
      image: 'https://images.unsplash.com/photo-1584644769698-4762ca337c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lfGVufDF8fHx8MTc1NzQzODkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      students: '2,500+'
    },
    {
      title: 'Science',
      description: 'Physics, Chemistry, Biology for all grades',
      image: 'https://images.unsplash.com/photo-1726226347716-43c040b7fa1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwb25saW5lJTIwdHV0b3Jpbmd8ZW58MXx8fHwxNzU3NDM4OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      students: '1,800+'
    },
    {
      title: 'Robotics',
      description: 'Hands-on STEM learning with robotics projects',
      image: 'https://images.unsplash.com/photo-1603354351149-e97b9124020d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVkdWNhdGlvbiUyMGtpZHN8ZW58MXx8fHwxNzU3NDM4OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      students: '900+'
    },
    {
      title: 'Music',
      description: 'Learn instruments and music theory',
      image: 'https://images.unsplash.com/photo-1577877794879-40c77999dc14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGVkdWNhdGlvbiUyMGNoaWxkcmVufGVufDF8fHx8MTc1NzQzODkzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      students: '1,200+'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Globe className="w-3 h-3 mr-1" />
                  Trusted by 10,000+ families worldwide
                </Badge>
                <h1 className="text-4xl md:text-6xl">
                  Personalized Online Tutoring for K-12 Students
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Expert tutors, interactive lessons, and comprehensive progress tracking. 
                  Help your child excel in Math, Science, Robotics, Music, and more.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/courses">
                  <Button size="lg" className="text-lg px-8 py-6">
                    <Play className="w-5 h-5 mr-2" />
                    Start Learning Today
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    Book Free Trial
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">500+</div>
                  <div className="text-sm text-muted-foreground">Expert Tutors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1584644769698-4762ca337c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lfGVufDF8fHx8MTc1NzQzODkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Students learning online"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl">Popular Subjects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive curriculum designed to help students excel in their academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={subject.image}
                    alt={subject.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{subject.students} students</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{subject.title}</CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses">
              <Button size="lg">View All Courses</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl">Why Choose Gurukul?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide everything you need for effective online learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl">What Our Community Says</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from students and parents who have transformed their learning journey with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                  <div className="pt-4 border-t border-border">
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of students who are already excelling with personalized online tutoring. 
            Get started with a free trial today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/courses">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}