/**
 * Created by zhenghao on 2017/3/8.
 */
new Vue({
  el:'#app',
  data: {
    productList:[],
    isCheckAll:false,
    totalPrice:0,
    deleteFlag:false,
    deleteItem:null
  },
  mounted: function(){
    this.$nextTick(function(){
      this.getProductList();
    })
  },
  filters: {
    changeMoneyFilter: function(val){
      //console.log(val);
      return val.toFixed(2)+'元';
    }
  },
  computed: {
    //计算属性，实时计算选择上牌的总价格
    computedPrice: function(){
      var _this = this;
      //每次计算之前把价格清空，防止多算
      _this.totalPrice = 0;
      _this.productList.forEach(function(item,index){
        if(item.checked){
          //通过-0，把string转化为数字，防止totalPrice的值为NaN
          _this.totalPrice += item.productPrice * item.productQuentity -0;
        }
      });
      return _this.totalPrice;
    }
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
    },
    changeProductNumber: function(item,num){
      if(num==-1){
        if(item.productQuentity<=1){
          item.productQuentity=1;
        }
        else{
          item.productQuentity--;
        }
      }
      else if(num==1){
        item.productQuentity++;
      }
      else{
        console.log("num err");
      }
    },
    selectProduct: function(product){
      if(typeof product.checked == 'undefined'){
        this.$set(product,'checked',true);
      }
      else{
        product.checked = !product.checked;
      }
    },
    selectAll: function(flag){
      var _this = this;
      if(flag){
        _this.productList.forEach(function(item,index){
          if(typeof item.checked == 'undefined'){
            _this.$set(item,'checked',true);
          }
          else{
            item.checked = true;
          }
        });
        _this.isCheckAll = true;
      }
      else{
        _this.productList.forEach(function(item,index){
          if(typeof item.checked == 'undefined'){
            _this.$set(item,'checked','false');
          }
          else{
            item.checked = false;
          }
        });
        _this.isCheckAll = false;
      }
    },
    deleteProductModel:function(product){
      this.deleteFlag = true;
      this.deleteItem = product;
    },
    deleteProduct: function(){
      var _this = this;
      //取得要删除的item在所有商品list里面的index
      var deleteIndex = _this.productList.indexOf(_this.deleteItem);
      //用原生js方法slice删除这个item
      _this.productList.splice(deleteIndex,1);
      //删除完毕后重置flag，清空要删除的item
      _this.deleteFlag = false;
      _this.deleteItem = null;
    }
  }
});