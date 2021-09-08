<template>
    <main class="product-list">
        <div class="spacing"></div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="title_full">
                        <h2>Thanh toán</h2>
                    </div>
                    <div class="clearfix"></div>
                    <div class="bread-crumb">
                        <ul class="breadcrumb">
                            <li class="home">
                                <nuxt-link to="/"><span>Trang chủ</span></nuxt-link>
                                <span class="mr_lr">&nbsp;/&nbsp;</span>
                            </li>
                            <li>
                                <strong><span>Thanh toán</span></strong>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="spacing"></div>
                <div class="col-12 col-lg-4 col-md-4 col-sm-4 pd-right cart_desktop">
                    <h2 class="section__title">Thông tin nhận hàng</h2>
                    <c-text-error :txtError="txtError"></c-text-error>
                    <div class="section__content">
                        <form>
                            <div class="field field--show-floating-label">
                                 <div class="field__input-wrapper">
                                    <label for="customer-address" class="field__label">Sổ địa chỉ</label>
                                    <select v-model="idDataAddressUser" size="1" class="field__input field__input--select" @change="customerAddress">
                                        <option value="0">Địa chỉ khác...</option>
                                        <option v-for="(v,k) in dataAddressUser" :key="k" :value="v.id" v-html="`${v.address} - ${v.address_ward} - ${v.address_distric} - ${v.address_city}`"></option>
                                    </select>
                                    <div class="field__caret">
                                        <i class="fa fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>
                           
                            <input name="email" type="email" class="field__input" v-model="dataInfo.email" placeholder="Email">
                            <input name="fullname" type="text" class="field__input"  v-model="dataInfo.fullname" placeholder="Họ và tên">
                            <input name="phone" type="tel" class="field__input" v-model="dataInfo.phone" placeholder="Số điện thoại">
                            <textarea name="address" type="text" class="field__input" v-model="dataInfo.address" placeholder="Địa chỉ: P.503 tòa nhà Âu Việt, số 1 Lê Đức Thọ"></textarea>
                            
                           
                            <div class="cityid">
                                <select name="cityid" class="field__input" v-model="dataInfo.cityid" @change="handleLocation('vn_district','districtid','Chọn Quận/Huyện','provinceid')">
                                    <option value="" selected>Chọn Tỉnh/Thành Phố</option>
                                    <option v-for="(v,k) in getCityID" :key="k" :value="v.provinceid">{{v.name}}</option>
                                </select>
                            </div>
                            <div class="districtid" :class="[ getDistrictID ? '' : 'disabled' ]">
                                <select  :disabled="!getDistrictID" name="districtid" class="field__input" v-model="dataInfo.districtid" @change="handleLocation('vn_ward','wardid','Chọn Phường/Xã','districtid')">
                                    <option v-for="(v,k) in getDistrictID" :key="k" :value="v.districtid">{{v.name}}</option>
                                </select>
                                <div v-if="isShowDistrict">Chọn Quận/Huyện</div>
                            </div>
                            <div class="wardid" :class="[ getWardID ? '' : 'disabled' ]">
                                <select  :disabled="!getWardID" name="wardid" class="field__input" v-model="dataInfo.wardid" @change="handleHideTitle">
                                    <option v-for="(v,k) in getWardID" :key="k" :value="v.wardid">{{v.name}}</option>
                                </select>
                                <div v-if="isShowWard">Chọn Phường/Xã</div>

                            </div>
                            <textarea name="message" type="text" class="field__input" v-model="dataInfo.message" placeholder="Ghi chú"></textarea>
                        </form>
                    </div>
                    
                </div>
                <div class="col-12 col-lg-4 col-md-4 col-sm-4 pd-right cart_desktop">
                    <h2 class="section__title">Thanh toán</h2>
                    <div class="content-box">
                        <div class="content-box__row">
                            <div class="radio-wrapper">
                                <label class="radio__label" @click="isPayment=1">
                                    <div class="radio__input">
                                        <input name="paymentMethod" id="paymentMethod" type="radio" class="input-radio" value="Thanh toán khi giao hàng (COD)" v-model="dataInfo.payment" checked>
                                    </div>
                                    <span class="radio__label__primary">Thanh toán khi giao hàng (COD)</span>
                                </label>
                            </div>
                            <div style="margin-bottom:10px" class="content-box__row__desc paymentMethod" v-if="isPayment==1">
                                <p>
                                    Bạn chỉ phải thanh toán khi nhận được hàng
                                </p>
                            </div>
                            <div class="radio-wrapper">
                                <label class="radio__label" @click="isPayment=2">
                                    <div class="radio__input">
                                        <input name="paymentMethod" id="paymentMethod" type="radio" class="input-radio" value="Chuyển khoản trước khi giao hàng" v-model="dataInfo.payment">
                                    </div>
                                    <span class="radio__label__primary">Chuyển khoản trước khi giao hàng</span>
                                </label>
                            </div>
                             <div class="content-box__row__desc paymentMethod" v-if="isPayment==2">
                                <p>
                                    Ngân hàng Techcombank<br>
                                    Số tài khoản: 19035807845011 <br>
                                    Tên tài khoản: Nguyễn Văn Quyền<br>
                                    Chi nhánh: Đào Tấn
                                </p> 
                            </div>
                        </div>
                        
                    </div>
                    <h2 class="section__title" style="margin-top:20px">Phí vận chuyển</h2>
                    <div class="content-box" v-if="priceShip">
                        <div class="content-box__row">
                            
                            <div class="radio-wrapper">
                                <label class="radio__label" style="margin-bottom:0px">
                                    <div class="radio__input">
                                        <input checked name="shippingMethod" id="shippingMethod" type="radio" class="input-radio" value="1">
                                    </div>
                                    <span class="radio__label__primary">Giao hàng tận nơi</span>
                                    <span class="radio__label__accessory">
										<span class="content-box__emphasis price">
											<cart-price :price="Number(priceShip)"></cart-price>
										</span>
									</span>					
															
                                </label>
                            </div>
                           
                        </div>
                        
                    </div>

                    <div class="alert alert--info" v-else>
						Vui lòng nhập thông tin giao hàng
					</div>
                </div>
                <div class="col-12 col-lg-4 col-md-4 col-sm-4 pd-right cart_desktop">
                    <h2 class="section__title">Đơn hàng({{cart.countItem}} sản phẩm)</h2>
                  
                    <div class="order-summary__section" v-if="listCart">
                        <table class="product-table">
                            
                            <tbody>
                                <tr class="product" v-for="item in listCart" :key="item.id">
                                    <td class="product__image">
                                        <div class="product-thumbnail">
                                            <div class="product-thumbnail__wrapper" data-tg-static="">
                                                <img :alt="item.product.title" :src="item.product.image" class="product-thumbnail__image">
                                            </div>
                                            <span class="product-thumbnail__quantity">{{item.quantity}}</span>
                                        </div>
                                    </td>
                                    <th class="product__description">
                                        <span class="product__description__name">
                                            {{item.product.title}}
                                        </span>                                     
                                    </th>
                                    <td class="product__price">
                                        <cart-price :price="Number(item.product.price * item.quantity)"></cart-price>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="order-summary__section ">
                        <table class="total-line-table">

                            <tbody class="total-line-table__tbody">
                            <tr class="total-line total-line--subtotal">
                                <th class="total-line__name">
                                    Tạm tính
                                </th>
                                <td class="total-line__price"><cart-price :price="Number(cart.totalPrice)"></cart-price></td>
                            </tr>

                            <tr class="total-line total-line--shipping-fee">
                                <th class="total-line__name">
                                    Phí vận chuyển
                                </th>
                                <td class="total-line__price"><cart-price :price="Number(priceShip)"></cart-price></td>
                            </tr>

                            </tbody>
                            <tfoot class="total-line-table__footer">
                            <tr class="total-line payment-due">
                                <th class="total-line__name">
                                    <span class="payment-due__label-total">Tổng cộng</span>
                                </th>
                                <td class="total-line__price">
                                    <span class="payment-due__price"><cart-price :price="Number(cart.totalPrice+priceShip)"></cart-price></span>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="order-summary__nav ">
						<button type="submit" class="btn btn-checkout spinner" @click="handleSubmit">
							<span class="spinner-label">ĐẶT HÀNG</span>
						</button>

									
						<nuxt-link to="/cart/gio-hang" class="previous-link">
							<i class="previous-link__arrow">❮</i><span class="previous-link__content">Quay về giỏ hàng</span>
						</nuxt-link>			
									
					</div>
                </div>
            </div>
        </div>
        <div class="spacing"></div>
    </main>
