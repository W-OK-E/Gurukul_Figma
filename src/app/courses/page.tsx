import { CoursesPage } from '../../components/CoursesPage'
import { supabaseServer } from '@/lib/supabaseServer'
export const metadata = {
  title: 'Courses - Gurukul',
  description: 'Browse our comprehensive K-12 tutoring courses in Math, Science, Robotics, and Music.',
}

export default async function Courses() {
  const { data: courses } = await supabaseServer.from('courses').select('*')
  return <CoursesPage initialcourses={courses || []}/>
}