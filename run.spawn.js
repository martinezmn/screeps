const Roles = require('util.roles');

module.exports = (Game) => {
  const harvesters = _.filter(
    Game.creeps,
    (creep, name) => name.substring(0, 3) == Roles.Harvester
  );

  if (harvesters.length < 2) {
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], uniqName(Roles.Harvester));
  }

  if (Game.spawns['Spawn1'].spawning) {
    const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y,
      { align: 'left', opacity: 0.8 }
    );
  }
};

const uniqName = (rolePrefix) =>
  rolePrefix + new Date().getTime().toString(16).slice(-6).toUpperCase();
