export {};
declare global {
  namespace PrismaJson {
    type NameJson = { ar: string; en: string; he: string };
    type AgentWalletSummaryJson = {
      total_tips: number;
      total_orders_earn: number;
    };
    type CityScheduleJson = {
      global: {
        start_time: string;
        end_time: string;
        requests_in_hour: number;
        is_off: boolean;
      };
      monthly: {
        start_time: string;
        end_time: string;
        year: number;
        month: number;
        requests_in_hour: number;
      }[];
      recurring: {
        start_time: string;
        end_time: string;
        day: number;
        requests_in_hour: number;
        is_off: boolean;
        unavailable_slots: {
          start_time: string;
          end_time: string;
        }[];
      }[];
      daily: {
        start_time: string;
        end_time: string;
        date: string;
        requests_in_hour: number;
        is_off: boolean;
        unavailable_slots: {
          start_time: string;
          end_time: string;
        }[];
      }[];
    };
    type CarOrderLogJson = {
      status: number;
      note?: string;
      createdAt: Date;
    };
    type CarOrderAccessoriesJson = {
      accessoryId: string;
      quantity: number;
    };
    type CityCarModelServiceJson = {
      carModelId: string;
      serviceId: string;
      is_active: boolean;
      fees: number;
    };
  }
}
