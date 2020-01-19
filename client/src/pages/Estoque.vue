<template>
  <q-page>
    <div class="q-ma-md">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6 flex flex-center">Estoque</div>
        <div class="text-subtitle2">Relação dos Produtos Cadastrados <small>Quantidade & Valores</small></div>
      </q-card-section>
      <q-card-section class="q-ma-sm">
        <q-table
          title="Lista de Materiais"
          :data="dataTable"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body-cell-validadeProd="props">
            <q-td :props="props">
              {{props.value | formatToDate}}
            </q-td>
          </template>
          <template v-slot:body-cell-id="props">
            <q-td :props="props">
              <q-btn
                flat
                round
                color="primary"
                icon="edit"
                :to="'/Produtos/' + props.value"
              />
            </q-td>
          </template>
          <template v-slot:top-right>
            <q-btn
              @click="imprimir"
              color="primary"
              flat
              label="Gerar PDF"
            >
              <template v-slot:append>
                <q-icon name="add" />
              </template>
            </q-btn>
          </template>
        </q-table>
      </q-card-section>
      <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-btn
          fab
          icon="add"
          @click="$router.push('/produtos/0')"
          color="primary"
        />
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
import { formatToDate } from 'brazilian-values'
// import { openURL } from 'quasar'
export default {
  filters: {
    formatToDate: value => formatToDate(new Date(value))
  },
  data () {
    return {
      columns: [
        { name: 'nomeProduto', align: 'center', label: 'Nome Produto', field: 'nomeProduto' },
        { name: 'quantidade', align: 'center', label: 'Quantidade', field: 'quantidade' },
        { name: 'precoCompra', align: 'center', label: 'Preço de Compra', field: 'precoCompra' },
        { name: 'precoVenda', align: 'center', label: 'Preço de Venda', field: 'precoVenda' },
        { name: 'nomeFornecedor', align: 'center', label: 'Nome Fornecedor', field: 'nomeFornecedor' },
        { name: 'validadeProd', align: 'center', label: 'Validade Produto', field: 'validadeProd' },
        { name: 'vendaForma', align: 'center', label: 'Forma de Venda', field: 'vendaForma' },
        { name: 'id', label: 'ID', field: 'id' }
      ],
      dataTable: []
    }
  },
  mounted () {
    this.Produto()
  },
  methods: {
    async Produto () {
      this.dataTable = await this.$axios.get('/produtos/')
        .then(R => R.data)
        .catch(this.AxiosCatch)
    },
    imprimir () {
      // const accessToken = this.$axios.defaults.headers.common['Authorization']
      window.open(`http://localhost:3333/api/produtos/exportarpdf`, '_parent') // método que aciona download sem necessitar abrir segunda tela
    }
  }
}
</script>

<style>
</style>
