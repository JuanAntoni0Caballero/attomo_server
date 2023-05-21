const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'El nombre de usuario es obligatorio.']
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, 'El email de usuario es obligatorio']
    },
    password: {
      type: String,
      required: [true, 'La contraseña de usuario es obligatoria'],
      minlength: [4, 'La contraseña debe tener 4 o más caracteres']
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
  },
  {
    timestamps: true
  }
);


userSchema.methods.validatePassword = function (userPassword) {
  return this.password === userPassword;
}


const User = model("User", userSchema);

module.exports = User;
