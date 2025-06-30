const moongoose = require('mongoose');

const userSchema = new moongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' }
},{ timestamps: true });

module.exports = moongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model with fields for name, email, password, and role.
// The schema includes validation rules such as required fields and unique email addresses.
// The model is then exported for use in other parts of the application.    