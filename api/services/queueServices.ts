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
    return { message: 'Message added to queue', data: response };
  } catch (error) {
    return { message: 'Exception on queue', data: error };
  }
};

export const recieveFromQueue = async (): Promise<any> => {
  const params = { QueueUrl: queueURL, VisibilityTimeout: 600 };
  try {
    const response = await sqs.receiveMessage(params).promise();
    return {
      message: 'Message received',
      data: { messageId: response.Messages[0].MessageId, data: JSON.parse(response.Messages[0].Body) },
    };
  } catch (error) {
    return { message: 'unable to fetch data', data: error };
  }
};
