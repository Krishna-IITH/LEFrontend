import { ClassroomContent, ContentSegment, ExpertProfile } from '../types/classroom';

export const expertProfile: ExpertProfile = {
  id: '1',
  name: 'Dr. Sophia Chen',
  title: 'Professor of Quantum Physics',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
  bio: "Dr. Chen is a renowned expert in quantum mechanics with over 15 years of teaching experience. She has published numerous papers on quantum entanglement and has been recognized with multiple teaching excellence awards."
};

export const classroomContent: ClassroomContent = {
  id: 'quantum-101',
  title: 'Introduction to Quantum Physics',
  description: 'A comprehensive introduction to the fascinating world of quantum physics, covering fundamental concepts and their implications.',
  totalDuration: 480, // 8 minutes
  languages: ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Bengali", "Gujarati", "Marathi", "Punjabi", "Odia", "Assamese", "Urdu", "Bhojpuri"],
  segments: [
    {
      id: 'seg-1',
      type: 'text',
      content: 'Welcome to our introduction to quantum physics. Today, we will explore the fundamental principles that govern the behavior of matter and energy at the smallest scales.',
      timestamp: 0,
      duration: 10,
      language: 'English'
    },
    {
      id: 'seg-2',
      type: 'text',
      content: 'Quantum physics emerged in the early 20th century when scientists discovered that classical physics could not explain certain phenomena observed at atomic and subatomic levels.',
      timestamp: 10,
      duration: 12,
      language: 'English'
    },
    {
      id: 'seg-3',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      timestamp: 22,
      duration: 8,
      language: 'English'
    },
    {
      id: 'seg-4',
      type: 'text',
      content: 'One of the core principles of quantum mechanics is wave-particle duality. This concept suggests that all particles exhibit both wave-like and particle-like properties, depending on how we observe them.',
      timestamp: 30,
      duration: 15,
      language: 'English'
    },
    {
      id: 'seg-5',
      type: 'text',
      content: 'The famous double-slit experiment demonstrates this duality. When individual particles like electrons are fired through two slits, they create an interference pattern typical of waves.',
      timestamp: 45,
      duration: 13,
      language: 'English'
    },
    {
      id: 'seg-6',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1634542984003-e0fb8e200e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      timestamp: 58,
      duration: 10,
      language: 'English'
    },
    {
      id: 'seg-7',
      type: 'text',
      content: 'Another key concept is quantum superposition, which states that particles can exist in multiple states simultaneously until they are measured or observed.',
      timestamp: 68,
      duration: 11,
      language: 'English'
    },
    {
      id: 'seg-8',
      type: 'text',
      content: "Schrödinger's cat thought experiment illustrates this principle. In this scenario, a cat in a sealed box can be both alive and dead simultaneously until the box is opened and the cat's state is observed.",
      timestamp: 79,
      duration: 14,
      language: 'English'
    },
    {
      id: 'seg-9',
      type: 'text',
      content: 'Quantum entanglement is perhaps the most mysterious aspect of quantum physics. Einstein famously referred to it as "spooky action at a distance."',
      timestamp: 93,
      duration: 10,
      language: 'English'
    },
    {
      id: 'seg-10',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      timestamp: 103,
      duration: 12,
      language: 'English'
    }
  ]
};

export const hindiTranslation: ContentSegment[] = [
  {
    id: 'seg-1-hi',
    type: 'text',
    content: 'हमारी क्वांटम भौतिकी की परिचयात्मक कक्षा में आपका स्वागत है। आज हम उन मूलभूत सिद्धांतों का अन्वेषण करेंगे जो पदार्थ और ऊर्जा के सबसे छोटे स्तरों पर व्यवहार को नियंत्रित करते हैं।',
    timestamp: 0,
    duration: 10,
    language: 'Hindi'
  },
  {
    id: 'seg-2-hi',
    type: 'text',
    content: 'क्वांटम भौतिकी 20वीं सदी की शुरुआत में उत्पन्न हुई जब वैज्ञानिकों ने पाया कि पारंपरिक भौतिकी कुछ घटनाओं की व्याख्या नहीं कर सकती थी जो परमाणु और उप-परमाणु स्तर पर देखी गई थीं।',
    timestamp: 10,
    duration: 12,
    language: 'Hindi'
  },
  {
    id: 'seg-4-hi',
    type: 'text',
    content: 'क्वांटम यांत्रिकी के मूलभूत सिद्धांतों में से एक तरंग-कण द्वैत है। यह अवधारणा बताती है कि प्रत्येक कण में तरंग और कण दोनों के गुण होते हैं, जो इस पर निर्भर करता है कि हम उनका अवलोकन कैसे करते हैं।',
    timestamp: 30,
    duration: 15,
    language: 'Hindi'
  }
];

