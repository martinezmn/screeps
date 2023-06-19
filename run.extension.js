const { getMaxExtensions } = require('./util.getters');

module.exports = (Game, spawn) => {
  const maxExtensions = getMaxExtensions(spawn);
  const extensions = spawn.room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_EXTENSION },
  });

  if (maxExtensions <= extensions.length) return;

  console.log('Create extensions');
};
