interface TranslationResponse {
  pipelineResponse: Array<{
    output: Array<{
      target: string;
    }>;
  }>;
}

export class TranslationService {
  private static cache = new Map<string, string>();

  static async translateText(text: string, targetLanguage: string): Promise<string> {
    // Return original text for English
    if (targetLanguage === "en-IN") {
      return text;
    }

    // Check cache first
    const cacheKey = `${text}_${targetLanguage}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // Extract language code (hi from hi-IN)
      const targetLangCode = targetLanguage.split("-")[0];

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
            input: [{ source: text }],
            audio: []
          }
        })
      });

      const data: TranslationResponse = await response.json();
      const translatedText = data?.pipelineResponse?.[0]?.output?.[0]?.target || text;
      
      // Cache the translation
      this.cache.set(cacheKey, translatedText);
      
      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return original text on error
    }
  }

  static async translateSlideContent(slide: any, targetLanguage: string) {
    if (targetLanguage === "en-IN") {
      return slide;
    }

    try {
      const [translatedTitle, translatedContent] = await Promise.all([
        slide.title ? this.translateText(slide.title, targetLanguage) : Promise.resolve(""),
        this.translateText(slide.content, targetLanguage)
      ]);

      // Translate examples if they exist
      let translatedExamples = slide.examples;
      if (slide.examples && slide.examples.length > 0) {
        translatedExamples = await Promise.all(
          slide.examples.map(async (example: any) => ({
            problem: await this.translateText(example.problem, targetLanguage),
            solution: await this.translateText(example.solution, targetLanguage)
          }))
        );
      }

      return {
        ...slide,
        title: translatedTitle,
        content: translatedContent,
        examples: translatedExamples
      };
    } catch (error) {
      console.error("Error translating slide content:", error);
      return slide;
    }
  }
}
