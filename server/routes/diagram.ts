/**
 * Diagram API Routes
 */

import { Router, Request, Response } from 'express';
import { LLMOrchestrator } from '../../src/llm';
import { SVGAnimationPipeline } from '../../src/pipeline';
import { LLMProviderConfig } from '../../src/llm/types';

const router = Router();

// In-memory job store (replace with Redis in production)
const jobs = new Map<string, {
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress?: number;
  result?: any;
  error?: string;
  createdAt: Date;
}>();

/**
 * POST /api/diagram/generate
 * Generate and render diagram from natural language description
 */
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { description, style, llmConfig, outputConfig } = req.body;

    // Validate request
    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Description is required' });
    }

    if (!llmConfig?.apiKey) {
      return res.status(400).json({ error: 'LLM API key is required' });
    }

    // Create job ID
    const jobId = `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Initialize job status
    jobs.set(jobId, {
      status: 'queued',
      progress: 0,
      createdAt: new Date(),
    });

    // Process async
    processDiagramJob(jobId, description, style, llmConfig, outputConfig).catch(err => {
      const job = jobs.get(jobId);
      if (job) {
        job.status = 'failed';
        job.error = err.message;
      }
    });

    res.json({
      jobId,
      status: 'queued',
      message: 'Diagram generation started',
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/diagram/preview
 * Generate SVG preview only (no rendering)
 */
router.post('/preview', async (req: Request, res: Response) => {
  try {
    const { description, style, llmConfig } = req.body;

    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Description is required' });
    }

    if (!llmConfig?.apiKey) {
      return res.status(400).json({ error: 'LLM API key is required' });
    }

    const orchestrator = new LLMOrchestrator(llmConfig);
    const llmResponse = await orchestrator.generateDiagram({
      description,
      style: style || 'ppt-flat',
      dimensions: { width: 1400, height: 950 },
    });

    res.json({
      svg: llmResponse.svg,
      animations: llmResponse.animations,
      explanation: llmResponse.explanation,
      tokens: llmResponse.tokens,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/diagram/status/:jobId
 * Get job status and progress
 */
router.get('/status/:jobId', async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json({
    jobId,
    status: job.status,
    progress: job.progress,
    result: job.status === 'completed' ? job.result : undefined,
    error: job.status === 'failed' ? job.error : undefined,
  });
});

/**
 * GET /api/diagram/download/:jobId
 * Download generated output file
 */
router.get('/download/:jobId', async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job || job.status !== 'completed' || !job.result?.output) {
    return res.status(404).json({ error: 'Output not found' });
  }

  res.download(job.result.output);
});

/**
 * GET /api/diagram/jobs
 * List all jobs (for debugging)
 */
router.get('/jobs', async (req: Request, res: Response) => {
  const jobList = Array.from(jobs.entries()).map(([id, job]) => ({
    jobId: id,
    status: job.status,
    createdAt: job.createdAt,
  }));

  res.json({ jobs: jobList });
});

// ============================================================================
// Background Job Processor
// ============================================================================

async function processDiagramJob(
  jobId: string,
  description: string,
  style: string,
  llmConfig: LLMProviderConfig,
  outputConfig: any
): Promise<void> {
  const job = jobs.get(jobId);
  if (!job) return;

  try {
    // Update status to processing
    job.status = 'processing';
    job.progress = 10;

    // Create LLM orchestrator
    const orchestrator = new LLMOrchestrator(llmConfig);

    // Generate diagram with LLM
    const llmResponse = await orchestrator.generateDiagram({
      description,
      style: style as any || 'ppt-flat',
      dimensions: {
        width: outputConfig?.width || 1400,
        height: outputConfig?.height || 950,
      },
    });

    job.progress = 40;

    // Create pipeline
    const pipeline = new SVGAnimationPipeline({
      input: llmResponse.svg,
      output: outputConfig?.output || `./output/${jobId}.gif`,
      fps: outputConfig?.fps || 30,
      duration: outputConfig?.duration || 6000,
      width: outputConfig?.width || 1400,
      height: outputConfig?.height || 950,
      background: outputConfig?.background,
      quality: outputConfig?.quality || 'high',
      preserveNativeAnimations: !!llmResponse.css,
    });

    // Add animations
    pipeline.addAnimations(llmResponse.animations);

    // Set CSS if provided
    if (llmResponse.css) {
      pipeline.setStyles(llmResponse.css);
    }

    job.progress = 50;

    // Render
    const result = await pipeline.render();

    // Update job with result
    job.status = 'completed';
    job.progress = 100;
    job.result = {
      output: result.output,
      frames: result.frames,
      duration: result.duration,
      fps: result.fps,
      explanation: llmResponse.explanation,
      tokens: llmResponse.tokens,
    };
  } catch (error: any) {
    job.status = 'failed';
    job.error = error.message;
    throw error;
  }
}

export default router;
