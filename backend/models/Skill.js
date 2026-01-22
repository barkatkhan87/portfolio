import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'],
    },
    proficiency: {
      type: Number,
      required: [true, 'Proficiency level is required'],
      min: [0, 'Proficiency must be at least 0'],
      max: [100, 'Proficiency cannot exceed 100'],
    },
    icon: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      default: '#667eea',
    },
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

skillSchema.index({ category: 1, order: 1 });

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;