
/* IMPORT */

import abstract from './abstract';

/* MAIN */

const browser = abstract ( crypto.getRandomValues.bind ( crypto ) );

/* EXPORT */

export default browser;
