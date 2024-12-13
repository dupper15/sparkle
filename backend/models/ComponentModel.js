const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const componentSchema = new Schema({
        type: { type: String, required: true, enum: ['Image', 'Text', 'Shape'] },
        opacity: {type: Number, required: true, default:1},
        zIndex: {type: Number, required: true, default:1},
        rotate: {type: Number, required: true, default:0},
}, {
        discriminatorKey: 'type',
        // _id: false,
});

const Component = mongoose.model('Component', componentSchema);
module.exports = Component;