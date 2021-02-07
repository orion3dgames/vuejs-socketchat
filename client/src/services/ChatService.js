import axios from "axios";

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

export default {
  async getChats(type) {
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {
        user_id: user.id,
        token: user.token,
        type: type
    }
    let url = process.env.VUE_APP_API_URL+'/chats/loadall/?payload=' + btoa(JSON.stringify(data))
    let res = await instance.get(url);
    return res.data.chats;
  },
  async getChat(chatId) {
      let user = JSON.parse(localStorage.getItem('user'));
      let data = {
          user_id: user.id,
          token: user.token,
          room_id: chatId
      }
      let url = process.env.VUE_APP_API_URL+'/chats/load/?payload=' + btoa(JSON.stringify(data))
      let res = await instance.get(url);
      return res.data.chat;
  }
}