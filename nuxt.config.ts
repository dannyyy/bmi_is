export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700]
    }
  },
  css: ['~/assets/css/main.css'],
  
  // Production optimizations
  nitro: {
    compressPublicAssets: true,
    minify: true,
    
    // Health check endpoint
    routeRules: {
      '/api/health': { 
        headers: { 'Cache-Control': 'no-cache' },
        prerender: false
      }
    }
  },
  
  // Runtime configuration
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME || 'BMI Calculator',
      appVersion: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'production'
    }
  },
  
  app: {
    head: {
      title: 'BMI Calculator - Professional Health Tool',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional BMI calculator with interactive sliders and real-time calculations' },
        { name: 'robots', content: 'index,follow' },
        { name: 'author', content: 'BMI Calculator App' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '192x192', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  
  // Security headers
  security: {
    headers: {
      contentSecurityPolicy: {
        'base-uri': ["'self'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'img-src': ["'self'", 'data:', 'https:'],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        'upgrade-insecure-requests': true
      }
    }
  },
  
  // Static generation for better performance
  prerender: {
    crawlLinks: false,
    routes: ['/']
  }
})