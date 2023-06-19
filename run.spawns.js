const Roles = require('./config.roles');

module.exports = (creeps) => {
  Object.values(Game.spawns).forEach((spawn, index) => {
    for (const role of Roles) {
      if (!role.counts) continue;

      if (creeps[role.prefix] && role.preTic) {
        creeps[role.prefix] = creeps[role.prefix].filter(
          (creepName) => role.preTic <= Game.creeps[creepName].ticksToLive
        );
      }

      if (!creeps[role.prefix] || creeps[role.prefix].length < role.counts) {
        const creepId = (index + 1) * 10000 + (Game.time % 10000);
        spawn.spawnCreep(role.skills, role.prefix + ' ' + creepId);
      }
    }
  });
};
