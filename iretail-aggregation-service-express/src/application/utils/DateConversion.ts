import moment from 'moment-timezone';
let TimeZone : any = process.env.TIME_ZONE
export class DateConversion {
  public static readonly convertToUtc = function(date: any){
    return moment(date, "YYYY-MM-DDTHH:mm").utc();
  }
  public static readonly getDate = function(date: any){
    return moment.tz(date , TimeZone).format( process.env.DATE_FORMATE);
  }
  public static readonly getDateTime = function(date: any){
    return moment.tz(date, TimeZone).format( process.env.DATE_TIME_FORMATE);
  }
  public static readonly getTime = function(date: any){
    return moment.tz(date, TimeZone).format("HH:mm");
  }

}
