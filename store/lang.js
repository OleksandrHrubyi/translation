const axios = require("axios");

const options = {
    method: 'GET',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
    headers: {
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        'X-RapidAPI-Key': 'b3fb593f87mshec57b357794e295p1e43a4jsn8135f9179430'
    }
};

export const state = () => ({
    lang: [],
})

export const mutations = {
    SET_LANG(state, data) {
        state.lang = data ? data : []
    },
}

export const actions = {
    getLang({ commit }) {
        axios.request(options).then(function (response) {
            commit('SET_LANG', response.data.data.languages)
        }).catch(function (error) {
            console.error(error, 'tester');
        });
    },
    async translateLang({ commit }, data) {
        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
                'X-RapidAPI-Key': 'b3fb593f87mshec57b357794e295p1e43a4jsn8135f9179430'
            },
            data: data
        };

        const result = await axios.request(options).then(function (response) {
            console.log(response.data.data.translations[0].translatedText, 'style on opo');
            return response.data.data.translations[0].translatedText
        }).catch(function (error) {
            console.error(error);
        });
        return result
    }
}

export const getters = {
    getAllLang: (state) => state.lang,
}
