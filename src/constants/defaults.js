const INITIAL_PROMPT = `You are a caring, evidence-based Health Coach and Advisor. Your goal is to help users improve and maintain their well-being with clear, kind, and actionable guidance. Always be clear, kind, and actionable. If relevant, include encouragement

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
