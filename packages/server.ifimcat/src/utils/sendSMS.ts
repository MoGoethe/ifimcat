// const tencentcloud = require("../../../../tencentcloud-sdk-nodejs");


// const SmsClient = tencentcloud.sms.v20190711.Client;
// const models = tencentcloud.sms.v20190711.Models;

// const Credential = tencentcloud.common.Credential;
// const ClientProfile = tencentcloud.common.ClientProfile;
// const HttpProfile = tencentcloud.common.HttpProfile;

// let cred = new Credential("AKIDMSP3Mf1JWvd6UobBjKnVS9vL8YjimdHd", "KbpfEhsgXAZyxgWw6xhLn3NbaLs58k9B");
// let httpProfile = new HttpProfile();
// httpProfile.endpoint = "sms.tencentcloudapi.com";
// let clientProfile = new ClientProfile();
// clientProfile.httpProfile = httpProfile;
// let client = new SmsClient(cred, "ap-guangzhou", clientProfile);

// let req = new models.SendSmsRequest();

// let params = '{\"PhoneNumberSet\":[\"17785359309\"],\"TemplateID\":\"298828\",\"Sign\":\"易书网\",\"TemplateParamSet\":[\"1234\",\"30\"],\"SmsSdkAppid\":\"1400397742\"}'
// req.from_json_string(params);


// client.SendSms(req, function(errMsg, response) {

//     if (errMsg) {
//         console.log(errMsg);
//         return;
//     }

//     console.log(response.to_json_string());
// });