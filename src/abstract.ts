
/* IMPORT */

import Pool from './pool';

/* MAIN */

const abstract = ( getRandomNumbers: ( buffer: Uint8Array | Uint16Array | Uint32Array | BigUint64Array ) => void ) => {

  const pool8 = new Pool ( Uint8Array, 25, getRandomNumbers );
  const pool16 = new Pool ( Uint16Array, 25, getRandomNumbers );
  const pool32 = new Pool ( Uint32Array, 25, getRandomNumbers );
  const pool64 = new Pool ( BigUint64Array, 50, getRandomNumbers );

  const generate = ( bits: number ): bigint => {

    const {get, BITS} = ( bits <= 8 ? pool8 : ( bits <= 16 ? pool16 : ( bits <= 32 ? pool32 : pool64 ) ) );

    if ( bits === BITS ) return get ();

    if ( bits === 1 ) return get () & 1n;

    if ( bits === 128 ) return ( get () << 64n ) | get ();

    if ( bits === 160 ) return ( generate ( 128 ) << 32n ) | generate ( 32 );

    if ( bits === 192 ) return ( generate ( 128 ) << 64n ) | generate ( 64 );

    if ( bits === 256 ) return ( generate ( 128 ) << 128n ) | generate ( 128 );

    if ( bits === 512 ) return ( generate ( 256 ) << 256n ) | generate ( 256 );

    if ( bits === 1024 ) return ( generate ( 512 ) << 512n ) | generate ( 512 );

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

  return generate;

};

/* EXPORT */

export default abstract;
