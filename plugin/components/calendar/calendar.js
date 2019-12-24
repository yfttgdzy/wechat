Component({
  properties: {
    dateType: String,
    second: String,
    minYear: Number,
    maxYear: Number,
    dateFormat: String
  },
  data: {
    yearList: [],
    monthList: [],
    dayList: [],
    hourList: [],
    minuteList: [],
    secondList: [],
    dateTime: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      second: new Date().getSeconds(),
    },
    calendarDis: {
      yearDis: 0,
      monthDis: 0,
      dayDis: 0,
      hourDis: 0,
      minuteDis: 0,
      secondDis: 0
    },
    canMove: false,
    clientY: 0,
  },
  lifetimes: {
    attached: function () {
      this.initCalendar();
    },
  },
  methods: {
    initCalendar: function() {
      let yearList = [], monthList = [], totalDay = Number, dayList = [], hourList = [], minuteList = [], secondList = [];
      let year = Number, month = Number, day = Number, hour = Number, minute = Number, second = Number;
      let minYear = this.properties.minYear ? this.properties.minYear : 1970;
      let maxYear = this.properties.maxYear ? this.properties.maxYear : new Date().getFullYear();
      year = new Date().getFullYear();
      month = new Date().getMonth() + 1;
      day = new Date().getDate();
      hour = new Date().getHours();
      minute = new Date().getMinutes();
      second = new Date().getSeconds();
      for (var a = minYear; a <= maxYear; a++) { yearList.push(a); }
      for (var b = 1; b <= 12; b++) { monthList.push(this.addZero(b)); }
      if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        totalDay = 31;
      }
      if (month === 4 || month === 6 || month === 9 || month === 11) {
        totalDay = 30;
      }
      if (month === 2) {
        totalDay = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28
      }
      for (var c = 1; c <= totalDay; c++) { dayList.push(this.addZero(c)); }
      for (var d = 0; d <= 23; d++) { hourList.push(this.addZero(d)); }
      for (var e = 0; e <= 59; e++) { minuteList.push(this.addZero(e)); }
      for (var f = 0; f <= 59; f++) { secondList.push(this.addZero(f)); }
      this.setData({
        yearList: yearList,
        monthList: monthList,
        dayList: dayList,
        hourList: hourList,
        minuteList: minuteList,
        secondList: secondList,
        calendarDis: {
          yearDis: -(year - minYear) * 100,
          monthDis: - (month - 1) * 100,
          dayDis: -(day - 1) * 100,
          hourDis: -hour * 100,
          minuteDis: -minute * 100,
          secondDis: -second * 100
        }
      })
      console.log(this.data.calendarDis)
    },
    addZero: function (num) {
      return num < 10 ? "0" + num : num;
    },
    touchStart: function (ev) {
      this.setData({
        canMove: true,
        clientY: ev.changedTouches[0].clientY
      })
    },
    touchmove: function (ev) {
      let that = this;
      if (that.data.canMove) {
        let scrollDis = Number,finallyDis = Number;
        scrollDis = (ev.changedTouches[0].clientY - this.data.clientY);
        if (ev.changedTouches[0].clientY < this.data.clientY) {
          // scrollDis = Math.random(parseInt(scrollDis)%10)*100
        } else {
          // scrollDis = Math.random(parseInt(scrollDis) % 10) * 100
        }
          switch (ev.currentTarget.id) {
            case 'YEAR':
              if (that.data.calendarDis.yearDis + scrollDis >= 0) {
                that.setData({
                  calendarDis: {
                    yearDis: 0,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              } else if (that.data.calendarDis.yearDis + scrollDis <= -((that.data.yearList.length-1) * 100)) {
                that.setData({
                  calendarDis: {
                    yearDis: -((that.data.yearList.length-1) * 100),
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              } else {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis + scrollDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              }
              break;
            case 'MONTH':
              if (that.data.calendarDis.monthDis + scrollDis >= 0) {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: 0,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              } else if (that.data.calendarDis.monthDis + scrollDis <= -((that.data.monthList.length-1) * 100)) {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: -((that.data.monthList.length - 1) * 100),
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              } else {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis + scrollDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              }
              break;
            case 'DAY':
              if (that.data.calendarDis.dayDis + scrollDis >= 0) {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: 0,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              } else if (that.data.calendarDis.dayDis + scrollDis <= -((that.data.dayList.length-1) * 100)) {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: -((that.data.dayList.length - 1) * 100),
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              } else{
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis + scrollDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              }
              break;
            case 'HOUR':
              if (that.data.calendarDis.hourDis + scrollDis >= 0) {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: 0,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              } else if (that.data.calendarDis.hourDis + scrollDis <= -((that.data.hourList.length-1) * 100)) {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: -((that.data.hourList.length - 1) * 100),
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              } else{
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis + scrollDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              }
              break;
            case 'MINUTE':
              if (that.data.calendarDis.minuteDis + scrollDis >= 0) {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: 0,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              } else if (that.data.calendarDis.minuteDis + scrollDis <= -((that.data.minuteList.length-1) * 100)) {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: -((that.data.minuteList.length - 1) * 100),
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              } else{
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis + scrollDis,
                    secondDis: that.data.calendarDis.secondDis
                  }
                })
              }
              break;
            case 'SECOND':
              if (that.data.calendarDis.secondDis + scrollDis >= 0) {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: 0
                  }
                })
              } else if (that.data.calendarDis.secondDis + scrollDis <= -((that.data.secondList.length-1) * 100)) {
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: -((that.data.secondList.length - 1) * 100)
                  }
                })
              } else{
                that.setData({
                  calendarDis: {
                    yearDis: that.data.calendarDis.yearDis,
                    monthDis: that.data.calendarDis.monthDis,
                    dayDis: that.data.calendarDis.dayDis,
                    hourDis: that.data.calendarDis.hourDis,
                    minuteDis: that.data.calendarDis.minuteDis,
                    secondDis: that.data.calendarDis.secondDis + scrollDis
                  }
                })
              }
              break;
          }

        // }
      }
    },
    touchend: function (ev) {
      let that = this;
      switch (ev.currentTarget.id) {
        case 'YEAR':
          this.setData({
            calendarDis: {
              yearDis: Math.round((that.data.calendarDis.yearDis) / 100) * 100,
              monthDis: that.data.calendarDis.monthDis,
              dayDis: that.data.calendarDis.dayDis,
              hourDis: that.data.calendarDis.hourDis,
              minuteDis: that.data.calendarDis.minuteDis,
              secondDis: that.data.calendarDis.secondDis
            }
          })
          break;
        case 'MONTH':
          this.setData({
            calendarDis: {
              yearDis: that.data.calendarDis.yearDis,
              monthDis: Math.round((that.data.calendarDis.monthDis) / 100) * 100,
              dayDis: that.data.calendarDis.dayDis,
              hourDis: that.data.calendarDis.hourDis,
              minuteDis: that.data.calendarDis.minuteDis,
              secondDis: that.data.calendarDis.secondDis
            }
          })
          break;
        case 'DAY':
          this.setData({
            calendarDis: {
              yearDis: that.data.calendarDis.yearDis,
              monthDis: that.data.calendarDis.monthDis,
              dayDis: Math.round((that.data.calendarDis.dayDis) / 100) * 100,
              hourDis: that.data.calendarDis.hourDis,
              minuteDis: that.data.calendarDis.minuteDis,
              secondDis: that.data.calendarDis.secondDis
            }
          })
          break;
        case 'HOUR':
          this.setData({
            calendarDis: {
              yearDis: that.data.calendarDis.yearDis,
              monthDis: that.data.calendarDis.monthDis,
              dayDis: that.data.calendarDis.dayDis,
              hourDis: Math.round((that.data.calendarDis.hourDis) / 100) * 100,
              minuteDis: that.data.calendarDis.minuteDis,
              secondDis: that.data.calendarDis.secondDis
            }
          })
          break;
        case 'MINUTE':
          this.setData({
            calendarDis: {
              yearDis: that.data.calendarDis.yearDis,
              monthDis: that.data.calendarDis.monthDis,
              dayDis: that.data.calendarDis.dayDis,
              hourDis: that.data.calendarDis.hourDis,
              minuteDis: Math.round((that.data.calendarDis.minuteDis) / 100) * 100,
              secondDis: that.data.calendarDis.secondDis
            }
          })
          break;
        case 'SECOND':
          this.setData({
            calendarDis: {
              yearDis: that.data.calendarDis.yearDis,
              monthDis: that.data.calendarDis.monthDis,
              dayDis: that.data.calendarDis.dayDis,
              hourDis: that.data.calendarDis.hourDis,
              minuteDis: that.data.calendarDis.minuteDis,
              secondDis: Math.round((that.data.calendarDis.secondDis) / 100) * 100
            }
          })
          break;
      }
      this.setData({
        canMove: false
      })
    },
    cancelOpe: function() {
      this.triggerEvent('remove')
    },
    deterOpe: function() {
      let format = this.properties.dateFormat ? this.properties.dateFormat : '-';
      console.log(this.data.yearList[Math.abs(this.data.calendarDis.yearDis) / 100 ])
      console.log(Math.abs(this.data.calendarDis.yearDis) / 100 - 1)
      let year = this.data.yearList[Math.abs(this.data.calendarDis.yearDis) / 100];
      let month = this.data.monthList[Math.abs(this.data.calendarDis.monthDis) / 100];
      let day = this.data.dayList[Math.abs(this.data.calendarDis.dayDis) / 100 ];
      let hour = this.data.hourList[Math.abs(this.data.calendarDis.hourDis) / 100];
      let minute = this.data.minuteList[Math.abs(this.data.calendarDis.minuteDis) / 100];
      let second = this.data.secondList[Math.abs(this.data.calendarDis.secondDis) / 100];
      if (this.properties.dateType === 'dateTime') {
        var myEventDetail = { returnDate: year + format + month + format + day + " " + hour + ":" + minute}
        this.triggerEvent('chosen',myEventDetail)
      } else if (this.properties.dateType === 'date') {
        var myEventDetail = { returnDate: year + format + month + format + day}
        this.triggerEvent('chosen', myEventDetail)
      } else if (this.properties.dateType === 'time') {
        var myEventDetail = { returnDate: hour + ":" + minute }
        this.triggerEvent('chosen', myEventDetail)
      }
    }
  },
  
})
