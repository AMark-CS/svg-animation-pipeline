/**
 * OpenAI Provider
 */

import { LLMProviderConfig, LLMProviderResponse } from '../types';

export class OpenAIProvider {
  private config: LLMProviderConfig;

  constructor(config: LLMProviderConfig) {
    this.config = config;
  }

  async generate(systemPrompt: string, userPrompt: string): Promise<LLMProviderResponse> {
    const model = this.config.model || 'gpt-4o';
    const temperature = this.config.temperature ?? 0.7;
    const maxTokens = this.config.maxTokens ?? 4096;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const data = await response.json() as any;

    return {
      content: data.choices[0].message.content,
      tokens: {
        input: data.usage.prompt_tokens,
        output: data.usage.completion_tokens,
      },
    };
  }
}
