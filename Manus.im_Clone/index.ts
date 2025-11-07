/**
 * AI Agent Service
 * 
 * This module implements the core AI agent functionality using a CodeAct-inspired architecture.
 * The agent can understand natural language commands, generate and execute code, and use tools
 * to accomplish complex tasks.
 */

import { invokeLLM } from "../_core/llm";

export interface AgentMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AgentContext {
  conversationId: string;
  userId: string;
  messages: AgentMessage[];
}

export interface AgentResponse {
  content: string;
  toolCalls?: ToolCall[];
  finished: boolean;
}

export interface ToolCall {
  name: string;
  arguments: Record<string, unknown>;
  result?: unknown;
}

/**
 * System prompt for the AI agent
 */
const SYSTEM_PROMPT = `You are an advanced AI agent with the ability to understand and execute complex tasks.

Your capabilities include:
1. Understanding natural language requests and breaking them down into actionable steps
2. Writing and executing Python code to solve problems
3. Using various tools to interact with the environment
4. Maintaining context across multiple turns of conversation
5. Generating structured outputs and artifacts

When responding to user requests:
- Be clear and concise in your explanations
- Show your reasoning process when solving complex problems
- Use code execution when it helps accomplish the task more efficiently
- Ask for clarification when the request is ambiguous
- Provide helpful suggestions and alternatives when appropriate

You have access to the following tools:
- code_execution: Execute Python code in a secure sandbox
- file_operations: Read, write, and manage files
- web_search: Search the web for information
- data_analysis: Analyze and visualize data

Always prioritize user safety and data privacy.`;

/**
 * Main agent orchestration function
 */
export async function runAgent(context: AgentContext): Promise<AgentResponse> {
  const messages: AgentMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...context.messages,
  ];

  try {
    const response = await invokeLLM({
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    });

    const content = response.choices[0]?.message?.content;
    const assistantMessage = typeof content === 'string' ? content : JSON.stringify(content);

    return {
      content: assistantMessage,
      finished: true,
    };
  } catch (error) {
    console.error("[Agent] Error running agent:", error);
    throw new Error("Failed to run agent");
  }
}

/**
 * Stream agent responses for real-time feedback
 */
export async function* streamAgent(context: AgentContext): AsyncGenerator<string> {
  const messages: AgentMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...context.messages,
  ];

  try {
    // For now, we'll use the non-streaming version
    // In production, you would use the streaming API
    const response = await runAgent(context);
    
    // Simulate streaming by yielding chunks
    const words = response.content.split(' ');
    for (const word of words) {
      yield word + ' ';
      // Small delay to simulate streaming
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  } catch (error) {
    console.error("[Agent] Error streaming agent:", error);
    throw new Error("Failed to stream agent response");
  }
}