export const teluguTranslation: ContentSegment[] = [
  {
    id: 'seg-1-te',
    type: 'text',
    content: 'మా క్వాంటం ఫిజిక్స్ పరిచయంలోకి స్వాగతం. నేడు మనం పదార్థం మరియు శక్తి అత్యంత సూక్ష్మ స్థాయిలలో ఎలా ప్రవర్తిస్తాయో వివరిస్తున్న ప్రాముఖ్యమైన సూత్రాలను అన్వేషిస్తాము.',
    timestamp: 0,
    duration: 10,
    language: 'Telugu'
  },
  {
    id: 'seg-2-te',
    type: 'text',
    content: 'క్వాంటం ఫిజిక్స్ 20వ శతాబ్దం ప్రారంభంలో ఉద్భవించింది, ఎందుకంటే శాస్త్రవేత్తలు కనుగొన్నారు कि సాంప్రదాయ భౌతిక శాస్త్రం కొన్ని పరమాణు మరియు ఉప-పరమాణు స్థాయిలో కనిపించే సంఘటనలను వివరించలేకపోయింది.',
    timestamp: 10,
    duration: 12,
    language: 'Telugu'
  },
  {
    id: 'seg-4-te',
    type: 'text',
    content: 'క్వాంటం మెకానిక్స్ యొక్క ఒక ప్రాథమిక సూత్రం తరం-కణ ద్వంద్వత్వం. ఈ భావన ప్రతి కణం ఒక తరం మరియు ఒక కణం లక్షణాలను కలిగి ఉంటుందని సూచిస్తుంది, అది మనం వాటిని ఎలా గమనిస్తున్నామో అనుసరించి ఉంటుంది.',
    timestamp: 30,
    duration: 15,
    language: 'Telugu'
  }
];

export const tamilTranslation: ContentSegment[] = [
  {
    id: 'seg-1-ta',
    type: 'text',
    content: 'எங்கள் குவாண்டம் இயற்பியல் அறிமுகத்திற்கு வரவேற்கின்றோம். இன்று, பொருள் மற்றும் ஆற்றல் மிகச் சிறிய அளவுகளில் எப்படி நடந்து கொள்கின்றன என்பதை வரையறுக்கும் அடிப்படை கொள்கைகளை ஆராய்வோம்.',
    timestamp: 0,
    duration: 10,
    language: 'Tamil'
  },
  {
    id: 'seg-2-ta',
    type: 'text',
    content: 'குவாண்டம் இயற்பியல் 20ஆம் நூற்றாண்டின் ஆரம்பத்தில் உருவானது, ஏனெனில் விஞ்ஞானிகள் கண்டுபிடித்தனர் कि பாரம்பரிய இயற்பியல் சில அணு மற்றும் உப-அணு அளவிலான நிகழ்வுகளை விளக்க முடியவில்லை.',
    timestamp: 10,
    duration: 12,
    language: 'Tamil'
  },
  {
    id: 'seg-4-ta',
    type: 'text',
    content: 'குவாண்டம் மெக்கானிக்ஸின் அடிப்படை கொள்கைகளில் ஒன்று அலையில்-துகளியியல் இருபரிமாணம் ஆகும். இந்தக் கருத்து ஒவ்வொரு துகளும் ஒரு அலையும், ஒரு துகளுமாக செயல்படும் என்பதை விளக்குகிறது, நாம் அதை எப்படி கவனிக்கிறோம் என்பதற்கு ஏற்ப.',
    timestamp: 30,
    duration: 15,
    language: 'Tamil'
  }
];

