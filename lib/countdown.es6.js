class Countdown {
  constructor(options) {
    if(!options.targetTime || !options.id) {
      console.error("Countdown : Date is not defined");
    }

    this.el                 = document.getElementById(options.id);
    this.now                = new Date().getTime();
    this.targetTime         = new Date(options.targetTime).getTime();
    this.afterEnd           = options.afterEnd;
    if (options.separator === false) {
      this.separator = ""
    } else {
      this.separator = (options.separator && typeof options.separator == "string") ? options.separator : ":"
    }
    this.hideDayAtZeroOpts  = options.hideDayAtZero || false;
    this.noDay              = options.noDay || false;

    if(this.now > this.targetTime) {
      console.warn("Countdown : Date defined > Date now");
      return;
    }

    this.refresh();
    this.interval = setInterval(() => {
      this.refresh();
    }, 1000);
  }

  refresh() {
      this.now  = new Date().getTime();

      if (this.now > this.targetTime) {
        clearInterval(this.interval);
        if(this.afterEnd) this.afterEnd();
        return;
      }

      this.defineTimer();
      this.render();

  }

  hideDayAtZero() {
    if (this.hideDayAtZeroOpts && this.timer.day == 0) {
      return true;
    }
  }

  defineTimer() {
    this.timer = {}
    let tmp = this.targetTime - this.now;
    tmp = Math.floor(tmp/1000);
    this.timer.sec = tmp % 60;
    this.timer.sec = (this.timer.sec < 10) ? `0${this.timer.sec}` : this.timer.sec;

    tmp = Math.floor((tmp-this.timer.sec)/60);
    this.timer.min = tmp % 60;
    this.timer.min = (this.timer.min < 10) ? `0${this.timer.min}` : this.timer.min;

    tmp = Math.floor((tmp-this.timer.min)/60);
    this.timer.hour = (this.noDay) ? tmp : tmp % 24;
    this.timer.hour = (this.timer.hour < 10) ? `0${this.timer.hour}` : this.timer.hour;

    if (this.noDay) return;
    tmp = Math.floor((tmp-this.timer.hour)/24);
    this.timer.day = tmp;
    if(this.hideDayAtZero()) return;
    this.timer.day = (this.timer.day < 10) ? `0${this.timer.day}` : this.timer.day;
  }

  render() {
    let tplDay = `${this.timer.day}${this.separator}`
    let tpl    = `${this.timer.hour}${this.separator}${this.timer.min}${this.separator}${this.timer.sec}`;

    this.el.innerHTML = (this.hideDayAtZero() || this.noDay) ? tpl : tplDay+tpl;
  }
}


module.exports = Countdown;
