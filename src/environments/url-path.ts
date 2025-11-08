export const PATH = {
  /* Please update these paths AND the API documentation */
  generalWorkflow: {
    discard: '/global/workflow/discard',
    edit: '/global/workflow/edit',
    reassign: '/global/workflow/reassign',
    submit: '/global/workflow/submit',
  },
  akaType: {
    get: '/admin/global/get-global-aka-type',
    set: '/admin/global/set-global-aka-type',
  },
  clientType: {
    get: '/admin/client/get-client-type',
    set: '/admin/client/set-client-type',
  },
  errorCodes: {
    get: '/admin/global/get-error',
  },
  payeeAgency: {
    get: '/admin/client/get-payee-agency',
    set: '/admin/client/set-payee-agency',
  },
  paymentType: {
    get: '/admin/client/get-payment-type-admin',
    set: '/admin/client/set-payment-type-admin',
  },
  languageScript: {
    get: '/admin/global/get-language-script',
    set: '/admin/global/set-language-script',
  },
  jointVenture: {
    get: '/admin/client/get-joint-venture',
    set: '/admin/client/set-joint-venture',
  },
  clientSearch: {
    get: '/client-search',
  },
  clientContractSong: {
    searchContract: '/client-contract-songs/client-contracts',
    searchSong: '/client-contract-songs/get',
    delete: '/client-contract-songs/delete',
    set: '/client-contract-songs/set-client-contracts',
    getContractClients: '/contract-client-song/get-contract-client',
    getContractSongs: '/contract-client-song/get-contract-song',
  },
  clientRestrictions: {
    getContractDetails: '/contract-restrictions/get-contract-details',
    getGroupsAndRestrictions:
      '/contract-restrictions/get-groups-and-restrictions',
    getApprovalTypes: '/admin/contract/restrictions/get-approval-type',
    setGroupRestrictions: '/contract-restrictions/set-groups-and-restrictions',
    setReview: '/contract-restrictions/set-review',
    getMutualAccessDetails: '/contract-restrictions/get-mutual-access',
  },
  holdStatus: {
    get: '/admin/global/get-hold-status',
    set: '/admin/global/set-hold-status',
  },
  clientGeneral: {
    get: '/client-general',
    set: '/client-general/workflow/set-client',
    search: {
      agreement: '/client-general/agreement-search',
      jointVenture: '/client-general/joint-venture-search',
    },
    copy: '/client-general/client-copy',
    approve: '/client-general/workflow/approve-client',
    userOfficesWithRights: '/client-general/get-user-offices-with-rights',
  },
  userAdmin: {
    search: {
      get: '/security/user-security/search',
    },
    details: {
      get: '/security/user-security/get-details',
      set: '/security/user-security/set-details',
    },
    approverUsers: {
      // The list of Approver Users comes from the 'search' endpoint.
      get: '/security/user-security/search',
    },
    userContactType: {
      get: '/security/user-security/get-user-contact-type-security',
      set: '/security/user-security/set-user-contact-type-security',
    },
    modules: {
      get: '/security/modules/get-all-modules',
    },
    userRoles: {
      getAll: '/security/user-security/get-all-roles',
      getAssigned: '/security/user-security/get-assigned-roles',
      set: '/security/user-security/set-assigned-roles',
    },
    userOffices: {
      getOffices: '/security/user-security/get-user-offices',
      setOffices: '/security/user-security/set-user-offices',
    },
    modificationHistory: {
      get: '/security/user-security/get-user-modification-history',
    },
  },
  userSecurity: {
    access: {
      get: '/security/user-security/get-user-access',
    },
    roles: {
      setRole: '/security/user-security/set-roles',
      getRoleObjectAccess: '/security/user-security/get-role-object-access',
      getAllRoles: '/security/user-security/get-all-roles',
      getAssignedRoles: '/security/user-security/get-assigned-roles',
      setAssignedRoles: '/security/user-security/set-assigned-roles',
    },
    modules: {
      getAllModuleObjects: '/security/user-security/get-module-objects',
      getAllModules: '/security/user-security/get-all-sec-modules',
    },
  },
  clientApprovalLog: {
    get: '/client-general/get-client-approval-log',
  },
  contractApprovalLog: {
    get: '/contract-general/get-contract-approval-log',
  },
  company: {
    get: '/admin/client/get-company',
  },
  originatingOffice: {
    get: '/admin/global/get-orig-offices',
  },
  approvalStatus: {
    get: '/admin/client/get-approval-status',
  },
  localNotes: {
    get: '/client-general/get-client-local-notes-get-notes',
    set: '/client-general/set-client-local-notes',
    offices: '/client-general/get-client-local-notes',
  },
  generalNotes: {
    get: '/client-general/get-client-general-notes',
    set: '/client-general/set-client-general-notes',
  },
  arRepresentative: {
    get: '/admin/client/get-ar-representative',
    set: '/admin/client/set-ar-representative',
  },
  akaNotes: {
    get: '/client-general/get-client-aka-notes',
    set: '/client-general/set-client-aka-notes',
  },
  consolidationGroup: {
    search: '/client-general/consolidation-group-search',
    get: '/admin/client/get-consolidation-group-admin',
    set: '/admin/client/set-consolidation-group-admin',
  },
  global: {
    changelog: {
      get: '/global/get-changelog',
    },
    states: {
      get: '/global/get-states',
    },
    countries: {
      get: '/global/get-countries',
    },
    job: {
      start: '/global/jobs/start',
      poll: '/global/jobs/poll',
    },
    entity: {
      discard: '/global/workflow/discard',
      edit: '/global/workflow/edit',
      reassign: '/global/workflow/reassign',
      submit: '/global/workflow/submit',
    },
    countryGroupings: {
      get: '/admin/global/get-country-groupings',
      set: '/admin/global/set-country-groupings',
      getCountries: '/admin/global/get-country',
    },
  },
  addressUsage: {
    get: '/client-addresses/get-address-usage-header',
    activationStatus: {
      get: '/client-addresses/get-address-usage-activation',
      set: '/client-addresses/set-address-usage-activation',
    },
    addressDetails: {
      get: '/client-addresses/get_client_payee_address_details',
    },
    scoreLetterPayee: {
      set: '/client-addresses/validate-score-letter-payee',
    },
    regenerateScoreLetter: {
      get: '/client-payees/get-activations',
      set: '/client-payees/regenerate-score-letter',
    },
  },
  payeeNoteExists: {
    get: '/client-addresses/get_client_payee_address_letter_notes',
    set: '/client-addresses/client_payee_note_exists',
  },
  clientPayees: {
    payees: {
      get: '/client-payees/get-client-payees',
      set: '/client-payees/set-client-payee',
    },
    address: {
      get: '/client-payees/addresses',
    },
    addressById: {
      get: '/client-payees/addresses/get-by-id',
      set: '/client-payees/addresses/upsert',
    },
    usage: {
      get: '/client-payees/addresses/get-usage',
    },
    statementNotes: {
      get: '/client-payees/get-client-payee-statement-notes',
      set: '/client-payees/set-client-payee-statement-notes',
    },
    cc: {
      get: '/client-payees/get-client-payee-cc',
      set: '/client-payees/set-client-payee-cc',
      addressSearch: '/client-addresses/get-address-search',
    },
  },
  clientCrossedFromClients: {
    getCurrentStatement: '/cross-from-clients/get-current-statement',
    getCrossFromClients: '/cross-from-clients/get-cross-from-clients',
  },
  statementRunGroup: {
    get: '/client-general/get-statement-run-group',
  },
  associatedStudioClient: {
    search: '/client-general/get-associated-studio-client-search',
    get: '/client-general/get-associated-studio-client',
  },
  clientApprovalAction: {
    massApproval: '/client-general/workflow/approve-client',
  },
  payeeSearch: {
    get: '/payee/payee-search',
  },
  payeeCopy: {
    set: '/payee/payee-copy',
  },
  companyGroup: {
    get: '/admin/client/get-company-group',
    set: '/admin/client/set-company-group',
  },
  payeeGeneral: {
    get: '/payee/get-payee',
    set: '/payee/set-payee',
    payeeNotes: {
      get: '/payee/get-payee-notes',
      set: '/payee/set-payee-note',
    },
    payeeApprovalLog: {
      get: '/payee/get-approval-log',
    },
    payeeType: {
      get: '/admin/client/get-payment-type',
    },
    payeeHolds: {
      get: '/payee/get-payee-holds',
      set: '/payee/set-payee-hold',
    },
    payeeTaxFormTypes: {
      get: '/payee/get-tax-form-type',
    },
    approve: '/payee-general/workflow/approve-payee',
  },
  payeeAddressUsage: {
    get: '/payee-addresses/get-payee-usage',
  },
  contract: {
    getDetails: '/contract-general/get-contract',
    setDetails: '/contract-general/set-contract',
  },
  contractSearch: {
    get: '/contract/contract-search',
  },
  contractType: {
    get: '/admin/contract/get-contract-types',
    set: '/admin/contract/admin-contract-type-cud',
  },
  contractRestriction: {
    get: '/admin/contract/restrictions/get',
    getRestrictionsGroups: '/admin/contract/restrictions/groups/get',
    setRestriction: '/admin/contract/restrictions/upsert',
    getOfficeGroups: '/admin/global/get-orig-offices',
  },
  contractGeneral: {
    getSociety: '/admin/song/get-society',
  },
  signingDetails: {
    getClientARDetails: '/signing-offices/get-client-ar-details',
    getSigningOffices: '/admin/client/get-signing-offices',
    setSigningOffice: '/admin/client/set-signing-offices',
    getSelectedARReps: '/signing-offices/get-selected-ar-reps',
    getAllARReps: '/signing-offices/get-all-ar-reps',
    updateClientOffice: '/signing-offices/update-client-office',
  },
  adminContactType: {
    get: '/admin/contact/get-contact-type',
    set: '/admin/contact/set-contact-type',
  },
  contactGroup: {
    get: '/admin/contact/get-contact-group',
    set: '/admin/contact/set-contact-group',
  },
  adminEntityGroup: {
    get: '/admin/client/get-entity-group',
  },
  printRules: {
    get: '/admin/global/get-print-rules',
  },
  agreementRole: {
    get: '/admin/global/get-agreement-role',
  },
  adminCurrency: {
    get: '/admin/global/get-currencies',
    set: '/admin/global/set-currencies',
  },
  adminLoginMessage: {
    get: '/admin/global/get-login-message',
    set: '/admin/global/set-login-message',
  },
  adminTerritories: {
    get: '/admin/contract/get-territories',
    set: '/admin/contract/set-territories',
  },
  adminContractCatalog: {
    get: '/admin/global/get-contract-catalogs',
    set: '/admin/global/set-contract-catalogs',
  },
  adminContractRestrictionsApprovalType: {
    get: '/admin/contract/restrictions/get-approval-type',
    set: '/admin/contract/set-restrictions-approval-types',
  },
  adminContractIncomeType: {
    getIncomeTypeGroups: '/admin/contract/income-type-groups/get',
    getIncomeTypes: '/admin/contract/income-types/get',
    getContractIncomeTypeGroups:
      '/admin/contract/get-contract-income-type-groups',
    getIncomeTypesAdvanced: '/admin/contract/income-types-advanced/get',
    upsertIncomeTypes: '/admin/contract/income-types/upsert',
  },
  language: {
    get: '/admin/global/get-languages',
    set: '/admin/global/set-languages',
  },
  incomeTypeMatchGroup: {
    get: '/admin/contract/get-income-type-match-group',
    set: '/admin/contract/set-income-type-match-group',
  },
  adminContractSourceReportingGroup: {
    get: '/admin/contract/get-contract-source-reporting-groups',
    set: '/admin/contract/set-contract-source-reporting-groups',
  },
  incomeTypeGroup: {
    get: '/admin/contract/get-contract-admin-income-type-group',
    set: '/admin/contract/set-contract-admin-income-type-group',
  },
  adminSongType: {
    get: '/admin/song/get-song-type',
    set: '/admin/song/set-song-type',
  },
  adminSongeMediaType: {
    get: '/admin/song/get-media-type',
    set: '/admin/song/set-media-type',
  },
  contractIncomeTypeGroup: {
    get: '/admin/contract/get-contract-income-type-groups',
    set: '/admin/contract/set-contract-income-type-groups',
  },
  adminSongProductionType: {
    get: '/admin/song/get-production-types',
    set: '/admin/song/set-production-types',
  },
  payeeAssociatedClients: {
    get: '/payee-associated-clients/get-payee-id-client-statement-bal',
  },
  adminSongCapacityType: {
    get: '/admin/song/get-capacity-type',
    set: '/admin/song/set-capacity-type',
  },
  adminSongMusicUsage: {
    get: '/admin/song/get-music-usage',
    set: '/admin/song/set-music-usage',
  },
  AdminSongRecordingTechnique: {
    get: '/admin/song/get-recording-technique',
    set: '/admin/song/set-recording-technique',
  },
  adminSongMusicArrangement: {
    get: '/admin/song/get-admin-music-arrangement',
    set: '/admin/song/admin-music-arrangement-cud',
  },
  adminUSCertificateType: {
    get: '/admin/song/get-us-certificate-types',
    set: '/admin/song/set-us-certificate-types',
  },
  adminSongAlertCategories: {
    get: '/admin/song/get-song-alert-categories',
    set: '/admin/song/set-song-alert-categories',
  },
  adminSongTitleType: {
    get: '/admin/song/get-title-type',
    set: '/admin/song/set-title-type',
  },
  specificAgreementType: {
    get: '/admin/song/get-specific-agreement-type',
    set: '/admin/song/set-specific-agreement-type',
  },
  adminLyricAdaptation: {
    get: '/admin/song/get-lyric-adaptations',
    set: '/admin/song/set-lyric-adaptations',
  },
  adminSongVersionType: {
    get: '/admin/song/get-version-type',
    set: '/admin/song/set-version-type',
  },
  adminClientStatementRunGroup: {
    get: '/admin/client/get-statement-run-group',
    set: '/admin/client/set-statement-run-group',
    getStatementFrequenciy: '/admin/client/get-statement-frequency',
    getStatementDueDays: '/admin/client/get-statement-due-days',
    getCurrentStatementDate: '/admin/client/get-current-statement-date',
  },
  adminSongRecordingFormat: {
    get: '/admin/song/get-admin-song-recording-format',
    set: '/admin/song/admin-song-recording-format-cud',
  },
  adminSongRecordType: {
    get: '/admin/song/get-admin-song-recorded-type',
    set: '/admin/song/admin-song-recorded-type-cud',
  },
  adminIncomeTypeReportingGroup: {
    get: '/admin/contract/get-income-type-reporting-group',
    set: '/admin/contract/set-income-type-reporting-group',
  },
  adminSongIdentifierType: {
    get: '/admin/song/get-identifier-types',
    set: '/admin/song/set-identifier-type',
    getSocieties: '/admin/song/get-society',
  },
  clientMassCopyUtility: {
    getS3PreSignedUrl: '/global/mass-client-copy/get-s3-presigned-url',
  },
  adminSongFilmTvType: {
    get: '/admin/song/get-film-tv-types',
    set: '/admin/song/set-film-tv-types',
  },
} as const;
