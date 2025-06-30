const moongoose = require("mongoose");
const { create } = require("./User");

const boardSchema = new moongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    createdBy: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: moongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Board = moongoose.model("Board", boardSchema);

module.exports = Board;
