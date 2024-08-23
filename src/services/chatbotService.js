require('dotenv').config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGE_GET_STARTED = 'https://static.vnuhcm.edu.vn/images/0%20Phong%204T/Logo/Verfinal/Logo%20VNU%20-%20Chuan.png';

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
                    "title": "Chọn hệ thống muốn tư vấn:",
                    "subtitle": "Ấn vào nút bấm tương ứng với lựa chọn của bạn.",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                    {
                        "type": "postback",
                        "title": "THEO TRƯỜNG",
                        "payload": "UNIVERSITY_SELECT",
                    },
                    {
                        "type": "postback",
                        "title": "TƯ VẤN CHUNG",
                        "payload": "FAQ",
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