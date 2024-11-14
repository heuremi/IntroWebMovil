import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserMachine extends Document {
  @Prop({ type: String, required: true })
  idUser?: string;

  @Prop({ type: Number, required: true })
  idMachine?: string;

}

export const UserMachineSchema = SchemaFactory.createForClass(UserMachine);