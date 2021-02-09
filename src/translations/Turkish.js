// @flow
import type { TRANSLATION_OBJ } from '../types'

export const TURKISH_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: 'yükleniyor...',
    address: 'Adres',
    privateKey: 'Özel Anahtar',
    cancel: 'İptal et',
    fees: 'Ücretler',
    version: 'Versiyon',
    in: 'Gelen',
    out: 'Giden'
  },
  MainPage: {
    title: 'ZEN Wallet',
    value: 'Değer',
    send: 'Gönder',
    received: 'Teslim alındı',
    sent: 'Gönderildi',
    noTxFound: 'Transfer geçmişi bulunamadı.',
    noConnection: 'İnternet bağlantısı bulunmuyor.'
  },
  AddressInfoPage: {
    copyToClipboard: 'Panoya kopyala'
  },
  SendPage: {
    title: 'ZEN Gönder',
    payTo: 'Alıcı',
    amountToPay: 'Ödenecek tutar',
    balance: 'Bakiye',
    networkFee: 'Sağlayıcı Ücreti',
    slowTx: 'Slow Tx',
    fastTx: 'Fast Tx',
    from: 'Gönderici',
    toAddress: 'Alıcı adresi',
    amount: 'Miktar',
    max: 'Maksimum',
    send: 'Gönder',
    txSuccessful: 'Transfer başarılı! Transfer detayları için tıkla.',
    confirmSend: 'ZEN göndermek istiyorum.',
    invalidAddress: 'Bilinmeyen `Alıcı Adresi` Şuanlık sadece açık adresler desteklenmektedir.',
    invalidAmount: 'Bilinmeyen `Miktar`.',
    invalidFee: 'Bilinmeyen `Komisyon`. 0'ı dene :)',
    zeroAmount: 'Miktar 0'dan büyük olmalıdır.',
    notEnoughZEN: 'Transferi gerçekleştirmek için hesabınızda yeterli onaylanan bakiye bulunmuyor.',
    noCameraPermissions: 'Kamera izni yok. Ayarlardan kamera erişimini onaylamalısın.'
  },
  TxDetailPage: {
    txid: 'Transfer ID',
    blockhash: 'Block Hash',
    blockheight: 'Block Height',
    confirmations: 'Onaylamalar'
  },
  SettingsPage: {
    title: 'Ayarlar',
    language: 'Dil',
    currency: 'Döviz',
    secretPhrase: 'Gizli Sözcüğü Göster',
    showPrivateKeys: 'Özel Anahtarları Göster',
    recoverExistingWallet: 'Var olan Cüzdanı Kurtar',
    current: 'Aktif'
  },
  SecretPhrasePage: {
    title: 'Gizli Sözcük'
  },
  ShowPrivateKeyPage: {
    title: 'Özel Anahtarlar'
  },
  RecoverExistingWalletPage: {
    title: 'Var olan Cüzdanı Kurtar',
    secretPhrase: 'Gizli Sözcük',
    textareaPlaceholder: 'Gizli sözcük. minimum 16 karakter',
    confirmUnderstand: 'Var olan cüzdanı kurtardığımda aktif cüzdanın sıfırlanacağını onaylıyorum.',
    recover: 'Kurtar'
  },
  AboutPage: {
    title: 'Hakkında'
  },
  PinPage: {
    changePinTitle: 'PIN Değiştir',
    newPinPageTitle: 'ZEN Cüzdan Kurulumu',
    verifyPinPageTitle: 'ZEN Cüzdan PIN Onayı',
    setupNewPin: 'Yeni PIN oluştur',
    reenterPin: 'Tekrar PIN giriniz',
    pinsNotSimilar: 'Girilen PIN eşleşmedi',
    invalidPin: 'Bilinmeyen PIN',
    enterYourPin: 'PIN Giriniz'
  },
  ContactsPage: {
    contacts: 'Kişiler',
    contactsName: 'Ad',
    contactsAddress: 'Adres',
    noContactsFound: 'Kişiler bulunmadı.'
  }
}
