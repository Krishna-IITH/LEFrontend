"use client";
import { useState, useEffect } from "react";
import LanguageSelector from "../tutorial/_components/LanguageSelector";

const TranslatorApp = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("hi-IN");
  const [sourceText, setSourceText] = useState("hello world");
  const [translatedText, setTranslatedText] = useState("");

  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);

    // Extract just "hi" from "hi-IN"
    const targetLangCode = language.split("-")[0];

    const response = await fetch("https://anuvaad-backend.bhashini.co.in/v1/pipeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: "translation",
            config: {
              language: {
                sourceLanguage: "en",
                targetLanguage: targetLangCode
              },
              serviceId: "ai4bharat/indictrans-v2-all-gpu--t4"
            }
          }
        ],
        inputData: {
          input: [{ source: sourceText }],
          audio: []
        }
      })
    });

    const data = await response.json();
    const result = data?.pipelineResponse?.[0]?.output?.[0]?.target || "Translation failed";
    setTranslatedText(result);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Bhashini Translator</h1>
      <textarea
        className="w-full p-2 border"
        rows={3}
        value={sourceText}
        onChange={(e) => setSourceText(e.target.value)}
      />
      <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
      <div className="p-2 border bg-gray-50 rounded">
        <strong>Translated:</strong> {translatedText}
      </div>
    </div>
  );
};

export default TranslatorApp;
