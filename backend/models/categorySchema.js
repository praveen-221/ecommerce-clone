const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    // Slug is a human readable unique identifier instead of normal id
    slug: {
        type: String,
        required: true,
        unique: true
    },
    categoryImage: {
        type: String
    },
    parentId: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model("Category", categorySchema);