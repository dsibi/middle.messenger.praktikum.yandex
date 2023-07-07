/* eslint-disable @typescript-eslint/semi */
class Repo {
  user: string;
  chat: string;
  messages: string[];
  constructor(user: string, chat: string, messages: string[]) {
    this.user = user;
    this.chat = chat;
    this.messages = messages;
  }
}

class Contact {
  name: string;
  avatar: string;
  constructor(name: string, avatar: string) {
    this.name = name;
    this.avatar = avatar;
  }
}

class Chat {
  messageCollection: string[];
  settings: string[];
  constructor(messageCollection: string[], settings: string[]) {
    this.messageCollection = messageCollection;
    this.settings = settings;
  }
}

class Message {
  msgText: string;
  time: Date;
  status: string;
  constructor(msgText: string, time: Date, status: string) {
    this.msgText = msgText;
    this.time = time;
    this.status = status;
  }
}
