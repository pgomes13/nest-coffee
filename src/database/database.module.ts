import { DynamicModule, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';

@Module({})
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useValue: new DataSource(options).initialize(),
        },
      ],
      exports: ['DATABASE_CONNECTION'],
    };
  }
}
