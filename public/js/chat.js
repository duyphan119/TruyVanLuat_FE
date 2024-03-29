let __protocol = document.location.protocol;
let __baseUrl = __protocol + "//livechat.fpt.ai/v35/src";

let prefixNameLiveChat = "Luật Giao thông đường bộ";
let objPreDefineLiveChat = {
    appCode: "4dbbbef25ebb4208d80f14517b9e4a58",
    themes: "",
    appName: prefixNameLiveChat ? prefixNameLiveChat : "Live support",
    thumb: "",
    icon_bot: "",
  },
  appCodeHash = window.location.hash.substr(1);
if (appCodeHash.length == 32) {
  objPreDefineLiveChat.appCode = appCodeHash;
}

let fpt_ai_livechat_script = document.createElement("script");
fpt_ai_livechat_script.id = "fpt_ai_livechat_script";
fpt_ai_livechat_script.src = __baseUrl + "/static/fptai-livechat.js";
document.body.appendChild(fpt_ai_livechat_script);

let fpt_ai_livechat_stylesheet = document.createElement("link");
fpt_ai_livechat_stylesheet.id = "fpt_ai_livechat_script";
fpt_ai_livechat_stylesheet.rel = "stylesheet";
fpt_ai_livechat_stylesheet.href = __baseUrl + "/static/fptai-livechat.css";
document.body.appendChild(fpt_ai_livechat_stylesheet);

fpt_ai_livechat_script.onload = function () {
  fpt_ai_render_chatbox(objPreDefineLiveChat, __baseUrl, "livechat.fpt.ai:443");
};
