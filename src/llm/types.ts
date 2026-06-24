/**
 * LLM Integration Types
 */

import { AnimationConfig } from '../types';
import { EasingType } from '../types';

// ============================================================================
// Diagram Request/Response Types
// ============================================================================

export interface DiagramRequest {
  description: string;
  style?: DiagramStyle;
  animations?: AnimationHint[];
  outputFormat?: 'gif' | 'mp4' | 'webm';
  dimensions?: { width: number; height: number };
}

export type DiagramStyle =
  | 'ppt-flat'        // Current style: pastel, white bg
  | 'dark-tech'       // Dark bg, neon accents
  | 'academic'        // Clean, minimal
  | 'hand-drawn';     // Sketch style

export interface AnimationHint {
  target: string;      // Element selector or description
  effect: 'fade-in' | 'slide' | 'pulse' | 'draw' | 'bounce';
  timing?: 'stagger' | 'sequence' | 'simultaneous';
}

export interface LLMResponse {
  svg: string;
  animations: AnimationConfig[];
  css?: string;
  explanation?: string;
  tokens: { input: number; output: number };
}

// ============================================================================
// LLM Provider Types
// ============================================================================

export type LLMProvider = 'openai' | 'anthropic';

export interface LLMProviderConfig {
  provider: LLMProvider;
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMProviderResponse {
  content: string;
  tokens: { input: number; output: number };
}

// ============================================================================
// Validation Types
// ============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings?: string[];
}

// ============================================================================
// Parsed Output Types
// ============================================================================

export interface ParsedLLMOutput {
  svg: string;
  animations: AnimationConfig[];
  css?: string;
  explanation?: string;
}
