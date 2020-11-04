import firebase from "firebase/app";

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async updateInfo({ commit, dispatch, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const updateData = { ...getters.info, ...toUpdate };
        await firebase
          .database()
          .ref(`users/${uid}/info`)
          .update(updateData);
        commit("setInfo", updateData);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async recalcBills({ commit, dispatch, getters }) {
      const records = await dispatch("fetchRecords");
      console.log(records);

      if (records.length) {
        let bill = 0;
        records.forEach(rec => {
          rec.type == "income" ? (bill += rec.amount) : (bill -= rec.amount);
          console.log(bill);
        });

        dispatch("updateInfo", { bill });
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once("value")
        ).val();
        commit("setInfo", info);
      } catch (e) {}
    }
  },
  getters: {
    info: s => s.info
  }
};
