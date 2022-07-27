import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Request } from 'express';

@Controller('visitors')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Get('search')
  async search(@Req() req: Request) {
    let options = {};
    if (req.query.type) {
      options = {
        $or: [{ type: new RegExp(req.query.type.toString(), 'i') }],
      };
    }

    const query = this.visitorsService.find(options);

    // if (req.query.sort) {
    //   query.sort({ _id: req.query.sort });
    // }

    const page: number = parseInt(req.query.page as any) || 1;
    const limit = 10;
    const total = await this.visitorsService.count(options);

    const data = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  @Post()
  create(@Body() createVisitorDto: CreateVisitorDto) {
    return this.visitorsService.create(createVisitorDto);
  }

  @Get()
  findAll() {
    return this.visitorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitorDto: UpdateVisitorDto) {
    return this.visitorsService.update(id, updateVisitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitorsService.remove(id);
  }
}
