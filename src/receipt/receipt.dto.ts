import { IsNumber, IsObject, IsString } from "class-validator";

export default class CreatePostDto {
    @IsString()
    public name: string;

    @IsString()
    public type: string;

    @IsNumber()
    public difficulty: number;

    @IsString()
    public description: string;

    @IsNumber()
    public energy: number;

    @IsNumber()
    public time: number;

    @IsNumber()
    public price: number;

    @IsNumber()
    public serving: number;

    @IsString()
    public author: string;

    @IsObject()
    public ingredients: Object;
}
