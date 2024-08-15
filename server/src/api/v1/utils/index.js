const _ = require('lodash')

const getInfoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds)
}

const getInfoDataOmit = ({ fileds = [], object = {} }) => {
    return _.omit(object, fileds)
}

module.exports = {
    getInfoData,
    getInfoDataOmit
}