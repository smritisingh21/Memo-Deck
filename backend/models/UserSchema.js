import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: function () {
      return this.authProvider === "local";
    },
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  googleId: {
    type: String,
  },

  profileImageUrl: {
    type: String,
    default: "",
  },

}, { timestamps: true });


//hashing password before saving

// UserSchema.pre("save", async function (next) {

//   if (!this.isModified("password") || !this.password) {
//     return next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// UserSchema.methods.matchPassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password); //comparing entered password with hashed password
// }

export default mongoose.model("User", userSchema);