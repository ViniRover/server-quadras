import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateFieldsInTableUser1612433323736
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'cnpj',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({
        name: 'cnpj',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }
}
