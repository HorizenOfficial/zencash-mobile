export const RUSSIAN_TRANSLATION = {
  General: {
    loading: 'загрузка...',
    address: 'Адрес',
    privateKey: 'Приватный ключ',
    cancel: 'Отменить',    
    fees: 'Комиссия',
    version: 'Версия',
    in: 'Пришло', // to check
    out: 'Ушло' // to check
  },
  MainPage: {
    title: 'ZEN кошелек',
    value: 'На счету',    
    send: 'Отправить',
    received: 'Получено',
    sent: 'Отправлено',    
    noTxFound: 'Не найдена история транзакций.'
  },
  AddressInfoPage: {
    copyToClipboard: 'Скопировать адрес',
  },
  SendPage: {
    title: 'Отправить ZEN',
    payTo: 'Заплатить на',
    amountToPay: 'Сумма к оплате',
    balance: 'Баланс',
    networkFee: 'Комиссия сети',
    slowTx: 'Медленно',
    fastTx: 'Быстро',    
    from: 'С адреса',
    toAddress: 'На адрес',
    amount: 'Количество',
    max: 'Макс',    
    send: 'Отправить',
    txSuccessful: 'Транзакция успешна! Кликните сюда чтобы просмотреть транзакцию.',
    confirmSend: 'Да, Я хочу отправить ZEN',
    invalidAddress: 'Неверный адрес. Пока поддерживаются только прозрачные адреса.',
    invalidAmount: 'Неверная сумма.',
    invalidFee: 'Неверная комиссия.',
    zeroAmount: 'Количество ZEN должно быть больше 0.',
    notEnoughZEN: 'На аккаунте недостаточно подтвержденного ZEN для транзакции',
    noCameraPermissions: 'Камера не разрешена. Вы можете разрешить доступ к камере в настройках.'
  },
  TxDetailPage:{
    txid: 'Номер транзакции',
    blockhash: 'Хэш блока',
    blockheight: 'Высота блока',
    confirmations: 'Подтверждения',
  },
  SettingsPage: {
    title: 'Настройки',    
    language: 'Язык',
    currency: 'Валюта',
    secretPhrase: 'Показать секретную фразу',
    showPrivateKeys: 'Показать приватные ключи',
    recoverExistingWallet: 'Восстановить существующий кошелек',
    current: 'Сейчас'
  },
  SecretPhrasePage: {
    title: 'Секретная фраза'
  },
  ShowPrivateKeyPage: {
    title: 'Приватные ключи'
  },
  RecoverExistingWalletPage: {
    title: 'Восстановить существующий кошелек',
    secretPhrase: 'Секретная фраза',
    textareaPlaceholder: 'секретная фраза. мин. 16 символов',
    confirmUnderstand: 'Я понимаю, что при восстановлении кошелька, текущий кошелек будет уничтожен',
    recover: 'Восстановить'
  },
  AboutPage: {
    title: 'О программе',
  },
  PinPage: {
    changePinTitle: 'Изменить PIN',
    newPinPageTitle: 'Настройка ZEN кошелька',
    verifyPinPageTitle: 'ZEN кошелёк подтверждение PIN',
    setupNewPin: 'Введите новый PIN',
    reenterPin: 'Повторите ваш PIN',
    pinsNotSimilar: 'Введёные PIN-ы не совпадают',
    invalidPin: 'Неверный PIN',
    enterYourPin: 'Введите ваш PIN'
  }
}
