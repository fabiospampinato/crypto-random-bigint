
/* IMPORT */

import {describe} from 'fava';
import random from '../dist/index.js';

/* MAIN */

describe ( 'Crypto Random BigInt', it => {

  it ( 'generates a random bigint with the given number of bits', t => {

    // This basically checks that the distribution of each bit is indeed random

    for ( const length of [1, 2, 3, 4, 8, 16, 24, 32, 48, 64, 128, 160, 192, 224, 256, 512, 1024] ) {

      const buckets = [];

      for ( let i = 0; i < length; i++ ) {

        const bucket = new Map ();

        bucket.set ( '0', 0 );
        bucket.set ( '1', 0 );

        buckets[i] = bucket;

      }

      t.is ( buckets.length, length );

      for ( let i = 0; i < 25000; i++ ) {

        const bits = random ( length ).toString ( 2 ).padStart ( length, '0' ).split ( '' );

        t.is ( bits.length, length );

        for ( let bi = 0; bi < length; bi++ ) {

          const bucket = buckets[bi];
          const bit = bits[bi];

          bucket.set ( bit, bucket.get ( bit ) + 1 );

        }

      }

      for ( let i = 0; i < length; i++ ) {

        const bucket = buckets[i];
        const count0 = bucket.get ( '0' );
        const count1 = bucket.get ( '1' );
        const ratio = Math.min ( count0, count1 ) / Math.max ( count0, count1 );

        t.true ( ratio > .9 );

      }

    }

  });

});
