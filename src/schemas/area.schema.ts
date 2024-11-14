import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { Machine, MachineSchema } from './machine.schema';

@Schema()
export class Area extends Document {
  @Prop({ type: String, required: true })
  name?: string;

  //@Prop({ type: [MachineSchema], default: [] })
  //machines?: Machine[];

  @Prop({ type: Date })
  createdAt?: Date;

}

export const AreaSchema = SchemaFactory.createForClass(Area);