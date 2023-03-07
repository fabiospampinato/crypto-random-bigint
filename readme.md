# Crypto Random BigInt

Generate a cryptographically-random BigInt with the given number of bits of entropy.

It's pretty darn fast, tiny, and it works everywhere. It's like a purer version of [`nanoid`](https://github.com/ai/nanoid).

## Install

```sh
npm install --save crypto-random-bigint
```

## Usage

```ts
import random from 'crypto-random-bigint';

random ( 8 ); // => 132n
random ( 16 ); // => 54279n
random ( 32 ); // => 3564608120n
random ( 64 ); // => 15255558299082773463n
random ( 128 ); // => 102272854662000556975733753112255674405n
```

## License

MIT © Fabio Spampinato
