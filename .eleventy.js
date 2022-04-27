const nowDate = new Date()
const {toUTCTimeStamp} = require("./helper/formater")
const { DateTime } = require("luxon")

module.exports = function(eleventyConfig){
    eleventyConfig.addPassthroughCopy("./src/assets")
    eleventyConfig.addPassthroughCopy("./src/admin")

    // filter 
    eleventyConfig.addFilter("randomPost",(arr)=>{
        console.log(arr)
        arr.sort(()=>{
            return 0.5 - Math.random();
        })

        return arr.slice(0,1)
    })

    eleventyConfig.addFilter("recentlyPost",(arr)=>{
        let posts  =[]
        let sevenDay = 1000*60*60*24*7
        let rencentlyDate =  nowDate.getTime() - sevenDay

        arr.forEach(post=>{
            let timestamp = toUTCTimeStamp(post.data.date).getTime()
            if( timestamp > rencentlyDate){
                posts.push(post)
            }
        })

        return posts
    })

    eleventyConfig.addFilter("postDate",(dateObj)=>{
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
    })
    // ---------

    eleventyConfig.setBrowserSyncConfig({
		files: './_site/css/**/*.css'
	});

    return {
        dir:{
            input:"src",
            output: "_site"
        },
        markdownTemplateEngine: 'njk' // md 裡可以使用 njk 語法
    }
}