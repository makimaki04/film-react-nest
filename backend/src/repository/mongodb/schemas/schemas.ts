import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Schedule {
    @Prop({ required: true })
    id: string;
    @Prop()
    daytime: string;
    @Prop()
    hall: number;
    @Prop()
    rows: number;
    @Prop()
    seats: number;
    @Prop()
    price: number;
    @Prop()
    taken: string[];
}

const scheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Film {
    @Prop({ required: true })
    id: string;
    @Prop()
    rating: number;
    @Prop()
    tags: string[];
    @Prop()
    image: string;
    @Prop()
    cover: string;
    @Prop()
    title: string;
    @Prop()
    about: string;
    @Prop()
    description: string;
    @Prop({ type: [scheduleSchema] })
    schedule: Schedule[];
}

export const filmSchema = SchemaFactory.createForClass(Film);