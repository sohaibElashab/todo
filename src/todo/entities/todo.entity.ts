import * as mongoose from 'mongoose'
import { UserInterface } from 'src/user/entities/user.entity';
import { Statu, Tag } from '../shared/shared.enum';

export const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  statu: { type: String, required: true, enum: Statu, default: Statu.NEW },
  tag: { type: String, required: true, enum: Tag, default: Tag.WORK },
  discription: { type: String },
  due_date: { type: Date },
  user: { type: mongoose.Types.ObjectId, ref: 'User' , required: true } ,
});

export interface TodoInterface extends mongoose.Document {
    id : string;
    title : string;
    statu : string;
    tag : string;
    discription : string;
    due_date : Date;
    user : string
}