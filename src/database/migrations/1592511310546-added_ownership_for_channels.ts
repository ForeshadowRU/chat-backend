import {MigrationInterface, QueryRunner} from "typeorm";

export class addedOwnershipForChannels1592511310546 implements MigrationInterface {
    name = 'addedOwnershipForChannels1592511310546'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel` ADD `createdById` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP COLUMN `text`", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD `text` text NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `channel` ADD CONSTRAINT `FK_b2207f24c9461a9e053f2d2e090` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel` DROP FOREIGN KEY `FK_b2207f24c9461a9e053f2d2e090`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP COLUMN `text`", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD `text` mediumtext CHARACTER SET \"utf8mb4\" COLLATE \"utf8mb4_general_ci\" NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `createdById`", undefined);
    }

}
