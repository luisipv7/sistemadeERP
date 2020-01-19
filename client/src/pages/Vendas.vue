<template>
  <q-page>
    <div class="q-ma-md">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6 flex flex-center">Vendas</div>
        <div class="text-subtitle2">Tela de Vendas</div>
      </q-card-section>
      <q-card-section class="q-ma-sm">
        <q-input
          outlined
          v-model="form.item"
          label="Informe Nome e ou Código de Barras do Item"
        />
      </q-card-section>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      form: {
        item: ''
      }
    }
  },
  methods: {
    async BuscaProd () {
      const axiosConfig = {
        method: 'get',
        url: '/produtos/'
      }
     const Response =  await this.$axios(axiosConfig.url, axiosConfig)
     return Response
    }
  },
  computed: {
    lstProd() {
      const options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['nomeProduto', 'quantidade', 'precoVenda', 'validadeProd', 'vendaForma']
      }
      const fuse = new Fuse(this.BuscaProd, options)
      return this.form.item ? fuse.search(this.form.item): '';
    }
  },
}
</script>

<style>
</style>
