import {MigrationInterface, QueryRunner} from "typeorm";

export class changedModelsForRefractorring1588106313856 implements MigrationInterface {
    name = 'changedModelsForRefractorring1588106313856'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel` DROP FOREIGN KEY `FK_656efd5d40c72d70f0e63293966`", undefined);
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `serverId`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel` ADD `serverId` varchar(36) NULL", undefined);
        await queryRunner.query("ALTER TABLE `channel` ADD CONSTRAINT `FK_656efd5d40c72d70f0e63293966` FOREIGN KEY (`serverId`) REFERENCES `server`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
