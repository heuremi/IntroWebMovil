import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Area, AreaSchema } from './area.schema';

@Schema()
export class Machine extends Document {
  @Prop({ type: String, required: true })
  brand?: string;

  @Prop({ type: String, required: true })
  _model?: string;

  @Prop({ type: Number, required: true })
  year?: number;

  @Prop({ type: String, required: true })
  licencePlate?: string;

  @Prop({ type: [AreaSchema]})
  area?: Area;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);