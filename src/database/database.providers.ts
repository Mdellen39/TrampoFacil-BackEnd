import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '50.116.112.16',
        port: 3306,
        username: 'vitali04_tramposfacil',
        password: 'Tr@mpos123',
        database: 'vitali04_tramposfacil',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
      });
      
      return dataSource.initialize();
    },
  },
];

