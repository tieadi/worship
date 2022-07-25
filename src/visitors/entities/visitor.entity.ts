import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitorDocument = Visitor & Document;

@Schema()
export class Visitor {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: [String], required: true })
  names: string;

  @Prop({ type: String, required: true })
  origin: string;

  @Prop({ type: String, required: true })
  institution: string;

  @Prop({ type: Date, required: true })
  when: Date;
}

export const VisitorSchema = SchemaFactory.createForClass(Visitor);
