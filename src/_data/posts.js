const fetch = require('node-fetch')

module.exports = async() =>{
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts")

        return res.json()
    } catch (error) {
        console.log(error)
    }
}