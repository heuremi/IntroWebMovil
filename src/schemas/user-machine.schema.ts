import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class UserMachine extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  idUser?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Machine' })
  idMachine?: Types.ObjectId;
}
export const UserMachineSchema = SchemaFactory.createForClass(UserMachine);
