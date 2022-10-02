import {
  randAddress,
  randAlphaNumeric,
  randFullAddress,
  randNumber,
  randPassword,
  randPhrase,
} from '@ngneat/falso';
var hrstart = process.hrtime();

// doSomeLongRunningProcess(() => {

//   performance.measure('A to B', 'A', 'B');
// });
// const bcrypt = require('bcrypt');

// const rounds = randNumber({ min: 14, max: 15 });

// const fn = () => {
//   void (async function () {
//     const salt = await bcrypt.genSalt(rounds);
//     const hashed = await bcrypt.hash('pw', salt);
//     const hrend = process.hrtime(hrstart);
//     console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);

//     console.log([hashed, salt, rounds]);
//   })();
// };

// fn();

// 1.5 seconds vs 3s for 14 and 15. 16 takes 5 seconds. this should be good enout for RTT
console.log(
  randPassword({ size: randNumber({ min: 10, max: 20 }), length: 10 })
);
