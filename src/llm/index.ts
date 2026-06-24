/**
 * LLM Orchestrator
 *
 * Main entry point for LLM-powered diagram generation
 */

import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';
import { DIAGRAM_GENERATION_SYSTEM_PROMPT, buildUserPrompt } from './prompts/system';
import { parseLLMOutput } from './parser';
import { validateLLMOutput, validateAnimationTargets } from './validator';
import {
  DiagramRequest,
  LLMResponse,
  LLMProviderConfig,
  ValidationResult,
} from './types';

export type { LLMProviderConfig, DiagramRequest, LLMResponse, ValidationResult };

export class LLMOrchestrator {
  private config: LLMProviderConfig;
  private provider: OpenAIProvider | AnthropicProvider;

  constructor(config: LLMProviderConfig) {
    this.config = config;

    if (config.provider === 'openai') {
      this.provider = new OpenAIProvider(config);
    } else if (config.provider === 'anthropic') {
      this.provider = new AnthropicProvider(config);
    } else {
      throw new Error(`Unsupported LLM provider: ${config.provider}`);
    }
  }

  /**
   * Generate diagram from natural language description
   */
  async generateDiagram(request: DiagramRequest): Promise<LLMResponse> {
    // Build prompts
    const userPrompt = buildUserPrompt(request);

    // Call LLM
    const llmResponse = await this.provider.generate(
      DIAGRAM_GENERATION_SYSTEM_PROMPT,
      userPrompt
    );

    // Parse response
    let parsed;
    try {
      parsed = parseLLMOutput(llmResponse.content);
    } catch (error) {
      throw new Error(`Failed to parse LLM output: ${error}`);
    }

    // Validate output
    const validation = validateLLMOutput(parsed);
    if (!validation.valid) {
      throw new Error(
        `LLM output validation failed:\n${validation.errors.join('\n')}`
      );
    }

    // Log warnings
    if (validation.warnings) {
      for (const warning of validation.warnings) {
        console.warn(`LLM Warning: ${warning}`);
      }
    }

    // Validate animation targets
    const targetValidation = validateAnimationTargets(parsed.svg, parsed.animations);
    if (targetValidation.warnings) {
      for (const warning of targetValidation.warnings) {
        console.warn(`Target Warning: ${warning}`);
      }
    }

    return {
      svg: parsed.svg,
      animations: parsed.animations,
      css: parsed.css,
      explanation: parsed.explanation,
      tokens: llmResponse.tokens,
    };
  }

  /**
   * Validate a diagram request without calling LLM
   */
  validateRequest(request: DiagramRequest): ValidationResult {
    const errors: string[] = [];

    if (!request.description || request.description.trim().length === 0) {
      errors.push('Description is required');
    }

    if (request.dimensions) {
      if (request.dimensions.width <= 0 || request.dimensions.height <= 0) {
        errors.push('Dimensions must be positive numbers');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// ============================================================================
// Factory Function
// ============================================================================

export function createLLMOrchestrator(config: LLMProviderConfig): LLMOrchestrator {
  return new LLMOrchestrator(config);
}
