export default () => {
    return {
      token: '',
      currentUser: null,
      address: {
        page: 1,
        totalRow: 0,
        totalPage: 0,
        posts: []
      },
      orders: {
        page: 1,
        totalRow: 0,
        totalPage: 0,
        posts: []
      },
      wishlist: {
        page: 1,
        totalRow: 0,
        totalPage: 0,
        posts: []
      },
    }
}