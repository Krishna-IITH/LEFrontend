import React from 'react'
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import Image from "next/image";

function hero() {
  return (
//     <section className="bg-gray-50">
//   <div className="mx-auto max-w-screen-xl px-3 py-32 lg:flex lg:items-center">
//     <div className="mx-auto max-w-xl text-center">
//       <h1 className="text-3xl font-extrabold sm:text-5xl text-primary">
//       LEARNEASY
//         <strong className="font-extrabold text-black sm:block"> Making Learning Easy </strong>
//       </h1>

//       <p className="mt-4 sm:text-xl/relaxed">
//         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
//         numquam ea!
//       </p>

//       <div className="mt-8 flex flex-wrap justify-center gap-4">
//         <a
//           className="block w-full rounded-sm bg-primary px-12 py-3 text-sm font-medium text-white shadow-sm focus:ring-3 focus:outline-hidden sm:w-auto"
//           href="#"
//         >
//           Get Started
//         </a>
//       </div>
//     </div>
//   </div>
// </section>
<div className="relative min-h-screen bg-white flex flex-col items-center px-6 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-5xl py-20">
        <h1 className="text-6xl font-extrabold text-[#875bf9] mb-6 leading-tight tracking-tight">
          Learn Smarter with <span className="text-yellow-400">LearnEasy</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
          AI-powered personalized learning that adapts to your style, making education engaging, effective, and fun.
        </p>
        <Button className="bg-[#875bf9] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#7644d7] transition text-lg font-medium">
          Get Started for Free
        </Button>
      </div>

      {/* How It Works Section */}
      <div className="text-center max-w-4xl py-16">
        <h2 className="text-3xl font-bold text-[#875bf9] mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 shadow-lg rounded-2xl bg-white text-center border border-gray-200">
            <CardContent>
              <h3 className="text-2xl font-semibold mb-2 text-[#875bf9]">AI-Powered Explanations</h3>
              <p className="text-gray-600">Get visual and interactive explanations tailored to your learning style.</p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg rounded-2xl bg-white text-center border border-gray-200">
            <CardContent>
              <h3 className="text-2xl font-semibold mb-2 text-[#875bf9]">Live Whiteboard</h3>
              <p className="text-gray-600">Collaborate and learn in real-time with interactive tools.</p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-lg rounded-2xl bg-white text-center border border-gray-200">
            <CardContent>
              <h3 className="text-2xl font-semibold mb-2 text-[#875bf9]">Personalized Learning</h3>
              <p className="text-gray-600">Track progress and receive customized learning recommendations.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 text-center max-w-5xl">
        <h2 className="text-3xl font-bold text-[#875bf9] mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-md rounded-xl bg-white border border-gray-200">
            <CardContent>
              <p className="text-gray-600">“LearnEasy transformed how I learn complex topics!”</p>
              <p className="font-semibold text-[#875bf9] mt-2">— John D.</p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-md rounded-xl bg-white border border-gray-200">
            <CardContent>
              <p className="text-gray-600">“The AI-powered explanations are a game changer!”</p>
              <p className="font-semibold text-[#875bf9] mt-2">— Sarah L.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative w-full bg-[#875bf9] text-white text-center py-16 mt-16 rounded-t-3xl">
        <h2 className="text-3xl font-bold">Join LearnEasy Today</h2>
        <p className="mt-2 mb-6">Start your personalized learning journey now!</p>
        <Button className="bg-yellow-400 text-[#875bf9] px-6 py-3 rounded-full font-medium shadow-md hover:bg-yellow-500 transition">
          Get Started
        </Button>
      </div>
    </div>
  )
}

export default hero