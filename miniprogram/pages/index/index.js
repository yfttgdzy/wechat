var plugin = requirePlugin("myPlugin")
Page({
  data: {
    showCalendar: false,
    calendarVal: ''
  },
  onLoad: function() {
    // plugin.getData()
  },
  remove: function() {
    this.setData({
      showCalendar: false
    })
  },
  chosen: function(transEv) {
    console.log(transEv.detail.returnDate);
    this.setData({
      showCalendar: false,
      calendarVal: transEv.detail.returnDate
    })
  }, 
  show: function() {
    this.setData({
      showCalendar: true
    })
  }
})