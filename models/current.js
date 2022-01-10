const { Schema, model } = require("mongoose");
const Joi = require("joi");

const currentSchema = Schema(
  {
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

const joiSchema = Joi.object({
  content: Joi.string().required(),
});

const Current = model("current", currentSchema);

module.exports = {
  Current,
  joiSchema,
};
