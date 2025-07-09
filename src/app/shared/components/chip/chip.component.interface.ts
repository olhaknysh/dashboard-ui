export type ChipMode =
  | 'ratio'
  | 'appetite'
  | 'default'
  | 'attachments'
  | 'messageStatus';

export enum ChipClass {
  RatioGreen = 'chip-ratio-green',
  RatioYellow = 'chip-ratio-yellow',
  RatioRed = 'chip-ratio-red',
  Appetite = 'chip-appetite',
  Attachments = 'chip-attachments',
  Default = 'chip-default',
  MessageStatus = 'chip-message-status',
}
