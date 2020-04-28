import {MigrationInterface, QueryRunner} from "typeorm";

export class removed1588006840404 implements MigrationInterface {
    name = 'removed1588006840404'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `username`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `password`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `isGoogleAccount`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `isGoogleAccount` tinyint NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `password` char(60) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `username` varchar(255) NOT NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user` (`username`)", undefined);
    }

}
