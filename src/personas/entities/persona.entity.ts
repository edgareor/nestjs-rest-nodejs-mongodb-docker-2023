/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonaDocument = HydratedDocument<Persona>;

@Schema()
export class Persona {
    @Prop()
    nombre: string;

    @Prop()
    age: number;

    @Prop()
    estado: boolean;
}

export const PersonaSchema = SchemaFactory.createForClass(Persona);