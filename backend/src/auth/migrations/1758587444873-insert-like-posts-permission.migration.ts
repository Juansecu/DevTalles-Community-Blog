import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertLikePostsPermissionMigration1758587444873
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Permissions" ("Permission_id", "Name", "Description")
      VALUES
        (18, 'LIKE_POSTS', 'Permission to like posts');
    `);

    await queryRunner.query(`
      INSERT INTO "Role_permissions" ("Role_id", "Permission_id")
      VALUES
        -- WEB_MASTER
        (1, 18),
        -- USER
        (4, 18);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "Permissions"
      WHERE "Permission_id" = 18;
    `);

    await queryRunner.query(`
      DELETE FROM "Role_permissions"
      WHERE "Permission_id" = 18;
    `);
  }
}
