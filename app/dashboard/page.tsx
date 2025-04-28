"use client";
import React from 'react'
import History from './_components/History'
import FeedBack from './_components/FeedBack'
import { ClassCard } from "./_components/ClassCard";
import { MockTests } from "./_components/MockTests";
import { Notes } from "./_components/Notes";
import { Motivation } from "./_components/Motivation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";


type MenuItem = {
  name: string;
  isActive: boolean;
};

const defaultMenuItems: MenuItem[] = [
  { name: "Classes", isActive: true },
  { name: "Mock Tests", isActive: false },
  { name: "Notes", isActive: false },
  { name: "Motivation", isActive: false },
];

function Dashboard() {

  const [activeTab, setActiveTab] = useState("Classes");
  const [menuItems] = useState(defaultMenuItems);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Classes":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ClassCard title="Mathematics" subject="Algebra" progress={75} />
            <ClassCard title="Physics" subject="Mechanics" progress={60} />
            <ClassCard title="Chemistry" subject="Organic" progress={45} />
            <ClassCard title="Biology" subject="Anatomy" progress={90} />
            <ClassCard title="English" subject="Literature" progress={30} />
          </div>
        );
      case "Mock Tests":
        return <MockTests />;
      case "Notes":
        return <Notes />;
      case "Motivation":
        return <Motivation />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex bg-white rounded-lg mt-10">
          <div className="w-48 py-4 border-r border-gray-100">
            <nav className="flex flex-col gap-1 px-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleTabChange(item.name)}
                  className={cn(
                    "text-left px-4 py-2 rounded-lg transition-colors",
                    activeTab === item.name
                      ? "bg-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1">
            <ScrollArea className="h-[calc(100vh)]">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">{activeTab} {`>`}</h3>
                </div>
                {renderContent()}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    // <div className="min-h-screen bg-gray-50">
    //   <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-2'>
    //     <History/>
    //     <FeedBack/>
    //   </div>
    // </div>
  )
}

export default Dashboard