export const kannadaTranslation: ContentSegment[] = [
  {
    id: 'seg-1-kn',
    type: 'text',
    content: 'ನಮ್ಮ ಕ್ವಾಂಟಂ ಭೌತಶಾಸ್ತ್ರದ ಪರಿಚಯಕ್ಕೆ ಸ್ವಾಗತ. ಇಂದು, ನಾವು ಅತಿ ಸೂಕ್ಷ್ಮ ಮಟ್ಟದಲ್ಲಿ ಪದಾರ್ಥ ಮತ್ತು ಶಕ್ತಿಯ ನಡವಳಿಕೆಯನ್ನು ನಿಯಂತ್ರಿಸುವ ಮೂಲಭೂತ ತತ್ವಗಳನ್ನು ಅನ್ವೇಷಿಸೋಣ.',
    timestamp: 0,
    duration: 10,
    language: 'Kannada'
  },
  {
    id: 'seg-2-kn',
    type: 'text',
    content: 'ಕ್ವಾಂಟಂ ಭೌತಶಾಸ್ತ್ರವು 20ನೇ ಶತಮಾನದ ಆರಂಭದಲ್ಲಿ ಬೆಳೆಯಿತು, ಏಕೆಂದರೆ ವಿಜ್ಞಾನಿಗಳು ಕಂಡುಕೊಂಡರು कि ಸಾಂಪ್ರದಾಯಿಕ ಭೌತಶಾಸ್ತ್ರವು ಅಣು ಮತ್ತು ಉಪ-ಅಣು ಮಟ್ಟದಲ್ಲಿ ಗಮನಿಸಿದ ಕೆಲವು ಘಟನೆಗಳನ್ನು ವಿವರಿಸಲಾಗದಿತ್ತು.',
    timestamp: 10,
    duration: 12,
    language: 'Kannada'
  },
  {
    id: 'seg-4-kn',
    type: 'text',
    content: 'ಕ್ವಾಂಟಂ ಮೆಕಾನಿಕ್ಸ್‌ನ ಪ್ರಮುಖ ತತ್ವಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ ತರಂಗ-ಕಣ ದ್ವಂದ್ವ. ಈ ತತ್ವವು ಪ್ರತಿಯೊಂದು ಕಣವೂ ತರಂಗ ಮತ್ತು ಕಣ ಎರಡರ ಗುಣಗಳನ್ನು ಹೊಂದಿರುತ್ತದೆ ಎಂದು ಸೂಚಿಸುತ್ತದೆ, ಅದು ನಾವು ಅದನ್ನು ಹೇಗೆ ಗಮನಿಸುತ್ತೇವೆ ಎಂಬುದರ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿದೆ.',
    timestamp: 30,
    duration: 15,
    language: 'Kannada'
  }
];

export const malayalamTranslation: ContentSegment[] = [
  {
    id: 'seg-1-ml',
    type: 'text',
    content: 'ഞങ്ങളുടെ ക്വാണ്ടം ഭൗതികശാസ്ത്രത്തിന്റെ പരിചയപ്പെടുത്തലിലേക്ക് സ്വാഗതം. ഇന്ന്, ഏറ്റവും ചെറുതായ അളവുകളിൽ ദ്രവ്യവും ഊർജ്ജവും എങ്ങനെ പ്രവർത്തിക്കുന്നു എന്നതിനെ നിയന്ത്രിക്കുന്ന അടിസ്ഥാന സിദ്ധാന്തങ്ങൾ പരിശോധിക്കാം.',
    timestamp: 0,
    duration: 10,
    language: 'Malayalam'
  },
  {
    id: 'seg-2-ml',
    type: 'text',
    content: 'ക്വാണ്ടം ഭൗതികശാസ്ത്രം 20-ആം നൂറ്റാണ്ടിന്റെ തുടക്കത്തിൽ ഉദ്ഭവിച്ചു, കാരണം ശാസ്ത്രജ്ഞർ കണ്ടെത്തിയത് സാംസ്കാരിക ഭൗതികശാസ്ത്രം ചില ആണു, ഉപ-ആണു തലത്തിലുള്ള പ്രതിഭാസങ്ങളെ വിശദീകരിക്കാനാകില്ല.',
    timestamp: 10,
    duration: 12,
    language: 'Malayalam'
  },
  {
    id: 'seg-4-ml',
    type: 'text',
    content: 'ക്വാണ്ടം മെക്കാനിക്സിന്റെ അടിസ്ഥാന സിദ്ധാന്തങ്ങളിൽ ഒന്ന് തരംഗ-കണ ദ്വിത്വത്വമാണ്. ഈ ആശയം ഓരോ കണത്തിനും തരംഗവും കണവുമുള്ള പ്രത്യേകതകൾ ഉണ്ടെന്ന് സൂചിപ്പിക്കുന്നു, അതിന് നമ്മൾ അതിനെ എങ്ങനെ നിരീക്ഷിക്കുമെന്നതിനെ ആശ്രയിച്ചിരിക്കും.',
    timestamp: 30,
    duration: 15,
    language: 'Malayalam'
  }
];

