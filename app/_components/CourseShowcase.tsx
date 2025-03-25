import React from 'react';
import { Clock, Users, ArrowRight, Bookmark } from 'lucide-react';

const CourseShowcase = () => {
  const courses = [
    {
      title: "Introduction to Artificial Intelligence",
      category: "Computer Science",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
      instructor: "Prof. David Chen",
      students: 2453,
      duration: "8 weeks",
      featured: true
    },
    {
      title: "Advanced Data Analysis Techniques",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      instructor: "Dr. Emma Wilson",
      students: 1865,
      duration: "10 weeks",
      featured: false
    },
    {
      title: "Modern Web Development Fundamentals",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      instructor: "Maya Rodriguez",
      students: 3271,
      duration: "12 weeks",
      featured: false
    },
    {
      title: "Business Analytics for Decision Makers",
      category: "Business",
      image: "https://images.unsplash.com/photo-1664575198308-3959904fa430?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      instructor: "James Taylor",
      students: 1542,
      duration: "6 weeks",
      featured: false
    }
  ];

  return (
    <section id="courses" className="section-container">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div className="max-w-2xl mb-8 md:mb-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-200 mb-4">
            <span className="text-xs font-medium text-primary-700">Popular Courses</span>
          </div>
          <h2 className="heading-lg mb-6">
            Discover Our <span className="text-gradient">Top-Rated Courses</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Explore our extensive catalog of courses taught by industry-leading experts and designed for effective learning.
          </p>
        </div>
        <a href="#all-courses" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors">
          View all courses
          <ArrowRight size={16} className="ml-2" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map((course, index) => (
          <div 
            key={index} 
            className={`glass-card rounded-xl overflow-hidden card-hover relative ${course.featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
          >
            {/* Course Image */}
            <div className="relative w-full aspect-video overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary-700">
                  {course.category}
                </span>
              </div>
              <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-primary-50 transition-colors">
                <Bookmark size={16} className="text-primary-600" />
              </button>
            </div>

            {/* Course Content */}
            <div className="p-6">
              <h3 className={`font-bold ${course.featured ? 'text-2xl mb-4' : 'text-lg mb-3'}`}>{course.title}</h3>
              
              <div className="flex items-center text-sm text-foreground/60 mb-4">
                <div className="flex items-center mr-4">
                  <Clock size={16} className="mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img 
                      src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${20 + index}.jpg`} 
                      alt={course.instructor}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{course.instructor}</span>
                </div>
                
                <a 
                  href="#enroll" 
                  className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseShowcase;