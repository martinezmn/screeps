const Roles = require('./config.roles');
const { getUniqName } = require('./util.getters');

module.exports = (Game, spawn) => {
  const counts = {};

  for (const role of Object.values(Roles)) {
    counts[role.prefix] = 0;
  }

  for (const creepName in Game.creeps) {
    if (
      creepName.substring(0, 1) === Roles.Harvester.prefix &&
      Game.creeps[creepName].ticksToLive < 100
    ) {
      continue;
    }

    counts[creepName.substring(0, 1)] += 1;
  }

  Object.values(Roles).forEach((role) => {
    if (counts[role.prefix] < role.max) {
      spawn.spawnCreep(role.skills, getUniqName(role.prefix));
    }
  });
};
