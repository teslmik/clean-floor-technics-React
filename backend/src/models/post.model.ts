import { Schema, model } from 'mongoose';

import { PostType } from '../types';

const PostSchema = new Schema<PostType>({
  imageUrl: String,
  text: [String],
  title: String,
  deletedAt: Date,
},
  {
    timestamps: true,
  });

export default model<PostType>('Post', PostSchema);