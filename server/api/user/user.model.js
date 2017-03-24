const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email:    String,
    password: String,
    role: {
      type: String,
      enum : ['Collaborator', 'Leader', 'Provider'],
      default : 'Collaborator'
    },
    isAwareness: Boolean,
    isEducation: Boolean,
    isPoverty: Boolean,
    isAnimals: Boolean,
    isEcology: Boolean,
    isHealth: Boolean,
    isElderly: Boolean,
    isInmigrationAndDisplacement: Boolean,
    isWater: Boolean,
    isPolitics: Boolean,
    isDisasterRelief: Boolean,
    isOther: Boolean,
    pic: {
      type: String, default: ''
    }
  },{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;


// {
//   "username": "Carlos",
//   "email":    "Carlos@email",
//   "password": "Password"
//   "role": "Contributor",
//   "pic": "picpath"
// }
