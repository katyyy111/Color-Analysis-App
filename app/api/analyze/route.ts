import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { ColorResult, ScoreVector } from '@/types/quiz';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { quizAnswers, calculatedVector, colorSamples, imageBase64 } = await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            season: { type: SchemaType.STRING },
            confidenceScore: { type: SchemaType.STRING },
            primaryAttribute: { type: SchemaType.STRING },
            secondaryAttribute: { type: SchemaType.STRING },
            vectorScores: {
              type: SchemaType.OBJECT,
              properties: {
                temperature: { type: SchemaType.NUMBER },
                value: { type: SchemaType.NUMBER },
                chroma: { type: SchemaType.NUMBER },
              },
              required: ['temperature', 'value', 'chroma'],
            },
            seasonalRankings: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  season: { type: SchemaType.STRING },
                  count: { type: SchemaType.NUMBER },
                },
                required: ['season', 'count'],
              },
            },
            diagnosticExplanations: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
          },
          required: [
            'season',
            'confidenceScore',
            'primaryAttribute',
            'secondaryAttribute',
            'vectorScores',
            'seasonalRankings',
            'diagnosticExplanations',
          ],
        },
      },
    });

    const prompt = `
Jesteś systemem eksperckim analizy kolorystycznej. Przeanalizuj poniższe dane i zwróć diagnozę.

1. MATEMATYCZNY WEKTOR Z QUIZU (skala: temperature, value, chroma):
${JSON.stringify(calculatedVector)}

2. POBRANE PRÓBKI HEX Z CANVAS:
- Policzek: ${colorSamples.skinCheek}
- Czoło: ${colorSamples.skinForehead}
- Tęczówka: ${colorSamples.eyeIris}
- Włosy: ${colorSamples.hairRoot}
- Usta: ${colorSamples.lipFlush}

3. ODPOWIEDZI Z QUIZU:
${JSON.stringify(quizAnswers)}

ZADANIE:
- Przeanalizuj dołączone zdjęcie twarzy i zweryfikuj czy odcienie HEX oraz punkty z quizu odpowiadają temu, co widać na zdjęciu.
- Skoryguj wartości vectorScores (temperature, value, chroma) jeśli zdjęcie i kody HEX wskazują na inny podton niż wynika z samego quizu.
- Przygotuj ranking 3 najbardziej prawdopodobnych typów urody (seasonalRankings) i podaj liczbę punktów dopasowania (count).
- Dodaj wyczerpujące wyjaśnienia diagnostyczne (diagnosticExplanations).
`;

    // Przygotowanie obrazu ze stymulacją Base64
    const imagePart = {
      inlineData: {
        data: imageBase64.split(',')[1] || imageBase64,
        mimeType: 'image/jpeg',
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();

    const colorResult: ColorResult = JSON.parse(responseText);
    return NextResponse.json(colorResult);

  } catch (error) {
    console.error('Błąd podczas przetwarzania API:', error);
    return NextResponse.json({ error: 'Nie udało się przetworzyć analizy.' }, { status: 500 });
  }
}