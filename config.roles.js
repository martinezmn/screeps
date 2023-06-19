const roleBuilder = require('./role.builder');
const roleHarvester = require('./role.harvester');
const roleHarvesterTmp = require('./role.harvester.tmp');
const roleHauler = require('./role.hauler');
const roleHaulerTmp = require('./role.hauler.tmp');
const roleUpgrader = require('./role.upgrader');

module.exports = [
  {
    prefix: 'Harvester',
    counts: 1,
    preTic: 30,
    skills: [...Array(7).fill(WORK), ...Array(4).fill(CARRY), ...Array(2).fill(MOVE)],
    action: roleHarvester,
  },
  {
    prefix: 'HarvesterB',
    counts: 1,
    preTic: 30,
    skills: [...Array(7).fill(WORK), ...Array(4).fill(CARRY), ...Array(7).fill(MOVE)],
    action: roleHarvesterTmp,
  },
  {
    prefix: 'Builder',
    counts: 0,
    skills: [...Array(5).fill(WORK), ...Array(3).fill(CARRY), ...Array(8).fill(MOVE)],
    action: roleBuilder,
  },
  {
    prefix: 'Upgrader',
    counts: 0,
    skills: [...Array(8).fill(WORK), ...Array(4).fill(CARRY), ...Array(2).fill(MOVE)],
    action: roleUpgrader,
  },
  {
    prefix: 'Hauler',
    counts: 1,
    preTic: 200,
    skills: [...Array(8).fill(CARRY), ...Array(8).fill(MOVE)],
    action: roleHauler,
  },
  // {
  //   prefix: 'HaulerB',
  //   counts: 0,
  //   skills: [...Array(1).fill(CARRY), ...Array(1).fill(MOVE)],
  //   action: roleHaulerTmp,
  // },
];
