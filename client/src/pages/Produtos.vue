<template>
  <q-page>
    <div class="q-ma-md">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6 flex flex-center">Produtos</div>
        <div class="text-subtitle2">Cadastro de produtos</div>
      </q-card-section>
      <q-card-section class="q-ma-xs">
        <div class="row q-ma-xs">
          <div class="col-sm">
            <q-input
              class="col-auto q-ma-md"
              square
              outlined
              v-model="form.nomeProduto"
              :error="$v.form.nomeProduto.$error"
              error-message="Se faz necessário o preenchimento deste campo."
              label="Nome do Produto"
            />
          </div>
          <div class="col-sm">
            <q-input
              class="col-auto q-ma-md"
              square
              outlined
              v-model="form.codBarras"
              label="Código de Barras"
            />
          </div>
        </div>
        <div class="row q-ma-xs">
          <div class="col-sm">
            <q-input
              class="col-auto q-ma-md"
              square
              outlined
              v-model="form.precoCompra"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              input-class="text-right"
              :error="$v.form.precoCompra.$error"
              error-message="Se faz necessário o preenchimento deste campo."
              label="Valor de Compra"
            />
          </div>
          <div class="col-sm">
            <q-input
              square
              class="col-auto q-ma-md"
              outlined
              v-model="form.precoVenda"
              :error="$v.form.precoVenda.$error"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              input-class="text-right"
              error-message="Se faz necessário o preenchimento deste campo."
              label="Valor de Venda"
            />
          </div>
        </div>
        <div class="row q-ma-xs">
          <div class="col-sm">
            <q-input
              class="col-auto q-ma-md"
              square
              outlined
              v-model="form.quantidade"
              :error="$v.form.quantidade.$error"
              error-message="Se faz necessário o preenchimento deste campo."
              label="Quantidade Compra"
            />
          </div>
          <div class="col-sm">
            <q-input
              square
              class="col-auto q-ma-md"
              outlined
              v-model="form.vendaForma"
              :error="$v.form.vendaForma.$error"
              error-message="Se faz necessário o preenchimento deste campo."
              label="Forma de Venda(item, peso...)"
            />
          </div>
        </div>
        <div class="row q-ma-xs">
          <div class="col-sm">

            <q-datetime-picker
              class="col-auto q-ma-md"
              outlined
              label="Validade (Perecível)"
              v-model="form.validadeProd"
              :error="$v.form.validadeProd.$error"
              error-message="Se faz necessário o preenchimento deste campo."
            />

          </div>
          <div class="col-sm">
            <q-input
              square
              class="col-auto q-ma-md"
              outlined
              v-model="form.nomeFornecedor"
              :error="$v.form.nomeFornecedor.$error"
              error-message="Se faz necessário o preenchimento deste campo."
              label="Nome do Fornecedor"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          @click="salvar"
          flat
        >SALVAR</q-btn>
      </q-card-actions>
    </div>
  </q-page>
</template>

<script>
import {
  required,
  minLength
} from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        nomeProduto: '',
        precoCompra: '',
        precoVenda: '',
        quantidade: '',
        vendaForma: '',
        codBarras: '',
        validadeProd: '',
        nomeFornecedor: ''
      }
    }
  },
  validations: {
    form: {
      nomeProduto: {
        required,
        minLength: minLength(15)
      },
      precoCompra: { required },
      precoVenda: { required },
      quantidade: { required },
      vendaForma: { required },
      validadeProd: { required },
      nomeFornecedor: { required }
    }
  },
  mounted () {
    this.carregaListaProdutos()
  },
  methods: {
    async carregaListaProdutos () {
      if (this.$route.params.id > 0) {
        const axiosConfig = {
          method: 'get',
          url: '/produtos/' + this.$route.params.id
        }

        this.form = await this.$axios(axiosConfig.url, axiosConfig).then(R => R.data).catch(this.AxiosCatch)
      }
    },
    async salvar () {
      const axiosConfig = {
        method: 'put',
        url: '/produtos/',
        data: JSON.parse(JSON.stringify(this.form))
      }
      await this.$axios(axiosConfig.url, axiosConfig)
        .then(R => R.data)
        .catch(this.AxiosCatch)

      this.$q.notify({
        message: 'Cadastro Efetuado com sucesso!',
        color: 'positive'
      })
      this.$router.push('/Estoque')
    }
  }
}
</script>

<style>
</style>
