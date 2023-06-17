module.exports = (creep) => {
  if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.upgrading = false;
  }

  if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
    creep.memory.upgrading = true;
  }

  if (creep.memory.upgrading) {
    let targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          structure.structureType == STRUCTURE_SPAWN &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });

    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
      return;
    }

    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: { stroke: '#ffffff' },
      });
    }
  } else {
    const target = Game.getObjectById('648ce5567f583d669b2ebd3f');
    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  }
};
