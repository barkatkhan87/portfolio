import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Professional title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      maxlength: [2000, 'Bio cannot exceed 2000 characters'],
    },
    shortBio: {
      type: String,
      maxlength: [300, 'Short bio cannot exceed 300 characters'],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    resume: {
      public_id: String,
      url: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: String,
    location: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
      youtube: String,
      website: String,
    },
    experience: [
      {
        company: String,
        position: String,
        duration: String,
        description: String,
        current: { type: Boolean, default: false },
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        duration: String,
        description: String,
      },
    ],
    yearsOfExperience: Number,
    projectsCompleted: Number,
    happyClients: Number,
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
  },
  {
    timestamps: true,
  }
);

// Ensure only one about document exists
aboutSchema.statics.getAbout = async function () {
  let about = await this.findOne();
  if (!about) {
    about = await this.create({
      name: 'Your Name',
      title: 'Full Stack Developer',
      bio: 'Add your bio here...',
      email: 'your@email.com',
    });
  }
  return about;
};

const About = mongoose.model('About', aboutSchema);

export default About;