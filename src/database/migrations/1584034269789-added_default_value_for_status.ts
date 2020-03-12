import {MigrationInterface, QueryRunner} from "typeorm";

export class addedDefaultValueForStatus1584034269789 implements MigrationInterface {
    name = 'addedDefaultValueForStatus1584034269789'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `status` `status` int NOT NULL DEFAULT 1", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `status` `status` int NOT NULL", undefined);
    }

}
