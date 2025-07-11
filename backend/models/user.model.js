import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 1,
      maxLength: 250,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Email address is not valid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minLength: 6,
      select: false, // exclude while querying
    },
    role: {
      type: [String],
      enum: ["admin", "manager", "user"],
      default: ["user"],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one role must be specified",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

//Hash passwords before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.emailExists = async function (email)  {
  return await this.exists({ email });
};

const User = mongoose.model("User", userSchema);
export default User;
