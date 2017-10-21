// @flow
import type { TRANSLATION_OBJ } from '../types'

export const PORTUGUESE_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: 'carregando...',
    address: 'Endereço',
    privateKey: 'Chave Privada',
    cancel: 'Cancelar',
    fees: 'Taxas',
    version: 'Versão',
    in: 'Entrada',
    out: 'Saída'
  },
  MainPage: {
    title: 'Carteira ZEN',
    value: 'Valor',
    send: 'Enviar',
    received: 'Recebido',
    sent: 'Enviado',
    noTxFound: 'Nenhum histórico de transações encontrado.'
  },
  AddressInfoPage: {
    copyToClipboard: 'Copiar Endereço para a Área de Transferência'
  },
  SendPage: {
    title: 'Enviar ZEN',
    payTo: 'Pagar Para',
    amountToPay: 'Montante a pagar',
    balance: 'Saldo',
    networkFee: 'Taxa de rede',
    slowTx: 'Lentamente',
    fastTx: 'Rapidamente',
    from: 'De',
    toAddress: 'Para o Endereço',
    amount: 'Quantia',
    max: 'Max',
    send: 'Enviar',
    txSuccessful: 'Transação bem sucedida! Clique aqui para ver sua transação.',
    confirmSend: 'Eu quero enviar estes ZEN',
    invalidAddress: '`Endereço de destino` Inválido. Apenas endereços transparentes são suportados neste momento.',
    invalidAmount: '`Quantia` Inválida.',
    invalidFee: '`Taxas` Inválidas. Tente 0 :)',
    zeroAmount: 'Quantia deve ser maior que 0.',
    notEnoughZEN: 'Não existe quantidade suficiente de ZEN confirmadas na conta para fazer essa transação.',
    noCameraPermissions: 'Sem permissão de câmera. Você pode habilitar o acesso à câmera nas configurações.'
  },
  TxDetailPage: {
    txid: 'Id da transação',
    blockhash: 'Block Hash', // don't have translation
    blockheight: 'Block Height', // don't have a good translation
    confirmations: 'Confirmações'
  },
  SettingsPage: {
    title: 'Configurações',
    language: 'Idioma',
    currency: 'Moeda',
    secretPhrase: 'Mostra Frase Secreta',
    showPrivateKeys: 'Mostra Chave Privada',
    recoverExistingWallet: 'Restaurar uma carteira existente',
    current: 'Corrente'
  },
  SecretPhrasePage: {
    title: 'Frase Secreta'
  },
  ShowPrivateKeyPage: {
    title: 'Chaves Privadas'
  },
  RecoverExistingWalletPage: {
    title: 'Recuperar Carteira Existente',
    secretPhrase: 'Frase secreta',
    textareaPlaceholder: 'Frase secreta. Mínimo 16 caracteres.',
    confirmUnderstand: 'Eu entendo que recuperando a carteira existente, minha carteira atual será apagada.',
    recover: 'Recuperar'
  },
  AboutPage: {
    title: 'Sobre'
  },
  PinPage: {
    changePinTitle: 'Alterar PIN',
    newPinPageTitle: 'Configuração da carteira de ZEN',
    verifyPinPageTitle: 'Verificação do Pin da Carteira ZEN',
    setupNewPin: 'Configure um novo PIN',
    reenterPin: 'Confirme seu PIN',
    pinsNotSimilar: 'PINs digitados não conferem',
    invalidPin: 'PIN Inválido',
    enterYourPin: 'Digite seu PIN'
  }
}
