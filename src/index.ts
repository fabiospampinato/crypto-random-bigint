
/* IMPORT */

import RNG from 'uint-rng';

/* HELPERS */

const get8 = Object.assign ( () => BigInt ( RNG.get8 () ), { BITS: 8 } );
const get16 = Object.assign ( () => BigInt ( RNG.get16 () ), { BITS: 16 } );
const get32 = Object.assign ( () => BigInt ( RNG.get32 () ), { BITS: 32 } );
const get64 = Object.assign ( () => RNG.get64 (), { BITS: 64 } );

/* MAIN */

const random = ( bits: number ): bigint => {

  const get = ( bits <= 8 ? get8 : ( bits <= 16 ? get16 : ( bits <= 32 ? get32 : get64 ) ) );
  const BITS = get.BITS;

  /* SPECIAL CASES */

  if ( bits === BITS ) return get ();

  if ( bits === 1 ) return get () & 1n;

  if ( bits === 128 ) return ( get () << 64n ) | get ();

  if ( bits === 160 ) return ( random ( 128 ) << 32n ) | random ( 32 );

  if ( bits === 192 ) return ( random ( 128 ) << 64n ) | random ( 64 );

  if ( bits === 224 ) return ( random ( 160 ) << 64n ) | random ( 64 );

  if ( bits === 256 ) return ( random ( 128 ) << 128n ) | random ( 128 );

  if ( bits === 384 ) return ( random ( 256 ) << 128n ) | random ( 128 );

  if ( bits === 512 ) return ( random ( 256 ) << 256n ) | random ( 256 );

  if ( bits === 1024 ) return ( random ( 512 ) << 512n ) | random ( 512 );

  if ( bits === 2048 ) return ( random ( 1024 ) << 1024n ) | random ( 1024 );

  /* GENERAL CASE */

  let index = 0;
  let result = 0n;

  while ( index < bits ) {

    const chunkBits = Math.min ( BITS, bits - index );
    const randomMask = ( 2n ** BigInt ( chunkBits ) ) - 1n;
    const random = get ();
    const chunk = random & randomMask;

    if ( bits === chunkBits ) return chunk;

    result = ( index ? result | ( chunk << BigInt ( index ) ) : chunk );
    index += chunkBits;

  }

  return result;

};

/* EXPORT */

export default random;
