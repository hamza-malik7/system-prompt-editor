import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

export const generateTitle = async (promptContent) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that writes short titles. Provide a concise title, maximum 3 words, that captures the purpose or topic of the following system prompt. Respond ONLY with the title, no quotes, no extra text.",
        },
        {
          role: "user",
          content: promptContent,
        },
      ],
      max_tokens: 6,
      temperature: 0.5,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI title generation error:", error);
    return "Untitled";
  }
};

export const sendChatMessage = async (
  systemPrompt,
  userMessage,
  conversationHistory = [],
  model = "gpt-4o-mini"
) => {
  try {
    const messages = [
      {
        role: "system",
        content: systemPrompt.replace("{additional_instructions}", ""),
      },
      ...conversationHistory.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      })),
      {
        role: "user",
        content: userMessage,
      },
    ];

    const completion = await openai.chat.completions.create({
      model,
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);

    if (error.code === "insufficient_quota" || error.status === 429) {
      return "I'm currently experiencing high demand. This is a demo response showing how the system would work with proper API access.";
    }

    if (error.code === "invalid_api_key" || error.status === 401) {
      return "API key not configured. This is a demo response. To use real AI responses, please add your OpenAI API key to the environment variables.";
    }

    return "I apologize, but I'm having trouble connecting to the AI service right now. This is a demo response to show how the interface works.";
  }
};

export default { sendChatMessage };
