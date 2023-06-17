module.exports = (creep) => {
  if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.building = false;
  }

  if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    creep.memory.building = true;
  }

  if (creep.memory.building) {
    let targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });

    if (targets.length > 0) {
      if (creep.transfer(targets[targets.length - 1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[targets.length - 1], { visualizePathStyle: { stroke: '#ffffff' } });
      }
      return;
    }

    targets = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (targets.length) {
      if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {
          visualizePathStyle: { stroke: '#ffffff' },
        });
      }
      return;
    }

    const target = Game.getObjectById('648ce5567f583d669b2ebd3f');

    if (target.store.getFreeCapacity() > 500) {
      if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
      }
      return;
    }

    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: { stroke: '#ffffff' },
      });
    }
  } else {
    const sources = creep.room.find(FIND_SOURCES);

    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
};
