export const calcPosted = postedDate => {
  var postDate = new Date(postedDate) // covert from ISO date format to date format
  var nowDate = new Date() //current date
  var postDateSecond = postDate.getTime() / 1000
  var nowDateSecond = nowDate.getTime() / 1000
  var postedAgo = nowDateSecond - postDateSecond

  var sec = Math.floor(postedAgo)
  var min = Math.floor(postedAgo / 60)
  var hour = Math.floor(postedAgo / 3600)
  var day = Math.floor(postedAgo / 86400)

  if (postedAgo < 60) {
    return sec + ` sec${postedAgo === 1 ? ' ago' : 's ago'}` //dealing with plural cases
  } else if (postedAgo < 3600) {
    //3600 = 60 min
    return min + ` min${min === 1 ? ' ago' : 's ago'}`
  } else if (postedAgo < 86400) {
    //86400 =24 hours
    return hour + ` hour${hour === 1 ? '   ago' : 's ago'}`
  } else if (postedAgo < 2.592e6) {
    //2.592e+6 = 30days
    return day + ` day${day === 1 ? ' ago' : 's ago'}`
  } else if (postedAgo >= 2.592e6) {
    //if more than 30 days display the date itself +
    return postedDate.split('T')[0]
  }
}