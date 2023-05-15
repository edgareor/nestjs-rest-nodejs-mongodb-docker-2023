/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Res, Req, Query, Ip, UseGuards, Put } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonaDto } from './dto/create-persona.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('personas')
@Controller('api/personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) { }

  @UseGuards(JwtAuthGuard)
  @Get('util/:id')
  findOne(@Param() params: any, @Query() querys: any, @Ip() ip: string, @Req() request: any, @Res() response) {
    try {
      console.log(request.params, request.body, request.query, request.ip);
      response.status(200).send({ "message": { "params": params, "querys": querys, "ip": ip } });
    } catch (err) {
      response.status(500).json({ message: err.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res): Promise<any> {
    try {
      const response = await this.personasService.findAll();
      return res.status(200).json({ data: response })
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Res() res, @Param() params: any): Promise<any> {
    try {
      const response = await this.personasService.findById(params.id);
      console.log(response);
      return res.status(200).json({ data: response })
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPersonaDto: PersonaDto, @Res() res) {
    try {
      const response = await this.personasService.create(createPersonaDto);
      return res.status(200).json({ data: response })
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: PersonaDto, @Res() res) {
    try {
      const response = await this.personasService.update(id, body);
      return res.status(200).json({ data: response })
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    try {
      const response = await this.personasService.remove(id);
      return res.status(200).json({ data: response })
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }
}
