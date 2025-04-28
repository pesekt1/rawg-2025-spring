import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Game } from "./Game";

@Entity("publisher")
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  image_background?: string;

  @ManyToMany(() => Game, (game) => game.publishers)
  games: Game[];
}
