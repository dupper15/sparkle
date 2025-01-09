const Text = require("../models/TextModel");

const createText = (newText) => {
    return new Promise(async (resolve, reject) => {
        const {
            x, y, height, width, content, color, fontSize, fontFamily, fontStyle, zIndex
        } = newText;
        try {
            const createdText = await Text.create({
                x, y, height, width, content, color, fontSize, fontFamily, fontStyle, zIndex
            });

            if (createdText) {
                resolve({
                    status: "OK", message: "Create success", data: createdText,
                });
            }
        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to create Text", error: error.message,
            });
        }
    });
};

const getDetailText = (textId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const text = await Text.findOne({
                _id: textId,
            });
            if (!Text) {
                resolve({
                    status: "ERROR", message: "Account is not defined!",
                });
                return;
            }

            resolve({
                status: "OK", message: "SUCCESS", data: text,
            });
        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to create Text", error: error.message,
            });
        }
    });
};

const updateText = (textId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkText = await Text.findOne({
                _id: textId,
            });
            if (!checkText) {
                resolve({
                    status: "ERROR", message: "Text is not defined!",
                });
                return;
            }
            const updatedText = await Text.findByIdAndUpdate(textId, data, {
                new: true,
            });

            if (!updatedText) {
                resolve({
                    status: "ERROR", message: "Text update failed or not found",
                });
                return;
            }

            resolve({
                status: "OK", message: "SUCCESS", data: updatedText,
            });
        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to update Text", error: error.message,
            });
        }
    });
};

const deleteText = (textId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const text = await Text.findOne({
                _id: textId,
            });
            if (!text) {
                resolve({
                    status: "ERROR", message: "Text is not defined!",
                });
                return;
            }
            await Text.findByIdAndDelete(textId);

            resolve({
                status: "OK", message: "Delete success",
            });
        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to create Text", error: error.message,
            });
        }
    });
};

module.exports = {
    createText, getDetailText, updateText, deleteText,
};