</template>
<script>
import { mapState,mapActions,mapGetters } from "vuex";
import cTextError from '../../components/common/c-text-error.vue';
export default {
  components: { cTextError },
    created () {
      const dataSEO= {
          meta_title: "Thanh toán",
          meta_description: '',
          meta_images: '',
      }
      this.$parent.$emit("event-seo",dataSEO);
      this.handleLoadData()

    },
    data() {
        return {
            dataInfo: {
                email: '',
                fullname: '',
                phone: '',
                address: '',
                message: '',
                cityid: '',
                districtid: '',
                wardid: '',
                payment: 'Thanh toán khi giao hàng (COD)',
            },
            isPayment: 1,
            getCityID: null,
            getDistrictID: null,
            getWardID: null,
            isShowDistrict: true,
            isShowWard: true,
            priceShip: 0,
            txtError: "",
            dataAddressUser: null,
            idDataAddressUser: 0
        }
    },
     computed: {
    ...mapState({
        currentUser: (state) => state.auth.currentUser,
        listCart: state => state.cart.listCart
    }),
    ...mapGetters({
        'cart': 'cart/cartInfo'
    }),
    },
    methods: {
        ...mapActions({
            actgetLocation: "cart/actgetLocation",
            actgetpriceShip: "cart/actgetpriceShip",
            actSubmitCart: "cart/actSubmitCart",
            showLoading: "showLoading"
        }),
        handleLoadData(){
            this.dataInfo.email = this.currentUser?this.currentUser.email:''
            this.dataInfo.fullname = this.currentUser?this.currentUser.fullname:''
            this.dataInfo.phone = this.currentUser?this.currentUser.phone:''
            this.dataInfo.address = this.currentUser?this.currentUser.address:''
        },
        actgetData(parentid,table,select,text,parentField){
            const data = {
                    parentid: parentid,
                    table: table,
                    select:select,
                    text:text,
                    parentField:parentField
            }
            this.actgetLocation(data).then((res) => {
                if(table == 'vn_ward'){
                        this.getWardID = res.data
                    }else{
                        this.getDistrictID = res.data
                    }
            });
        },
        actpriceShip(){
            const data = {
                provinceid: this.dataInfo.cityid,
                districtid: this.dataInfo.districtid,
                wardid: this.dataInfo.wardid,
                address: this.dataInfo.address,
                price: this.cart.totalPrice
            }
            this.actgetpriceShip(data).then((res) => {
                this.priceShip = res.data?res.data.fee:0
            });
        },
        handleLocation(table,select,text,parentField) {
            this.showLoading(true);
            if(table == 'vn_ward'){
                this.isShowDistrict = false
                this.isShowWard = true
                this.actgetData(this.dataInfo.districtid,table,select,text,parentField)
            }else{
                this.actgetData(this.dataInfo.cityid,table,select,text,parentField)
                this.getWardID = null
                this.isShowDistrict = true
                this.isShowWard = true
            }
            //tính phí vận chuyển
            this.actpriceShip()
            this.showLoading(false);
        },
        handleHideTitle(){
            this.isShowWard = false
            this.showLoading(true);
            this.actpriceShip()
            this.showLoading(false);

        },
        handleSubmit(){
            const dataCart = this.listCart.map(item => {
                return {
                    ...item.product,
                    quantity: item.quantity,
                }
            })
            const data = {
                email: this.dataInfo.email,
                fullname: this.dataInfo.fullname,
                phone: this.dataInfo.phone,
                address:this.dataInfo.address,
                cityid: this.dataInfo.cityid,
                districtid: this.dataInfo.districtid,
                wardid: this.dataInfo.wardid,
                quantity: this.cart.countItem,
                total_cart_final: this.cart.totalPrice+this.priceShip,
                payment: this.dataInfo.payment,
                cart_json: dataCart,
                ship: this.priceShip,
                userid: this.currentUser?this.currentUser.id:'',
                message: this.dataInfo.message,
            }
            this.showLoading(true);
            this.actSubmitCart(data).then((res) => {
                this.showLoading(false);

                if (!res.ok) {
                    this.txtError = res.message;
                }else{    

                    this.$router.push({name: "cart-thanh-toan-thanh-cong", params: {id: res.data}});
                }
            });
        },
        customerAddress(){
            this.showLoading(true);
            this.isShowDistrict = false;
            this.isShowWard = false;
            this.dataAddressUser.filter(item => {
               if(item.id == this.idDataAddressUser){
                    this.$store.dispatch("cart/actgetLocation", { parentid: 0 }).then((response) => {})
                    this.actgetData(
                        item.cityid,
                        "vn_district",
                        "districtid",
                        "Chọn Quận/Huyện",
                        "provinceid"
                    );
                    this.actgetData(
                        item.districtid,
                        "vn_ward",
                        "wardid",
                        "Chọn Phường/Xã",
                        "districtid"
                    );
                    this.dataInfo.fullname = item.fullname
                    this.dataInfo.phone = item.phone
                    this.dataInfo.address = item.address
                    this.dataInfo.cityid = item.cityid
                    this.dataInfo.districtid = item.districtid
                    this.dataInfo.wardid = item.wardid
               }
            })
            this.actpriceShip()
            this.showLoading(false);

        }

    },
    async asyncData({ store}) {
        let promiseLocation = await store.dispatch("cart/actgetLocation",{parentid: 0});
        let promiseAddress = await store.dispatch("auth/actAllAddress",{perpage: 1000});
        let [result,resultAddress] = await Promise.all([promiseLocation,promiseAddress]);
        if(result.ok === true){
            return {
                dataAddressUser: resultAddress.data,
                getCityID : result.data
            }
        }
    },
}
</script>
<style  scoped>
@import url("@/assets/css/cart/thanh-toan.css");

</style>