export const bengaliTranslation: ContentSegment[] = [
  {
    id: 'seg-1-bn',
    type: 'text',
    content: 'আমাদের কোয়ান্টাম পদার্থবিজ্ঞানের পরিচিতিতে আপনাকে স্বাগতম। আজ আমরা সেই মৌলিক নীতিগুলি অন্বেষণ করব, যা পদার্থ এবং শক্তির সবচেয়ে ছোট স্তরগুলির আচরণ নিয়ন্ত্রণ করে।',
    timestamp: 0,
    duration: 10,
    language: 'Bengali'
  },
  {
    id: 'seg-2-bn',
    type: 'text',
    content: 'কোয়ান্টাম পদার্থবিজ্ঞান ২০শ শতকের শুরুতে উদ্ভূত হয়, যখন বিজ্ঞানীরা আবিষ্কার করেন যে প্রচলিত পদার্থবিজ্ঞান কিছু পারমাণবিক এবং উপ-পারমাণবিক পর্যায়ে ঘটিত ঘটনাগুলোর ব্যাখ্যা দিতে পারছে না।',
    timestamp: 10,
    duration: 12,
    language: 'Bengali'
  },
  {
    id: 'seg-4-bn',
    type: 'text',
    content: 'কোয়ান্টাম মেকানিক্সের অন্যতম মৌলিক নীতি হল তরঙ্গ-কণা দ্বৈততা। এই ধারণা বলে যে প্রতিটি কণার তরঙ্গ এবং কণার উভয় বৈশিষ্ট্য বিদ্যমান থাকে, যা আমরা কিভাবে তা পর্যবেক্ষণ করি তার উপর নির্ভর করে।',
    timestamp: 30,
    duration: 15,
    language: 'Bengali'
  }
];

export const gujaratiTranslation: ContentSegment[] = [
  {
    id: 'seg-1-gu',
    type: 'text',
    content: 'આજની ક્વાંટમ ભૌતિકશાસ્ત્ર પરિચયમાં આપનું સ્વાગત છે. આજે આપણે એ મૂળભૂત સિદ્ધાંતોનું અન્વેષણ કરીશું, જે અતિ નાની સ્કેલ પર પદાર્થ અને ઊર્જાના વર્તનને નિયંત્રિત કરે છે.',
    timestamp: 0,
    duration: 10,
    language: 'Gujarati'
  },
  {
    id: 'seg-2-gu',
    type: 'text',
    content: 'ક્વાંટમ ભૌતિકશાસ્ત્ર 20મી સદીની શરૂઆતમાં ઉદ્ભવ્યું, કારણ કે વૈજ્ઞાનિકોએ શોધ્યું કે પરંપરાગત ભૌતિકશાસ્ત્ર કેટલાક પરમાણુ અને ઉપ-પરમાણુ સ્તરે અવલોકિત ઘટનાઓને સમજાવી શકતું નથી.',
    timestamp: 10,
    duration: 12,
    language: 'Gujarati'
  },
  {
    id: 'seg-4-gu',
    type: 'text',
    content: 'ક્વાંટમ મિકેનિક્સના મુખ્ય સિદ્ધાંતોમાંનું એક છે તરંગ-કણ દ્વૈત. આ સિદ્ધાંત સૂચવે છે કે દરેક કણમાં તરંગ અને કણ બંનેની વિશેષતાઓ હોય છે, જે આપણે તેને કેવી રીતે નિરીક્ષીએ તે પર આધાર રાખે છે.',
    timestamp: 30,
    duration: 15,
    language: 'Gujarati'
  }
];

export const marathiTranslation: ContentSegment[] = [
  {
    id: 'seg-1-mr',
    type: 'text',
    content: 'आमच्या क्वांटम भौतिकशास्त्र परिचयात तुमचे स्वागत आहे. आज आपण त्या मूलभूत तत्वांचा अभ्यास करू, जे अत्यंत लहान प्रमाणात पदार्थ आणि ऊर्जेच्या वर्तनावर नियंत्रण ठेवतात.',
    timestamp: 0,
    duration: 10,
    language: 'Marathi'
  },
  {
    id: 'seg-2-mr',
    type: 'text',
    content: 'क्वांटम भौतिकशास्त्र २०व्या शतकाच्या सुरुवातीस उदयास आले, कारण शास्त्रज्ञांनी शोधले की पारंपारिक भौतिकशास्त्र काही अणु आणि उप-अणु स्तरावरील निरीक्षणे स्पष्ट करू शकत नाही.',
    timestamp: 10,
    duration: 12,
    language: 'Marathi'
  },
  {
    id: 'seg-4-mr',
    type: 'text',
    content: 'क्वांटम यांत्रिकीच्या मुख्य तत्वांपैकी एक म्हणजे तरंग-कण द्वैत. या संकल्पनेनुसार प्रत्येक कणाकडे तरंग आणि कण या दोन्हीचे गुणधर्म असतात, जे आपण त्यास कसे पाहतो यावर अवलंबून असते.',
    timestamp: 30,
    duration: 15,
    language: 'Marathi'
  }
];

