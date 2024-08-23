require('dotenv').config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGE_GET_STARTED = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvnuhcm.edu.vn%2Ftin-tuc_32343364%2Fco-quan-dhqg-hcm-tuyen-dung-vien-chuc%2F363038323364.html&psig=AOvVaw2p945znT5m_2njg5ro9teU&ust=1724501641069000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiOxK-Li4gDFQAAAAAdAAAAABAE';

let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
        "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

let getUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                // "first_name": "Peter",
                // "last_name": "Chang",
                let username = `${body.first_name} ${body.last_name}`;
                resolve(username);
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        });
    })
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let username = await getUserName(sender_psid);
            let response1 = { "text": `Chào mừng ${username} đến với wse enroll-bot - Hệ thống tư vấn tuyển sinh tự động ĐHQG-HCM.`}

            let response2 = sendGetStartedTemplate();

            // send text message
            await callSendAPI(sender_psid, response1);

            // send generic template message
            await callSendAPI(sender_psid, response2);

            resolve("done");
        }catch(e){
            reject(e);
        }
    })
}

let sendGetStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Chọn trường đại học bạn muốn tư vấn:",
                    "subtitle": "Dưới đây là các danh sách các trường trong hệ thống ĐHQG-HCM. Ấn vào nút bấm tương ứng với lựa chọn của bạn.",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                    {
                        "type": "postback",
                        "title": "HCMUS - Đại học Khoa học Tự nhiên",
                        "payload": "HCMUS",
                    },
                    {
                        "type": "postback",
                        "title": "IU - Đại học Quốc tế",
                        "payload": "IU",
                    },
                    {
                        "type": "postback",
                        "title": "USSH - Đại học Khoa học Xã hội & Nhân văn",
                        "payload": "USSH",
                    },
                    {
                        "type": "postback",
                        "title": "UIT - Đại học Công nghệ thông tin",
                        "payload": "UIT",
                    },
                    {
                        "type": "postback",
                        "title": "UEL - Đại học Kinh tế - Luật",
                        "payload": "UEL",
                    },
                    {
                        "type": "postback",
                        "title": "HCMUT - Đại học Bách Khoa",
                        "payload": "HCMUT",
                    }
                    ],
                }]
            }
        }
    }
    return response;
}

module.exports = {
    handleGetStarted: handleGetStarted
}