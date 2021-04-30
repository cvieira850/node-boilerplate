import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UsersAddColumnAccessToken1619739187379 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'access_token',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'access_token')
  }
}
