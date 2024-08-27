const _ = require('lodash')

const getInfoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds)
}

const getInfoDataOmit = ({ fileds = [], object = {} }) => {
    return _.omit(object, fileds)
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertVNSlug(inputString) {
    return inputString
        .normalize('NFD')      // Decompose diacritics (e.g., ă -> a)
        .replace(/[\u0300-\u036f]/g, "") // Remove all diacritics
        .toLowerCase()           // Convert to lowercase
        .trim()                 // Remove leading and trailing spaces
        .replace(/\s+/g, '-')    // Replace multiple spaces with a single hyphen
        .replace(/-+/g, '-');    // Replace multiple hyphens with a single hyphen
}

function convertVNSlug2(inputString) {
    return inputString
        .normalize('NFD')      // Decompose diacritics (e.g., ă -> a)
        .replace(/[\u0300-\u036f]/g, "") // Remove all diacritics
        .toLowerCase()           // Convert to lowercase
        .trim()                 // Remove leading and trailing spaces
        .replace(/\s+/g, ' ')    // Replace multiple spaces with a single hyphen
        .replace(/-+/g, ' ');    // Replace multiple hyphens with a single hyphen
}


module.exports = {
    getInfoData,
    getInfoDataOmit,
    randomInt,
    convertVNSlug,
    convertVNSlug2,
}