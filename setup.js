import fs from 'fs';

import packageJson from './package.json';

if (process.env.use_pact_consumer || process.env.use_pact_provider) {
  packageJson.dependencies['axios'] = '^1.6.5';
}

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
