<template>
  <div class="container">
    <h1 class="translation-title">Translation</h1>
    <div class="input-container">
      <div class="select-container">
        <select class="select" id="lang" v-model="langValueFrom">
          <option
            v-for="item in getAllLang"
            :key="item.language"
            :value="item.language"
          >
            {{ item.language }}
          </option>
        </select>
      </div>
      <div class="area-container">
        <textarea
          name="english"
          id=""
          v-model="valueFrom"
          class="text-area"
        ></textarea>
      </div>
    </div>
    <div class="btn-container">
      <button @click="goTranslate" class="trans-btn">Translate</button>
      <button @click="clearAllData" class="trans-btn clear-btn">Clear</button>
    </div>
    <div class="excel-btn-container">
      <button @click="exportTableToExcel('tblData')" class="excel-btn">
        Export Table Data To Excel File
      </button>
    </div>

    <ul class="lang-list">
      <li class="item">
        <select id="lang" v-model="langValueTo" class="item-select">
          <option
            v-for="item in getAllLang"
            :key="item.language"
            :value="item.language"
          >
            {{ item.language }}
          </option>
        </select>
      </li>
      <li class="item">
        <select id="lang" v-model="langValueTo1" class="item-select">
          <option
            v-for="item in getAllLang"
            :key="item.language"
            :value="item.language"
          >
            {{ item.language }}
          </option>
        </select>
      </li>
      <li class="item">
        <select id="lang" v-model="langValueTo2" class="item-select">
          <option
            v-for="item in getAllLang"
            :key="item.language"
            :value="item.language"
          >
            {{ item.language }}
          </option>
        </select>
      </li>
      <li class="item">
        <select id="lang" v-model="langValueTo3" class="item-select">
          <option
            v-for="item in getAllLang"
            :key="item.language"
            :value="item.language"
          >
            {{ item.language }}
          </option>
        </select>
      </li>
      <li class="item">
        <select id="lang" v-model="langValueTo4" class="item-select">
          <option
            v-for="item in getAllLang"
            :key="item.language"
            :value="item.language"
          >
            {{ item.language }}
          </option>
        </select>
      </li>
    </ul>

    <div>
      <table id="tblData">
        <tr>
          <th>{{ this.langValueTo }}</th>
          <td>{{ this.valueTo }}</td>
        </tr>
        <tr>
          <th>{{ this.langValueTo1 }}</th>
          <td>{{ this.valueTo1 }}</td>
        </tr>
        <tr>
          <th>{{ this.langValueTo2 }}</th>
          <td>{{ this.valueTo2 }}</td>
        </tr>
        <tr>
          <th>{{ this.langValueTo3 }}</th>
          <td>{{ this.valueTo3 }}</td>
        </tr>
        <tr>
          <th>{{ this.langValueTo4 }}</th>
          <td>{{ this.valueTo4 }}</td>
        </tr>
        <tr></tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Translation',

  data() {
    return {
      valueFrom: '',
      valueTo: '',
      valueTo1: '',
      valueTo2: '',
      valueTo3: '',
      valueTo4: '',
      langValueFrom: 'en',
      langValueTo: 'uk',
      langValueTo1: 'es',
      langValueTo2: 'tr',
      langValueTo3: 'hi',
      langValueTo4: 'ja',
    }
  },
  computed: {
    ...mapGetters({
      getAllLang: 'lang/getAllLang',
    }),
  },

  methods: {
    goTranslate() {
      const encodedParams = new URLSearchParams()
      encodedParams.append('q', this.valueFrom)
      encodedParams.append('target', this.langValueTo)
      encodedParams.append('source', this.langValueFrom)
      this.$store.dispatch('lang/translateLang', encodedParams).then((resp) => {
        this.valueTo = resp
        encodedParams.append('target', this.langValueTo1)
        this.$store
          .dispatch('lang/translateLang', encodedParams)
          .then((resp) => {
            this.valueTo1 = resp
            encodedParams.append('target', this.langValueTo2)
            this.$store
              .dispatch('lang/translateLang', encodedParams)
              .then((resp) => {
                this.valueTo2 = resp
                encodedParams.append('target', this.langValueTo3)
                this.$store
                  .dispatch('lang/translateLang', encodedParams)
                  .then((resp) => {
                    this.valueTo3 = resp
                    encodedParams.append('target', this.langValueTo4)
                    this.$store
                      .dispatch('lang/translateLang', encodedParams)
                      .then((resp) => {
                        this.valueTo4 = resp
                        encodedParams.append('target', this.langValueTo5)
                        this.$store
                          .dispatch('lang/translateLang', encodedParams)
                          .then((resp) => {
                            this.valueTo5 = resp
                          })
                      })
                  })
              })
          })
      })
    },
    clearAllData() {
      this.valueFrom = ''
      this.valueTo = ''
      this.valueTo1 = ''
      this.valueTo2 = ''
      this.valueTo3 = ''
      this.valueTo4 = ''
    },
    exportTableToExcel(tableID, filename = '') {
      var downloadLink
      var dataType = 'application/vnd.ms-excel'
      var tableSelect = document.getElementById(tableID)
      var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20')

      // Specify file name
      filename = filename ? filename + '.xls' : 'excel_data.xls'

      // Create download link element
      downloadLink = document.createElement('a')

      document.body.appendChild(downloadLink)

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType,
        })
        navigator.msSaveOrOpenBlob(blob, filename)
      } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML

        // Setting the file name
        downloadLink.download = filename

        //triggering the function
        downloadLink.click()
      }
    },
  },
}
</script>

<style scoped>
button {
  border: none;
  outline: none;
}

.translation-title {
  padding: 20px;
  text-align: center;
}

.trans-btn {
  width: 50%;
  padding: 10px;
  background-color: green;
  color: white;
}

.clear-btn {
  background-color: red;
}

.container {
  max-width: 1140px;
  width: 100%;
  margin: 0 auto;
}

.area-container {
  width: 100%;
}

.text-area {
  width: 100%;
  height: 100%;
  resize: none;
  overflow: auto;
}

.select-container {
  width: 50px;
}

.select {
  background-color: rgb(112, 164, 164);
  width: 100%;
  height: 100%;
}

.input-container {
  display: flex;
  flex-direction: row-reverse;

  height: 300px;
}

.btn-container {
  display: flex;
}

.lang-list {
  display: flex;
  list-style: none;
  margin: -10px;
  padding: 0;
}

.item {
  margin: 10px;

  width: calc(100% / 5);
  height: 20px;
}

.item-select {
  background-color: cornflowerblue;
  width: 100%;
}

.excel-btn-container {
  margin: 20px 0;
}

.excel-btn {
  width: 100%;
  background-color: rgb(23, 81, 255);
  padding: 10px;
  color: white;
}
</style>
