module.exports = (env) => {
    let environment = env || process.env.NODE_ENV
    return require(`./webpack.config.${env}.js`)
}