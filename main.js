const Roles = require('./config.roles');
const runDefense = require('./run.defense');
const runLinks = require('./run.links');
const runSpawns = require('./run.spawns');

module.exports.loop = function () {
  for (const creepName in Memory.creeps) {
    if (!Game.creeps[creepName]) delete Memory.creeps[creepName];
  }

  const creeps = Object.keys(Game.creeps).reduce((creeps, creepName) => {
    const creepRole = creepName.split(' ')[0];
    if (!creeps[creepRole]) creeps[creepRole] = [];
    creeps[creepRole].push(creepName);
    return creeps;
  }, {});

  runSpawns(creeps);

  for (const role of Roles) {
    if (!creeps[role.prefix]) continue;
    for (const creepName of creeps[role.prefix]) {
      role.action(Game.creeps[creepName]);
    }
  }

  runDefense();
  runLinks();
};
