import { Exclude, Expose } from "class-transformer";
import "reflect-metadata";

@Exclude()
export class SwitchModel {
    @Expose()
    label!: string;
    @Expose()
    index!: string;
}
