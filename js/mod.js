let modInfo = {
	name: "The Modding Tree Tree 2",
	id: "tmtt2",
	author: "upvoid",
	pointsName: "seconds of developing",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(300), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "",
}

let changelog = "You found an easter egg!"

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("m",11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  if(hasUpgrade("m",12))gain=gain.mul(2)
  if(hasUpgrade("m",13))gain=gain.mul(2)
  if(hasUpgrade("m",14))gain=gain.mul(2)
  if(hasUpgrade("u",11))gain=gain.mul(2)
  if(hasUpgrade("u",13))gain=gain.mul(player.m.points.root(3).add(1))
  if(hasUpgrade("u",14))gain=gain.mul(2)
  if(hasUpgrade("u",15))gain=gain.mul(2)
  if(player.c.unlocked)gain=gain.mul(tmp.c.effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}