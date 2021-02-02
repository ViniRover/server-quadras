import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateTypeIdFieldsTable1612303237775
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'fields',
      new TableColumn({
        name: 'type_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'fields',
      new TableForeignKey({
        name: 'FieldsType',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'types',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('fields', 'FieldsType');

    await queryRunner.dropColumn('fields', 'type_id');
  }
}
