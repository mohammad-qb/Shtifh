import { $Enums } from "@prisma/client"

namespace PrismaJson {
    export interface NameJson { ar: string, en: string, he: string };
    export interface EmployeeWalletSummaryJson { total_tips: number, total_orders_earn: number };
    export interface CityScheduleJson {
      global: {
        start_time: string,
        end_time: string,
        requests_in_hour: number,
        is_off: boolean,
      },
      monthly: {
        start_time: string,
        end_time: string,
        year: number,
        month: number,
        requests_in_hour: number,
      }[],
      recurring: {
        start_time: string,
        end_time: string,
        date: string,
        requests_in_hour: number,
        is_off: boolean,
      }[],
      daily: {
        start_time: string,
        end_time: string,
        date: string,
        requests_in_hour: number,
        is_off: boolean,
      }[],
    };
    export interface CarOrderLogJson {
      status: string,
      createdAt: Date
    }
    export interface CarOrderAccessoriesJson {
      accessoryId: string,
      quantity: number,
    }
    export interface CityCarModelServiceJson {
      carModelId: string,
      serviceId: string,
      is_active: boolean,
      fees: number
    };
  }
