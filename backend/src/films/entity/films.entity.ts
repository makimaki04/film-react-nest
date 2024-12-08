import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Film {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('float')
    rating: number;

    @Column('varchar')
    director: string;

    @Column('text')
    tags: string;

    @Column('varchar')
    image: string;

    @Column('varchar')
    cover: string;

    @Column('varchar')
    title: string;

    @Column('varchar')
    about: string;

    @Column('varchar')
    description: string;

    @OneToMany(() => Schedule,  (schedule) => schedule.film, { cascade: true })
    schedule: Schedule[];
}

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    daytime: string;

    @Column('integer')
    hall: number;

    @Column('integer')
    rows: number;

    @Column('integer')
    seats: number;

    @Column('float')
    price: number;

    @Column('text')
    taken: string;

    @ManyToOne(() => Film,  (film) => film.schedule)
    film: Film;
}

