export interface AuthModel {
  access_token: string
  refreshToken?: string
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}


export interface RoleModel {
  id: BigInteger,
  name: string,
  pagina_inicial: string
}

export interface UserModel {
  id: number
  username: string
  password: string | undefined
  email: string
  name?: string
  last_name?: string
  fullname?: string
  occupation?: string
  companyName?: string
  phone?: string
  role?: RoleModel
  pic?: string
  language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  timeZone?: string
  website?: 'https://fleetsa.com.ar'
  emailSettings?: UserEmailSettingsModel
  auth?: AuthModel
  communication?: UserCommunicationModel
  address?: UserAddressModel
  socialNetworks?: UserSocialNetworksModel
}


// Tipo para el transportista
export interface TransportistaModel {
  id?: number;
  razon_social: string;
  email: string;
  localidad: string;
  ciudad: string;
  calle: string;
  numero_calle: string;
  piso: string;
  dpto: string;
  tel: string;
  interno1?: string;
  cuit: string;
  // Agrega más campos según sea necesario
}
