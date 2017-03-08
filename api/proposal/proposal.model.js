const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proposalSchema = new mongoose.Schema({
    _need : { type: Schema.Types.ObjectId, ref: 'Need', required: true },
    _contributor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required : true
    },
    coverage: {
      type: String,
      enum : ['Green', 'Blue'],
      default : 'Green'
    },
    comment: {
      type: String,
      required: [true, 'A project description is required']
    },
    amount: {
      type: Number,
      default: 0
    }
  },{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model('Proposal', proposalSchema);
