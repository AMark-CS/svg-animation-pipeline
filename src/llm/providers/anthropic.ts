/**
 * Anthropic Provider
 */

import { LLMProviderConfig, LLMProviderResponse } from '../types';

export class AnthropicProvider {
  private config: LLMProviderConfig;

  constructor(config: LLMProviderConfig) {
    this.config = config;
  }

  async generate(systemPrompt: string, userPrompt: string): Promise<LLMProviderResponse> {
    const model = this.config.model || 'claude-3-5-sonnet-20241022';
    const maxTokens = this.config.maxTokens ?? 4096;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${response.status} - ${error}`);
    }

    const data = await response.json() as any;

    return {
      content: data.content[0].text,
      tokens: {
        input: data.usage.input_tokens,
        output: data.usage.output_tokens,
      },
    };
  }
}
