import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Area extends Document {
  @Prop({ type: String, required: true })
  name?: string;

  @Prop({ type: String })
  descripcion?: string;

}

export const AreaSchema = SchemaFactory.createForClass(Area);