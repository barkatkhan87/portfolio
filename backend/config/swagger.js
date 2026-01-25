import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API Documentation',
      version: '1.0.0',
      description: `
## Portfolio Backend API

A production-ready REST API for a personal portfolio website built with Node.js, Express, and MongoDB.

### Features:
- 🔐 JWT Authentication
- 📁 Project Management
- 🛠️ Skills Management
- 👤 About/Profile Management
- 📬 Contact Messages
- 📊 Dashboard Statistics

### Authentication:
Most admin endpoints require a Bearer token. Use the **Authorize** button to set your token.
      `,
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development Server',
      },
      {
        url: 'https://your-production-url.com/api',
        description: 'Production Server',
      },
    ],
    tags: [
      { name: 'Health', description: 'API Health Check' },
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Projects', description: 'Project management endpoints' },
      { name: 'Skills', description: 'Skills management endpoints' },
      { name: 'About', description: 'About/Profile management endpoints' },
      { name: 'Messages', description: 'Contact messages endpoints' },
      { name: 'Dashboard', description: 'Dashboard statistics endpoints' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'JWT token stored in cookie',
        },
      },
      schemas: {
        // User Schema
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'admin@example.com' },
            role: { type: 'string', enum: ['admin'], example: 'admin' },
            avatar: {
              type: 'object',
              properties: {
                public_id: { type: 'string' },
                url: { type: 'string', format: 'uri' },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },

        // Project Schema
        Project: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'E-Commerce Platform' },
            slug: { type: 'string', example: 'e-commerce-platform' },
            description: { type: 'string', example: 'A full-featured e-commerce platform' },
            longDescription: { type: 'string' },
            thumbnail: {
              type: 'object',
              properties: {
                public_id: { type: 'string' },
                url: { type: 'string', format: 'uri' },
              },
            },
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  public_id: { type: 'string' },
                  url: { type: 'string', format: 'uri' },
                },
              },
            },
            technologies: {
              type: 'array',
              items: { type: 'string' },
              example: ['React', 'Node.js', 'MongoDB'],
            },
            category: {
              type: 'string',
              enum: ['web', 'mobile', 'desktop', 'api', 'other'],
              example: 'web',
            },
            liveUrl: { type: 'string', format: 'uri' },
            githubUrl: { type: 'string', format: 'uri' },
            featured: { type: 'boolean', default: false },
            status: {
              type: 'string',
              enum: ['completed', 'in-progress', 'planned'],
              example: 'completed',
            },
            order: { type: 'integer', default: 0 },
            isVisible: { type: 'boolean', default: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },

        // Skill Schema
        Skill: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'React.js' },
            category: {
              type: 'string',
              enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'],
              example: 'frontend',
            },
            proficiency: { type: 'integer', minimum: 0, maximum: 100, example: 90 },
            icon: { type: 'string', example: 'fab fa-react' },
            color: { type: 'string', example: '#61DAFB' },
            order: { type: 'integer', default: 0 },
            isVisible: { type: 'boolean', default: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },

        SaleProject: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'E-Commerce Website for Sale' },
            slug: { type: 'string', example: 'e-commerce-website-for-sale' },
            shortDescription: {
              type: 'string',
              example: 'Ready-made MERN e-commerce template with Stripe integration.',
            },
            description: {
              type: 'string',
              example: 'Full detailed description of the sale project...',
            },
            price: { type: 'number', example: 1999 },
            currency: { type: 'string', enum: ['INR', 'USD'], example: 'INR' },
            category: {
              type: 'string',
              enum: ['web', 'mobile', 'desktop', 'api', 'ui', 'other'],
              example: 'web',
            },
            technologies: {
              type: 'array',
              items: { type: 'string' },
              example: ['React', 'Node.js', 'MongoDB'],
            },
            duration: { type: 'string', example: '3 Days' },
            implementationGuide: {
              type: 'string',
              example: '1. Clone repository\n2. Run npm install\n3. Configure env\n4. Run npm start',
            },
            features: {
              type: 'array',
              items: { type: 'string' },
              example: ['Authentication', 'Admin Panel', 'Stripe Payments'],
            },
            includes: {
              type: 'array',
              items: { type: 'string' },
              example: ['Source code', 'Setup guide (PDF)', '1 week support'],
            },
            demoUrl: { type: 'string', format: 'uri', example: 'https://example.com/demo' },
            githubUrl: { type: 'string', format: 'uri', example: 'https://github.com/user/repo' },
            contactUrl: {
              type: 'string',
              format: 'uri',
              example: 'https://wa.me/919999999999?text=I%20want%20to%20buy%20this%20project',
            },
            thumbnail: {
              type: 'object',
              properties: {
                public_id: { type: 'string' },
                url: { type: 'string', format: 'uri' },
              },
            },
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  public_id: { type: 'string' },
                  url: { type: 'string', format: 'uri' },
                },
              },
            },
            isVisible: { type: 'boolean', example: true },
            isFeatured: { type: 'boolean', example: false },
            order: { type: 'integer', example: 0 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
          
        SaleProjectInput: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'E-Commerce Website for Sale' },
            shortDescription: {
              type: 'string',
              example: 'Ready-made MERN e-commerce template with Stripe integration.',
            },
            description: {
              type: 'string',
              example: 'Full detailed description of the sale project...',
            },
            price: { type: 'number', example: 1999 },
            currency: { type: 'string', enum: ['INR', 'USD'], example: 'INR' },
            category: {
              type: 'string',
              enum: ['web', 'mobile', 'desktop', 'api', 'ui', 'other'],
              example: 'web',
            },
            technologies: {
              type: 'string',
              example: 'React, Node.js, MongoDB, Express, Stripe',
            },
            duration: { type: 'string', example: '3 Days' },
            implementationGuide: {
              type: 'string',
              example: '1. Clone repo\n2. Install dependencies\n3. Configure env\n4. Run app',
            },
            features: {
              type: 'string',
              example: 'Login system\nAdmin panel\nStripe payments\nOrder management',
            },
            includes: {
              type: 'string',
              example: 'Source code\nSetup docs\nDatabase schema\n1 week support',
            },
            demoUrl: { type: 'string', format: 'uri', example: 'https://example.com/demo' },
            githubUrl: { type: 'string', format: 'uri', example: 'https://github.com/user/repo' },
            contactUrl: {
              type: 'string',
              format: 'uri',
              example: 'https://wa.me/919999999999?text=I%20want%20to%20buy%20this%20project',
            },
            isVisible: { type: 'boolean', example: true },
            isFeatured: { type: 'boolean', example: false },
            order: { type: 'integer', example: 0 },
          },
        },

        // About Schema
        About: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'John Doe' },
            title: { type: 'string', example: 'Full Stack Developer' },
            subtitle: { type: 'string', example: 'MERN Stack Specialist' },
            bio: { type: 'string' },
            shortBio: { type: 'string' },
            avatar: {
              type: 'object',
              properties: {
                public_id: { type: 'string' },
                url: { type: 'string', format: 'uri' },
              },
            },
            resume: {
              type: 'object',
              properties: {
                public_id: { type: 'string' },
                url: { type: 'string', format: 'uri' },
              },
            },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            location: { type: 'string' },
            socialLinks: {
              type: 'object',
              properties: {
                github: { type: 'string' },
                linkedin: { type: 'string' },
                twitter: { type: 'string' },
                instagram: { type: 'string' },
                youtube: { type: 'string' },
                website: { type: 'string' },
              },
            },
            experience: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  company: { type: 'string' },
                  position: { type: 'string' },
                  duration: { type: 'string' },
                  description: { type: 'string' },
                  current: { type: 'boolean' },
                },
              },
            },
            education: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  institution: { type: 'string' },
                  degree: { type: 'string' },
                  field: { type: 'string' },
                  duration: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
            yearsOfExperience: { type: 'integer' },
            projectsCompleted: { type: 'integer' },
            happyClients: { type: 'integer' },
          },
        },

        // Message Schema
        Message: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'Jane Doe' },
            email: { type: 'string', format: 'email', example: 'jane@example.com' },
            subject: { type: 'string', example: 'Project Inquiry' },
            message: { type: 'string', example: 'I would like to discuss a project...' },
            status: {
              type: 'string',
              enum: ['unread', 'read', 'replied', 'archived'],
              example: 'unread',
            },
            isStarred: { type: 'boolean', default: false },
            repliedAt: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },

        // API Response Schemas
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
            data: { type: 'object' },
          },
        },

        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },

        // Input Schemas
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@example.com' },
            password: { type: 'string', format: 'password', example: 'Admin@123456' },
          },
        },

        ProjectInput: {
          type: 'object',
          required: ['title', 'description', 'category'],
          properties: {
            title: { type: 'string', example: 'My New Project' },
            description: { type: 'string', example: 'Project description here' },
            longDescription: { type: 'string' },
            technologies: { type: 'string', example: 'React, Node.js, MongoDB' },
            category: { type: 'string', enum: ['web', 'mobile', 'desktop', 'api', 'other'] },
            liveUrl: { type: 'string', format: 'uri' },
            githubUrl: { type: 'string', format: 'uri' },
            featured: { type: 'boolean' },
            status: { type: 'string', enum: ['completed', 'in-progress', 'planned'] },
          },
        },

        SkillInput: {
          type: 'object',
          required: ['name', 'category', 'proficiency'],
          properties: {
            name: { type: 'string', example: 'TypeScript' },
            category: { type: 'string', enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'] },
            proficiency: { type: 'integer', minimum: 0, maximum: 100, example: 85 },
            icon: { type: 'string', example: 'fab fa-js' },
            color: { type: 'string', example: '#3178C6' },
            order: { type: 'integer' },
          },
        },

        MessageInput: {
          type: 'object',
          required: ['name', 'email', 'subject', 'message'],
          properties: {
            name: { type: 'string', example: 'Jane Doe' },
            email: { type: 'string', format: 'email', example: 'jane@example.com' },
            subject: { type: 'string', example: 'Project Inquiry' },
            message: { type: 'string', example: 'I would like to discuss a project with you.' },
          },
        },

        Pagination: {
          type: 'object',
          properties: {
            page: { type: 'integer', example: 1 },
            limit: { type: 'integer', example: 10 },
            total: { type: 'integer', example: 50 },
            pages: { type: 'integer', example: 5 },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              example: {
                success: false,
                message: 'Not authorized to access this route',
              },
            },
          },
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              example: {
                success: false,
                message: 'Resource not found',
              },
            },
          },
        },
        ValidationError: {
          description: 'Validation failed',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              example: {
                success: false,
                message: 'Validation failed',
                errors: [
                  { field: 'email', message: 'Email is required' },
                ],
              },
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './docs/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;