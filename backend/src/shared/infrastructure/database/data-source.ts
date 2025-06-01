import { DataSource, DataSourceOptions } from 'typeorm';
import { UserSchema } from '../../../modules/users/infrastructure/database/schemas/user.schema';
import 'dotenv/config';
import { CreateUsers1748780686973 } from './migrations/1748780686973-CreateUsers';
import { CreateBoards1748781735682 } from './migrations/1748781735682-CreateBoards';
import { BoardSchema } from '../../../modules/boards/infrastructure/database/schemas/board.schema';
import { CreateTasks1748798157342 } from './migrations/1748798157342-CreateTasks';
import { TaskSchema } from '../../../modules/tasks/infrastructure/database/schemas/task.schema';

export const typeOrmConfig: DataSourceOptions = {
  type: 'mssql',
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [UserSchema, BoardSchema, TaskSchema],
  synchronize: true,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export default new DataSource({
  ...typeOrmConfig,
  migrations: [
    CreateUsers1748780686973,
    CreateBoards1748781735682,
    CreateTasks1748798157342,
  ],
});
