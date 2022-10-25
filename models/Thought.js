const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    //   get: 
    // },
    username: {
      type: String,
      required: true,
      ref: 'User',
    },
    reactions: [reactionSchema]
  },
  {
    timestamps: {createdAt: true},
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function (){
  return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
