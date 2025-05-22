"use client";
import React, {useEffect} from 'react';
import History from './_components/History';
import FeedBack from './_components/FeedBack';
import HeroSection from './_components/HeroSection';
import { ClassCard } from "./_components/ClassCard";
import { MockTests } from "./_components/MockTests";
import { Notes } from "./_components/Notes";
import { Motivation } from "./_components/Motivation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateClassModal } from "./_components/CreateClassModal";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BrowserRouter } from 'react-router-dom';


interface UserData {
  name: string;
  picture: string;
}

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
  
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState("Classes");
  const [classesData, setClassesData] = useState<any[]>([]);
  const [menuItems] = useState(defaultMenuItems);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const userInfo = localStorage.getItem("access_token") || "{}";
  const token = userInfo;
  
  useEffect(() => {
    const localData = localStorage.getItem('response');
    if (localData) {
      const data = JSON.parse(localData);
      setUser({
        name: data.name,
        picture: data.picture,
      });
    }

    const fetchClasses = async () => {
      try {
        const res = await axios.post("http://localhost:8000/class/list", 
          {
            access_token: token,
          },
          {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        setClassesData(res.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
  
    fetchClasses();
  }, []);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

    const renderContent = () => {
    switch (activeTab) {
      case "Classes":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Your Classes</h3>
              <Button 
                onClick={() => setIsCreateModalOpen(true)} 
                className="cta-button"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Class
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* <ClassCard title="Mathematics" subject="Algebra" progress={75} />
              <ClassCard title="Physics" subject="Mechanics" progress={60} />
              <ClassCard title="Chemistry" subject="Organic" progress={45} />
              <ClassCard title="Biology" subject="Anatomy" progress={90} />
              <ClassCard title="English" subject="Literature" progress={30} />
               */}
               {classesData.map((item, idx) => (
                <ClassCard
                  key={idx}
                  title={item.exam +': '+ item.topic}
                  subject={item.subject}
                  progress={item.progress}
                />
              ))}
            </div>
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
     <BrowserRouter>
    <div className='container mx-auto py-6 px-4'>
    <HeroSection name={user?.name} profile={user?.picture} />
    </div>
    
    <div className="min-h-screen bg-gray-50 flex w-full flex-col">

      <div className="container mx-auto">
        <div className="flex bg-white rounded-lg mt-4">
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
      
      <CreateClassModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
    </BrowserRouter>
  )
}

export default Dashboard