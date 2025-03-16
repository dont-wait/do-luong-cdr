import { Module } from '@nestjs/common';
import { getModules } from "./utils/reflectModules";

const dynamicModules = getModules().map(m => require(m.path)[m.name]);

console.log(dynamicModules);

@Module({
  imports: [...dynamicModules],
})
export class AppModule {}
