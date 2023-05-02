class Helper {
  formatDate(input: string | number | Date) {
    const d = new Date(input);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();

    return `${date < 10 ? "0" + date : date}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  }
  formatTime(input: string | number | Date) {
    const d = new Date(input);
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();

    return `${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }:${second < 10 ? "0" + second : second}`;
  }
  formatDateTime(input: string | number | Date | null) {
    if (!input) return "";
    return `${this.formatDate(input)} ${this.formatTime(input)}`;
  }
}

export default new Helper();
