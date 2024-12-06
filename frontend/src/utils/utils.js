export const isJsonString = (data) => {
    try {
        JSON.parse(data)
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return false
    }
    return true
}

export const extractIdFromOver = (str) => {
    const match = str.match(/drop-area-(.+)/);
    return match ? match[1] : null;
};