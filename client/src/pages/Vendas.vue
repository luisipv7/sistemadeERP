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
      <q-card-section class="row">
        <q-card
          dense
          v-for="Card in lstProd"
          :key="Card.id"
          class="q-ma-md cursor-pointer"
          @click.native="addProdCarrinho(Card)"
        >
          <q-card-section
            dense
            class="bg-primary text-white "
          >
            <div class="text-h6">{{ Card.nomeProduto }}</div>
            <div class="text-subtitle2">Valor: {{ Card.precoVenda | formatToBRL }} {{Card.vendaForma}}</div>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section v-if="selecionados.length > 0">
        <q-table
          title="Lista de Compras"
          :data="selecionados"
          :columns="columns"
          row-key="name"
          dense
          hide-bottom
        >
          <q-td
            slot="body-cell-id"
            slot-scope="props"
            :props="props"
          >
            <q-btn
              round
              flat
              color="negative"
              icon="delete"
              dense
              @click="delProdCarrinho(props.value)"
            />

          </q-td>
          <q-td
            slot="body-cell-quantidade"
            slot-scope="props"
            :props="props"
          >
            {{props.row.quantidade}}
            <q-popup-edit
              v-model="props.row.quantidade"
              title="Infome a quantidade"
              buttons
            >
              <q-input
                type="string"
                v-model="props.row.quantidade"
                dense
                autofocus
              />
            </q-popup-edit>
          </q-td>
          <template
            v-if="selecionados"
            v-slot:top-right
          >
            <q-btn
              color="primary"
              icon-right="shopping_cart"
              label="Finalizar Compra"
              no-caps
              @click="finalizaCompra(selecionados)"
            />
          </template>
        </q-table>
      </q-card-section>
    </div>
  </q-page>
</template>

<script>
import { formatToBRL } from 'brazilian-values'
import Fuse from 'fuse.js'
import ComponentePainelVendas from '../components/Vendas/painelVenda'
// import _ from 'lodash'
export default {
  filters: {
    formatToBRL: value => formatToBRL(value)
  },
  data () {
    return {
      form: {
        item: ''
      },
      selecionados: [],
      columns: [
        { name: 'nomeProduto', align: 'center', label: 'Nome Produto', field: 'nomeProduto' },
        { name: 'quantidade', align: 'center', label: 'Quantidade', field: 'quantidade' },
        { name: 'id', label: 'Excluir', field: 'id' }
      ]
    }
  },
  asyncData: {
    buscaProdDefault: [],
    async buscaProd () {
      this.$q.loading.show()

      const axiosConfig = {
        method: 'get',
        url: '/produtos/',
        params: {
          filter: {
            order: 'nomeProduto',
            fields: ['nomeProduto', 'id', 'precoVenda', 'vendaForma']
          }
        }
      }
      //  Força uma atualização
      const Response = await this.$axios(axiosConfig.url, axiosConfig).then(R => R.data).catch(this.AxiosCatch)
      this.$q.loading.hide()
      return Response
    }
  },
  // watch: {
  //   selecionados (newValue, oldValue) {
  //     console.log('oldValue >>> ', oldValue)
  //     console.log('newValue >>>> ', newValue)
  //   }
  // },
  computed: {
    lstProd () {
      const options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['nomeProduto', 'quantidade', 'precoVenda', 'validadeProd', 'vendaForma']
      }
      const fuse = new Fuse(this.buscaProd, options)
      return this.form.item ? fuse.search(this.form.item) : this.buscaProd
    }
  },
  methods: {
    addProdCarrinho (id) {
      const exists = this.selecionados.find(user => user.id === id.id)
      if (!this.selecionados.length || !exists) this.selecionados.push(id)
      return undefined
    },
    delProdCarrinho (id) {
      console.log('id >>>', id)
      this.selecionados = this.selecionados.filter(el => el.id !== id)
    },
    finalizaCompra (produtos) {
      this.$q.dialog({
        component: ComponentePainelVendas,
        parent: this,
        produtos
      }).onOk(() => {
        this.asyncReload('buscaProd')
      })
    }
  }
}
</script>

<style>
</style>
