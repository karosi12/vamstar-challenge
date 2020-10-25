import { APIGatewayProxyHandler, APIGatewayEvent, Context, Callback } from 'aws-lambda';
import IMessageBody from './interfaces';
import { sendDataToSQS, recieveFromQueue } from './services/queueServices';
import 'source-map-support/register';

export const ping: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: Callback,
): Promise<any> => {
  try {
    callback(null, { statusCode: 200, body: JSON.stringify({ message: `server is running` }) });
  } catch (error) {
    callback(null, { statusCode: 500, body: JSON.stringify({ message: 'Something went wrong' }) });
  }
};

export const addMsgToQueue: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: Callback,
): Promise<any> => {
  const requestBody: IMessageBody = JSON.parse(event.body);
  try {
    if (!requestBody.message)
      callback(null, { statusCode: 400, body: JSON.stringify({ message: 'message is required' }) });
    if (requestBody.email || requestBody.phoneNumber) {
      const { data, message } = await sendDataToSQS(requestBody);
      callback(null, { statusCode: 200, body: JSON.stringify({ message, data }) });
    } else {
      callback(null, { statusCode: 400, body: JSON.stringify({ message: 'email or phone number is required' }) });
    }
  } catch (error) {
    callback(null, { statusCode: 500, body: JSON.stringify({ message: 'Internal server error' }) });
  }
};

export const fetchDataFromQueue: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: Callback,
): Promise<any> => {
  try {
    const { data, message } = await recieveFromQueue();
    if (Object.keys(data).length === 0) callback(null, { statusCode: 400, body: JSON.stringify({ message }) });
    callback(null, { statusCode: 200, body: JSON.stringify({ message, data }) });
  } catch (error) {
    callback(null, { statusCode: 500, body: JSON.stringify({ message: 'Internal server error' }) });
  }
};

