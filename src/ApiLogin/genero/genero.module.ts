import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database.module";
import { generoProviders } from "./genero.providers";
import { GeneroService } from "./genero.service";
import { GeneroController } from "./genero.controller";


@Module({
    imports: [DatabaseModule],
    controllers:[GeneroController],
    providers: [
        ...generoProviders,
        GeneroService,
    ]
})

export class GeneroModule {}
