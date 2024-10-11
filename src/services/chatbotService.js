require('dotenv').config();
import request from "request";
const axios = require('axios');

const userLastFiveMessages = require('../controllers/HomeController');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const API_RAGMODEL = process.env.API_RAGMODEL;

const IMAGE_GET_STARTED = 'https://static.vnuhcm.edu.vn/images/0%20Phong%204T/Logo/Verfinal/Logo%20VNU%20-%20Chuan.png';
const HCMUS_IMAGE = 'https://cdn-media.sforum.vn/storage/app/media/hoc-phi-hcmus-thumbnail.jpg';
const USSH_IMAGE = 'https://hcmussh.edu.vn/img/news/26286031.jpg?t=26286035';
const UEL_IMAGE = 'https://img.giaoduc.net.vn/w700/Uploaded/2024/ihubnataungyr/2024_05_03/kt-luat-4254.png';
const UIT_IMAGE = 'https://banqlcs.uit.edu.vn/sites/banqlcs/files/uploads/uit2.jpg';
const IU_IMAGE = 'https://xdcs.cdnchinhphu.vn/thumb_w/640/446259493575335936/2023/8/22/dhqt-dhqghcm-1692699067416977588770.jpg';
const HCMUT_IMAGE = 'https://lms.hcmut.edu.vn/pluginfile.php/3/theme_academi/slide2image/1723683411/slbktv.jpg';

let callSendAPI = (sender_psid, response) => {
    return new Promise((resolve, reject) => {
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
                console.log('Message sent!');
                resolve('Message sent!');
            } else {
                console.error('Unable to send message:' + err);
                reject(err);
            }
        });
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
            let response2 = { "text": `Chúng tôi rất vui được đồng hành cùng bạn trong hành trình tìm hiểu và chọn lựa trường học phù hợp. Hệ thống của chúng tôi cung cấp thông tin chi tiết về từng trường thuộc ĐHQG-HCM, giúp bạn dễ dàng khám phá các yêu cầu tuyển sinh, chương trình đào tạo và các cơ hội học tập.`}
            let response3 = { "text": `Ngoài việc tư vấn về các trường, chúng tôi cũng sẵn sàng hỗ trợ bạn với các thông tin hữu ích khác như kí túc xá, xe bus và các tiện ích khác để bạn có thể chuẩn bị tốt nhất cho cuộc sống sinh viên của mình.`}
            let response4 = { "text": `Trong quá trình nếu hệ thống gặp sự cố, hãy thử bấm khởi động lại ở góc dưới bên phải cuộc hội thoại. Hoặc bạn có thể thử lại sau và đừng ngần ngại liên hệ cho chúng tôi.`}
            let response5 = { "text": `Để bắt đầu, vui lòng chọn trường bạn quan tâm từ danh sách dưới đây.\nChúc bạn có một trải nghiệm tìm kiếm thông tin thuận lợi!`}
            let response6 = getUniversitySelectTemplate();

            // // Send message
            // await callSendAPI(sender_psid, response1)
            //     .then(() => callSendAPI(sender_psid, response2))
            //     .then(() => callSendAPI(sender_psid, response3))
            //     .then(() => callSendAPI(sender_psid, response4))
            //     .then(() => callSendAPI(sender_psid, response5))
            //     .then(() => callSendAPI(sender_psid, response6))
            //     .then(() => resolve("done"))
            //     .catch((error) => reject(error));

            // Create delay
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

            sendTypingIndicator(sender_psid, true);
            await callSendAPI(sender_psid, response1);
            await delay(4000);
            await callSendAPI(sender_psid, response2);
            await delay(8000);
            await callSendAPI(sender_psid, response3);
            await delay(8000);
            await callSendAPI(sender_psid, response4);
            await delay(6000);
            await callSendAPI(sender_psid, response5);
            await delay(3000);
            await callSendAPI(sender_psid, response6);
            sendTypingIndicator(sender_psid, false);

            resolve("done");
        }catch(e){
            reject(e);
        }
    })
}

let handleRestartBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let username = await getUserName(sender_psid);
            let response1 = { "text": `Chào mừng ${username} đến với wse enroll-bot - Hệ thống tư vấn tuyển sinh tự động ĐHQG-HCM.`}
            let response5 = { "text": `Để bắt đầu, vui lòng chọn trường bạn quan tâm từ danh sách dưới đây.\nChúc bạn có một trải nghiệm tìm kiếm thông tin thuận lợi!`}
            let response6 = getUniversitySelectTemplate();

            // Create delay
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

            sendTypingIndicator(sender_psid, true);
            await callSendAPI(sender_psid, response1);
            await delay(4000);
            await callSendAPI(sender_psid, response5);
            await delay(3000);
            await callSendAPI(sender_psid, response6);
            sendTypingIndicator(sender_psid, false);

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
    try {
        // let response1 = { "text": "Tôi đã nhận được tin nhắn. Hãy đợi tôi một chút." }
        // // Send text message
        // await callSendAPI(sender_psid, response1);

        // Show typing indicator
        sendTypingIndicator(sender_psid, true);

        // Send user message to model and get model response
        console.log("message_history: ", userLastFiveMessages[sender_psid]);
        let model_response = await sendAPItoRAGModel(user_message, userLastFiveMessages[sender_psid], database);

        let response2 = { "text": model_response };

        // Send text message
        await callSendAPI(sender_psid, response2);

        // Hide typing indicator
        sendTypingIndicator(sender_psid, false);

    } catch (e) {
        let response = { "text": "Xin lỗi, hiện tại hệ thống đang gặp sự cố. Thực hiện báo lỗi ở link: https://rag-enrollbot.onrender.com/BaoLoi" };
        await callSendAPI(sender_psid, response);
        console.error("Error handling user question:", e); // Log error for debugging
    }
}

// Send API to RAG Model
let sendAPItoRAGModel = async (user_message, message_history, database) => {
    // Define the API endpoint and the request payload
    const url = "https://wse-rag-v2.onrender.com/api/query"; // FastAPI URL

    let chat_hist_str = '';
    if (!message_history) {
        console.log("Chat history is empty.")
    }
    else{
        chat_hist_str = message_history.map(msg => `- ${msg}`).join('\n');
    }

    let prompt = `Các câu hỏi trước của người dùng:\n${chat_hist_str}\n\nCâu hỏi hiện tại: ${user_message}`;

    const data = {
        prompt: prompt,
        database: database
    };
    console.log('prompt:', data.prompt);

    try {
        // Make the POST request
        console.log(database);
        const response = await axios.post(url, data);
        console.log(response.data.response); // Handle the response data
        console.log("Model response success!");
        return response.data.response;
    } catch (error) {
        console.error('Error making the request:', error); // Handle errors
        throw error; // Rethrow the error to be caught in the caller function
    }
}

function sendTypingIndicator(sender_psid, isTyping) {
    let sender_action = isTyping ? "typing_on" : "typing_off";

    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": sender_action
    };

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log(`Typing indicator sent: ${sender_action}`);
        } else {
            console.error("Unable to send typing indicator: " + err);
        }
    });
}

function addMessage(sender_psid, new_message) {
    // Create empty list
    if (!userLastFiveMessages[sender_psid]) {
        userLastFiveMessages[sender_psid] = [];
    }
    // Add new message
    userLastFiveMessages[sender_psid].push(new_message);

    // Just save last five messages
    if (userLastFiveMessages[sender_psid].length > 5) {
        userLastFiveMessages[sender_psid].shift(); // Xóa tin nhắn cũ nhất
    }
}


module.exports = {
    handleGetStarted: handleGetStarted,
    handleRestartBot: handleRestartBot,
    handleSendUniversitySelect: handleSendUniversitySelect,
    handleUserQuestion: handleUserQuestion,
    sendTypingIndicator: sendTypingIndicator,
    addMessage: addMessage
}