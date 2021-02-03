import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateIsCompanyInUsers1612390663137
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'is_company',
        type: 'boolean',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'is_company');
  }
}
