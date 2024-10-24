import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema'; // Ajustar la ruta según tu estructura de proyecto

@Schema()
export class UserHistory extends Document {
  @Prop({ type: String, required: true })
    accessToken!: string;

  @Prop({ type: String, required: true })
    refreshToken!: string;

  @Prop({ type: User, required: true })
    user!: User;

  @Prop({ type: Date, default: Date.now })
    createdAt!: Date;
}

export const UserHistorySchema = SchemaFactory.createForClass(UserHistory);
