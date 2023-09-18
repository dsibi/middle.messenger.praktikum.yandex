export class Contact {
  name: string;
  avatar: string;
  constructor(name: string, avatar: string) {
    this.name = name;
    this.avatar = avatar;
  }
}

let bestFriendContact = new Contact(
  "Best Friend",
  "../static/img/avatars/bestFriend.png"
);

let goodFriendContact = new Contact(
  "Good Friend",
  "../static/img/avatars/avatar_9.png"
);

export class Message {
  msgText: string;
  time: Date;
  isInbox: boolean;
  isRead?: boolean;
  constructor(msgText: string, time: Date, isInbox: boolean, isRead?: boolean) {
    this.msgText = msgText;
    this.time = time;
    this.isInbox = isInbox;
    this.isRead = isRead;
  }
}

export class Chat {
  messageCollection: Message[];
  contact: Contact;
  settings: string[];
  isActive: boolean;
  get lastMsg(): Message {
    return this.messageCollection[this.messageCollection.length - 1];
  }
  get unreadNumber(): number {
    return this.messageCollection.filter((msg) => msg.isInbox && !msg.isRead)
      .length;
  }
  constructor(
    messageCollection: Message[],
    contact: Contact,
    isActive: boolean,
    settings: string[]
  ) {
    this.messageCollection = messageCollection;
    this.isActive = isActive;
    this.contact = contact;
    this.settings = settings;
  }
}

export let bestFriendChat = new Chat(
  [
    new Message(
      "Dude you should stop drinking",
      new Date("July 01, 2023 10:24:00"),
      true,
      true
    ),
    new Message("Why?", new Date("July 01, 2023 10:25:00"), false),
    new Message(
      "Remember last night?",
      new Date("July 01, 2023 10:26:00"),
      true,
      true
    ),
    new Message(
      "Yeah, but I wasn't really drunk",
      new Date("July 01, 2023 10:27:00"),
      false
    ),
    new Message(
      "DUDE U ALMOST JUMP DOWN FROM THE 15TH FLOOR SINGING I BELIEVE I CAN FLY!",
      new Date("July 01, 2023 10:28:00"),
      true,
      true
    ),
  ],
  bestFriendContact,
  true,
  ["Clear history", "Delete chat"]
);

let goodFriendChat = new Chat(
  [
    new Message(
      "So darlin', darlin', stand by me",
      new Date("July 01, 2023 10:24:00"),
      true,
      true
    ),
    new Message("Oh, stand by me", new Date("July 01, 2023 10:25:00"), false),
    new Message("Oh, stand", new Date("July 01, 2023 10:26:00"), true, true),
    new Message(
      "Stand by me, stand by me",
      new Date("July 01, 2023 10:27:00"),
      true,
      false
    ),
    new Message(
      "Stand by me, stand by me",
      new Date("July 01, 2023 10:27:00"),
      true,
      false
    ),
  ],
  goodFriendContact,
  false,
  ["Clear history", "Delete chat"]
);

export class DataSet {
  static chats: Chat[];
  static loadChats(chatsArr: Chat[]) {
    this.chats = chatsArr;
  }
}

type RandomData = {
  _msgText: string;
  time: Date;
  isInbox: boolean;
  isRead: boolean;
  name: string;
  isActive: boolean;
  settings: string[];
};

const data: RandomData[] = [
  {
    _msgText: "TypeScript is",
    time: new Date("2023-07-07 20:11:55"),
    isInbox: false,
    isRead: true,
    name: "Tarik Kirby",
    isActive: false,
    settings: ["Clear history", "Delete chat"],
  },
  {
    _msgText: "TypeScript is a free and open-source high-level",
    time: new Date("2023-12-16 10:15:41"),
    isInbox: true,
    isRead: true,
    name: "Dennis Hawkins",
    isActive: false,
    settings: ["Clear history", "Delete chat"],
  },
  {
    _msgText: "TypeScript is a free and open-source high-level programming",
    time: new Date("2023-11-12 06:37:42"),
    isInbox: true,
    isRead: true,
    name: "Nissim Finch",
    isActive: false,
    settings: ["Clear history", "Delete chat"],
  },
  {
    _msgText: "TypeScript is a free and",
    time: new Date("2022-09-26 00:52:55"),
    isInbox: true,
    isRead: false,
    name: "Quentin Miller",
    isActive: false,
    settings: ["Clear history", "Delete chat"],
  },
  {
    _msgText: "TypeScript is a free and open-source high-level programming",
    time: new Date("2023-08-26 13:05:24"),
    isInbox: true,
    isRead: true,
    name: "Owen Foley",
    isActive: false,
    settings: ["Clear history", "Delete chat"],
  },
  {
    _msgText: "TypeScript is a free and",
    time: new Date("2022-10-19 06:50:51"),
    isInbox: true,
    isRead: true,
    name: "Lenore Daniels",
    isActive: false,
    settings: ["Clear history", "Delete chat"],
  },
  {
    _msgText: "TypeScript is a free and",
    time: new Date("2023-07-28 20:24:21"),
    isInbox: true,
    isRead: false,
    name: "Wayne Bailey",
    isActive: false,
    settings: ["Clear history", "Delete chat"],
  },
];

const preparedData: Chat[] = data.map((rd: RandomData, index) => {
  let makeMessages = (msgData: RandomData) => [
    new Message(
      msgData._msgText,
      new Date(msgData.time),
      msgData.isInbox,
      msgData.isRead
    ),
  ];
  let contact = new Contact(
    rd.name,
    `../../../static/img/avatars/avatar_${index + 1}.png`
  );

  let result: Chat = new Chat(
    makeMessages(rd),
    contact,
    rd.isActive,
    rd.settings
  );
  return result;
});

DataSet.loadChats([bestFriendChat, goodFriendChat].concat(preparedData));
