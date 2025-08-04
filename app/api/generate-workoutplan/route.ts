import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { parse } from "path";

const openAI = new OpenAI({
    apiKey: process.env.OPEN_ROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
})

export const POST = async (req: NextRequest) => {
    try {
        const { goal, level, availableDays, equipment } = await req.json();

        const equipmentList = Array.isArray(equipment) ? equipment : [];
        console.log(equipmentList)

        const prompt = `
You are a certified personal trainer, and your task is to create a weekly workout plan. The plan must be tailored to the following individual profile:

- **Goal**: ${goal} (e.g., muscle gain, fat loss, endurance, general fitness)
- **Experience level**: ${level} (e.g., beginner, intermediate, advanced)
- **Available training days per week**: ${availableDays}
- **Available equipment**: ${equipmentList.length ? equipmentList.join(", ") : "no equipment"}

The plan should be well-balanced and safe, including a warm-up, main exercises, and optional accessory work or cardio for each day. Ensure the workouts are realistic and sustainable, considering the user's available days and equipment.

The final response must be a single, valid JSON object. Do not include any text before or after the JSON.

Each workout day should be a key in the JSON (e.g., "Day 1", "Day 2"), and its value should be an object with the following structure:

\`\`\`json
{
  "Day 1": {
    "WarmUp": "string with instructions. Use \\n for line breaks.",
    "MainExercise": "string with exercise list. Use \\n for line breaks.",
    "AccessoryExercise": "string with optional exercises. Use \\n for line breaks.",
    "Cardio": "string with cardio options. Use \\n for line breaks."
  }
}
\`\`\`

Here's a more specific example to follow:

\`\`\`json
{
  "Day 1": {
    "WarmUp": "5-10 minute dynamic warm-up:\\n- Jump rope: 2 minutes\\n- Arm circles: 1 minute (30s each direction)\\n- Bodyweight squats: 2x10\\n- Hip openers: 1 minute",
    "MainExercise": "Upper Body Focus:\\n- Push-ups: 3 sets of 12 reps (2 min rest)\\n- Dumbbell Shoulder Press: 3 sets of 10 reps (2 min rest)\\n- Bent-over Rows: 3 sets of 10 reps (90s rest)\\n- Plank: 3 sets of 30 seconds (60s rest)",
    "AccessoryExercise": "Accessory Work:\\n- Resistance Band Pull-aparts: 3 sets of 15 reps (60s rest)\\n- Bicep Curls: 2 sets of 12 reps (60s rest)",
    "Cardio": "Optional Cardio:\\n- 15-minute brisk walk or cycling at a moderate pace\\n- OR 10-minute jump rope intervals (30s on/30s off)"
  }
}
\`\`\`

Remember to strictly adhere to the JSON format, using \\n for all line breaks and providing a full, complete JSON object as the final output.
`;

        // Send the prompt to the AI model
        const response = await openAI.chat.completions.create({
            model: "meta-llama/llama-3.2-3b-instruct:free",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 1500,
        })

        // Extract the AI's response
        const aiContent = response.choices[0].message.content?.trim();

        let parsedWorkoutPlan: { [day: string]: DailyWorkout } = {};
        console.log("AI Response:", aiContent);

        try {
            parsedWorkoutPlan = JSON.parse(aiContent!);
        } catch (error) {
            console.error("Failed to parse AI response:", error);
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
        }

        if (typeof parsedWorkoutPlan !== "object" || parsedWorkoutPlan === null) {
            return NextResponse.json({ error: "Failed to parse workout plan, please try again." }, { status: 500 });
        }

        return NextResponse.json({ trainingPlan: parsedWorkoutPlan }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

interface DailyWorkout {
    WarmUp?: string;
    MainExercise?: string;
    AccessoryExercise?: string;
    Cardio?: string;
}