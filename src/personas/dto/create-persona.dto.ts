/* eslint-disable prettier/prettier */

import { IsBoolean, IsNotEmpty, IsNumber, Max, MaxLength, Min, MinLength } from "class-validator";

export class PersonaDto {

    @IsNotEmpty()
    @MinLength(2, { message: 'Nombre muy corto' })
    @MaxLength(30)
    nombre: string;

    @IsNumber()
    @Min(0)
    @Max(120)
    age: number;

    @IsBoolean()
    estado: boolean;
}
