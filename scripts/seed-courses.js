require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Missing Supabase URL or Service Role Key in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const courses = [
    {
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
        syllabus: 'Algebraic Expressions, Quadratic Equations, Trigonometry, Coordinate Geometry, Statistics and Probability.',
        curriculums: 'CBSE, ICSE, IGCSE, IB'
    },
    {
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
        syllabus: 'Motion, Force and Laws of Motion, Gravitation, Work and Energy, Sound.',
        curriculums: 'CBSE, ICSE, IGCSE, IB'
    },
    {
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
        syllabus: 'Introduction to Robotics, Sensors and Actuators, Programming with Arduino, Robot Kinematics, Final Project.',
        curriculums: 'STEM, K-12 Robotics Standard'
    },
    {
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
        syllabus: 'Notes and Rhythms, Major and Minor Scales, Chords and Progressions, Sight Reading, Basic Composition.',
        curriculums: 'ABRSM, Trinity College London'
    }
];

async function seedCourses() {
    console.log('Seeding courses...');

    // Clear existing courses
    const { error: deleteError } = await supabase.from('courses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) {
        console.error('Error clearing courses:', deleteError);
    }

    const { data, error } = await supabase.from('courses').insert(courses);

    if (error) {
        console.error('Error seeding courses:', error);
    } else {
        console.log('Successfully seeded courses');
    }
}

seedCourses();