export const odiaTranslation: ContentSegment[] = [
  {
    id: 'seg-1-or',
    type: 'text',
    content: 'ଆମର କ୍ୱାଣ୍ଟମ୍ ପଦାର୍ଥ ବିଜ୍ଞାନ ପରିଚୟରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ। ଆଜି ଆମେ ସେହି ମୌଳିକ ସିଦ୍ଧାନ୍ତଗୁଡ଼ିକ ଅନୁସନ୍ଧାନ କରିବୁ, ଯେଉଁଗୁଡ଼ିକ ଅତ୍ୟନ୍ତ ଛୋଟ ପରିମାପରେ ପଦାର୍ଥ ଏବଂ ଶକ୍ତିର ବ୍ୟବହାର ନିୟନ୍ତ୍ରଣ କରେ।',
    timestamp: 0,
    duration: 10,
    language: 'Odia'
  },
  {
    id: 'seg-2-or',
    type: 'text',
    content: 'କ୍ୱାଣ୍ଟମ୍ ପଦାର୍ଥ ବିଜ୍ଞାନ 20ମ୍ ଶତାବ୍ଦୀର ଆରମ୍ଭରେ ଉଦ୍ଭବିତ ହୋଇଥିଲା, କାରଣ ବିଜ୍ଞାନୀମାନେ ଖୋଜି ପାଇଲେ ଯେ ପାରମ୍ପାରିକ ପଦାର୍ଥ ବିଜ୍ଞାନ କିଛି ଆଣୁ ଏବଂ ଉପ-ଆଣୁ ତହଲର ଅନ୍ଧ୍ୟାନ୍ଧ୍ୟ ଘଟଣାଗୁଡ଼ିକ ବ୍ଯଖ୍ଯା କରିପାରିନଥିଲା।',
    timestamp: 10,
    duration: 12,
    language: 'Odia'
  },
  {
    id: 'seg-4-or',
    type: 'text',
    content: 'କ୍ୱାଣ୍ଟମ୍ ଯାନ୍ତ୍ରିକତାର ମୌଳିକ ସିଦ୍ଧାନ୍ତଗୁଡ଼ିକ ମଧ୍ଯରୁ ଗୋଟିଏ ହେଉଛି ତରଙ୍ଗ-ଅଣୁ ଦ୍ବୈତତ୍ୱ। ଏହି ଧାରଣା ଦର୍ଶାଏ ଯେ ପ୍ରତ୍ୟେକ ଅଣୁର ତରଙ୍ଗ ଏବଂ ଅଣୁ ଦୁହିଁ ଗୁଣ ଅଛି, ଯାହା ଆମେ ଏହା କିପରି ଅବଲୋକନ କରୁଛୁ ତାହାର ଉପରେ ନିର୍ଭର କରେ।',
    timestamp: 30,
    duration: 15,
    language: 'Odia'
  }
];

export const assameseTranslation: ContentSegment[] = [
  {
    id: 'seg-1-as',
    type: 'text',
    content: 'আমাৰ কোয়ান্টাম পদাৰ্থ বিজ্ঞানৰ পৰিচয়লৈ স্বাগতম। আজিৰ পাঠত আমি সৰু আকাৰত পদাৰ্থ আৰু শক্তিৰ আচৰণ নিয়ন্ত্ৰণ কৰা মৌলিক নীতিসমূহ অন্বেষণ কৰিব।',
    timestamp: 0,
    duration: 10,
    language: 'Assamese'
  },
  {
    id: 'seg-2-as',
    type: 'text',
    content: 'কোয়ান্টাম পদাৰ্থ বিজ্ঞান বিংশ শতাব্দীৰ আৰম্ভণিত জন্ম লাভ কৰিছিল, যেতিয়া বিজ্ঞানীসকলে আৱিষ্কাৰ কৰিছিল যে প্রচলিত পদাৰ্থ বিজ্ঞান কিছুমান আণৱিক আৰু উপ-আণৱিক স্তৰৰ ঘটনা ব্যাখ্যা কৰিব নোৱাৰে।',
    timestamp: 10,
    duration: 12,
    language: 'Assamese'
  },
  {
    id: 'seg-4-as',
    type: 'text',
    content: 'কোয়ান্টাম মেকানিক্সৰ অন্যতম মৌলিক নীতি হ’ল তরঙ্গ-কণা দ্বৈত্ব। এই ধাৰণাটো কৈছে যে প্ৰতিটো কণাই তরঙ্গ আৰু কণা উভয় বৈশিষ্ট্য দেখুৱাব পাৰে, যিবিধ প্ৰকাৰে আমি তাক অৱলোকন কৰো তাৰ ওপৰত নিৰ্ভৰ কৰে।',
    timestamp: 30,
    duration: 15,
    language: 'Assamese'
  }
];

