
/* IMPORT */

import Pool from './pool';

/* HELPERS */

const POOL_8 = new Pool ( Uint8Array, 25 );
const POOL_16 = new Pool ( Uint16Array, 25 );
const POOL_32 = new Pool ( Uint32Array, 25 );
const POOL_64 = new Pool ( BigUint64Array, 50 );

/* MAIN */

const random = ( bits: number ): bigint => {

  const {get, BITS} = ( bits <= 8 ? POOL_8 : ( bits <= 16 ? POOL_16 : ( bits <= 32 ? POOL_32 : POOL_64 ) ) );

  if ( bits === BITS ) return get ();

  if ( bits === 1 ) return get () & 1n;

  if ( bits === 128 ) return ( get () << 64n ) | get ();

  if ( bits === 160 ) return ( random ( 128 ) << 32n ) | random ( 32 );

  if ( bits === 192 ) return ( random ( 128 ) << 64n ) | random ( 64 );

  if ( bits === 224 ) return ( random ( 160 ) << 64n ) | random ( 64 );

  if ( bits === 256 ) return ( random ( 128 ) << 128n ) | random ( 128 );

  if ( bits === 512 ) return ( random ( 256 ) << 256n ) | random ( 256 );

  if ( bits === 1024 ) return ( random ( 512 ) << 512n ) | random ( 512 );

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
