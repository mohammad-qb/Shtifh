export interface TopicMessage {
  topic: string;
  notification?: {
    title: string;
    body: string;
  };
  data: any;
}
