import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User> & {
  matchPasswords: (password: string) => Promise<boolean>;
};

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true, minLength: 6 })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ minLength: 3 })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

UserSchema.pre<any>('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    const saltRounds = 10;
    update.password = await bcrypt.hash(update.password, saltRounds);
  }

  next();
});

UserSchema.methods.matchPasswords = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.set('toJSON', {
  transform(doc, ret) {
    delete (ret as any).password;
    return ret;
  },
});