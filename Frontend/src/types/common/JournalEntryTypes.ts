export type JournalEntry = {
  date: Date;
  text: string;
  medias: string[];
  lastModified:Date;
};

export type JournalEntryList = JournalEntry[]