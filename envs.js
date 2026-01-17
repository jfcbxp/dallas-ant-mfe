const fs = require('fs').promises;
const path = require('path');

const mapping = {
  dev: 'development',
  tst: 'test',
  prd: 'prd',
};

async function removeFileIfExists(filePath) {
  try {
    await fs.access(filePath);
    await fs.rm(filePath);
  } catch (error) {}
}

async function copyEnvFile(environment) {
  const fileName = `.env.${mapping[environment]}`;
  const content = await fs.readFile(path.join(__dirname, fileName), 'utf8');

  await fs.writeFile(path.join(__dirname, '.env'), content);
  await fs.writeFile(path.join(__dirname, 'build.env'), content);
  await fs.writeFile(path.join(__dirname, 'deploy_build.env'), content);
}

async function main() {
  try {
    await removeFileIfExists(path.join(__dirname, '.env'));

    const environment = process.env.ENVIRONMENT;
    if (environment) {
      await copyEnvFile(environment);
    }
  } catch (error) {}
}

main();
