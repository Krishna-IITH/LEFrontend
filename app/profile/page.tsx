import React from 'react'
import Header from '../dashboard/_components/Header'
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Profile() {
  return (
    <div>
         <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-purple-600 text-xl font-medium">LEARNEASY</h1>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/lovable-uploads/aae89a4e-f701-430d-827b-8dd055210771.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="relative bg-gray-200 rounded-lg p-8 mb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">STUDENT NAME</h2>
            <p className="text-gray-600">
              Nunc sodales tempor odio at condimentum. Nunc malesuada, augue vehicula commodo
              laoreet, eros mauris varius sapien, nec venenatis sapien quam nec leo.
            </p>
          </div>
          <div className="absolute right-8 bottom-0 w-40">
            <img
              src="/lovable-uploads/aae89a4e-f701-430d-827b-8dd055210771.png"
              alt="Student"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex flex-col gap-2">
            <h3 className="text-xl font-bold mb-4">Details</h3>
            <Button 
              variant="outline" 
              className="justify-start text-purple-600 border-purple-600"
            >
              Personal
            </Button>
            <Button 
              variant="default" 
              className="justify-start bg-purple-600 hover:bg-purple-700"
            >
              Education
            </Button>
          </div>

          {/* Form Area */}
          <div className="flex-1">
            <div className="mb-6">
              <h4 className="text-gray-600">Personal Details &gt;</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input placeholder="Full Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="Email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input placeholder="Phone" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <Textarea placeholder="Enter address" className="h-32" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pin Code</label>
                  <Input placeholder="Pin Code" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Save</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

export default Profile