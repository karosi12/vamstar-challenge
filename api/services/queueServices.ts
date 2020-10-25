import { SQS } from 'aws-sdk';
import IMessageBody from '../interfaces';
import IResponse from '../interfaces';
const queueURL = 'https://sqs.us-east-2.amazonaws.com/042178598140/vamstar';
const sqs = new SQS({ region: 'us-east-2' });

export const sendDataToSQS = async (data: IMessageBody): Promise<IResponse> => {
  try {
    const response = await sqs
      .sendMessage({
        MessageBody: JSON.stringify(data),
        QueueUrl: queueURL,
      })
      .promise();
    console.log(`Message put on queue`, response);
    // return { message: 'Message put on queue', data: response };
    // const notificationResponse = await sendNotification({ message: data.message, phoneNumber: data.phoneNumber });
    return { message: 'Message added to queue', data: response };
  } catch (e) {
    console.log('Exception on queue', e);
    return { message: 'Exception on queue', data: e };
  }
};
