function toUTCTimeStamp(date){
    return new Date(date.substring(0,4), parseInt(date.substring(5,7))-1,date.substring(8,10),8)
}