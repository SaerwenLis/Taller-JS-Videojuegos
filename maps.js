/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente, los mapas son de 10x10
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🧶',
    'PLAYER': '😺',
    'E': '🔥',
    'HEART': '💜',
  };
  
  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
    O------XXX
    XXXXXX-XXX
    X------XXX
    X-XXXXXXXX
    X--------X
    XXXXXXXX-X
    XXXX-----X
    XXXX-XXXXX
    XXXX---IXX
    XXXXXXXXXX
  `);
  maps.push(`
    I--XXXXXXX
    X----XXXXX
    XXX---XXXX
    X-XXX-X--X
    X-X---X-XX
    X---XXX-XX
    XXX-XX--XX
    XXX-XXX-XX
    XXX----OXX
    XXXXXXXXXX
    `);

    const explosion = []
    explosion.push(`
    EEEEEEEEEE
    EEEEEEEEEE
    EEEEEEEEEE
    EEEEEEEEEE
    EEEEEEEEEE
    EEEEEEEEEE
    EEEEEEEEEE
    EEEEEEEEEE
    EEEEEEEEEE
    EEEEEEEEEE
    `)