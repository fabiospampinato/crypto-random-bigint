
/* IMPORT */

import crypto from 'crypto';
import abstract from './abstract';

/* MAIN */

const node = abstract ( crypto.webcrypto['getRandomValues'].bind ( crypto.webcrypto ) );

/* EXPORT */

export default node;
