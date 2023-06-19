module.exports = () => {
  const linkFrom = Game.getObjectById('6490562758874d6e4e728ff5');

  if (linkFrom.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
    const linkTo = Game.getObjectById('6490516712d851530cdb59cc');

    linkFrom.transferEnergy(linkTo);
  }
};
