import { Post } from '@/definitions/post.definition';
import mongoose, { Document, Schema, Types } from 'mongoose';

// NOTE: MongoDB
export interface PostDocument extends Post, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    reactions: {
      likes: {
        type: Number,
        default: 0,
      },
      dislikes: {
        type: Number,
        default: 0,
      },
    },
    views: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PostModel = mongoose.model<PostDocument>(
  'Post',
  postSchema,
  'posts', // optional collection name (defaults to pluralized model name if not provided)
);
