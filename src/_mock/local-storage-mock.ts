export interface Store {
  [key: string]: any;
}


export const localStorageMock = (() => {
  let store: Store = {};

  return {
    getItem: function(key: string) {
      return store[key] || null;
    },
    setItem: function(key: string, value: any) {
      store[key] = value.toString();
    },
    removeItem: function() {
      store = {};
    }
  };
})();
