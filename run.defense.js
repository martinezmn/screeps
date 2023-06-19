module.exports = () => {
  Object.values(Game.rooms).forEach((room) => {
    const towers = room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType == STRUCTURE_TOWER && structure.store[RESOURCE_ENERGY] > 0;
      },
    });

    try {
      for (const tower of towers) {
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
          filter: function (object) {
            return object.getActiveBodyparts(ATTACK) > 0;
          },
        });

        if (closestHostile) {
          tower.attack(closestHostile);
          continue;
        }

        if (tower.energy <= tower.energyCapacity / 2) {
          continue;
        }

        const damagedStructure = room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (
              structure.structureType != STRUCTURE_CONTAINER &&
              structure.hits < structure.hitsMax &&
              structure.hits < 825000 // 825k
            );
          },
        });

        const mostDamaged = damagedStructure.reduce((target, damaged) => {
          if (target.hits > damaged.hits) {
            return damaged;
          }
          return target;
        }, damagedStructure[0]);

        if (mostDamaged) {
          tower.repair(mostDamaged);
        }
      }
    } catch (error) {}
  });

  // const towers = creep.room.find(FIND_STRUCTURES, {
  //   filter: (structure) => {
  //     return structure.structureType == STRUCTURE_TOWER && structure.store[RESOURCE_ENERGY] > 0;
  //   },
  // });

  // var tower = Game.getObjectById('635c0f64e9ac02b1a178e431');
  // if (tower) {
  //   var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
  //     filter: (structure) => structure.hits < structure.hitsMax,
  //   });

  //   if (closestDamagedStructure) {
  //     tower.repair(closestDamagedStructure);
  //   }

  //   const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  //   if (closestHostile) {
  //     tower.attack(closestHostile);
  //   }
  // }
};
