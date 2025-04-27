import { useState, useEffect } from "react";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

interface Step {
  title: string;
  description: string;
  svg_code?: string;
}

export default function VideoLikeExplanation({ 
  stepDuration = 5000, 
  initialPrompt = "Explain a complex topic." 
}) { 
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSteps() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.post("http://localhost:8000/explain/generate_steps", { 
          prompt: initialPrompt,
        });

        if (response.data && Array.isArray(response.data.steps)) {
          setSteps(response.data.steps);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSteps();
  }, [initialPrompt]);

  useEffect(() => {
    if (isPlaying && steps.length > 0 && currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, stepDuration);

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, isPlaying, steps, stepDuration]);

  useEffect(() => {
    if (steps.length > 0) {
      setProgress(((currentStepIndex + 1) / steps.length) * 100);
    }
  }, [currentStepIndex, steps.length]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReplay = () => {
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (steps.length === 0) {
    return <div>No steps available.</div>;
  }

  return (
    <div className="p-4">
      <div>
        {steps[currentStepIndex] && (
          <div>
            <h2>{steps[currentStepIndex].title}</h2>
            {steps[currentStepIndex].svg_code && (
              <div>{parse(steps[currentStepIndex].svg_code)}</div>
            )}
            <p>{steps[currentStepIndex].description}</p>
          </div>
        )}
      </div>
      <Progress value={progress} className="mt-4 mb-4" />
      <div className="flex justify-between">
        <Button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</Button>
        <Button onClick={handleReplay}>Replay</Button>
      </div>
    </div>
  );
}
