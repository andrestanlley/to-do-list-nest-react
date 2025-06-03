import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldsTask1748901850675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('tasks', [
      new TableColumn({
        name: 'finished',
        type: 'tinyint',
        isNullable: true,
      }),
      new TableColumn({
        name: 'limit_date',
        type: 'datetime',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tasks', 'finished');
    await queryRunner.dropColumn('tasks', 'limitDate');
  }
}
