import { CoursesPage } from '../../components/CoursesPage'
import { supabaseServer } from '@/lib/supabaseServer'
export const dynamic = 'force-dynamic'

export default async function Courses() {
  const { data: courses } = await supabaseServer.from('courses').select('*')
  return <CoursesPage initialcourses={courses || []} />
}