// @flow
import type { TRANSLATION_OBJ } from '../types'

export const FRENCH_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: 'Chargement...',
    address: 'Adresse',
    privateKey: 'Clé Privée',
    cancel: 'Annuler',
    fees: 'Frais de réseau',
    version: 'Version',
    in: 'Entrant',
    out: 'Sortant'
  },
  MainPage: {
    title: 'Porte-Monnaie ZEN',
    value: 'Valeur',
    send: 'Envoi',
    received: 'Reçu',
    sent: 'Envoyé',
    noTxFound: 'Aucun historique de transaction trouvé.'
  },
  AddressInfoPage: {
    copyToClipboard: 'Copier l\'adresse dans le presse-papier'
  },
  SendPage: {
    title: 'Envoyer ZEN',
    payTo: 'Payer à',
    amountToPay: 'Montant à payer',
    balance: 'Balance',
    networkFee: 'Frais de réseau',
    slowTx: 'Transmission lente',
    fastTx: 'Transmission rapide',
    from: 'De',
    toAddress: 'Vers adresse',
    amount: 'Montant',
    max: 'Maximum',
    send: 'Envoyer',
    txSuccessful: 'Transaction effectuée avec succès! Cliquez ici pour voir votre transaction.',
    confirmSend: 'Je veux envoyer ces ZEN',
    invalidAddress: '`To Address` invalide. Seules les transactions transparentes sont actuellement supportées.',
    invalidAmount: '`Amount` invalide.',
    invalidFee: '`Fees` invalides. Essayez 0 :)',
    zeroAmount: 'Le montant doit être supérieur à 0.',
    notEnoughZEN: 'Pas assez de ZEN confirmés sur le compte pour effectuer cette transaction.',
    noCameraPermissions: 'Pas de permissions pour accéder à l\'appareil photo. Vous pouvez autoriser l\'accès à la caméra dans vos paramètres.'
  },
  TxDetailPage: {
    txid: 'Id de transaction',
    blockhash: 'Hash de bloc',
    blockheight: 'Hauteur de bloc',
    confirmations: 'Confirmations'
  },
  SettingsPage: {
    title: 'Paramètres',
    language: 'Langue',
    currency: 'Devise',
    secretPhrase: 'Afficher la Phrase Secrète',
    showPrivateKeys: 'Afficher les Clés Privées',
    recoverExistingWallet: 'Récupérer un Porte-Monnaie existant',
    current: 'Actuel'
  },
  SecretPhrasePage: {
    title: 'Phrase Secrète'
  },
  ShowPrivateKeyPage: {
    title: 'Clés Privées'
  },
  RecoverExistingWalletPage: {
    title: 'Récupérer un Porte-Monnaie existant',
    secretPhrase: 'Phrase Secrète',
    textareaPlaceholder: 'Phrase secrète. min 16 caractères',
    confirmUnderstand: 'Je comprends qu\'en récupérant mon Porte-Monnaie, le Porte-Monnaie actuel sera effacé sans possibilité de récupération.',
    recover: 'Récupérer'
  },
  AboutPage: {
    title: 'A Propos'
  },
  PinPage: {
    changePinTitle: 'Changer le code PIN',
    newPinPageTitle: 'Configuration du Porte-Monnaie ZEN',
    verifyPinPageTitle: 'Vérification du code PIN du Porte-Monnaie ZEN',
    setupNewPin: 'Configurer un nouveau code PIN',
    reenterPin: 'Répéter votre code PIN',
    pinsNotSimilar: 'Les codes PIN entrés ne correspondent pas',
    invalidPin: 'Code PIN invalide',
    enterYourPin: 'Entrez votre code PIN'
  }
}
