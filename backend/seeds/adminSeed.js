import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import User from '../models/User.js';
import About from '../models/About.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Seed admin user
const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
      return existingAdmin;
    }

    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Admin User',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully');
    console.log(`   Email: ${admin.email}`);
    return admin;
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    throw error;
  }
};

// Seed initial about data
const seedAbout = async () => {
  try {
    const existingAbout = await About.findOne();

    if (existingAbout) {
      console.log('⚠️ About data already exists');
      return existingAbout;
    }

    const about = await About.create({
      name: process.env.ADMIN_NAME || 'John Doe',
      title: 'Full Stack Developer',
      subtitle: 'MERN Stack Specialist',
      bio: `I'm a passionate Full Stack Developer with expertise in building 
            modern web applications. I specialize in the MERN stack (MongoDB, 
            Express.js, React.js, Node.js) and love creating clean, efficient, 
            and user-friendly solutions.`,
      shortBio: 'Building digital experiences with modern web technologies.',
      email: process.env.ADMIN_EMAIL || 'hello@example.com',
      location: 'Your City, Country',
      socialLinks: {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://twitter.com/yourusername',
      },
      yearsOfExperience: 3,
      projectsCompleted: 25,
      happyClients: 15,
      experience: [
        {
          company: 'Tech Company',
          position: 'Full Stack Developer',
          duration: '2022 - Present',
          description: 'Building and maintaining web applications using MERN stack.',
          current: true,
        },
      ],
      education: [
        {
          institution: 'University Name',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          duration: '2018 - 2022',
          description: 'Focused on software development and web technologies.',
        },
      ],
      seoTitle: 'John Doe - Full Stack Developer Portfolio',
      seoDescription: 'Professional portfolio of John Doe, a Full Stack Developer specializing in MERN stack development.',
      seoKeywords: ['full stack developer', 'mern stack', 'react developer', 'node.js developer'],
    });

    console.log('✅ About data created successfully');
    return about;
  } catch (error) {
    console.error('❌ Error creating about:', error);
    throw error;
  }
};

// Seed sample skills
const seedSkills = async () => {
  try {
    const existingSkills = await Skill.countDocuments();

    if (existingSkills > 0) {
      console.log('⚠️ Skills already exist');
      return;
    }

    const skills = [
      // Frontend
      { name: 'React.js', category: 'frontend', proficiency: 90, icon: 'fab fa-react', color: '#61DAFB', order: 1 },
      { name: 'JavaScript', category: 'frontend', proficiency: 85, icon: 'fab fa-js', color: '#F7DF1E', order: 2 },
      { name: 'TypeScript', category: 'frontend', proficiency: 75, icon: 'fab fa-js', color: '#3178C6', order: 3 },
      { name: 'HTML5', category: 'frontend', proficiency: 95, icon: 'fab fa-html5', color: '#E34F26', order: 4 },
      { name: 'CSS3', category: 'frontend', proficiency: 90, icon: 'fab fa-css3-alt', color: '#1572B6', order: 5 },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 85, icon: 'fab fa-css3', color: '#06B6D4', order: 6 },

      // Backend
      { name: 'Node.js', category: 'backend', proficiency: 85, icon: 'fab fa-node-js', color: '#339933', order: 1 },
      { name: 'Express.js', category: 'backend', proficiency: 85, icon: 'fab fa-node', color: '#000000', order: 2 },
      { name: 'Python', category: 'backend', proficiency: 70, icon: 'fab fa-python', color: '#3776AB', order: 3 },

      // Database
      { name: 'MongoDB', category: 'database', proficiency: 85, icon: 'fas fa-database', color: '#47A248', order: 1 },
      { name: 'PostgreSQL', category: 'database', proficiency: 70, icon: 'fas fa-database', color: '#336791', order: 2 },
      { name: 'MySQL', category: 'database', proficiency: 75, icon: 'fas fa-database', color: '#4479A1', order: 3 },

      // DevOps
      { name: 'Git', category: 'devops', proficiency: 85, icon: 'fab fa-git-alt', color: '#F05032', order: 1 },
      { name: 'Docker', category: 'devops', proficiency: 65, icon: 'fab fa-docker', color: '#2496ED', order: 2 },
      { name: 'AWS', category: 'devops', proficiency: 60, icon: 'fab fa-aws', color: '#232F3E', order: 3 },

      // Tools
      { name: 'VS Code', category: 'tools', proficiency: 90, icon: 'fas fa-code', color: '#007ACC', order: 1 },
      { name: 'Postman', category: 'tools', proficiency: 85, icon: 'fas fa-paper-plane', color: '#FF6C37', order: 2 },
      { name: 'Figma', category: 'tools', proficiency: 70, icon: 'fab fa-figma', color: '#F24E1E', order: 3 },
    ];

    await Skill.insertMany(skills);
    console.log('✅ Skills created successfully');
  } catch (error) {
    console.error('❌ Error creating skills:', error);
    throw error;
  }
};

// Seed sample projects
const seedProjects = async () => {
  try {
    const existingProjects = await Project.countDocuments();

    if (existingProjects > 0) {
      console.log('⚠️ Projects already exist');
      return;
    }

    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with user authentication, product management, cart functionality, and payment integration.',
        longDescription: 'Built with MERN stack, this e-commerce platform includes features like user authentication, product catalog, shopping cart, checkout process with Stripe integration, order management, and admin dashboard.',
        thumbnail: {
          url: 'https://via.placeholder.com/800x600/667eea/ffffff?text=E-Commerce',
        },
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe'],
        category: 'web',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/ecommerce',
        featured: true,
        status: 'completed',
        order: 1,
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, team workspaces, and progress tracking.',
        longDescription: 'A Trello-like task management app built with React and Node.js. Features include drag-and-drop task management, real-time collaboration using Socket.io, team workspaces, and detailed progress analytics.',
        thumbnail: {
          url: 'https://via.placeholder.com/800x600/764ba2/ffffff?text=Task+Manager',
        },
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
        category: 'web',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/taskmanager',
        featured: true,
        status: 'completed',
        order: 2,
      },
      {
        title: 'Weather Dashboard',
        description: 'A weather dashboard app with location-based forecasts, interactive maps, and weather alerts.',
        thumbnail: {
          url: 'https://via.placeholder.com/800x600/11998e/ffffff?text=Weather+App',
        },
        technologies: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation'],
        category: 'web',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/weather',
        featured: false,
        status: 'completed',
        order: 3,
      },
      {
        title: 'REST API Boilerplate',
        description: 'A production-ready Node.js REST API boilerplate with authentication, validation, and best practices.',
        thumbnail: {
          url: 'https://via.placeholder.com/800x600/38ef7d/ffffff?text=API+Boilerplate',
        },
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Jest'],
        category: 'api',
        githubUrl: 'https://github.com/example/api-boilerplate',
        featured: true,
        status: 'completed',
        order: 4,
      },
    ];

    await Project.insertMany(projects);
    console.log('✅ Sample projects created successfully');
  } catch (error) {
    console.error('❌ Error creating projects:', error);
    throw error;
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('\n🌱 Starting database seeding...\n');
    
    await seedAdmin();
    await seedAbout();
    await seedSkills();
    await seedProjects();
    
    console.log('\n✅ Database seeding completed!\n');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 Admin Login Credentials:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();