export const urduTranslation: ContentSegment[] = [
  {
    id: 'seg-1-ur',
    type: 'text',
    content: 'ہماری کوانٹم فزکس کے تعارف میں خوش آمدید۔ آج ہم ان بنیادی اصولوں کا جائزہ لیں گے جو انتہائی چھوٹے پیمانے پر مادہ اور توانائی کے رویے کو کنٹرول کرتے ہیں۔',
    timestamp: 0,
    duration: 10,
    language: 'Urdu'
  },
  {
    id: 'seg-2-ur',
    type: 'text',
    content: 'کوانٹم فزکس بیسویں صدی کے آغاز میں اس وقت سامنے آئی جب سائنسدانوں نے دریافت کیا کہ روایتی فزکس کچھ جوہری اور ذیلی جوہری سطح پر نظر آنے والے مظاہر کی وضاحت نہیں کر سکتی۔',
    timestamp: 10,
    duration: 12,
    language: 'Urdu'
  },
  {
    id: 'seg-4-ur',
    type: 'text',
    content: 'کوانٹم میکینکس کے بنیادی اصولوں میں سے ایک لہر-ذرہ دوگانگی ہے۔ یہ تصور بتاتا ہے کہ ہر ذرہ لہر اور ذرہ دونوں کی خصوصیات رکھتا ہے، جو اس بات پر منحصر ہے کہ ہم اسے کس طرح مشاہدہ کرتے ہیں۔',
    timestamp: 30,
    duration: 15,
    language: 'Urdu'
  }
];

export const bhojpuriTranslation: ContentSegment[] = [
  {
    id: 'seg-1-bh',
    type: 'text',
    content: 'हमार क्वांटम फिजिक्स के परिचय में रउरा सबके स्वागत बा। आज हमनी ओह बुनियादी सिध्दांतन के खोज करब, जे बहुत छोट स्तर पर पदार्थ आ ऊर्जा के व्यवहार के नियंत्रित करेला।',
    timestamp: 0,
    duration: 10,
    language: 'Bhojpuri'
  },
  {
    id: 'seg-2-bh',
    type: 'text',
    content: 'क्वांटम फिजिक्स बीसवीं सदी के शुरुआत में आइल, जब वैज्ञानिक लोगन देखलन कि पारंपरिक भौतिकी कुछ अणु आ उप-अणु स्तर पर होखेवाला घटनन के सही से समझा ना सकत रहे।',
    timestamp: 10,
    duration: 12,
    language: 'Bhojpuri'
  },
  {
    id: 'seg-4-bh',
    type: 'text',
    content: 'क्वांटम मैकेनिक्स के एगो मुख्य सिध्दांत हवे तरंग-कण द्वैत। ई अवधारणा कहेला कि हर कण में तरंग आ कण दुनो के गुण होला, जे हमनी ओकरा के कइसे देखनी, ओह पर निर्भर करेला।',
    timestamp: 30,
    duration: 15,
    language: 'Bhojpuri'
  }
];

