/* eslint-disable no-undef */

import { writeFileSync } from 'node:fs';

const defaultConfigurationTargetPath = './src/environments/environment.ts';
const developmentConfigurationTargetPath =
  './src/environments/environment.development.ts';
const developmentEnvironmentConfigFile = `
export const environment = {
  production: false,
  captchaSiteKey: '${process.env.CAPTCHA_SITE_KEY || ''}'
};
`;
const productionConfigurationTargetPath = './src/environments/environment.production.ts';
const productionEnvironmentConfigFile = `
export const environment = {
  production: true,
  captchaSiteKey: '${process.env.CAPTCHA_SITE_KEY || ''}'
};
`;

console.log(
  `Writing environment files to ${defaultConfigurationTargetPath}, ${developmentConfigurationTargetPath}, and ${productionConfigurationTargetPath}...`
);

writeFileSync(defaultConfigurationTargetPath, developmentEnvironmentConfigFile);
writeFileSync(developmentConfigurationTargetPath, developmentEnvironmentConfigFile);
writeFileSync(productionConfigurationTargetPath, productionEnvironmentConfigFile);

console.log(
  `Wrote environment files to ${defaultConfigurationTargetPath}, ${developmentConfigurationTargetPath}, and ${productionConfigurationTargetPath}`
);
