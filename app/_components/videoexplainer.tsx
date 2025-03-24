import { useState, useEffect } from 'react';
import parse from "html-react-parser";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';

export default function VideoLikeExplanation({ stepDuration = 5000, initialPrompt = "Explain a complex topic." }) { // Add an initial prompt
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [replay, setReplay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSteps() {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8000/explain/generate_steps', { // Corrected endpoint
          prompt: initialPrompt,
        });
        console.log(response);
        setSteps(response.data.steps);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSteps();
  }, [initialPrompt, replay]);

  useEffect(() => {
    if (isPlaying && steps.length > 0 && currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(currentStepIndex + 1);
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

  const currentStep = steps[currentStepIndex];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // const handleReplay = () => {
  //   setCurrentStepIndex(0);
  //   setIsPlaying(true);
  //   setReplay(!replay);
  // };

  const handleReplay = () => {
    setCurrentStepIndex(0);
    setIsPlaying(true);
    // setReplay(!replay);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (steps.length === 0) {
    return <div>No steps available.</div>;
  }

  return (
    <div className="p-4">
      <div>
        {currentStep && (
          <div>
            <h2>{currentStep.title}</h2>
            {/* <img src={currentStep.imageUrl} alt={currentStep.imageUrl} /> */}
            {currentStep.svg_code && (
                // <div dangerouslySetInnerHTML={{ __html: currentStep.svg_code }} />
                <div>{parse(currentStep.svg_code)}</div>
            )}
            <p>{currentStep.description}</p>
          </div>
        )}
      </div>
      <Progress value={progress} className="mt-4 mb-4" />
      <div className='flex justify-between'>
      <Button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</Button>
      <Button onClick={handleReplay}>Replay</Button>
      </div>
    </div>
  );
}