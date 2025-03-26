// Text-to-speech utility functions

// Store the speech synthesis instance
let speechSynthesis: SpeechSynthesis;
let speechUtterance: SpeechSynthesisUtterance | null = null;

// Initialize speech synthesis
export const initSpeechSynthesis = (): boolean => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    speechSynthesis = window.speechSynthesis;
    return true;
  }
  return false;
};

// Get available voices
export const getVoices = (): SpeechSynthesisVoice[] => {
  if (!initSpeechSynthesis()) return [];
  return speechSynthesis.getVoices();
};

// Get voices for a specific language
export const getVoicesForLanguage = (langCode: string): SpeechSynthesisVoice[] => {
  const voices = getVoices();
  return voices.filter(voice => voice.lang.startsWith(langCode));
};

// Map language name to correct language codes
export const languageToCode: Record<string, string> = {
  'English': 'en-US',  
  'Spanish': 'es-ES',  
  'French': 'fr-FR',  
  'Chinese': 'zh-CN',  
  'Hindi': 'hi-IN',  
  'Telugu': 'te-IN',  
  'Tamil': 'ta-IN',  
  'Kannada': 'kn-IN',  
  'Malayalam': 'ml-IN',  
  'Bengali': 'bn-IN',  
  'Gujarati': 'gu-IN',  
  'Marathi': 'mr-IN',  
  'Punjabi': 'pa-IN',  
  'Odia': 'or-IN',  
  'Assamese': 'as-IN',  
  'Urdu': 'ur-IN',  
  'Bhojpuri': 'bho-IN',  
  'Sanskrit': 'sa-IN'
};

// Speak text in the given language
export const speakText = (
  text: string, 
  language: string,
  onEnd?: () => void,
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
  }
): void => {
  if (!initSpeechSynthesis()) {
    console.error('Speech synthesis not supported');
    return;
  }
  
  // Cancel any ongoing speech
  stopSpeaking();
  
  // Create a new utterance
  speechUtterance = new SpeechSynthesisUtterance(text);
  
  // Get the language code
  const langCode = languageToCode[language] || 'en-US';  
  const availableVoices = getVoicesForLanguage(langCode);
  
  // Assign voice if available
  if (availableVoices.length > 0) {
    speechUtterance.voice = availableVoices[0];
  } else {
    console.warn(`No voice found for ${language} (${langCode}), using default.`);
  }

  // Set language manually (helps if no matching voice is found)
  speechUtterance.lang = langCode;

  // Set options
  if (options?.rate) speechUtterance.rate = options.rate;
  if (options?.pitch) speechUtterance.pitch = options.pitch;
  if (options?.volume) speechUtterance.volume = options.volume;
  
  // Set callback
  if (onEnd) {
    speechUtterance.onend = onEnd;
  }
  
  // Speak
  speechSynthesis.speak(speechUtterance);
};

// Stop speaking
export const stopSpeaking = (): void => {
  if (!initSpeechSynthesis()) return;
  
  speechSynthesis.cancel();
  speechUtterance = null;
};

// Check if speaking
export const isSpeaking = (): boolean => {
  if (!initSpeechSynthesis()) return false;
  
  return speechSynthesis.speaking;
};
