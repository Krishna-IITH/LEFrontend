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
  languages: ['English', 'Spanish', 'French', 'Chinese'],
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
  
  return baseContent;
};
