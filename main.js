//Game.spawns['Spawn1'].room.controller.activateSafeMode();
//Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
//Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],     'HarvesterBig',     { memory: { role: 'harvester' } } );

const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const runDefense = require('run.defense');
const runSpawn = require('run.spawn');
const Roles = require('util.roles');

module.exports.loop = function () {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) delete Memory.creeps[name];
  }

  //   runDefense(Game);
  runSpawn(Game);

  for (const name in Game.creeps) {
    switch (name.substring(0, 3)) {
      case Roles.Harvester:
        roleHarvester(Game.creeps[name]);
        continue;
      case Roles.Upgrader:
        roleUpgrader(Game.creeps[name]);
        continue;
      case Roles.Builder:
        roleBuilder(Game.creeps[name]);
        continue;
    }
  }
};
