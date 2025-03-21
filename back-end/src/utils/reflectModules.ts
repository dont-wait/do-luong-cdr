import { readdirSync } from 'fs';
import { join, dirname } from 'path';

type ModulesType = {
  name: string;
  path: string;
}

const baseDir = dirname(__dirname).endsWith('dist') ? join(__dirname, '..') : __dirname;

export const getModules = (): ModulesType[] => {
  const modulesPath = join(baseDir, 'modules'); 

  const moduleDirs = readdirSync(modulesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  return moduleDirs.map(moduleName => ({
    name: moduleName.charAt(0).toUpperCase() + moduleName.slice(1) + 'Module',
    path: join(modulesPath, moduleName, `${moduleName}.module`)
  }));
}
