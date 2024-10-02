import { DataSource} from 'typeorm';

export const databaseProviders = [
    {
        provide: 'Data_source',
        useFactory: async () => {
            const dataSource = new DataSource ({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'root',
                    password: '',
                    database: 'projetoapi',
                    entities: [
                        __dirname + './../**/*.entity{.ts,.js}',
                    ],
                    synchronize: false,   
                });

                return dataSource.initialize();

        },
    },
];

