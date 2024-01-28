import moment from 'moment';

export default {
  parseDate(dateString: string): string {
    const date = new Date(dateString)
    return moment(date).format('DD.MM.YYYY, HH:mm:ss')
  }
}