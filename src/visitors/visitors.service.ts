import { Visitor, VisitorDocument } from './entities/visitor.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectModel(Visitor.name)
    private visitorModel: Model<VisitorDocument>,
  ) {}

  find(options: FilterQuery<VisitorDocument>) {
    return this.visitorModel.find(options);
  }

  count(options) {
    return this.visitorModel.count(options).exec();
  }

  create(createVisitorDto: CreateVisitorDto) {
    const visitor = new this.visitorModel(createVisitorDto);
    return visitor.save();
  }

  findAll() {
    return this.visitorModel.find();
  }

  findOne(id: string) {
    return this.visitorModel.findById(id);
  }

  update(id: string, updateVisitorDto: UpdateVisitorDto) {
    return this.visitorModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateVisitorDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.visitorModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
