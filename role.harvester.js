const Roles = require('./config.roles');
const { getUniqName } = require('./util.getters');

module.exports = (creep) => {
  if (creep.memory.busy && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.busy = false;
  }

  if (!creep.memory.busy && creep.store.getFreeCapacity() < 8) {
    creep.memory.busy = true;
  }

  if (creep.memory.busy) {
    const target = Game.getObjectById('648ce5567f583d669b2ebd3f');

    if (target.hits < target.hitsMax && target.store.getFreeCapacity() < 500) {
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

    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
};
