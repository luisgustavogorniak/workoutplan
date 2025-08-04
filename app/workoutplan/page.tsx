// components/WorkoutPlanDashboard.tsx
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/spinner";

interface DailyWorkout {
  WarmUp?: string;
  MainExercise?: string;
  AccessoryExercise?: string;
  Cardio?: string;
}

interface WeeklyWorkoutPlan {
  [day: string]: DailyWorkout;
}

interface WorkoutPlanResponse {
  trainingPlan?: WeeklyWorkoutPlan;
  error?: string;
}

interface WorkoutPlanInput {
  goal: string;
  level: string;
  availableDays: number;
  equipment: string[];
}

export default function WorkoutPlanDashboard() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("beginner");
  const [availableDays, setAvailableDays] = useState<number>(3);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [newEquipment, setNewEquipment] = useState("");

  // Initialize the mutation using React Query
  const mutation = useMutation<WorkoutPlanResponse, Error, WorkoutPlanInput>({
    mutationFn: async (payload: WorkoutPlanInput) => {
      const response = await fetch("/api/generate-workoutplan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData: WorkoutPlanResponse = await response.json();
        throw new Error(errorData.error || "Failed to generate workout plan.");
      }

      return response.json();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: WorkoutPlanInput = {
      goal,
      level,
      availableDays,
      equipment,
    };

    mutation.mutate(payload);
  };

  const addEquipment = () => {
    if (newEquipment.trim() && !equipment.includes(newEquipment.trim())) {
      setEquipment([...equipment, newEquipment.trim()]);
      setNewEquipment("");
    }
  };

  const removeEquipment = (item: string) => {
    setEquipment(equipment.filter(e => e !== item));
  };

  // Define the days of the week in order
  const daysOfWeek = [
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5",
    "Day 6",
    "Day 7",
  ];

  // Function to retrieve the workout plan for a specific day
  const getWorkoutPlanForDay = (day: string): DailyWorkout | undefined => {
    if (!mutation.data?.trainingPlan) return undefined;

    return mutation.data.trainingPlan[day];
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Panel: Form */}
        <div className="w-full md:w-1/3 lg:w-1/4 p-6 bg-green-800 text-white">
          <h1 className="text-2xl font-bold mb-6 text-center">
            AI Workout Plan Generator
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fitness Goal */}
            <div>
              <label htmlFor="goal" className="block text-sm font-medium mb-1">
                Fitness Goal
              </label>
              <select
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
                className="w-full px-3 py-2 border border-green-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select your goal</option>
                <option value="muscle gain">Muscle Gain</option>
                <option value="fat loss">Fat Loss</option>
                <option value="endurance">Endurance</option>
                <option value="general fitness">General Fitness</option>
                <option value="strength">Strength</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label htmlFor="level" className="block text-sm font-medium mb-1">
                Experience Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
                className="w-full px-3 py-2 border border-green-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Available Days */}
            <div>
              <label
                htmlFor="availableDays"
                className="block text-sm font-medium mb-1"
              >
                Available Training Days Per Week
              </label>
              <input
                type="number"
                id="availableDays"
                value={availableDays}
                onChange={(e) => setAvailableDays(Number(e.target.value))}
                required
                min={1}
                max={7}
                className="w-full px-3 py-2 border border-blue-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Equipment */}
            <div>
              <label
                htmlFor="equipment"
                className="block text-sm font-medium mb-1"
              >
                Available Equipment
              </label>
              <div className="flex flex-col items-center gap-2">
                <input
                  type="text"
                  id="equipment"
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  className="flex-1 px-3 py-2 border border-green-300 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g., Dumbbells, Resistance Bands"
                />
                <button
                  type="button"
                  onClick={addEquipment}
                  className="bg-green-700 text-white px-3 py-2 rounded-md hover:bg-green-600 cursor-pointer"
                >
                  Add
                </button>
              </div>
              {equipment.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {equipment.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center bg-green-200 text-green-800 text-sm px-2 py-1 rounded"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeEquipment(item)}
                        className="ml-1 text-green-900 hover:text-green-600 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className={`w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors cursor-pointer ${
                  mutation.isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {mutation.isPending ? "Generating..." : "Generate Workout Plan"}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {mutation.isError && (
            <div className="mt-4 p-3 bg-red-200 text-red-800 rounded-md">
              {mutation.error?.message || "An unexpected error occurred."}
            </div>
          )}
        </div>

        {/* Right Panel: Weekly Workout Plan Display */}
        <div className="w-full md:w-2/3 lg:w-3/4 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-green-700">
            Weekly Workout Plan
          </h2>

          {mutation.isSuccess && mutation.data.trainingPlan ? (
            <div className="h-[600px] overflow-y-auto">
              <div className="space-y-6">
                {daysOfWeek.slice(0, availableDays).map((day) => {
                  const workoutPlan = getWorkoutPlanForDay(day);
                  return (
                    <div
                      key={day}
                      className="bg-white shadow-md rounded-lg p-4 border border-blue-200"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-green-700">
                        {day}
                      </h3>
                      {workoutPlan ? (
                        <div className="space-y-3">
                          {workoutPlan.WarmUp && (
                            <div>
                              <h4 className="font-bold text-green-700">🔥 Warm Up:</h4>
                              <p className="whitespace-pre-line">{workoutPlan.WarmUp}</p>
                            </div>
                          )}
                          {workoutPlan.MainExercise && (
                            <div>
                              <h4 className="font-bold text-green-700">💪 Main Exercises:</h4>
                              <p className="whitespace-pre-line">{workoutPlan.MainExercise}</p>
                            </div>
                          )}
                          {workoutPlan.AccessoryExercise && (
                            <div>
                              <h4 className="font-bold text-green-700">🏋️‍♂️ Accessory Exercises:</h4>
                              <p className="whitespace-pre-line">{workoutPlan.AccessoryExercise}</p>
                            </div>
                          )}
                          {workoutPlan.Cardio && (
                            <div>
                              <h4 className="font-bold text-green-700">🏃‍♀️ Cardio:</h4>
                              <p className="whitespace-pre-line">{workoutPlan.Cardio}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500">No workout planned for this day.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : mutation.isPending ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            <p className="text-gray-600">
              Please generate a workout plan to see it here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}