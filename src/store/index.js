import Vue from "vue";
import Vuex from "vuex";
import { stripe_regions } from "~/plugins/constant.js";
import moment from "moment";

Vue.use(Vuex);

export const strict = false;

export const state = () => ({
  user: undefined, // undefined:not authorized, null:no user
  claims: undefined, // custom claims
  lang: undefined,
  date: new Date(),
  carts: {}, // for "Edit Order"
  server: {}, // server configuration
  orderEvent: 0,
  orderObj: {},
  soundEnable: false, // after user touch/click event, this flag set true (for mobile browser)
  soundOn: false, // for restaurant admin config
  soundFile: "",
  isWindowActive: false, // active status of browser window
  dialog: null, // for DialogBox
  isLoading: false, // for full-page loading animation
  isFirefoxPBM: undefined, // true, false, null
  supportOn: false, // for support sidebar
  supportFrom: "",
  supportMessages: []
});

let dummyCount = 0;
const dummyMessages = [
  {
    role: "shop",
    message:
      "すみません、店舗の登録でちょっと分からないところがあります。公開にはチェックを入れた方がいいですか？"
  },
  {
    role: "supporter",
    message: "メニューと支払い方法の登録は終わっていますか？"
  },
  {
    role: "shop",
    message: "いいえ。"
  },
  {
    role: "supporter",
    message:
      "通常、メニューなど用意した後に公開するので今は下書きとして保存して下さい。"
  },
  {
    role: "shop",
    message: "保存しました。次には何をしたら良いですか？"
  },
  {
    role: "supporter",
    message:
      "支払い方法の設定が必要になります。オンラインによる事前のクレジットカード払いは考えていますか？"
  },
  {
    role: "shop",
    message: "支払い方法には何がありますか？"
  },
  {
    role: "supporter",
    message:
      "現地での支払いかオンラインでクレジットカードによる事前支払いですね"
  },
  {
    role: "shop",
    message: "現地での支払いのみで考えています。"
  },
  {
    role: "supporter",
    message: "では、Stripeの箇所は飛ばして受け取り払いを許可を選んで下さい。"
  },
  {
    role: "shop",
    message:
      "受け取りを許可にチェックを入れました。次はメニューを登録すれば良いでしょうか？"
  },
  {
    role: "supporter",
    message: "はい、お持ち帰り商品を登録しましょう。"
  },
  {
    role: "shop",
    message: "登録完了しました。これで終わりですか？"
  },
  {
    role: "supporter",
    message: "最後に掲載を申請して下さい。"
  },
  {
    role: "shop",
    message: "申請しました。"
  },
  {
    role: "supporter",
    message: "お疲れさまでした。掲載までには少々時間がかかるのでお待ち下さい。"
  }
];

export const getters = {
  uid: state => {
    return state.user && state.user.uid;
  },
  uidAdmin: state => {
    return state.user && state.user.email && state.user.uid;
  },
  uidUser: state => {
    return state.user && state.user.phoneNumber && state.user.uid;
  },
  userWasInitialized: state => {
    // Check if state.user has been initialized (as the result of notication from Firebase)
    return state.user !== undefined;
  },
  stripeRegion: state => {
    return stripe_regions[state.server.region || "US"];
  },
  isSuperAdmin: state => {
    return state.claims?.admin;
  },
  isNotSuperAdmin: state => {
    return !state.claims?.admin;
  },
  isOperator: state => {
    return state.claims?.operator;
  },
  isNotOperator: state => {
    return !state.claims?.operator;
  },
  supportOn: state => {
    return state.supportOn;
  },
  supportFrom: state => {
    return state.supportFrom;
  },
  supportMessages: state => {
    return state.supportMessages;
  }
};

export const mutations = {
  setActive(state, flag) {
    state.isWindowActive = flag;
  },
  setLoading(state, flag) {
    state.isLoading = flag;
  },
  setUser(state, user) {
    state.user = user;
  },
  updateDate(state) {
    state.date = new Date();
  },
  saveCart(state, payload) {
    console.log("saving cart", payload.id, payload.cart);
    state.carts = {};
    state.carts[payload.id] = payload.cart;
  },
  setServerConfig(state, config) {
    state.server = config;
    console.log("store:setServerConfig", state.server.region);
  },
  setLang(state, lang) {
    state.lang = lang;
  },
  setCustomClaims(state, claims) {
    // Note: we can't copy user using Object.assign here
    state.claims = claims;
  },
  pingOrderEvent(state) {
    state.orderEvent = state.orderEvent + 1;
  },
  setOrders(state, orders) {
    state.orderObj = orders.reduce((tmp, order) => {
      const day = moment(order.timePlaced.toDate()).format("YYYY-MM-DD");
      if (!tmp[day]) {
        tmp[day] = [];
      }
      tmp[day].push(order);
      return tmp;
    }, {});
  },
  soundEnable(state) {
    state.soundEnable = true;
  },
  setSoundOn(state, flag) {
    state.soundOn = flag;
  },
  setSoundFile(state, file) {
    state.soundFile = file;
  },
  resetDialog(state) {
    state.dialog = null;
  },
  setAlert(state, params) {
    state.dialog = { alert: params };
  },
  setErrorMessage(state, params) {
    state.dialog = { error: params };
  },
  setFirefoxPBM(state, flag) {
    if (flag === true) {
      console.warn("Firefox Private Browsing Mode detected");
    }
    state.isFirefoxPBM = flag;
  },
  setSupportOn(state, flag) {
    state.supportOn = flag;
  },
  setSupportFrom(state, pageName) {
    // todo: 多言語対応
    state.supportFrom = pageName;
  },
  setSupportMessage(state, message) {
    state.supportMessages.push(message);
  },
  setDummySupportMessage(state) {
    state.supportMessages.push(dummyMessages[dummyCount++]);
  }
};

export const actions = {};
