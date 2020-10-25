export default interface IMessageBody {
  phoneNumber?: string;
  email?: string;
  message: string;
}

export default interface IResponse {
  message: string;
  data: any;
}
