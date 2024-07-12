import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "Heading is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    link: {
      type: String,
      required: [true, "Link is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

const model = mongoose.model.banners || mongoose.model("banners", bannerSchema);
export default model;
