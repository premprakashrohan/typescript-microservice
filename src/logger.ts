export interface ILogInterface {
  debug(primaryMessage: string, ...supportingData: any[]): void;
  warn(primaryMessage: string, ...supportingData: any[]): void;
  error(primaryMessage: string, ...supportingData: any[]): void;
  info(primaryMessage: string, ...supportingData: any[]): void;
}
export class Logger implements ILogInterface {
  private config: string;
  constructor(userConfig: string) {
    this.config = userConfig;
  }
  public debug(msg: string, ...supportingData: any[]): void {
    this.emitLogMessage("debug", msg, supportingData);
  }
  public warn(msg: string, ...supportingData: any[]): void {
    this.emitLogMessage("warn", msg, supportingData);
  }
  public error(msg: string, ...supportingData: any[]): void {
    this.emitLogMessage("error", msg, supportingData);
  }
  public info(msg: string, ...supportingData: any[]): void {
    this.emitLogMessage("info", msg, supportingData);
  }
  private emitLogMessage(
    msgType: "debug" | "info" | "warn" | "error",
    msg: string,
    supportingDetails: any[]
  ) {
    if (this.config === msgType) {
      if (supportingDetails.length > 0) {
        console[msgType](msg, supportingDetails);
      } else {
        console[msgType](msg);
      }
    }
  }
}
