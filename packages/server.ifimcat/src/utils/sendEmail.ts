import nodemailer from 'nodemailer';
import config from '../config';

export async function sendMail(email: string, url: string) {
  const { host, port, secure, auth: {user, pass}, tls: { rejectUnauthorized } } = config.mailServer;
  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: !!secure,
    auth: {
      user,
      pass,
    },
    tls:{
      rejectUnauthorized: !!rejectUnauthorized,
    }
  });

  const output = `
    <h3>您正在使用Ifimcat, 点击链接查看详情</h3>
    <p style="font-size:14px"><a href="${url}" style="color:#321fdb">${url}</a></p>
  `;

  let mailOptions = {
    from: user,
    to: email,
    subject: '欢迎使用Ifimcat',
    html: output
  };
  await transporter.sendMail(mailOptions);

}

