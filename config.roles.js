module.exports = {
  Harvester: {
    prefix: 'H',
    max: 1,
    skills: [...Array(6).fill(WORK), ...Array(3).fill(CARRY), ...Array(1).fill(MOVE)],
  },
  Builder: {
    prefix: 'B',
    max: 4,
    skills: [...Array(3).fill(WORK), ...Array(3).fill(CARRY), ...Array(6).fill(MOVE)],
  },
  Upgrader: {
    prefix: 'U',
    max: 5,
    skills: [...Array(3).fill(WORK), ...Array(3).fill(CARRY), ...Array(6).fill(MOVE)],
  },
};
