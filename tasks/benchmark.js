
/* IMPORT */

import benchmark from 'benchloop';
import random from '../dist/index.js';

/* MAIN */

benchmark.config ({
  iterations: 100_000
});

benchmark ({
  name: 'random:1',
  fn: () => {
    random ( 1 );
  }
});

benchmark ({
  name: 'random:8',
  fn: () => {
    random ( 8 );
  }
});

benchmark ({
  name: 'random:16',
  fn: () => {
    random ( 16 );
  }
});

benchmark ({
  name: 'random:32',
  fn: () => {
    random ( 32 );
  }
});

benchmark ({
  name: 'random:64',
  fn: () => {
    random ( 64 );
  }
});

benchmark ({
  name: 'random:128',
  fn: () => {
    random ( 128 );
  }
});

benchmark ({
  name: 'random:160',
  fn: () => {
    random ( 160 );
  }
});

benchmark ({
  name: 'random:192',
  fn: () => {
    random ( 192 );
  }
});

benchmark ({
  name: 'random:224',
  fn: () => {
    random ( 224 );
  }
});

benchmark ({
  name: 'random:256',
  fn: () => {
    random ( 256 );
  }
});

benchmark ({
  name: 'random:512',
  fn: () => {
    random ( 512 );
  }
});

benchmark ({
  name: 'random:1024',
  fn: () => {
    random ( 1024 );
  }
});

benchmark.summary ();
