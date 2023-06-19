module.exports = (creep) => {
  if (creep.memory.busy && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.busy = false;
  }

  if (!creep.memory.busy && creep.store.getFreeCapacity() < 8) {
    creep.memory.busy = true;
  }

  if (creep.memory.busy) {
    let target = Game.getObjectById('648f244e1b2d6e1db7d4c450');

    if (target.store[RESOURCE_ENERGY] >= 950) {
      target = Game.getObjectById('648e521da9d4162ddd54c7f3');
    }

    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  } else {
    let target = Game.getObjectById('6490516712d851530cdb59cc');
    const tower = Game.getObjectById('648f244e1b2d6e1db7d4c450');

    if (target.store.getFreeCapacity() == 0 && tower.store.getFreeCapacity() != 0) {
      target = Game.getObjectById('648e521da9d4162ddd54c7f3');
    }

    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
    } else if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
      creep.memory.busy = true;
    }
  }
};
