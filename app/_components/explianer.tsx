import React, {useState} from 'react';
import parse from "html-react-parser";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import VideoLikeExplanation from './videoexplainer';
  

function explianer() {
    const [topic, setTopic] = useState("");
    const [simulation, setsimulation] = useState("");
    // const [resources, setResources] = useState("");
    const [response, setResponse] = useState("");
    const [fetchDataClicked, setFetchDataClicked] = useState(false);

    const fetchExplanation = async () => {
        console.log(topic);
          const res = await fetch("https://le-klk9.onrender.com/explain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic })
          });
          const data = await res.json();
          console.log(data);
          setResponse(data.explaination);
          setFetchDataClicked(true);
          setsimulation(data.simulation);
        //   setResources(data.resources);
        };

        const getTranslation = async () => {
            const res = await fetch("https://le-klk9.onrender.com/translate", { // Call FastAPI instead
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "pipelineTasks": [
                        {
                            "taskType": "translation",
                            "config": {
                                "language": {
                                    "sourceLanguage": "en",
                                    "targetLanguage": "hi"
                                },
                                "serviceId": "ai4bharat/indictrans-v2-all-gpu--t4"
                            }
                        }
                    ],
                    "inputData": {
                        "input": [{ "source": "hello world" }],
                        "audio": []
                    }
                })
            });
        
            const data = await res.json();
            console.log(data);
            alert(JSON.stringify(data));
        };        
    
    return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full rounded-lg border">    
    <ResizablePanel>
        <ScrollArea className="h-[100vh] w-full rounded-md border p-4">
        {response && (
          <CardContent className="mt-4 p-2 border rounded">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">TOPIC: {parse(topic)}</h1>
            {/* <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Explaination: {parse(response)}</h2> */}
            <p className="leading-7 [&:not(:first-child)]:mt-6">Explaination: {parse(response)}</p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">Simulation: {parse(simulation)}</p>
            
            {/* <p>Resources: {parse(resources)}</p> */}
          </CardContent>
        )}
        </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        
        <ResizablePanel>
        <ResizablePanelGroup direction="vertical">
            <ResizablePanel>
            {/* {response && (
          <CardContent className="mt-4 p-2 border rounded">
            <p className="leading-7 [&:not(:first-child)]:mt-6">Simulation: {parse(simulation)}</p>
            <iframe src='{parse(simulation)}'></iframe>
          </CardContent>
        )} */}
        {fetchDataClicked && (
        <VideoLikeExplanation initialPrompt={topic ? topic : 'Hi'} />
      )}
        {/* <VideoLikeExplanation initialPrompt={topic ? topic: 'Hi'}/> */}
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
                {/* <h1 className="text-xl font-bold mb-4">AI-Powered Visual Explainer</h1> */}
                <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic to explain"
                />
                <Select onValueChange={getTranslation}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
                </Select>

                <Button className="mt-4" onClick={fetchExplanation}>Generate Explanation</Button>
            </ResizablePanel>
        </ResizablePanelGroup>
    </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default explianer