/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PersonaDto } from './dto/create-persona.dto';
import { Persona } from './entities/persona.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PersonasService {

  constructor(@InjectModel('Objetos') private personasModel: Model<Persona>) { }

  findAll() {
    return this.personasModel.find();
  }

  findById(id: any) {
    return this.personasModel.findById(id);
  }

  create(createPersonaDto: PersonaDto) {
    return this.personasModel.create(createPersonaDto);
  }

  update(id: any, persona: any) {
    return this.personasModel.findByIdAndUpdate(id, persona);
  }

  remove(id: any) {
    return this.personasModel.findByIdAndRemove(id);
  }
}
