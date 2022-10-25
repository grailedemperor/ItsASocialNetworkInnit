const { Schema, model } = require('mongoose');
const validator = require('validator');
const thoughtSchema = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    userId:{
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'invalid email']
    },
    thoughts: [{ type : Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type : Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

userSchema.virtual('friendCount').get(function (){
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;
