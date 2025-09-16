import { GoogleGenAI } from "@google/genai";
import { Category } from "../components/CategorySelector";

// Ensure the API key is available
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface Source {
  uri: string;
  title: string;
}

const getPromptForCategory = (newsTopic: string, category: Category): string => {
  const longScriptStructure = `
    El guion debe seguir esta estructura:
    1.  **Gancho (3-5 segundos):** Una pregunta impactante o una afirmación audaz que capture la atención inmediatamente.
    2.  **Desarrollo (30-40 segundos):** Explica el tema de forma clara y concisa. Usa un lenguaje sencillo y directo, como si se lo contaras a un amigo. Aporta datos clave y contexto.
    3.  **Llamada a la acción (5-10 segundos):** Termina con una pregunta abierta para fomentar los comentarios y el debate. Anima a los usuarios a seguir la cuenta para más contenido.

    **Instrucciones de formato:**
    - La longitud del guion debe ser de entre 200 y 230 palabras.
    - Escribe el guion en un único bloque de texto.
    - Usa mayúsculas para enfatizar palabras clave (ej: ¡INCREÍBLE!, ¿SABÍAS QUE...?).
    - NO incluyas indicaciones de producción, efectos visuales o cambios de plano entre paréntesis (como por ejemplo: "(imagen de...)" o "(texto en pantalla...)"). El guion debe contener únicamente el texto para ser hablado por el creador.
    - El idioma debe ser español.
  `;
  
  const shortScriptStructure = `
    **Instrucciones de formato:**
    - La longitud del guion debe ser de entre 10 y 50 palabras.
    - El guion debe ser una única frase o un párrafo muy corto.
    - NO incluyas indicaciones de producción ni estructura de gancho/desarrollo/CTA.
    - Usa un lenguaje poderoso y directo.
    - El idioma debe ser español.
  `;


  const prompts: Record<Category, string> = {
    football: `
      Eres un experto guionista de TikTok especializado en fútbol. Tu tarea es crear un guion corto, dinámico y viral para un vídeo de TikTok de menos de 60 segundos sobre la siguiente noticia o tema de fútbol: "${newsTopic}".
      ${longScriptStructure}
      - El tono debe ser enérgico, un poco polémico pero siempre informativo y entretenido.
      Genera el guion ahora.
    `,
    news: `
      Eres un periodista experto en crear contenido viral para TikTok. Tu tarea es crear un guion corto, informativo y riguroso para un vídeo de TikTok de menos de 60 segundos sobre la siguiente noticia de actualidad (Mundo o Estados Unidos): "${newsTopic}".
      ${longScriptStructure}
      - El tono debe ser serio, directo y objetivo, pero lo suficientemente dinámico para mantener la atención en TikTok.
      Genera el guion ahora.
    `,
    entertainment: `
      Eres un experto en cultura pop y farándula, creando guiones virales para TikTok. Tu tarea es crear un guion corto, entretenido y con un toque de chisme para un vídeo de TikTok de menos de 60 segundos sobre el siguiente tema de farándula: "${newsTopic}".
      ${longScriptStructure}
      - El tono debe ser emocionante, un poco dramático y muy entretenido, como si estuvieras contando un secreto jugoso.
      Genera el guion ahora.
    `,
    funFacts: `
      Eres un creador de contenido de TikTok especializado en 'datos curiosos' y 'sabías que...'. Tu tarea es crear un guion corto, sorprendente y educativo para un vídeo de TikTok de menos de 60 segundos sobre un dato curioso del siguiente personaje famoso o tema: "${newsTopic}".
      ${longScriptStructure}
      - El tono debe ser de asombro y descubrimiento. Usa frases como "¿Sabías que...?" o "Te apostamos a que no conocías esto sobre...".
      Genera el guion ahora.
    `,
    movie: `
      Eres un narrador de cine experto en crear resúmenes virales para TikTok. Tu tarea es crear un guion sobre "${newsTopic}".

      **Estilo de Narración (MUY IMPORTANTE):**
      Debes narrar la historia como una secuencia de eventos, usando frases cortas y directas para crear suspense. No expliques los motivos de los personajes al principio, solo describe sus acciones. El guion debe sumergir al espectador en la trama inmediatamente.
      - La longitud del guion debe ser de entre 270 y 350 palabras.
      
      **Ejemplo de Estilo que DEBES seguir:**
      "Hace mucho calor.
      La mujer se desabrochó el botón del cuello de su blusa.
      El chico, sentado cerca, no dejaba de mirarla, pero ella no se molestó.
      Al regresar a su habitación, dejó la puerta entreabierta, esperando que el chico pasara y pudiera verla.
      De repente, el chico se detuvo cautivado por su figura y luego huyó en pánico.
      Ella cerró la puerta con una sonrisa satisfecha.
      El primer día de clases, la mujer llegó a la escuela como nueva profesora.
      En el camino, se cruzó con el chico y lo reconoció al instante.
      Empezó a seguirlo en secreto.
      Rastreando sus redes sociales, utilizó sus contactos para convertirse en la profesora principal del chico.
      Al entrar al aula, vio al chico conversando en voz baja con una compañera furiosa..."
      
      - NO incluyas la estructura de gancho/desarrollo/CTA. La narración en sí misma es el gancho.
      - NO incluyas indicaciones de producción. Solo el texto a ser narrado.
      - El idioma debe ser español.

      Genera el guion ahora.
    `,
    darkPsychology: `
      Eres un experto y asesor en psicología oscura y comportamiento humano. Tu misión es crear guiones virales para TikTok que eduquen y adviertan a la audiencia sobre técnicas de manipulación.

      Tu tarea es crear un guion sobre: "${newsTopic}".

      **Instrucción Clave:** Si el tema del usuario es vago (ej: "psicología oscura", "dame un tema"), DEBES ELEGIR TÚ MISMO un concepto específico e impactante (como 'refuerzo intermitente', 'la técnica del espejo', 'proyección psicológica', etc.) y basar el guion en él.

      ${longScriptStructure}

      **Tono y Enfoque:**
      - El tono debe ser misterioso, autoritario y fascinante.
      - Explica el concepto complejo de forma SIMPLE y DIRECTA.
      - **OBLIGATORIO:** Incluye un ejemplo práctico y cotidiano para que la audiencia pueda reconocer la técnica en su vida real.
      - El objetivo final es PREVENIR y EMPODERAR, no enseñar a manipular. Deja claro que el conocimiento es para protección.

      Genera el guion ahora.
    `,
    motivation: `
      Eres un coach motivacional y creador de contenido inspirador para TikTok. Tu tarea es crear un guion corto, poderoso y edificante para un vídeo de TikTok de menos de 60 segundos sobre el siguiente tema de motivación: "${newsTopic}".
      ${shortScriptStructure}
      - El tono debe ser enérgico, positivo y directo. Usa frases que inspiren a la acción.
      Genera el guion ahora.
    `,
    religion: `
      Eres un divulgador de temas de espiritualidad y religión, creando contenido reflexivo para TikTok. Tu tarea es crear un guion corto, profundo y respetuoso para un vídeo de TikTok de menos de 60 segundos sobre el siguiente tema: "${newsTopic}".
      ${shortScriptStructure}
      - El tono debe ser sereno, inspirador y que invite a la reflexión.
      Genera el guion ahora.
    `,
  };

  return prompts[category];
};

export const fetchScriptFromGemini = async (
  newsTopic: string,
  category: Category
): Promise<{ script: string; sources: Source[] }> => {
  const model = "gemini-2.5-flash";
  const prompt = getPromptForCategory(newsTopic, category);

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const script = response.text;
    if (!script) {
      throw new Error("No script was generated. The response was empty.");
    }

    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    const sources: Source[] = (groundingChunks || [])
      .map((chunk: any) => ({
        uri: chunk.web?.uri || "",
        title: chunk.web?.title || "Source",
      }))
      .filter((source: Source) => source.uri);

    return { script: script.trim(), sources };
  } catch (error) {
    console.error("Error generating script from Gemini:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate script: ${error.message}`);
    }
    throw new Error(
      "An unknown error occurred while communicating with the Gemini API."
    );
  }
};