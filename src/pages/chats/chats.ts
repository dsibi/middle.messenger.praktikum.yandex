/* eslint-disable @typescript-eslint/semi */
import сhats from "./chats.hbs";
import Handlebars from "handlebars";
import button from "../../components/button/button.hbs";

Handlebars.registerPartial("button", button);

class Contact {
  name: string;
  avatar: string;
  lastMsg: string;
  constructor(name: string, avatar: string, lastMsg: string) {
    this.name = name;
    this.avatar = avatar;
    this.lastMsg = lastMsg;
  }
}

type NameLastMsg = {
  name: string;
  lastMsg: string;
};

const nameLastMsg: NameLastMsg[] = [
  {
    name: "Reed Bryant",
    lastMsg: "web browser or other runtime system provides JavaScript APIs for",
  },
  {
    name: "Germaine Barry",
    lastMsg:
      "(APIs) for working with text, dates, regular expressions, standard data",
  },
  {
    name: "Fallon Mathis",
    lastMsg:
      "standard.[11] It has dynamic typing, prototype-based object-orientation, and first-class functions.",
  },
  {
    name: "Ashton Brennan",
    lastMsg:
      "Paradigm Multi-paradigm: event-driven, functional, imperative, procedural, object-oriented programming Designed by",
  },
  {
    name: "Brielle Martin",
    lastMsg:
      "appeared December 4, 1995; 27 years ago[1] Stable release ECMAScript",
  },
  {
    name: "Oleg Contreras",
    lastMsg:
      "JavaScript (/ˈdʒɑːvəskrɪpt/), often abbreviated as JS, is a programming language",
  },
  {
    name: "Brian Michael",
    lastMsg: "CSS. As of 2023, 98.7% of websites use JavaScript on",
  },
  {
    name: "Ciaran Rogers",
    lastMsg:
      "years ago[1] Stable release ECMAScript 2021[2] Edit this on Wikidata",
  },
  {
    name: "Sharon Sosa",
    lastMsg: "is one of the core technologies of the World Wide",
  },
  {
    name: "Darius Crosby",
    lastMsg: "release ECMAScript 2021[2] Edit this on Wikidata / June 2021;",
  },
];

let myContacts: Contact[] = [];

nameLastMsg.forEach((item, index) =>
  myContacts.push(
    new Contact(
      item.name,
      `../../../static/img/avatars/avatar_${index}.png`,
      item.lastMsg
    )
  )
);

class Chat {
  messageCollection: Message[];
  settings: string[];
  constructor(messageCollection: Message[], settings: string[]) {
    this.messageCollection = messageCollection;
    this.settings = settings;
  }
}

class Message {
  msgText: string;
  time: Date;
  isInbox: boolean;
  status: string;
  constructor(msgText: string, time: Date, isInbox: boolean, status: string) {
    this.msgText = msgText;
    this.time = time;
    this.isInbox = isInbox;
    this.status = status;
  }
}

// class Input {
//   attachIcon: string;
//   inputField: string;
//   smileIcon: string;
//   mediaIcon: string;
//   constructor(
//     attachIcon: string,
//     inputField: string,
//     smileIcon: string,
//     mediaIcon: string
//   ) {
//     this.attachIcon = attachIcon;
//     this.inputField = inputField;
//     this.smileIcon = smileIcon;
//     this.mediaIcon = mediaIcon;
//   }
// }

// let bestfriendContact = new Contact(
//   "Best Friend",
//   "/static/img/bestFriend.png"
// );

// let bestfriendInput = new Input(
//   "/static/img/attach.png",
//   "",
//   "/static/img/smile.png",
//   "/static/img/media.png"
// );
// console.log(bestfriendChat.messageCollection[0].msgText);

// const chats = iChats({
//   bestfriendChat: bestfriendChat,
//   msgText: bestfriendChat.messageCollection[0].msgText,
//   isInbox: bestfriendChat.messageCollection[0].isInbox,
// });

// const root = document.getElementById("messages");
// const result = chats;
// root.innerHTML = result;

document.addEventListener("DOMContentLoaded", () => {
  const bestfriendChat = new Chat(
    [
      new Message(
        "Dude you should stop drinking",
        new Date("July 01, 2023 10:24:00"),
        true,
        "read"
      ),
      new Message("Why?", new Date("July 01, 2023 10:25:00"), false, "read"),
      new Message(
        "Remember last night?",
        new Date("July 01, 2023 10:26:00"),
        true,
        "read"
      ),
      new Message(
        "Yeah, but I wasn't really drunk",
        new Date("July 01, 2023 10:27:00"),
        false,
        "read"
      ),
      new Message(
        "DUDE U ALMOST JUMP DOWN FROM THE 15TH FLOOR SINGING I BELIEVE I CAN FLY!",
        new Date("July 01, 2023 10:28:00"),
        true,
        "read"
      ),
    ],
    ["Clear history", "Delete chat"]
  );
  let lastMessage =
    bestfriendChat.messageCollection[
      bestfriendChat.messageCollection.length - 1
    ].msgText;

  const root = document.getElementById("app") as HTMLInputElement;
  const result = сhats({
    bestfriendChat: bestfriendChat.messageCollection,
    lastMessage: lastMessage,
    myContacts: myContacts,
  });
  root.innerHTML = result;
});
