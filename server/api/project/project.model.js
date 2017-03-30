const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: {
      type: String,
      required: [true, 'A project name is required']
    },
    description: {
      type: String,
      required: [true, 'A project description is required']
    },
    image: {
      type: String, default: ''
    },
    completed: {
      type: Boolean,
      default: false,
    },
    location: { type: { type: String }, coordinates: [Number] },
    address:{type:String},
    isAwareness: Boolean,
    isEducation: Boolean,
    isPoverty: Boolean,
    isAnimals: Boolean,
    isEcology: Boolean,
    isHealth: Boolean,
    isElderly: Boolean,
    isImmigrationAndDisplacement: Boolean,
    isWater: Boolean,
    isPolitics: Boolean,
    isDisasterRelief: Boolean,
    isDisabled: Boolean,
    isOther: Boolean,
  },{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

projectSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Project', projectSchema);
