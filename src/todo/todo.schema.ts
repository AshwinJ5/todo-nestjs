import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  user: Types.ObjectId;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Date, required: true })
  toBeCompletedBy: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

// TodoSchema.pre(/^find/, function (next) {
//   this.populate('user');
//   next();
// });
