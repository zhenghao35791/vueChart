/**
 * Created by zhenghao on 2017/3/8.
 */
new Vue({
  el:'.container',
  data: {
    productList:[],
  },
  mounted: function(){
    this.$nextTick(function(){
      this.getProductList();
    })
  },
  filter: {

  },
  computer: {

  },
  methods: {
    getProductList: function(){
      var _this = this;
      this.$http.get('data/cartData.json').then(function(resp){
        if(resp.body && resp.body.result && resp.body.status==1){
          _this.productList = resp.body.result.list;
          console.log(resp.body.result.list);
        }
      })
    }
  }
});