const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema(
    {
        left: {type: Number, required: true},
        top: {type: Number, required: true},
        height: {type: Number, required: true},
        width: {type: Number, required: true},
        type: {type: String, required: true},
        opacity: {type: Number, required: true,  default: 1},
        z_index: {type: Number, required: true,  default: 1},
        rotate: {type: Number, required: true, default: 0},
        image: {type: String, default: null},
        type_shape: {type: String, default: null},
        color: {type: String, default: null},
        content: {type: String,  default: null},
        fontSize: {type: String, default: null},
        fontFamily: {type: String,  default: null},
        fontStyle: {type: String,  default: null}
    },
    { 
        timestamps: true 
    }
);

const Component = mongoose.model('Component', componentSchema);
module.exports = Component;
