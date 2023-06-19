const getMaxExtensions = (object) => {
  return CONTROLLER_STRUCTURES.extension[object.room.controller.level];
};

const getUniqName = (prefix) => {
  return prefix + new Date().getTime().toString(16).slice(-6).toUpperCase();
};

const getSource = (creep) => {
  const sources = creep.room.find(FIND_SOURCES);
  if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
  }
};

const getEnergyTarget = (creep) => {
  return creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (
        (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN ||
          structure.structureType == STRUCTURE_TOWER) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      );
    },
  });
};

const getSourceV2 = (creep) => {
  if (Memory.sourceSpots) return;

  const sources = creep.room.find(FIND_SOURCES);
  for (const source of sources) {
    let plainTerrains = creep.room
      .lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true)
      .filter((field) => field.type === 'terrain' && field.terrain === 'plain');

    plainTerrains = plainTerrains.filter((field) => {
      const objects = creep.room
        .lookAt(field.x, field.y)
        .filter((object) => object.type !== 'terrain' && object.type !== 'creep');

      if (objects.length) return false;
      return true;
    });

    Memory.sourceSpots = {
      ...Memory.sourceSpots,
      [source.id]: plainTerrains.length,
    };
  }
};

module.exports = {
  getMaxExtensions,
  getUniqName,
  getSource,
  getEnergyTarget,
  getSourceV2,
};
