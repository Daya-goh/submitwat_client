import { Dispatch, SetStateAction } from "react";

export interface CSVObject {
  [key: string]: string;
}

export interface classHeaderInterface {
  name: string;
}

export interface ClassInterface {
  classList?: ClassDetail[];
  token?: string;
  setClassParam: Dispatch<SetStateAction<string>>;
}

export interface Details {
  student_id: null;
  student_name: string;
  status: string;
}

export interface ClassDetail extends YourClassHeader {
  id: number;
  name: string;
  teacher: number;
  class_name?: string;
  student_id?: number;
}

export interface Note {
  id: number;
  note: string;
  checkedStatus: boolean;
}

export interface SetStateInterface {
  setToken?: Dispatch<SetStateAction<string>>;
  setClassParam?: Dispatch<SetStateAction<string>>;
}

export interface CommonInterface {
  token?: string;
  classParam?: string;
  columnName?: string;
  setToken?: Dispatch<SetStateAction<string>>;
  setClassParam?: Dispatch<SetStateAction<string>>;
  setColumnName?: Dispatch<SetStateAction<string>>;
}

export interface NoteInterface {
  token?: string;
  classParam?: string;
  columnName?: string;
  refresh: number;
  noteContent: Note[];
  setNoteContent: Dispatch<SetStateAction<Note[]>>;
  setRefresh: Dispatch<SetStateAction<number>>;
}

export interface YourClassHeader {
  [key: string]: string | number | undefined;
}

export interface NavBarInterface {
  setToken: Dispatch<SetStateAction<string>>;
}
