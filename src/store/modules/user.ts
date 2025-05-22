import { AnyObject } from '/#/global';
import { defineStore } from 'pinia';



interface StoreUser {
  token: string;
  info: AnyObject;
}

export const useUserStore = defineStore('app-user', {
  state: (): StoreUser => ({
    token: '',
    info: {},
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
  },
  actions: {
    setInfo(info: any) {
      this.info = info ? info : '';
    },
    login() {

    },
  },
});
