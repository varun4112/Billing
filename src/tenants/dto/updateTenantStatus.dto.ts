import { IsBoolean, IsNotEmpty } from "class-validator";

export class updateTenantStatusDto{
    @IsBoolean()
    isActive: boolean;
    id: number
}