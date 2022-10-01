import { DynamicModule, Global, Module } from '@nestjs/common'

interface IOptions {
  path: string
}

@Global()
@Module({
  providers: [
    {
      provide: 'Config',
      useValue: { baseUrl: '/api' },
    },
  ],
  exports: [
    {
      provide: 'Config',
      useValue: { baseUrl: '/api' },
    },
  ],
})
export class ConfigModule {
  static forRoot(options: IOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config2',
          useValue: { baseUrl: '/api2' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Config2',
          useValue: { baseUrl: '/api2' + options.path },
        },
      ],
    }
  }
}
