//Game.spawns['Spawn1'].room.controller.activateSafeMode();
//Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_EXTENSION );
//Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],     'HarvesterBig',     { memory: { role: 'harvester' } } );

const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const runSpawn = require('./run.spawn');
const Roles = require('./config.roles');

module.exports.loop = function () {
  for (const creepName in Memory.creeps) {
    if (!Game.creeps[creepName]) delete Memory.creeps[creepName];
  }

  try {
    Game.spawns['Spawn1'].room.createConstructionSite(28, 43, STRUCTURE_EXTENSION);
    Game.spawns['Spawn1'].room.createConstructionSite(26, 43, STRUCTURE_EXTENSION);
    Game.spawns['Spawn1'].room.createConstructionSite(27, 44, STRUCTURE_EXTENSION);
    Game.spawns['Spawn1'].room.createConstructionSite(25, 44, STRUCTURE_EXTENSION);
    Game.spawns['Spawn1'].room.createConstructionSite(26, 45, STRUCTURE_EXTENSION);
    Game.spawns['Spawn1'].room.createConstructionSite(24, 43, STRUCTURE_EXTENSION);
    Game.spawns['Spawn1'].room.createConstructionSite(24, 45, STRUCTURE_EXTENSION);
    Game.spawns['Spawn1'].room.createConstructionSite(23, 44, STRUCTURE_EXTENSION);
    Game.spawns['Spawn1'].room.createConstructionSite(22, 43, STRUCTURE_EXTENSION);
    Game.spawns['Spawn1'].room.createConstructionSite(22, 45, STRUCTURE_EXTENSION);
  } catch (error) {}

  // console.log(BODYPART_COST.move)

  for (const spawnName in Game.spawns) {
    // console.log(JSON.stringify(Game.spawns[spawnName], null, 2));

    runSpawn(Game, Game.spawns[spawnName]);
  }

  for (const creepName in Game.creeps) {
    switch (creepName.substring(0, 1)) {
      case Roles.Harvester.prefix:
        roleHarvester(Game.creeps[creepName]);
        continue;
      case Roles.Upgrader.prefix:
        roleUpgrader(Game.creeps[creepName]);
        continue;
      case Roles.Builder.prefix:
        roleBuilder(Game.creeps[creepName]);
        continue;
    }
  }
};

//Game.spawns['Spawn1'].room.createConstructionSite( 8, 42, STRUCTURE_EXTENSION );
//Game.spawns['Spawn1'].room.createConstructionSite( 10, 43, STRUCTURE_LINK );
