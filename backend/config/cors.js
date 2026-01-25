const prodOrigins = [
  process.env.FRONTEND_URL,
];

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' || 'https://barkatkhan87.github.io'
    ? (origin, cb) => {
        if (!origin) return cb(null, true);
        if (prodOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('Not allowed by CORS'));
      }
    : ['http://localhost:3000'], // Vite dev server

  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['set-cookie'],
};

export default corsOptions;