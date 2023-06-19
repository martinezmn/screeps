module.exports = (creep) => {
  if (creep.memory.busy && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.busy = false;
  }

  if (!creep.memory.busy && creep.store.getFreeCapacity() < 8) {
    creep.memory.busy = true;
  }

  if (creep.memory.busy) {
    const target = Game.getObjectById('6490562758874d6e4e728ff5');

    if (target.hits < target.hitsMax) {
      if (creep.repair(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else {
      if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  } else {
    const sources = creep.room.find(FIND_SOURCES);

    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
    } else if (creep.harvest(sources[1]) == ERR_NOT_ENOUGH_RESOURCES) {
      creep.memory.busy = true;
    }
  }
};
