
process.env.VUE_APP_VERSION = require('./package.json').version

// vue.config.js
module.exports = {
    outputDir: 'dist',
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/scss/site.scss";`
            }
        }
    }
}