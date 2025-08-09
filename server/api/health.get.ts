export default defineEventHandler(async (event) => {
  // Basic health check
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production',
    version: process.env.APP_VERSION || '1.0.0',
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
    }
  }

  setHeader(event, 'content-type', 'application/json')
  setHeader(event, 'cache-control', 'no-cache')
  
  return healthCheck
})