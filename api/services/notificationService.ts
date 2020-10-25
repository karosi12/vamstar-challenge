import { SES, SNS } from 'aws-sdk';
const sns = new SNS({ region: 'us-east-2', apiVersion: '2012-10-17' });
const ses = new SES({ region: 'us-east-2', apiVersion: '2010-12-01' });
const creatorEmail = 'adekayor@gmail.com';

export const sendViaEmail = async (data: INotificationEmailBody): Promise<any> => {
  try {
    const params = {
      Source: creatorEmail,
      Destination: {
        ToAddresses: [`${data.email}`],
      },
      ReplyToAddresses: [creatorEmail],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `${data.message}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'For Testing',
        },
      },
    };
    const response = await ses.sendEmail(params).promise();
    return { message: 'email notification sent', data: response };
  } catch (error) {
    return { message: 'unable to send email notification', data: error };
  }
};

export const sendViaSMS = async (data: INotificationSMSBody): Promise<any> => {
  try {
    const params = {
      Message: data.message, //'TEXT_MESSAGE' /* required */,
      PhoneNumber: data.phoneNumber, //'E.164_PHONE_NUMBER',
    };
    // Create promise and SNS service object
    const response = await sns.publish(params).promise();
    return { message: 'sms notification sent', data: response };
  } catch (error) {
    console.error('unable to send sms notification', error);
    return { message: 'unable to send sms notification', data: error };
  }
};

interface INotificationEmailBody {
  email: string;
  message: string;
}
interface INotificationSMSBody {
  phoneNumber: string;
  message: string;
}
