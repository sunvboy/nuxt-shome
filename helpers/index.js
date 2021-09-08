import cookie from 'cookie';

function hamDeQuyKhacThamSo(item) {  
  const data = {
    id: item.ID,
    url: item.url,
    title: item.title,
  }

  let child_items = item.child_items;
  if (!child_items) {
    data.child_items = [];
  } else {
    data.child_items = child_items.map(subItem => {
      return hamDeQuyKhacThamSo(subItem);
    })
  }

  return data;
}

function mapPostCategories(hashCategories) {
  return post => {
    const listCategoriesId = post.categories; // [20, 30, 40]
    const listCategories = listCategoriesId.map(id => {
      return hashCategories[id]
    })

    return {
      ...post,
      categories: listCategories
    }
  }
}

function getTokenFromCookie(request) {
  try {
    const cookieObj = cookie.parse(request.headers.cookie);
    return cookieObj.access_token;
  } catch(e) {
    return '';
  }
}

const toCurrency = function(value){
  return new Intl.NumberFormat('de-DE',{ style: 'currency', currency: 'VND' }).format(value)
}
const getPriceProduct = function(price = 0,price_sale = 0,price_contact = 0){
  const data = {
    'price_old' : 0,
    'price_final' : 0,
    'percent' : '',
    'flag' : 1,
  }
  if(price_contact && price_contact == 1) {
    data.price_final = "Liên hệ"
  }else{ 
    if(price_sale != '' && price_sale > 0){
      data.price_old = toCurrency(price)
      data.price_final = toCurrency(price_sale)
    }
    if(price && price_sale == 0){
      data.price_final = toCurrency(price)
    }
  }
  
  return data
}
const getPriceProductNoneCurrency = function(price = 0,price_sale = 0,price_contact = 0){
  const data = {
    'price_old' : 0,
    'price_final' : 0,
    'percent' : '',
    'flag' : 1,
  }
  if(price_contact && price_contact == 1) {
    data.price_final = 0
  }else{ 
    if(price_sale != '' && price_sale > 0){
      data.price_old = price
      data.price_final = price_sale
    }
    if(price && price_sale == 0){
      data.price_final = price
    }
  }
  
  return data
}
const validateQuantity = function(quantity){
  let num  = parseInt(quantity);
  if(num == quantity && !isNaN(num)){
      return num >= 1;
  }else{
      return  false
  }
  
}
export {
  hamDeQuyKhacThamSo,
  mapPostCategories,
  getTokenFromCookie,
  toCurrency,
  getPriceProduct,
  validateQuantity,
  getPriceProductNoneCurrency
  
}