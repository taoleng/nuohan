import Vue from 'vue';
import VueI18n from 'vue-i18n';
import cn from '~/assets/js/lang/cn';
import en from '~/assets/js/lang/en';
Vue.use(VueI18n);
export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.lang || 'cn',
    fallbackLocale: 'cn',
    messages: {
      cn,
      en
    }
  });
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }
    return `/${app.i18n.locale}/${link}`;
  }
}
