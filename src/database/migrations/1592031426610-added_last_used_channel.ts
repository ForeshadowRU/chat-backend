import {MigrationInterface, QueryRunner} from "typeorm";

export class addedLastUsedChannel1592031426610 implements MigrationInterface {
    name = 'addedLastUsedChannel1592031426610'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `message` CHANGE `last_channel` `last_used_channel` int NOT NULL DEFAULT '0'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `message` CHANGE `last_used_channel` `last_channel` int NOT NULL DEFAULT '0'", undefined);
    }

}
