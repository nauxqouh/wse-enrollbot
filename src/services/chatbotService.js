require('dotenv').config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const API_MODEL = 'https://api.render.com/deploy/srv-cr4aqu0gph6c73bnivt0?key=A8lhzw-cuEI';

const IMAGE_GET_STARTED = 'https://static.vnuhcm.edu.vn/images/0%20Phong%204T/Logo/Verfinal/Logo%20VNU%20-%20Chuan.png';
const HCMUS_IMAGE = 'https://cdn-media.sforum.vn/storage/app/media/hoc-phi-hcmus-thumbnail.jpg';
const USSH_IMAGE = 'https://hcmussh.edu.vn/img/news/26286031.jpg?t=26286035';
const UEL_IMAGE = 'https://img.giaoduc.net.vn/w700/Uploaded/2024/ihubnataungyr/2024_05_03/kt-luat-4254.png';
const UIT_IMAGE = 'https://banqlcs.uit.edu.vn/sites/banqlcs/files/uploads/uit2.jpg';
const IU_IMAGE = 'https://xdcs.cdnchinhphu.vn/thumb_w/640/446259493575335936/2023/8/22/dhqt-dhqghcm-1692699067416977588770.jpg';
const HCMUT_IMAGE = 'https://lms.hcmut.edu.vn/pluginfile.php/3/theme_academi/slide2image/1723683411/slbktv.jpg';

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
            console.log('message sent!');
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

            let response2 = getStartedTemplate();

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

let getStartedTemplate = () => {
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

let handleSendUniversitySelect = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try{

            let response = getUniversitySelectTemplate();

            // send generic template message
            await callSendAPI(sender_psid, response);
            
            resolve("done");
        }catch(e){
            reject(e);
        }
    })
}

let getUniversitySelectTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                {
                    "title": "HCM-US",
                    "subtitle": "Trường Đại học Khoa học Tự Nhiên",
                    "image_url": HCMUS_IMAGE,
                    "buttons": [
                    {
                        "type": "postback",
                        "title": "Chọn",
                        "payload": "HCMUS",
                    },
                    ],
                },
                {
                    "title": "HCM-USSH",
                    "subtitle": "Trường Đại học Khoa học Xã hội & Nhân văn",
                    "image_url": USSH_IMAGE,
                    "buttons": [
                    {
                        "type": "postback",
                        "title": "Chọn",
                        "payload": "USSH",
                    },
                    ],
                },
                {
                    "title": "HCM-UIT",
                    "subtitle": "Trường Đại học Công nghệ thông tin",
                    "image_url": UIT_IMAGE,
                    "buttons": [
                    {
                        "type": "postback",
                        "title": "Chọn",
                        "payload": "UIT",
                    },
                    ],
                },
                {
                    "title": "HCM-IU",
                    "subtitle": "Trường Đại học Quốc tế",
                    "image_url": IU_IMAGE,
                    "buttons": [
                    {
                        "type": "postback",
                        "title": "Chọn",
                        "payload": "IU",
                    },
                    ],
                },
                {
                    "title": "HCM-HCMUT",
                    "subtitle": "Trường Đại học Bách Khoa",
                    "image_url": HCMUT_IMAGE,
                    "buttons": [
                    {
                        "type": "postback",
                        "title": "Chọn",
                        "payload": "HCMUT",
                    },
                    ],
                },
                {
                    "title": "HCM-UEL",
                    "subtitle": "Trường Đại học Kinh tế - Luật",
                    "image_url": UEL_IMAGE,
                    "buttons": [
                    {
                        "type": "postback",
                        "title": "Chọn",
                        "payload": "UEL",
                    },
                    ],
                }
                ]
            }
        }
    }
    return response;
}


let handleUserQuestion = async (sender_psid, user_message, database) => {
    return new Promise(async (resolve, reject) => {
        try{
            let response1 = { "text": "Tôi đã nhận được tin nhắn. Hãy đợi tôi một chút."}
            // Send text message
            await callSendAPI(sender_psid, response1);

            // Send user message to model and get model response
            let model_response = await sendAPItoRAGModeln(user_message, database);

            let response2 = { "text" : model_response};

            // Send text message
            await callSendAPI(sender_psid, response2);

            resolve("done");
        }catch(e){
            let response = { "text": "Xin lỗi, hiện tại hệ thống đang gặp sự cố." };
            await callSendAPI(sender_psid, response);
            reject(e);
        }
    });
}

// Send API to RAG Model
let sendAPItoRAGModel = async (user_message, database) => {

    const url = "https://wse-api-rag.onrender.com/api/query"; // FastAPI URL

    // Create the data object to be sent in the request body
    const data = {
        prompt: user_message,
        database: database
    };

    try {
        // Send a POST request to the FastAPI server
        const response = await axios.post(url, data);
        
        // Return the response data (typically the model's output)
        return response.data.response;
    } catch (e) {
        // Handle any errors
        console.error('Error sending the request:', e);
        throw e;
    }
}


module.exports = {
    handleGetStarted: handleGetStarted,
    handleSendUniversitySelect: handleSendUniversitySelect,
    handleUserQuestion: handleUserQuestion
}