export const sanskritTranslation: ContentSegment[] = [
  {
    id: 'seg-1-sa',
    type: 'text',
    content: 'क्वाण्टम् भौतिकस्य परिचयाय स्वागतम्। अद्य वयं तेषां मूलतत्त्वानां परीक्षणं करिष्यामः, ये सूक्ष्मतमेषु स्तरेषु द्रव्यस्य ऊर्जायाश्च आचरणं नियच्छन्ति।',
    timestamp: 0,
    duration: 10,
    language: 'Sanskrit'
  },
  {
    id: 'seg-2-sa',
    type: 'text',
    content: 'क्वाण्टम् भौतिकं बीसशताब्द्याः आरम्भे समुत्पन्नम्, यदा वैज्ञानिकाः अवलोकितवन्तः यत् परम्परागतं भौतिकं काञ्चन सूक्ष्म परमाण्वीय-उपपरमाण्वीय-स्तरेषु दृश्यमानं घटनाम् व्याख्यातुं अशक्तम्।',
    timestamp: 10,
    duration: 12,
    language: 'Sanskrit'
  },
  {
    id: 'seg-4-sa',
    type: 'text',
    content: 'क्वाण्टम् यान्त्रिकस्य मुख्यतत्त्वेषु एकः तरङ्ग-कण-द्वैत्यं अस्ति। एषः संकल्पः सूचयति यत् सर्वाणि कणानि तरङ्गस्य कणस्य च गुणान् वहन्ति, यथा वयं तान् निरीक्षामहे तथा।',
    timestamp: 30,
    duration: 15,
    language: 'Sanskrit'
  }
];


export const punjabiTranslation: ContentSegment[] = [
  {
    id: 'seg-1-pa',
    type: 'text',
    content: 'ਸਾਡੀ ਕuantਮ ਭੌਤਿਕੀ ਦੀ ਪਰਿਚਯ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਅੱਜ ਅਸੀਂ ਉਨ੍ਹਾਂ ਮੁੱਢਲੇ ਨਿਯਮਾਂ ਦੀ ਪੜਚੋਲ ਕਰਾਂਗੇ ਜੋ ਪਦਾਰਥ ਅਤੇ ਊਰਜਾ ਦੇ ਸਭ ਤੋਂ ਛੋਟੇ ਪੱਧਰਾਂ ਤੇ ਵਿਵਹਾਰ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕਰਦੇ ਹਨ।',
    timestamp: 0,
    duration: 10,
    language: 'Punjabi'
  },
  {
    id: 'seg-2-pa',
    type: 'text',
    content: 'ਕuantਮ ਭੌਤਿਕੀ 20ਵੀਂ ਸਦੀ ਦੀ ਸ਼ੁਰੂਆਤ ਵਿੱਚ ਉਤਪੰਨ ਹੋਈ, ਜਦੋਂ ਵਿਗਿਆਨੀਆਂ ਨੇ ਪਤਾ ਲਗਾਇਆ ਕਿ ਪਰੰਪਰਿਕ ਭੌਤਿਕੀ ਕੁਝ ਉਹ ਘਟਨਾਵਾਂ ਦੀ ਵਿਆਖਿਆ ਨਹੀਂ ਕਰ ਸਕਦੀ ਜੋ ਐਟਮਿਕ ਅਤੇ ਉਪ-ਐਟਮਿਕ ਪੱਧਰ ਤੇ ਹੋ ਰਹੀਆਂ ਸਨ।',
    timestamp: 10,
    duration: 12,
    language: 'Punjabi'
  },
  {
    id: 'seg-4-pa',
    type: 'text',
    content: 'ਕuantਮ ਮਕੈਨਿਕਸ ਦੇ ਮੁੱਢਲੇ ਨਿਯਮਾਂ ਵਿੱਚੋਂ ਇੱਕ ਹੈ ਲਹਿਰ-ਕਣ ਦੁਅਲਤਾ। ਇਹ ਸੰਕਲਪ ਦਰਸਾਉਂਦਾ ਹੈ ਕਿ ਹਰ ਕਣ ਵਿੱਚ ਲਹਿਰ ਅਤੇ ਕਣ ਦੋਵਾਂ ਦੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਹੁੰਦੀਆਂ ਹਨ, ਜੋ ਇਸ ਗੱਲ ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ ਕਿ ਅਸੀਂ ਉਸਦੀ ਪੜਚੋਲ ਕਿਵੇਂ ਕਰਦੇ ਹਾਂ।',
    timestamp: 30,
    duration: 15,
    language: 'Punjabi'
  }
];


