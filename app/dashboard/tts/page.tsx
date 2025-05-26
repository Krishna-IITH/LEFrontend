"use client";
import { useState, useRef, useEffect } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("नमस्ते, आप कैसे हैं?");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const words = text.split(" ");

  const generateAudio = async (textToConvert: string) => {
    if (!textToConvert.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("https://anuvaad-backend.bhashini.co.in/v1/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pipelineTasks: [
            {
              taskType: "tts",
              config: {
                language: { sourceLanguage: "hi" },
                serviceId: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
                gender: "female"
              }
            }
          ],
          inputData: {
            input: [{ source: textToConvert }],
            audio: [{ audioContent: "" }]
          }
        })
      });

      const data = await response.json();
      const base64Audio = data?.pipelineResponse?.[0]?.audio?.[0]?.audioContent;
      if (!base64Audio) throw new Error("No audio returned");

      const byteCharacters = atob(base64Audio);
      const byteArray = new Uint8Array(Array.from(byteCharacters, c => c.charCodeAt(0)));
      const blob = new Blob([byteArray], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);

      setAudioUrl(url);
      if (audioRef.current) audioRef.current.src = url;
    } catch (error) {
      console.error("TTS Error:", error);
      alert("Failed to generate audio.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => generateAudio(text), 1000);
    return () => debounceTimeout.current && clearTimeout(debounceTimeout.current);
  }, [text]);

  const handlePlay = () => {
    if (!audioUrl || !audioRef.current) return;

    setCurrentWordIndex(0);
    audioRef.current.play();

    // Simulate word-by-word caption reading
    const wordDuration = 600; // milliseconds per word (adjust as needed)
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index >= words.length) {
        clearInterval(interval);
        setCurrentWordIndex(-1);
      } else {
        setCurrentWordIndex(index);
      }
    }, wordDuration);

    audioRef.current.onended = () => {
      clearInterval(interval);
      setCurrentWordIndex(-1);
    };
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "tts-audio.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Hindi TTS with Reading Caption</h2>
      <textarea
        className="border p-2 w-full mb-4"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          onClick={handlePlay}
          disabled={!audioUrl || loading}
        >
          {loading ? "Loading..." : "Play"}
        </button>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={handleDownload}
          disabled={!audioUrl || loading}
        >
          Download
        </button>
      </div>
      <div className="bg-gray-100 p-3 rounded text-lg leading-relaxed min-h-[80px]">
        {words.map((word, idx) => (
          <span
            key={idx}
            className={idx === currentWordIndex ? "bg-yellow-300 font-bold" : ""}
          >
            {word}{" "}
          </span>
        ))}
      </div>
      <audio ref={audioRef} controls className="mt-4 w-full" />
    </div>
  );
};

export default TextToSpeech;
