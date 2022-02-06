
/* MAIN */

//TODO: Maybe publish this as a standalone module for getting a 8/16/32/64 bit random number

class Pool {

  /* VARIABLES */

  private getRandomValues: ( buffer: Uint8Array | Uint16Array | Uint32Array | BigUint64Array ) => void;
  private buffer: Uint8Array | Uint16Array | Uint32Array | BigUint64Array;
  private cursor: number;

  public BYTES: number;
  public BITS: number;

  /* CONSTRUCTOR */

  constructor ( Buffer: Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | BigUint64ArrayConstructor, length: number, getRandomValues: ( buffer: Uint8Array | Uint16Array | Uint32Array | BigUint64Array ) => void ) {

    this.getRandomValues = getRandomValues;
    this.buffer = new Buffer ( length );
    this.cursor = Infinity;

    const bytes = Buffer.BYTES_PER_ELEMENT;

    this.BYTES = bytes;
    this.BITS = bytes * 8;

  }

  /* API */

  get = (): bigint => {

    if ( this.cursor >= this.buffer.length ) {

      this.refresh ();

    }

    return BigInt ( this.buffer[this.cursor++] );

  }

  refresh = (): void => {

    this.getRandomValues ( this.buffer );

    this.cursor = 0;

  }

}

/* EXPORT */

export default Pool;
