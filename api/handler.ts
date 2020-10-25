import { APIGatewayProxyHandler, APIGatewayEvent, Context, Callback } from 'aws-lambda';
import 'source-map-support/register';
export const ping: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: Callback,
): Promise<any> => {
  try {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `server is running`,
      }),
    });
  } catch (error) {
    callback(null, { statusCode: 500, body: JSON.stringify({ message: 'Something went wrong' }) });
  }
};
