# System Prompt Editor

A React application for testing and iterating on AI system prompts with a live chat interface.

## Features

- **System Prompt Editor**: Rich text editor for creating and editing AI system prompts
- **Version Management**: Save and switch between different versions of your system prompts
- **Live Chat Interface**: Test your prompts in real-time with an interactive chat interface
- **OpenAI Integration**: Powered by OpenAI's GPT models for realistic AI responses
- **Version Tracking**: Each AI response is tagged with the prompt version used

## Setup Instructions

1. **Install Dependencies**

   ```bash
   yarn install
   ```

2. **Configure OpenAI API**

   - Copy `.env.example` to `.env`
   - Add your API key to the `.env` file:
     ```
     REACT_APP_OPENAI_API_KEY=your_actual_api_key_here
     ```

3. **Start Development Server**

   ```bash
   yarn run dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:5173`

## Technologies Used

- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **OpenAI API**
- **Lucide React**

## Notes

- The application uses OpenAI's GPT-4o model by default
