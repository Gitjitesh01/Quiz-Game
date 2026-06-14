module.exports = (reqFun) => (req, res, next) => {
    Promise.resolve(reqFun(req, res, next)).catch(next);
}