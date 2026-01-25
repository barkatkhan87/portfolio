// backend/models/SaleProject.js
import mongoose from 'mongoose';

const saleProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      lowercase: true,
      // we will enforce uniqueness via index below, not here
    },

    shortDescription: {
      type: String,
      required: true,
      maxlength: 300,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
      enum: ['INR', 'USD'],
    },

    category: {
      type: String,
      enum: ['react', 'angular', 'java', 'dotnet', 'csharp', 'node', 'python', 'other'],
      default: 'react',
    },

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    duration: {
      type: String,
      default: '',
      // e.g. "3 Days", "1 Week"
    },

    implementationGuide: {
      type: String,
      default: '',
      // text / markdown - how to run / deploy
    },

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    includes: [
      {
        type: String,
        trim: true,
      },
    ],

    demoUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },

    // WhatsApp link or contact URL (no payment integration yet)
    contactUrl: {
      type: String,
      trim: true,
    },

    thumbnail: {
      public_id: String,
      url: {
        type: String,
        required: true,
      },
    },

    images: [
      {
        public_id: String,
        url: String,
      },
    ],

    isVisible: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Auto-generate a UNIQUE slug, even for duplicate titles
saleProjectSchema.pre('save', async function (next) {
  // Only when title is new/changed
  if (!this.isModified('title')) return next();

  const baseSlug = this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  let slug = baseSlug;
  let counter = 1;

  // this.constructor refers to the model
  const SaleProject = this.constructor;

  // Loop until we find a unique slug
  // Example: portfolio-website, portfolio-website-1, portfolio-website-2
  while (await SaleProject.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  this.slug = slug;
  next();
});

// ✅ Unique index on slug (single place)
saleProjectSchema.index({ slug: 1 }, { unique: true });
saleProjectSchema.index({ isFeatured: 1, order: 1 });

const SaleProject = mongoose.model('SaleProject', saleProjectSchema);
export default SaleProject;