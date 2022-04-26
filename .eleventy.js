const nowDate = new Date()
const {toUTCTimeStamp} = require("./helper/formater")
const { DateTime } = require("luxon")

// function toUTCTimeStamp(date){
//     return new Date(date.substring(0,4), parseInt(date.substring(5,7))-1,date.substring(8,10),8)
// }

module.exports = function(eleventyConfig){

    eleventyConfig.addWatchTarget("./src/style")
    eleventyConfig.addPassthroughCopy("./src/assets")
    eleventyConfig.addPassthroughCopy("./src/admin")

    // filter 
    // eleventyConfig.addFilter("randomPost",(arr)=>{
    //     console.log(arr)
    //     arr.sort(()=>{
    //         return 0.5 - Math.random();
    //     })

    //     return arr.slice(0,1)
    // })

    // eleventyConfig.addFilter("recentlyPost",(arr)=>{
    //     let posts  =[]
    //     let sevenDay = 1000*60*60*24*7
    //     let rencentlyDate =  nowDate.getTime() - sevenDay

    //     arr.forEach(post=>{
    //         let timestamp = toUTCTimeStamp(post.data.date).getTime()
    //         if( timestamp > rencentlyDate){
    //             posts.push(post)
    //         }
    //     })

    //     return posts
    // })

    // eleventyConfig.addFilter("postDate",(dateObj)=>{
    //     return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
    // })

    return {
        dir:{
            input:"src",
            output: "_site"
        }
    }
}