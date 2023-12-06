import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;


const articlesSchema = new mongoose.Schema (
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      }
    },
    location: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
      default: new Date().toDateString(),
    },
    category: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    }
  }
);

const Article = mongoose.model("Article", articlesSchema);

export default Article;