<template>
  <main class="product-list">
    <div class="spacing"></div>
    <div class="container">
      <div class="rowcart">
        <div class="col-cart col-cart--primary">
          <section class="section section--icon-heading">
            <div class="section__icon unprintable">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="72px"
                height="72px"
              >
                <g fill="none" stroke="#8EC343" stroke-width="2">
                  <circle
                    cx="36"
                    cy="36"
                    r="35"
                    style="
                      stroke-dasharray: 240px, 240px;
                      stroke-dashoffset: 480px;
                    "
                  ></circle>
                  <path
                    d="M17.417,37.778l9.93,9.909l25.444-25.393"
                    style="stroke-dasharray: 50px, 50px; stroke-dashoffset: 0px"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="thankyou-message-container">
              <h2 class="section__title">Cảm ơn bạn đã đặt hàng</h2>
              <p class="section__text">
                Một email xác nhận đã được gửi tới {{detailPayment.email}}. <br />
                Xin vui lòng kiểm tra email của bạn
              </p>
            </div>
          </section>
        </div>
        <div class="col-cart col-cart--secondary">
          <aside class="order-summary order-summary--bordered order-summary--is-collapsed" id="order-summary" >
            <div class="order-summary__header">
              <div class="order-summary__title">
                Đơn hàng #{{detailPayment.code}}
                <span class="unprintable">({{detailPayment.quantity}})</span>
              </div>
            </div>
            <div class="order-summary__sections">

              <div v-if="detailPayment.data_order" class="order-summary__section order-summary__section--product-list order-summary__section--is-scrollable order-summary--collapse-element">
                <table class="product-table">
                  <tbody>

                    <tr class="product" v-for="item in detailPayment.data_order" :key="item.id">
                      <td class="product__image">
                        <div class="product-thumbnail">
                          <div class="product-thumbnail__wrapper">
                            <img :src="item.image" :alt="item.title" class="product-thumbnail__image" />
                          </div>
                          <span class="product-thumbnail__quantity unprintable">{{item.quantity}}</span>
                        </div>
                      </td>
                      <th class="product__description">
                        <span class="product__description__name">{{item.title}}</span>
                      </th>
                      <td class="product__price"><cart-price :price="Number(item.price)"></cart-price></td>
                    </tr>

                  
                  </tbody>
                </table>
              </div>

              <div class="order-summary__section">
                <table class="total-line-table">
                  <tbody class="total-line-table__tbody">
                    <tr class="total-line total-line--subtotal">
                      <th class="total-line__name">Tạm tính</th>
                      <td class="total-line__price"><cart-price :price="Number(detailPayment.total_cart_final-detailPayment.ship)"></cart-price></td>
                    </tr>

                    <tr class="total-line total-line--shipping-fee">
                      <th class="total-line__name">Phí vận chuyển</th>
                      <td class="total-line__price"><cart-price :price="Number(detailPayment.ship)"></cart-price></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="order-summary__section">
                <table class="total-line-table">
                  <tbody class="total-line-table__tbody">
                    <tr class="total-line payment-due">
                      <th class="total-line__name">
                        <span class="payment-due__label-total">Tổng cộng</span>
                      </th>
                      <td class="total-line__price">
                        <span class="payment-due__price"><cart-price :price="Number(detailPayment.total_cart_final)"></cart-price></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </aside>
        </div>
        <div class="col-cart col-cart--primary">
          <section class="section">
            <div class="section__content section__content--bordered">
              <div class="rowcart">
                <div class="col-cart col-cart--md-two">
                  <h2>Thông tin mua hàng</h2>
                  <p>{{detailPayment.fullname}}</p>

                  <p>{{detailPayment.email}}</p>

                  <p>{{detailPayment.phone}}</p>
                  <p>Ghi chú: {{detailPayment.note}}</p>
                </div>

                <div class="col-cart col-cart--md-two">
                  <h2>Địa chỉ nhận hàng</h2>
                  <p>{{detailPayment.fullname}}</p>

                  <p>{{detailPayment.address_detail}}</p>

                  <p v-html="`${detailPayment.address_ward}, ${detailPayment.address_distric}, ${detailPayment.address_city}`"></p>

                  <p>{{detailPayment.phone}}</p>
                </div>
              </div>

              <div class="rowcart" style="margin-top:10px;float: left;width: 100%;">
                <div class="col-cart col-cart--md-two">
                  <h2>Phương thức thanh toán</h2>
                  <p>{{detailPayment.payment}}</p>
                </div>
                <div class="col-cart col-cart--md-two">
                  <h2>Phương thức vận chuyển</h2>
                  <p>Giao hàng tận nơi</p>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
    <div class="spacing"></div>

  </main>
</template>

<script>
export default {
  async asyncData({ store,route, redirect }) {
    let id = route.params.id ? route.params.id : 0;
    let result = await store.dispatch("cart/actDetailPayment",id);
    console.log(result)
    if (result.ok) {
      return {
        detailPayment: result.detailPayment,
      };
    } else {
      redirect("/");
    }
  },
  data() {
    return {
      detailPayment: null
    }
  },
  created () {
      const dataSEO= {
          meta_title: "Thanh toán đơn hàng thành công",
          meta_description: '',
          meta_images: '',
      }
      this.$parent.$emit("event-seo",dataSEO);
  },

};
</script>

<style scoped>
@import url("@/assets/css/cart/thanh-toan-thanh-cong.css");
</style>