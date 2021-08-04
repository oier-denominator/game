const D=_=>{return new Decimal(_)}
addLayer("m", {
    name: "mods", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(300), // Can be a function that takes requirement increases into account
    resource: "mods", // Name of prestige currency
    baseResource: "seconds of developing", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("u",14))mult=mult.mul(player.m.points.add(2).sqrt())
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Make a mod", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  upgrades:{
    11:{
      title:"Modders",
      description:"Get people to start modding. Gain 1 second of developing per real-time second",
      cost: D(1),
    },
    12:{
      title:"A place for discussion",
      description:"Create a server for TMT and advertise it in Jacorb's Games.",
      cost: D(1),
      unlocked(){return hasUpgrade("m",11)}
    },
    13:{
      title:"Help!",
      description:"Make #modding-help so that people can help less experienced people make mods.",
      cost: D(1),
      unlocked(){return hasUpgrade("m",12)}
    },
    14:{
      title:"Mod Showcase",
      description:"Create #mod-updates so that more people can play the mods",
      cost: D(1),
      unlocked(){return hasUpgrade("m",13)}
    },
    21:{
      title:"Revert",
      description:"Unlock the ability to revert back to the beginning of TMT but update it to a new version",
      cost: D(1),
      unlocked(){return hasUpgrade("m",14)}
    },
  }
})
addLayer("u", {
    name: "updates", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#bdc134",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "updates", // Name of prestige currency
    baseResource: "mods", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Update TMT", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("m",21)||player.u.unlocked},
  upgrades:{
    11:{
      title:"Improvements",
      description:"Add some QoL to make it easier to mod",
      cost: D(1),
    },
    12:{
      title:"Advertising",
      description:"The more mods you have, the more people will join!",
      cost: D(1),
      unlocked(){return hasUpgrade("u",11)}
    },
    13:{
      title:"Advertising part 2",
      description:"The more people there are, the more mods they create",
      cost: D(1),
      unlocked(){return hasUpgrade("u",12)}
    },
    14:{
      title:"Version 2.0",
      description:"Make it a lot easier for people to create mods",
      cost: D(1),
      unlocked(){return hasUpgrade("u",13)}
    },
    15:{
      title:"Info",
      description:"Add documentation for each of the features.",
      cost: D(1),
      unlocked(){return hasUpgrade("u",14)}
    },
  }
})
