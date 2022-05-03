const nowDate = new Date()
const {toUTCTimeStamp} = require("./helper/formater.js")
const { DateTime } = require("luxon")
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig){
    eleventyConfig.addPassthroughCopy("./src/assets")
    eleventyConfig.addPassthroughCopy("./src/admin")


    /* plugin */
    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    /* collection */
    eleventyConfig.addCollection("tagList", require("./src/_11ty/getTagList"));

    /* filter */
    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
    });

    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
          "dd LLL yyyy"
        );
    });

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

    /* Markdown Overrides */
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
    }).use(markdownItAnchor, {
        permalink: true,
        permalinkClass: "direct-link",
        permalinkSymbol: "#",
    });
    eleventyConfig.setLibrary("md", markdownLibrary);

    /* browser sync get static css */
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