module.exports = (creep) => {
  if (creep.memory.transporting && creep.store[RESOURCE_ENERGY] == 0) {
    if (creep.ticksToLive < 25) creep.suicide();
    creep.memory.transporting = false;
  }

  if (!creep.memory.transporting && creep.store.getFreeCapacity() == 0) {
    creep.memory.transporting = true;
  }

  if (creep.memory.transporting) {
    const target = getTarget(creep);

    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
    }

    return;
  }

  const target = getResource();

  if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
  } else if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
    creep.memory.transporting = true;
  }
};

const getTarget = (creep) => {
  const storageLink = Game.getObjectById('6490516712d851530cdb59cc');

  if (storageLink.store[RESOURCE_ENERGY] > 0) {
    return Game.getObjectById('648e521da9d4162ddd54c7f3');
  }

  const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (structure) => {
      return (
        ((structure.structureType == STRUCTURE_SPAWN ||
          structure.structureType == STRUCTURE_EXTENSION) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) ||
        (structure.structureType == STRUCTURE_TOWER &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 500)
      );
    },
  });

  if (!target) {
    return Game.getObjectById('648e521da9d4162ddd54c7f3');
  }

  return target;
};

const getResource = () => {
  const storageLink = Game.getObjectById('6490516712d851530cdb59cc');

  if (storageLink.store[RESOURCE_ENERGY] > 0) {
    return storageLink;
  }

  return Game.getObjectById('648ce5567f583d669b2ebd3f');
};
