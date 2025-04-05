export interface TopicMessage {
  userId?: string;
  notification?: {
    title: string;
    body: string;
  };
  data: any;
}
