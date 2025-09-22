import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertPermissionsMigration1758495905823
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Permissions" ("Permission_id", "Name", "Description")
      VALUES
        (1, 'CREATE_POST', 'Permission to create a new post'),
        (2, 'CREATE_COMMENT', 'Permission to create a new comment'),
        (3, 'DELETE_OWN_POST', 'Permission to delete own post'),
        (4, 'DELETE_ANY_POST', 'Permission to delete any post'),
        (5, 'DELETE_OWN_COMMENT', 'Permission to delete own comment'),
        (6, 'DELETE_ANY_COMMENT', 'Permission to delete any comment'),
        (7, 'EDIT_OWN_POST', 'Permission to edit own post'),
        (8, 'EDIT_OWN_COMMENT', 'Permission to edit own comment'),
        (9, 'VIEW_DASHBOARD', 'Permission to view the admin dashboard'),
        (10, 'DELETE_USER_ACCOUNTS', 'Permission to delete user accounts'),
        (11, 'ASSIGN_ROLES', 'Permission to assign roles to other users'),
        (12, 'REMOVE_ROLES', 'Permission to remove roles from other users'),
        (13, 'ASSIGN_ROLE_PERMISSIONS', 'Permission to assign permissions to roles'),
        (14, 'REMOVE_ROLE_PERMISSIONS', 'Permission to remove permissions from roles'),
        (15, 'ASSIGN_USER_PERMISSIONS', 'Permission to assign permissions to users'),
        (16, 'REMOVE_USER_PERMISSIONS', 'Permission to remove permissions from users'),
        (17, 'VIEW_USER_LIST', 'Permission to view the list of users');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const permissionIds = [
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
    ];

    await queryRunner.query(`
      DELETE FROM Permissions
      WHERE Permission_id IN (${permissionIds.join(', ')});
    `);
  }
}
