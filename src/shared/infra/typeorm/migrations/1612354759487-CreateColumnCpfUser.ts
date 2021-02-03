import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateColumnCpfUser1612354759487
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'cpf');
  }
}
