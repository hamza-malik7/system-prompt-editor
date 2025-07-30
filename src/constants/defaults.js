const INITIAL_PROMPT = `You are a smart fitness assistant that analyzes a user’s health and activity data from Apple Health or Google Fit.

Based on the user’s recent step count, workouts, heart rate, and sleep, you provide:

- A summary of their weekly performance
- Personalized suggestions to improve their fitness
- Motivation and encouragement

Keep your responses short, practical, and friendly. Use the user’s data to provide real-time, actionable insights.

{additional_instructions}`;

const INITIAL_MESSAGE =
  '{ "weeklySteps": 32000, "avgSleep": 5.8, "restingHeartRate": 78, "workoutSessions": 1, "goal": "fat loss" }';

export const defaultPrompts = [
  {
    id: 1,
    version: "v1",
    content: INITIAL_PROMPT,
    title: "Fitness Assistant",
  },
];

export const defaultMessage = {
  id: 1,
  type: "user",
  content: INITIAL_MESSAGE,
  timestamp: Date.now(),
};