export const spanishTranslation: ContentSegment[] = [
  {
    id: 'seg-1-es',
    type: 'text',
    content: 'Bienvenidos a nuestra introducción a la física cuántica. Hoy exploraremos los principios fundamentales que gobiernan el comportamiento de la materia y la energía en las escalas más pequeñas.',
    timestamp: 0,
    duration: 10,
    language: 'Spanish'
  },
  {
    id: 'seg-2-es',
    type: 'text',
    content: 'La física cuántica surgió a principios del siglo XX cuando los científicos descubrieron que la física clásica no podía explicar ciertos fenómenos observados a niveles atómicos y subatómicos.',
    timestamp: 10,
    duration: 12,
    language: 'Spanish'
  },
  {
    id: 'seg-4-es',
    type: 'text',
    content: 'Uno de los principios fundamentales de la mecánica cuántica es la dualidad onda-partícula. Este concepto sugiere que todas las partículas exhiben propiedades tanto de onda como de partícula, dependiendo de cómo las observemos.',
    timestamp: 30,
    duration: 15,
    language: 'Spanish'
  }
];

export const frenchTranslation: ContentSegment[] = [
  {
    id: 'seg-1-fr',
    type: 'text',
    content: "Bienvenue à notre introduction à la physique quantique. Aujourd'hui, nous explorerons les principes fondamentaux qui régissent le comportement de la matière et de l'énergie aux plus petites échelles.",
    timestamp: 0,
    duration: 10,
    language: 'French'
  },
  {
    id: 'seg-2-fr',
    type: 'text',
    content: 'La physique quantique est apparue au début du XXe siècle lorsque les scientifiques ont découvert que la physique classique ne pouvait pas expliquer certains phénomènes observés aux niveaux atomique et subatomique.',
    timestamp: 10,
    duration: 12,
    language: 'French'
  }
];

export const chineseTranslation: ContentSegment[] = [
  {
    id: 'seg-1-zh',
    type: 'text',
    content: '欢迎来到我们的量子物理入门课程。今天，我们将探索在最小尺度上支配物质和能量行为的基本原理。',
    timestamp: 0,
    duration: 10,
    language: 'Chinese'
  },
  {
    id: 'seg-2-zh',
    type: 'text',
    content: '量子物理学起源于20世纪初，当时科学家们发现经典物理学无法解释在原子和亚原子水平上观察到的某些现象。',
    timestamp: 10,
    duration: 12,
    language: 'Chinese'
  }
];

export const getContentByLanguage = (language: string): ContentSegment[] => {
  const baseContent = [...classroomContent.segments];
  
  if (language === 'English') {
    return baseContent;
  }
  
  if (language === 'Spanish') {
    // Replace English content with Spanish where translations exist
    return baseContent.map(segment => {
      const spanishSegment = spanishTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return spanishSegment || {...segment, language: 'English'};
    });
  }
  
  if (language === 'French') {
    // Replace English content with French where translations exist
    return baseContent.map(segment => {
      const frenchSegment = frenchTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return frenchSegment || {...segment, language: 'English'};
    });
  }
  
  if (language === 'Chinese') {
    // Replace English content with Chinese where translations exist
    return baseContent.map(segment => {
      const chineseSegment = chineseTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return chineseSegment || {...segment, language: 'English'};
    });
  }
  
  if (language === 'Spanish') {
    return baseContent.map(segment => {
      const translatedSegment = spanishTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Hindi') {
    return baseContent.map(segment => {
      const translatedSegment = hindiTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Telugu') {
    return baseContent.map(segment => {
      const translatedSegment = teluguTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Tamil') {
    return baseContent.map(segment => {
      const translatedSegment = tamilTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Kannada') {
    return baseContent.map(segment => {
      const translatedSegment = kannadaTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Malayalam') {
    return baseContent.map(segment => {
      const translatedSegment = malayalamTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Bengali') {
    return baseContent.map(segment => {
      const translatedSegment = bengaliTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Gujarati') {
    return baseContent.map(segment => {
      const translatedSegment = gujaratiTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Marathi') {
    return baseContent.map(segment => {
      const translatedSegment = marathiTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Punjabi') {
    return baseContent.map(segment => {
      const translatedSegment = punjabiTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Odia') {
    return baseContent.map(segment => {
      const translatedSegment = odiaTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Assamese') {
    return baseContent.map(segment => {
      const translatedSegment = assameseTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Urdu') {
    return baseContent.map(segment => {
      const translatedSegment = urduTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Bhojpuri') {
    return baseContent.map(segment => {
      const translatedSegment = bhojpuriTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  } else if (language === 'Sanskrit') {
    return baseContent.map(segment => {
      const translatedSegment = sanskritTranslation.find(s => s.timestamp === segment.timestamp && s.type === segment.type);
      return translatedSegment || { ...segment, language: 'English' };
    });
  }
  
  return baseContent;
};
