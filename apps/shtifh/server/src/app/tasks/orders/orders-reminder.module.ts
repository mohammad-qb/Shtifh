import { Module } from "@nestjs/common";
import { FcmModule } from "@shtifh/fcm-service";
import { OrdersReminderService } from "./orders-reminder.service";

@Module({
    imports: [FcmModule],
    providers: [OrdersReminderService],
    exports: [OrdersReminderService],
})
export class OrdersReminderModule {}