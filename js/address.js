new Vue({
  el:'.container',
  data: {
    addressList:[],
    num:3,
    currentIndex:0,
    shippingMethod:1
  },
  filters: {

  },
  mounted: function () {
    this.$nextTick(function () {
      this.getAddressList();
      // 保证this.$el 已经插入文档
    })
  },
  computed: {
    limitAddressList: function(){
      return this.addressList.slice(0,this.num);
    }
  },
  methods: {
    getAddressList: function(){
      var _this = this;
      _this.$http.get('data/addressData.json').then(function(resp){
        if(resp.body && resp.body.result && resp.body.status==0){
          _this.addressList = resp.body.result;
          console.log(this.addressList);
        }
      });
    },
    setDefalutProduct: function(address){
      //循环，把所有的item取消默认
      this.addressList.forEach(function(address,index){
        address.isDefault = false;
      });
      //设定选中的item为默认
      address.isDefault = true;
    }
  }
});