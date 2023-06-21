//this will create memories and memory chunks for each sku/version

// heres the raw json i manually collected

export let skus = [
  {
    name: "Additional 1TB Storage",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-additional-1tb-storage.pdf",
    pricePer: "contract",
    dated: "2021-07-19",
    type: "Add-on",
    productCodes: [
      'PROD09002'
    ]
  }, {
    name: "Additional Non-Production Instance Storage",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-additional-non-production-instance.pdf",
    pricePer: "contract",
    dated: "2021-07-19",
    type: "Add-on",
    productCodes: [
      'PROD00065',
      'PROD02074'
    ]
  }, {
    name: "Additional Production Instance",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-additional-production-environment.pdf",
    dated: "2022-08-03",
    type: "Add-on",
    productCodes: [
      'PROD00827',
      'PROD10629',
    ]
  }, {
    name: "Agile Team",
    subscriptionMeters: [
      "User",
    ],
    versions: [{
      name: "Agile Team",
      packaging: [
        "Agile Development",
        "Test Management"
      ]
    }],
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-agile-team.pdf",
    pricePer: "month",
    dated: "2021-08-16",
    type: "Application",
    productCodes: [
      'PROD12492'
    ]
  }, {
    name: "AI Search Starter (500,000 documents)",
    subscriptionMeters: [
      "AI Search Document",
    ],
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-ai-search.pdf",
    dated: "2021-08-16",
    type: "Application",
    productCodes: [
      'PROD15338'
    ]
  }, {
    name: "AI Search 1 Million documents",
    subscriptionMeters: [
      "AI Search Document",
    ],
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-ai-search.pdf",
    dated: "2021-08-16",
    type: "Application",
    productCodes: [
      'PROD15339'
    ]
  }, {
    name: "App Engine",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-app-engine.pdf",
    subscriptionMeters: [
      "Fulfiller User",
    ],
    versions: [
      {
        name: "App Engine",
        packaging: [
          "App Engine Studio",
          "Mobile Publishing",
          "App Engine Management Center",
          "Table Builder for App Engine",
          "Workspace Builder for App Engine",
          "Universal Request Pro",
          "Performance Analytics",
          "Predictive Intelligence",
          "Virtual Agent",
          "Unlimited Custom Tables",
          "Add-on Process Optimization for App Engine",
        ],
      }
    ],
    dated: "2022-11-03",
    type: "Application Suite",
    productCodes: [
      "PROD13074", "PROD13076"
    ]
  }, {
    name: "Approver User",
    subscriptionMeters: [
      "Approver User",
    ],
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD00170.pdf",
    dated: "2023-02-02",
    type: "Other",
    productCodes: [
      "PROD00170",
    ]
  }, {
    name: "Automation Engine",
    subscriptionMeters: [
      "Integration Hub Transaction",
      "Unattended Robot",
      "Attended Robot",
      "Document Intelligence Page",
    ],
    versions: [{
      name: "Automation Engine Professional",
      packaging: [
        "Integration Hub Transactions (3M)",
        "Integration Hub package included (Professional)",
        "Unattended Robot (5)",
        "Attended Robot (15)",
        "Document Intelligence Page (25000)",
        "RPA Hub",
        "Spokes",
        "Protocols",
        "Activity Designer",
        "Activity Packs",
        "Add-on 1M Integration Hub Transactions",
        "Add-on 10M Integration Hub Transactions",
        "Add-on 50M Integration Hub Transactions",
        "Add-on 100M Integration Hub Transactions",
        "Add-on 5 Unattended Robots",
        "Add-on 15 Attended Robots",
        "Add-on 100K Document Intelligence Pages",
        "Add-on 500K Document Intelligence Pages",
      ]
    }, {
      name: "Automation Engine Enterprise",
      packaging: [
        "Integration Hub Transactions (3M)",
        "Integration Hub package included (Professional)",
        "Unattended Robot (5)",
        "Attended Robot (15)",
        "Document Intelligence Page (25000)",
        "RPA Hub",
        "Spokes",
        "Protocols",
        "Activity Designer",
        "Activity Packs",
        "Password Reset",
        "Client Software Distribution",
        "Automation Center",
        "Add-on 1M Integration Hub Transactions",
        "Add-on 10M Integration Hub Transactions",
        "Add-on 50M Integration Hub Transactions",
        "Add-on 100M Integration Hub Transactions",
        "Add-on 5 Unattended Robots",
        "Add-on 15 Attended Robots",
        "Add-on 100K Document Intelligence Pages",
        "Add-on 500K Document Intelligence Pages",
      ]
    }],
    pricePer: "year",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-automation-engine.pdf",
    dated: "2022-11-03",
    type: "Application Suite",
    productCodes: [
      "PROD17160","PROD18249","PROD17159","PROD18247"
    ]
  }, {
    name: "BCM Continuity Management",
    subscriptionMeters: [
      "BCM Operator",
      "BCM Lite Operator",
    ],
    versions: [
      {
        name: "Business Continuity Management - Standard",
        packaging: [
          "Business Impact Analysis",
          "Business Continuity Planning",
          "Crisis Management",
          "5 Custom Tables",
          "Add-on BCM Lite Operator",
        ]
      },
      {
        name: "Business Continuity Management - Professional",
        packaging: [
          "Business Impact Analysis",
          "Business Continuity Planning",
          "Crisis Management",
          "Performance Analytics",
          "Predictive Intelligence",
          "Virtual Agent",
          "5 Custom Tables",
          "Add-on BCM Lite Operator",
        ]
      },
    ],
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-business-continuity-management.pdf",
    pricePer: "month",
    dated: "2022-10-13",
    type: "Application",
    productCodes: [
      "PROD14201", "PROD13219","PROD13220"
    ]
  }, {
    name: "Business Stakeholder",
    subscriptionMeters: [
      "Business Stakeholder User",
    ],
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-business-stakeholder.pdf",
    dated: "2022-10-13",
    type: "Other",
    productCodes: [
      "PROD17800",
      "PROD15028"
    ]
  }, {
    name: "CreateNow Development Suite",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD00525.pdf",
    dated: "2023-02-02",
    type: "Other",
    productCodes: [
      'PROD00525'
    ]
  }, {
    name: "Customer Service Management",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-customer-service-management.pdf",
    subscriptionMeters: [
      "Fulfiller User",
      "Unrestricted User",
      "Portal Visit",
    ],
    versions: [
      {
        name: "Customer Service Management - Standard",
        packaging: [
          "Customer Service Management",
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Communities",
          "Walk-up Experience",
          "Engagement Messenger",
          "Digital Portfolio Management",
          "Universal Request",
          "Portal Visits per month (fulfiller/unrestricted user) 1000/200",
          "App Engine Custom Tables",
          "Add-on Additional Portal Visits (1,000 Pack/Month)",
          "Add-on Additional Conversations (4,000 Pack/Month)",
          "Add-on Performance Analytics for CSM",
          "Add-on Order Management - Fulfiller User",
        ]
      }, {
        name: "Customer Service Management - Professional",
        packaging: [
          "Customer Service Management",
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Communities",
          "Walk-up Experience",
          "Engagement Messenger",
          "Digital Portfolio Management",
          "Universal Request",
          "Universal Request Pro",
          "Outsourced Customer Service Management",
          "Proactive Customer Service Operations",
          "Continual Improvement Management",
          "Vendor Manager Workspace",
          "Mobile Publishing",
          "DevOps Change Velocity",
          "App Engine Studio",
          "Performance Analytics",
          "Predictive Intelligence",
          "Virtual Agent",
          "DevOps Config",
          "Portal Visits per month (fulfiller/unrestricted user) 2000/400",
          "App Engine Custom Tables",
          "Add-on Additional Portal Visits (1,000 Pack/Month)",
          "Add-on Additional Conversations (4,000 Pack/Month)",
          "Add-on Order Management - Fulfiller User",
          "Add-on Workforce Optimization",
          "Add-on Process Optimization"
        ]
      }, {
        name: "Customer Service Management - Enterprise",
        packaging: [
          "Customer Service Management",
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Communities",
          "Walk-up Experience",
          "Engagement Messenger",
          "Digital Portfolio Management",
          "Universal Request",
          "Universal Request Pro",
          "Outsourced Customer Service Management",
          "Proactive Customer Service Operations",
          "Continual Improvement Management",
          "Vendor Manager Workspace",
          "Mobile Publishing",
          "DevOps Change Velocity",
          "App Engine Studio",
          "Performance Analytics",
          "Predictive Intelligence",
          "Virtual Agent",
          "DevOps Config",
          "Workforce Optimization",
          "Process Optimization",
          "Portal Visits per month (fulfiller/unrestricted user) 2000/400",
          "App Engine Custom Tables",
          "Add-on Additional Portal Visits (1,000 Pack/Month)",
          "Add-on Additional Conversations (4,000 Pack/Month)",
          "Add-on Order Management - Fulfiller User",
        ]
      },],
    dated: "2022-11-03",
    type: "Application Suite",
    productCodes: ["PROD00525"]
  }, {
    name: "Customer Service Management Professional",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD09219.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "Fulfiller User",
      "Portal Visit",
    ],
    versions: [
      {
        name: "Customer Service Management Professional",
        packaging: [
          "Customer Service Management",
          "Communities",
          "Targeted Communications",
          "Field Service Management",
          "Continual Improvement Management",
          "Proactive Customer Service Operation",
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Request Management",
          "Asset Management",
          "Cost Management",
          "Walk-Up Experienc",
          "Outsourced Customer Service",
          "Engagement Messenger",
          "Predictive Intelligence",
          "Virtual Agent",
          "Performance Analytics",
          "Customer Service Portal Visits 1000 per fulfiller user, expires monthly",
          "Add-on Additional Portal Visits (1,000 Pack/Month)",
        ]
      }
    ],
    type: "Application Suite",
    productCodes: ["PROD15047",
    "PROD15204",
    "PROD17145",
    "PROD09219",
    "PROD15203",
    "PROD17143"]
  }, {
    name: "Security Operations",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-security-operations.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "Fulfiller User",
      "Unrestricted User",
      "Device"
    ],
    versions: [
      {
        name: "Standard SIR",
        packaging: [
          "Security Incident Response SIR",
          "App Engine 5 Custom Tables"
        ]
      },
      {
        name: "Professional SIR",
        packaging: [
          "Security Incident Response SIR",
          "Threat Intelligence",
          "Event Management for Security Operations",
          "SIR Integration Bundles",
          "Major Security Incident Management",
          "Predictive Intelligence",
          "Performance Analytics",
          "App Engine 5 Custom Tables"
        ]
      },
      {
        name: "Standard VR",
        packaging: [
          "Vulnerability Response VR",
          "App Engine 5 Custom Tables"
        ]
      },
      {
        name: "Professional VR",
        packaging: [
          "Vulnerability Response VR",
          "Vulnerability Solution Management",
          "Application Vulnerability Response",
          "Predictive Intelligence",
          "Performance Analytics",
          "App Engine 5 Custom Tables"
        ]
      },
      {
        name: "Enterprise VR",
        packaging: [
          "Vulnerability Response VR",
          "Vulnerability Solution Management",
          "Application Vulnerability Response",
          "Configuration Compliance",
          "Patch Orchestration",
          "Cloud Security (VR)",
          "Cloud Security (Configuration Compliance)",
          "Predictive Intelligence",
          "Performance Analytics",
          "App Engine 25 Custom Tables"
        ]
      },
      {
        name: "Data Loss Prevention Incident Response",
        packaging: [
          "Data Loss Prevention Incident Response",
          "Performance Analytics",
          "App Engine 5 Custom Tables"
        ]
      },
    ],
    type: "Application Suite",
    productCodes: ["PROD16746"]
  }, {
    name: "Database Encryption (1 prod, 2 non-prod)",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-database-encryption.pdf",
    dated: "2021-07-19",
    type: "Add-on",
    productCodes: ["PROD08359","PROD08358"]
  }, {
    name: "Discovery",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD11457.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "Nodes"
    ],
    versions: [
      {
        name: "Discovery",
        packaging: [
          "Discovery",
          "5 Custom Tables"
        ]
      }
    ],
    type: "Application",
    productCodes: ["PROD01170","PROD11457"]
  }, {
    name: "Edge Encryption",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-edge-encryption.pdf",
    dated: "2021-07-19",
    basedOnAnnualSubscriptionFees: true,
    type: "Other",
    productCodes: ["PROD01054"]
  }, {
    name: "Electronic Medical Records (EMR) Help",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-electronic-medical-records.pdf",
    dated: "2021-08-16",
    basedOnAnnualSubscriptionFees: true,
    versions: [
      {
        name: "Electronic Medical Records",
        packaging: [
          "Electronic Medical Records",
        ]
      }
    ],
    type: "Application",
    productCodes: ["PROD14666"]
  }, {
    name: "Human Resources Service Delivery",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-human-resources.pdf",
    dated: "2022-10-13",
    subscriptionMeters: [
      "HR User"
    ],
    versions: [
      {
        name: "Human Resources Service Delivery - Professional",
        packaging: [
          "Case and Knowledge Management",
          "Employee Center Pro",
          "LifeCycle Events",
          "Continual Improvement Management",
          "Communities",
          "Mobile Publishing",
          "Universal Request",
          "Universal Request Pro",
          "Performance Analytics",
          "Predictive Intelligence",
          "Virtual Agent",
          "App Engine 15 Custom Tables",
          "Add-on Employee Document Mangement",
          "Add-on Global Business Services Foundation",
          "Add-on Process Optimzation for HRSD"
        ]
      },
      {
        name: "Human Resources Service Delivery - Enterprise",
        packaging: [
          "Case and Knowledge Management",
          "Employee Center Pro",
          "LifeCycle Events",
          "Continual Improvement Management",
          "Communities",
          "Mobile Publishing",
          "Enterprise Onboarding and Transitions",
          "Employee Journey Management",
          "Universal Request",
          "Universal Request Pro",
          "Performance Analytics",
          "Predictive Intelligence",
          "Virtual Agent",
          "App Engine 15 Custom Tables",
          "Add-on Employee Document Mangement",
          "Add-on Process Optimzation for HRSD"
        ]
      }
    ],
    type: "Application Suite",
    productCodes: ["PROD11370"]
  }, {
    name: "Enterprise Success",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-enterprise-success.pdf",
    dated: "2022-10-04",
    type: "Services",
    productCodes: ["PROD09657"]
  }, {
    name: "Enterprise Support Account Management",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-premier-support-account-management.pdf",
    dated: "2021-07-19",
    type: "Services",
    productCodes: ["PROD09871"]
  }, {
    name: "Enterprise Training Agreement - Flex Tier B",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD17831.pdf",
    dated: "2023-02-02",
    type: "Other",
  }, {
    name: "Field Service Management Contractor User",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-field-service-management-contractor.pdf",
    dated: "2021-08-16",
    subscriptionMeters: [
      "Field Service Management Contractor User"
    ],
    versions: [
      {
        name: "Field Service Management Contractor",
        packaging: [
          "Contractor Management",
        ]
      }
    ],
    type: "Application"
  }, {
    name: "Field Service Management (FSM)",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-field-service-management.pdf",
    dated: "2022-10-13",
    subscriptionMeters: [
      "Fulfiller User"
    ],
    versions: [
      {
        name: "Field Service Management - Standard",
        packaging: [
          "Field Service Management",
          "Cost Management",
          "Planned Maintenance",
          "Asset Management",
          "Contractor Management",
          "Universal Request",
          "App Engine 5 Custom Tables"
        ]
      },
      {
        name: "Field Service Management - Professional",
        packaging: [
          "Field Service Management",
          "Cost Management",
          "Planned Maintenance",
          "Asset Management",
          "Contractor Management",
          "Universal Request",
          "Universal Request Pro",
          "App Engine Studio",
          "Continual Improvement Management",
          "Planned Work Management",
          "Advanced Dispatching",
          "Mobile Publishing",
          "Predictive Intelligence",
          "Performance Analytics",
          "Virtual Agent",
          "App Engine 100 Custom Tables"
        ]
      }
    ],
    type: "Application Suite"
  }, {
    name: "Field Services Operations (FSO)",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/archive/sn-financial-services-operations-20220323.pdf",
    dated: "2022-02-02",
    subscriptionMeters: [
      "Fulfiller User"
    ],
    versions: [
      {
        name: "Field Services Operations - Standard",
        packaging: [
          "Financial Services Operations Core",
          "Customer Service Management",
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Communities",
          "Walk-Up Experience",
          "Engagement Messenger",
          "Universal Request",
          "Digital Portfolio Management",
          "Portal Visits (per Fulfiller User, per month) 1,000",
          "App Engine Starter 25 Custom Tables",
        ]
      },
      {
        name: "Field Services Operations - Professional",
        packaging: [
          "Financial Services Operations Core",
          "Customer Service Management",
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Communities",
          "Walk-Up Experience",
          "Engagement Messenger",
          "Universal Request",
          "Universal Request ",
          "Financial Services Applications and Data Mod",
          "Outsourced Customer Service Manageme",
          "Proactive Customer Service Operatio",
          "Continual Improvement Manageme",
          "Service Owner Workspa",
          "Vendor Manager Workspa",
          "DevOps Change Veloci",
          "Digital Portfolio Management",
          "Mobile Publishi",
          "Performance Analyti",
          "Predictive Intellige",
          "Virtual Agent",
          "Portal Visits (per Fulfiller User, per month) 2,000",
          "App Engine Starter 100 Custom Tables",
        ]
      },
    ],
    type: "Application Suite"
  }, {
    name: "Governance, Risk and Compliance (GRC)",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD03393.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "GRC User"
    ],
    versions: [
      {
        name: "GRC - Enterprise",
        packaging: [
          "Policy and Compliance Management",
          "Audit Management",
          "Risk Management",
          "Performance Analytics for Governance",
          "Risk & Compliance"
        ]
      }
    ],
    type: "Application"
  }, {
    name: "Hardware Asset Management (HAM)",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-hardware-asset-management.pdf",
    dated: "2022-10-13",
    subscriptionMeters: [
      "Subscription Unit"
    ],
    versions: [
      {
        name: "Hardware Asset Management - Professional",
        packaging: [
          "Hardware Asset Management",
          "Performance Analytics",
          "App Engine 5 Custom Tables"
        ]
      }
    ],
    type: "Application"
  }, {
    name: "Healthcare & Life Sciences Service Management Professional with App Engine 100",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/archive/sn-healthcare-lifesciences-service-management-20220323.pdf",
    dated: "2022-02-02",
    subscriptionMeters: [
      "Fulfiller User"
    ],
    versions: [
      {
        name: "Healthcare & Life Sciences Service Management Professional",
        packaging: [

          "Healthcare and Life Sciences Service Management Core",
          "Vaccine Administration Management",
          "Pre-Visit Management",
          "Customer Service Management",
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Communities",
          "Walk-Up Experience",
          "Engagement Messenger",
          "Universal Request",
          "Universal Request Pro",
          "DevOps",
          "DevOps Insights",
          "Outsourced Customer Service Management",
          "Proactive Customer Service Operations",
          "Continual Improvement Management",
          "Service Owner Workspace",
          "Vendor Manager Workspace",
          "DevOps Change Velocity",
          "Digital Portfolio Management",
          "Mobile Publishing",
          "Performance Analytics",
          "Predictive Intelligence",
          "Virtual Agent",
          "Portal Visits (per Fulfiller User, per month) 2,000",
          "App Engine Starter 100 Custom Tables",
        ]
      }
    ],
    type: "Application Suite"
  }, {
    name: "Impact Advanced",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-impact-advanced.pdf",
    dated: "2022-10-01",
    type: "Services"
  }, {
    name: "Impact Advanced Public Sector",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-impact-advanced-public-sector-us.pdf",
    dated: "2022-10-01",
    type: "Services"
  }, {
    name: "Impact Base",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-impact-base.pdf",
    dated: "2022-01-17",
    type: "Services"
  }, {
    name: "Impact Guided",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-impact-guided.pdf",
    dated: "2022-10-01",
    type: "Services"
  }, {
    name: "Impact Guided Public Sector",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-impact-guided-public-sector-us.pdf",
    dated: "2022-10-01",
    type: "Services"
  }, {
    name: "Impact Total",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-impact-total.pdf",
    dated: "2022-10-01",
    type: "Services"
  }, {
    name: "Impact Total Public Sector",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-impact-total-public-sector-us.pdf",
    dated: "2022-10-01",
    type: "Services"
  }, {
    name: "Integrated Risk Management (IRM)",
    source: ["https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD03393.pdf",
      "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-integrated-risk-management.pdf"],


    dated: "2023-02-02",
    subscriptionMeters: [
      "IRM Operator",
      "IRM Lite Operator",
      "Unrestricted User",
      "Vendor"
    ],
    versions: [{
      name: "Policy and Compliance Management",
      packaging: [
        "Policy and Compliance Management",
        "App Engine 5 Custom Tables",
        "Add-on Vendor Risk Management",
      ]
    }, {
      name: "IRM Standard",
      packaging: [
        "Policy and Compliance Management",
        "Risk Management",
        "Audit Management ",
        "Regulatory Change Management",
        "Use Case Accelerators",
        "Performance Analytics",
        "App Engine 5 Custom Tables",
        "Add-on Vendor Risk Management",
        "Add-on IRM Lite Operator"]
    }, {
      name: "IRM Professional",
      packaging: [
        "Policy and Compliance Management",
        "Risk Management",
        "Audit Management ",
        "Regulatory Change Management",
        "Use Case Accelerators",
        "Advanced Risk Management *limited",
        "Advanced Audit Management",
        "GRC: Metrics",
        "Performance Analytics",
        "Predictive Intelligence",
        "Virtual Agent",
        "App Engine 5 Custom Tables",
        "Add-on Vendor Risk Management",
        "Add-on IRM Lite Operator"]
    }, {
      name: "IRM Enterprise",
      packaging: [
        "Policy and Compliance Management",
        "Risk Management",
        "Audit Management ",
        "Regulatory Change Management",
        "Use Case Accelerators",
        "Advanced Risk Management",
        "Advanced Audit Management",
        "GRC: Metrics",
        "Performance Analytics",
        "Predictive Intelligence",
        "Virtual Agent",
        "App Engine 5 Custom Tables",
        "Add-on Vendor Risk Management",
        "Add-on IRM Lite Operator"]
    }],
    type: "Application Suite"
  }, {
    name: "Integration Hub",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-integrationhub.pdf",
    dated: "2022-09-06",
    subscriptionMeters: [
      "IntegrationHub Transaction",
    ],
    versions: [
      {
        name: "IntegrationHub Starter",
        packaging: [
          "IntegrationHub Transactions 500,000",
          "Spokes",
          "Protocols",
          "Add-on 1M Transactions",
          "Add-on 10M Transactions",
          "Add-on 50M Transactions",
          "Add-on 100M Transactions"
        ]
      }, {
        name: "IntegrationHub Professional",
        packaging: [
          "IntegrationHub Transactions 2,000,000",
          "Spokes",
          "Protocols",
          "Orchestration",
          "Activity Designer",
          "Activity Packs",
          "Add-on 1M Transactions",
          "Add-on 10M Transactions",
          "Add-on 50M Transactions",
          "Add-on 100M Transactions"
        ]
      }, {
        name: "IntegrationHub Enterprise",
        packaging: [
          "IntegrationHub Transactions 5,000,000",
          "Spokes",
          "Protocols",
          "Orchestration",
          "Activity Designer",
          "Activity Packs",
          "Password Reset",
          "Client Software Distribution",
          "Add-on 1M Transactions",
          "Add-on 10M Transactions",
          "Add-on 50M Transactions",
          "Add-on 100M Transactions"
        ]
      },
    ],
    type: "Application Suite"
  }, {
    name: "IT Business Maanagement PROD02224",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD02224.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "Requester User",
      "Worker User"
    ],
    versions: [
      {
        name: "IT Business Maanagement PROD02224",
        packaging: [
          "Demand Management",
          "Resource Management",
          "Project Portfolio Management",
          "Agile Development (Software Development Lifecycle)",
          "Release Management",
          "Scaled Agile Framework (SAFe)",
          "Test Management",
          "Financial Charging",
        ],
      }
    ],
    type: "Application"
  }, {
    name: "IT Business Maanagement PROD02226",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD02226.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "Fulfiller User",
    ],
    versions: [
      {
        name: "IT Business Maanagement PROD02226",
        packaging: [
          "Demand Management",
          "Resource Management",
          "Project Portfolio Management",
          "Scaled Agile Framework",
          "Agile Development (Software Development Lifecycle)",
          "Release Management",
          "Test Management",
          "Financial Planning",
          "Financial Modeling",
          "Application Portfolio Management",
          "Innovation Management",
          "Financial Charging",
        ],
      }
    ],
    type: "Application"
  }, {
    name: "IT Business Maanagement PROD02225",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD02225.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "Fulfiller User",
    ],
    versions: [
      {
        name: "IT Business Maanagement PROD02225",
        packaging: [
          "Demand Management",
          "Resource Management",
          "Project Portfolio Management",
          "Scaled Agile Framework",
          "Agile Development (Software Development Lifecycle)",
          "Release Management",
          "Test Management",
          "Financial Planning",
          "Financial Modeling",
          "Innovation Management",
          "Financial Charging",]
      }
    ],
    type: "Application"
  }, {
    name: "IT Business Maanagement Planner",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD11377.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "Fulfiller User",
    ],
    versions: [
      {
        name: "ITBM Planner",
        packaging: [
          "Demand Management",
          "Resource Management",
          "Project Portfolio Management",
          "Scaled Agile Framework",
          "Agile Development",
          "Release Management",
          "Test Management",
          "Financial Planning",
          "Application Portfolio Management",
          "Financial Charging",
          "Financial Modeling",
          "Innovation Management",
          "Performance Analytics",
        ]
      },
    ],
    type: "Application"
  }, {
    name: "IT Business Maanagement (ITBM)",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-it-business-management.pdf",
    dated: "2021-08-16",
    subscriptionMeters: [
      "ITBM User",
      "Unrestricted User",
    ],
    versions: [
      {
        name: "IT Business Maanagement Standard",
        packaging: [
          "Project Portfolio Management",
          "Demand Management",
          "Resource Management",
          "Financial Planning",
          "Innovation Management",
          "Alightment Planner Workspace",
          "Performance Analytics",
          "App Engine 5 Custom Tables"
        ]
      },
      {
        name: "IT Business Maanagement Professional",
        packaging: [
          "Project Portfolio Management",
          "Demand Management",
          "Resource Management",
          "Financial Planning",
          "Innovation Management",
          "Alightment Planner Workspace",
          "Performance Analytics",
          "Agile Development",
          "Scaled Agile Framework",
          "Test Management",
          "Release Management",
          "Investment Funding",
          "Predictive Intelligence",
          "Virtual Agent",
          "App Engine 5 Custom Tables"
        ]
      }
    ],
    type: "Application"
  }, {
    name: "IT Operations Management (ITOM)",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-it-operations-management.pdf",
    dated: "2022-11-03",
    subscriptionMeters: ["Subscription Unit"],
    versions: [
      {
        name: "IT Operations Management Professional",
        packaging: [
          "ITOM Visibility",
          "ITOM Health",
          "Performance Analytics",
          "Predictive Intelligence",
          "Spokes and Protocols",
          "App Engine 5 Custom Tables",
          "Add-on MetricBase Series",
          "Add-on Health Log Analytics",
        ]
      },
      {
        name: "IT Operations Management AI Ops Enterprise",
        packaging: [
          "ITOM Visibility",
          "ITOM Health",
          "Health Log Analytics",
          "ITOM Governance",
          "Performance Analytics",
          "Predictive Intelligence",
          "Spokes and Protocols",
          "App Engine 5 Custom Tables",
          "Add-on MetricBase Series",
        ]
      }
    ],
    type: "Application"
  }, {
    name: "IT Operations Management (ITOM) sn-it-operations-management-20221103 ",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-it-operations-management.pdf",
    dated: "2022-11-03",
    subscriptionMeters: ["Subscription Unit"],
    versions: [
      {
        name: "IT Operations Management Standard",
        packaging: [
          "ITOM Visibility",
          "App Engine 5 Custom Tables",
          "Add-on ITOM Health",
          "Add-on ITOM Optimization",
        ],
      },
      {
        name: "IT Operations Management Professional",
        packaging: [
          "ITOM Visibility",
          "ITOM Health",
          "Performance Analytics",
          "Predictive Intelligence",
          "Spokes and Protocols",
          "App Engine 5 Custom Tables",
          "Add-on MetricBase Series",
          "Add-on Health Log Analytics",
        ]
      },
      {
        name: "IT Operations Management Enterprise",
        packaging: [
          "ITOM Visibility",
          "ITOM Health",
          "ITOM Optimization",
          "Performance Analytics",
          "Predictive Intelligence",
          "App Engine 5 Custom Tables",
          "Add-on MetricBase Series",
        ]
      }, {
        name: "IT Operations Management AI Ops Enterprise",
        packaging: [
          "ITOM Visibility",
          "ITOM Health",
          "Health Log Analytics",
          "ITOM Governance",
          "Performance Analytics",
          "Predictive Intelligence",
          "Spokes and Protocols",
          "App Engine 5 Custom Tables",
          "Add-on MetricBase Series",
        ]
      }, {
        name: "IT Operations Management Predictive AI Ops",
        packaging: [
          "ITOM Health",
          "Health Log Analytics",
          "Add-on MetricBase Series",
          "Add-on ITOM Visibility",
          "Add-on Optimization",
        ]
      }
    ],
    type: "Application"
  }, {
    name: "IT Service Management (ITSM)",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-it-service-management.pdf",
    dated: "2022-10-13",
    subscriptionMeters: [
      "Fulfiller User",
      "Unrestricted User",
    ],
    versions: [
      {
        name: "IT Service Management Standard",
        packaging: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Walk-Up Experience",
          "Digital Portfolio Management",
          "Universal Request",
          "App Engine 25 Custom Tables",
          "Add-on App Engine for ITSM",
          "Add-on Performance Analytics for ITSM",
        ]
      }, {
        name: "IT Service Management Professional",
        packaging: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Walk-Up Experience",
          "Digital Portfolio Management",
          "Universal Request",
          "Universal Request Pro",
          "Continual Improvement Management",
          "DevOps Change Velocity",
          "Performance Analytics",
          "Predictive Intelligence",
          "Virtual Agent",
          "Vendor Manager Workspace",
          "Mobile Publishing",
          "Financial Modeling",
          "DevOps Config",
          "App Engine 50 Custom Tables",
          "Add-on App Engine for ITSM",
          "Add-on Virtual Agent",
          "Add-on Workforce Optimization",
          "Add-on Process Optimization",
        ],
      }, {
        name: "IT Service Management Enterprise",
        packaging: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Walk-Up Experience",
          "Digital Portfolio Management",
          "Universal Request",
          "Universal Request Pro",
          "Continual Improvement Management",
          "DevOps Change Velocity",
          "Performance Analytics",
          "Predictive Intelligence",
          "Virtual Agent",
          "Vendor Manager Workspace",
          "Mobile Publishing",
          "Financial Modeling",
          "DevOps Config",
          "Workforce Optimization",
          "Process Optimization",
          "App Engine 50 Custom Tables",
          "Add-on App Engine for ITSM",
          "Add-on Virtual Agent",
        ],
      },
    ],
    type: "Application Suite"
  }, {
    name: "IT Service Management Professional",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD09216.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "Fulfiller User",
      "Unrestricted User",
    ],
    versions: [
      {
        name: "IT Service Management Professional",
        packaging: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Asset Management",
          "Request Management",
          "Cost Management",
          "Walk-Up Experienc",
          "Continual Improvement Management",
          "DevOps Config",
          "Digital Portfolio Management",
          "Service Owner Workspace",
          "Financial Modeling",
          "Vendor Manager Workspace",
          "DevOps Change Velocity",
          "Mobile Publishing",
          "Universal Request Pro",
          "Predictive Intelligence",
          "Virtual Agent",
          "Performance Analytics"
        ]
      }
    ],
    type: "Application Suite"
  }, {
    name: "ITOM Enterprise",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD03389.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "ITOM Enterprise Node",
      "Discovery Node",
      "Event Node",
      "OI Node",
      "MetricBase Series",
      "OI MetricBase Series",
      "Cloud Management Node",
      "Service Mapping Node",
      "Orchestration Transaction",
    ],
    versions: [
      {
        name: "ITOM Enterprise",
        packaging: [
          "Discovery",
          "Event Management",
          "Operational Intelligence",
          "Cloud Management",
          "Service Mapping",
          "Integration Hub",
          "Orchestration applications",
        ]
      }
    ],
    type: "Application Suite"
  }, {
    name: "Learning Credit",
    source: "https://www.servicenow.com/content/dam/servicenow/other-documents/schedules/learning-credits.pdf",
    dated: "2021-10-31",
    type: "Add-on"
  }, {
    name: "Legal Service Delivery",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-legal-service-delivery.pdf",
    dated: "2022-10-13",
    subscriptionMeters: [
      "Fulfiller User",
      "Unrestricted User",
    ],
    versions: [
      {
        name: "Legal Service Delivery",
        packaging: [
          "Legal Request Management",
          "Legal Matter Management",
          "Predictive Intelligence",
          "Performance Analytics",
          "Virtual Agent",
          "App Engine 5 Custom Tables",
        ]
      }
    ],
    type: "Application"
  }, {
    name: "Non-Production Instance",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-non-production-instance-e03222022.pdf",
    dated: "2023-02-02",
    type: "Add-on"
  }, {
    name: "Operation Technology",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-operational-technology.pdf",
    dated: "2023-02-03",
    subscriptionMeters: ["Subscription Unit"],
    versions: [
      {
        name: "Operation Technology Foundation",
        packaging: [
          "Operation Technology Manager",
          "App Engine 5 Custom Tables",
        ],
      }, {
        name: "Operation Technology Visibility",
        packaging: [
          "Operation Technology Manager",
          "Discovery",
          "Manufacturing Process Manager",
          "ITOM Visibility",
          "App Engine 5 Custom Tables",
        ],
      }
    ],
    type: "Application"
  }, {
    name: "Orchestration Core Transaction Pack (1000 Transactions)",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD03421.pdf",
    dated: "2023-02-02",
    type: "Add-on"
  }, {
    name: "Order Management for Telecommunications",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-order-management-for-telecommunications.pdf",
    dated: "2023-02-03",
    subscriptionMeters: [],
    versions: [
      {
        name: "Order Management - Transaction Pack",
        packaging: [
          "Order Management",
          "Order Management for Telecom, Media & Tech"
        ]
      }
    ],
    type: "Application"
  }, {
    name: "Performance Analytics Enterprise",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-performance-analytics-enterprise.pdf",
    dated: "2023-02-03",
    type: "Application"
  }, {
    name: "Performance Analytics for Platform Runtime",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD01626.pdf",
    dated: "2023-02-02",
    type: "Application"
  }, {
    name: "Production Instance",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-production-instance-e03222022.pdf",
    dated: "2023-02-02",
    type: "Add-on"
  }, {
    name: "Professional Success",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-professional-success.pdf",
    dated: "2022-10-04",
    type: "Services"
  }, {
    name: "Professional Support Account Management",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD09869.pdf",
    dated: "2023-02-02",
    type: "Servics"
  }, {
    name: "Safe Workplace",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-safe-workplace-service-delivery.pdf",
    dated: "2021-08-16",
    subscriptionMeters: [
      "Safe Workplace User",
    ],
    versions: [
      {
        name: "Safe Workplace Standard",
        packaging: [
          "Employee Readiness Surveys",
          "Employee Health Screening",
          "Workplace PPE Inventory Management",
          "Workplace Safety Management",
          "Contact Tracing",
          "Employee Travel Safety",
          "Health and Safely Testing",
          "Vaccination Status",
          "Performance Analytics",
          "App Engine 5 Custom Tables"
        ]
      },
      {
        name: "Safe Workplace Professional",
        packaging: [
          "Employee Readiness Surveys",
          "Employee Health Screening",
          "Workplace PPE Inventory Management",
          "Workplace Safety Management",
          "Contact Tracing",
          "Employee Travel Safety",
          "Health and Safely Testing",
          "Vaccination Status",
          "Workplace Reservation",
          "Workplace Space Mapping",
          "Workplace Visitor Management",
          "Predictive Intelligence",
          "Virtual Agent",
          "Performance Analytics",
          "App Engine 5 Custom Tables"
        ]
      },
    ],
    type: "Application"
  }, {
    name: "Software Asset Management",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/PROD11472.pdf",
    dated: "2023-02-02",
    subscriptionMeters: [
      "Computer",
    ],
    versions: [{
      name: "Software Asset Management",
      packaging: [
        "Software Asset Management",
        "Performance Analytics",
        "Client Software Distribution",
      ]
    }],
    type: "Application"
  }, {
    name: "Software Asset Management (SAM)",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-software-asset-management.pdf",
    dated: "2023-02-02",
    subscriptionMeters: ["Subscription Unit"],
    versions: [
      {
        name: "Software Asset Manager Professional",
        packaging: [
          "Software Asset Management",
          "Software Spend Detection",
          "Client Software Distribution",
          "Predictive Intelligence",
          "Performance Analytics",
          "App Engine 5 Custom Tables",
          "Add-on Cloud Insights (Migration Only)"
        ]
      },
      {
        name: "Software Asset Manager Enterprise",
        packaging: [
          "Software Asset Management",
          "Software Spend Detection",
          "Client Software Distribution",
          "ML Normalization",
          "Cloud Insights",
          "Predictive Intelligence",
          "Performance Analytics",
          "App Engine 5 Custom Tables"
        ]
      },
    ],
    type: "Application"
  }, {
    name: "Strategic Portfolio Management",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-strategic-portfolio-management.pdf",
    dated: "2022-10-13",
    subscriptionMeters: [
      "SPM User",
      "Unrestricted User"
    ],
    versions: [
      {
        name: "SPM Standard",
        packaging: [
          "Project Portfolio Managment",
          "Demand Management",
          "Resource Management",
          "Release Management",
          "Financial Management",
          "Digital Portfolio Management",
          "Innovation Management",
          "Alignment Planner Workspace",
          "Performance Analytics",
          "App Engine 5 Custom Tables",

        ]
      },
      {
        name: "SPM Professional",
        packaging: [
          "Project Portfolio Managment",
          "Demand Management",
          "Resource Management",
          "Release Management",
          "Financial Management",
          "Digital Portfolio Management",
          "Innovation Management",
          "Alignment Planner Workspace",
          "Performance Analytics",
          "Agile Development",
          "Scaled Agile Framework",
          "Test Management",
          "Investment Funding",
          "Predictive Intelligence",
          "Virtual Agent",
          "App Engine 5 Custom Tables",
        ]
      }
    ],
    type: "Application"
  }, {
    name: "Telecommunications Service Management",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/archive/sn-telecommunications-services-management-20210212.pdf",
    dated: "2021-08-16",
    subscriptionMeters: ["Fulfiller User", "Portal Visit"],
    versions: [
      {
        name: "TSM Standard",
        packaging: [
          "Telecommunications Service Management Applications and Data Model",
          "e-bonding for Telecommunications",
          "Customer Service Management",
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Communities",
          "Walk-Up Experience",
          "Engagement Messenger",
          "Universal Request",
          "Portal Visits (per Fulfiller User, per month) 1,000",
          "App Engine 25 Custom Tables"
        ]
      },
      {
        name: "TSM Professional",
        packaging: [
          "Telecommunications Service Management Applications and Data Model",
          "e-bonding for Telecommunications",
          "Customer Service Management",
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Release Management",
          "Cost Management",
          "Asset Management",
          "Request Management",
          "Communities",
          "Walk-Up Experience",
          "Engagement Messenger",
          "Universal Request",
          "Universal Request Pro",
          "Outsourced Customer Service Management",
          "Proactive Customer Service Operations",
          "Continual Improvement Management",
          "Service Owner Workspace",
          "Vendor Manager Workspace",
          "Mobile Publishing",
          "Performance Analytics",
          "Predictive Intelligence",
          "Virtual Agent",
          "Portal Visits (per Fulfiller User, per month) 2,000",
          "App Engine 100 Custom Tables"
        ]
      },
    ],
    type: "Application Suite"
  }, {
    name: "Time Card User",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-timecard-management.pdf",
    dated: "2021-08-16",
    subscriptionMeters: ["Time Card User"],
    versions: [{
      name: "Time Card User",
      packaging: [
        "Time Card Management",
        "Performance Analytics",
      ]
    }],
    type: "Other"
  }, {
    name: "Workplace Service Delivery",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-workplace-service-delivery.pdf",
    dated: "2022-11-03",
    subscriptionMeters: ["Workplace User", "Unrestricted User"],
    versions: [{
      name: "Workplace Service Delivery",
      packaging: [
        "Workplace Case Management",
        "Workplace Central",
        "Workplace Space Mapping",
        "Workplace Indoor Mapping",
        "Workplace Space Management",
        "Workplace Reservation",
        "Workplace Safety Management",
        "Workplace Visitor Management",
        "Employee Readiness Surveys",
        "Employee Health Screening",
        "Workplace PPE Inventory Management",
        "Contact Tracing",
        "Employee Travel Safety",
        "Health and Safety Testing",
        "Vaccination Status",
        "Virtual Agent",
        "Predictive Intelligence",
        "Performance Analytics",
        "App Engine 5 Custom Table",
      ]
    }],
    type: "Application Suite"
  },
  {
    name: "Grandfathered Custom Tables",
    source: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/entitlements/sn-grandfathered-custom-tables.pdf",
    dated: "2022-10-13",
    subscriptionMeters: ["Grandfathered Custom Table"],
    versions: [{
      name: "Grandfathered Custom Tables",
      packaging: [
        "Custom Tables",
      ]
    }],
    type: "Other"
  }

]
export let subscriptionMeters = [
  {name: "Fulfiller User",             definition: "Fulfiller User is any User that may perform a function beyond that entitled within a Business Stakeholder User or Requester User.",},
  {name: "BCM Operator",               definition: "BCM Operator is defined as any User who contributes to, or is part of, any BCM application workflow or process in any way. A BCM Operator may perform any or all functions within the BCM Applications.",},
  {name: "BCM Lite Operator",          definition: "BCM Lite Operator is defined as any User that can perform one or more of: respond to Business Impact Analyses (BIA) and update Status of Recovery Task records, approve BIA, Business Continuity Plans (BCP), Exercises, Crisis Events, update Recovery Task Status and Emergency Notification Template records, and read any data (based on the corresponding Operator SKU).",},
  {name: "Unrestricted User",          definition: "Unrestricted User is defined as every User that is assigned a unique username and has a user profile in the Subscription Service designated as “active”.",},
  {name: "IntegrationHub Transaction", definition: "Integration Hub Transaction is defined as is defined as any outbound call originating from Integration Hub, FlowDesigner, Remote Tables and/or Orchestration. This includes any operation, action, orchestration from Integration Hub, Remote Tables or Orchestration resulting in an outbound call.",},
  {name: "Unattended Robot",           definition: "Unattended Robot is defined as a form of business process automation that allows the execution of workflows without human supervision through the development and management capabilities offeredby Automation Engine. Unattended Robotentitlements are consumed when a robotof type “Unattended” is assigned to a Virtual Machinein the RPA Hub Application.",},
  {name: "Attended Robot",             definition: "Attended Robot is defined as a form of business process automation that allows the execution of workflows as a directresultof a humanaction and underhuman supervision. Attended Robotentitlements are consumedwhen a robotof type “Attended” is assigned to a user in the RPA Hub application.",},
  {name: "Document Intelligence Page", definition: "Document Intelligence Page is defined as a section of a document that ends with a page break. Documents with more than one page are counted as multiple pages, rounded to the next integer.",},
  {name: "AI Search Document",         definition: "A Document is any item with a unique identifying field associated to it.",},
  {name: "Business Stakeholder User",  definition: "Business Stakeholder User A Business Stakeholder User may approve requests by email that are routed to User or via the Subscription Service and view all records within the Subscription Products to which the Customer is subscribed."},
  {name: "Portal Visit",               definition: "A Visit is a period of activity on the Customer Portal, including a Community visit. A new Visit is generated if an anonymous, unauthenticated, or External Requester User accesses, logs out, times out, or a Visit lasts beyond midnight in the Data Center Region indicated above.",},
  {name: "Conversation",               definition: "A Virtual Agent Conversation Transaction is defined as any structured conversation between a chatbot and user on a pre-built or custom topic. Additional monthly Virtual Agent Conversation Transactions require the purchase of Virtual Agent Transaction Pack(s).",},
  {name: "Device",                     definition: "A Device is an active IP device or interface that is monitored or scanned as part of Customer’s corporate security infrastructure for which ServiceNow may receive and process security events.",},
  {name: "Nodes",                      definition: "A Node is any physical or virtual server that is: (i) discovered by the Discovery Application; and (ii) assigned as a CI by Configuration Management (CMDB).", },
  {name: "Subscription Unit",          definition: "“Subscription Unit” is a unit of measure applied to Managed IT Resources using Defined Ratios. A list of Managed IT Resources and Defined Ratios for a Subscription Unit are set forth in the ServiceNow Subscription Unit Overview Hardware Asset Management (HAM) on www.servicenow.com/upgrade-schedules.html and ARE EXPRESSLY DEEMED INCORPORATED HEREIN BY THIS REFERENCE. Customer may request printed copies of the documents incorporated herein by reference by emailing us at legal.request@servicenow.com.",},
  {name: "IRM Operator",               definition: "IRM Operator is defined as any User who contributes to, or is part of, an IRM application workflow or process in any way, including the receipt of an attestation or assessment request. An IRM Operator may perform any or all functions within the IRM Applications."},
  {name: "IRM Lite Operator",          definition: "IRM Lite Operator is defined as any User that can perform one or more of: respond to policy acknowledgments, control attestations, evidence requests, issue owners (issues assigned to a User), remediation tasks, create/report issues, risk events (applicable to customers with IRM Enterprise product subscription only), create policy exception request records, and read any data (based on the corresponding Operator SKU)."}, { name: "Vendor", definition: "Vendor is any Customer vendor for which any assessment activity has been created within last 12 months."}, { name: "SPM User", definition: "SPM User is defined as any User with the right to access one or more of the SPM Applications above and may perform any or all functions within the SPM Applications. "},
  {name: "HR User",                    definition: "HR User is defined as any active User in the ServiceNow HR Profile table that is within their employment start and end date, including full-time employees, part-time employees, contractors, and contingent workers. Customer may grant applicants and alumni that are outside of their employment start and end date the right to access HR Applications as Users and these Users do not require an HR User subscription."},
  {name: "ITOM Enterprise Node",       definition: "An ITOM Enterprise Node includes the number of Discovery, Event Management, Operational Intelligence, Cloud Management and Service Mapping Nodes as described below"},
  {name: "Discovery Node",             definition: "A Discovery Node is any physical or virtual server that is: (i) discovered by the Discovery application; and (ii) assigned as a CI by Configuration Management (CMDB).", links: [{title: "How Discovery Node Licenses consumed are calculated", url: "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0723691"},{title: "ITOM Licensing FAQ", url: "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB1000863"}]},
  {name: "Event Node",                 definition: "An Event Node is a physical or virtual server for which events can be reported on (directly or indirectly) to the Event Management application"},
  {name: "OI Node",                    definition: "An OI Node is a physical or virtual server for which the series data can be reported to the OI application."},
  {name: "MetricBase Series",          definition: "A MetricBase Series is a single data point indexed in a time order and monitored and stored in accordance with a defined retention policy.An OI MetricBase Series is monitored and stored for 13 months under the following retention policy: 1 minute increments for 8 days then 10 minute increments for 94 days then 1 hour increments for 13 months."},
  {name: "OI MetricBase Series",       definition: "An OI MetricBase Series is for use only in the Operational Intelligence Application"},
  {name: "Cloud Management Node",      definition: "A Cloud Management Node is a public or private virtual server provisioned and/or managed by the Cloud Management application"},
  {name: "Service Mapping Node",       definition: "A Service Mapping Node is any physical or virtual server CI that is mapped by Service Mapping in the CMDB"},
  {name: "Orchestration Transaction",  definition: "An Orchestration Transaction is any external call from workflow using Orchestration. Usage is measured monthly in production instance(s), based on the maximum Transactions in a given 12 month period. Additional monthly Orchestration Transactions require Customer purchase Orchestration Core Transaction Packs."},
  {name: "ITBM User",                  definition: "ITBM User is defined as any User with the right to access one or more of the ITBM Applications above and may perform any or all functions within the ITBM Applications. "}
]
/**
 * Run this on page https://www.servicenow.com/products-by-category.html in console to get list.
 * var count = 0;
var products = [];
const linkListBlocks = document.querySelectorAll('.linkList .link-list-block');

// Iterate over each link list block
linkListBlocks.forEach(linkListBlock => {
  // Get all the links inside the current link list block
  const links = linkListBlock.querySelectorAll('a');

  // Iterate over each link
  links.forEach(link => {
    // Get the href value and inner text of the link
    const href = link.getAttribute('href');
    const innerText = link.innerText;
count++;
    // Log the href value and inner text to the console
    console.log(href, innerText);

    products.push({url: `https://www.servicenow.com${href}`, name: innerText.trim()})
  });
});
console.log({products})
 */
export let products = [
  {
      "url": "https://www.servicenow.com/products/admin-center.html",
      "name": "Admin Center"
  },
  {
      "url": "https://www.servicenow.com/products/agent-client-collector.html",
      "name": "Agent Client Collector"
  },
  {
      "url": "https://www.servicenow.com/products/agent-workspace.html",
      "name": "Agent Workspace"
  },
  {
      "url": "https://www.servicenow.com/products/agile-development.html",
      "name": "Agile Development"
  },
  {
      "url": "https://www.servicenow.com/products/ai-search.html",
      "name": "AI Search"
  },
  {
      "url": "https://www.servicenow.com/products/strategic-planning.html",
      "name": "Alignment Planner Workspace"
  },
  {
      "url": "https://www.servicenow.com/products/antivirus.html",
      "name": "Antivirus Scanning"
  },
  {
      "url": "https://www.servicenow.com/products/api-integrations.html",
      "name": "APIs and Integration Tools"
  },
  {
      "url": "https://www.servicenow.com/products/now-platform-app-engine.html",
      "name": "App Engine"
  },
  {
      "url": "https://www.servicenow.com/products/app-engine-studio.html",
      "name": "App Engine Studio"
  },
  {
      "url": "https://www.servicenow.com/products/application-portfolio-management.html",
      "name": "Application Portfolio Management"
  },
  {
      "url": "https://www.servicenow.com/products/asset-management.html",
      "name": "Asset Management"
  },
  {
      "url": "https://www.servicenow.com/products/audit-management.html",
      "name": "Audit Management"
  },
  {
      "url": "https://www.servicenow.com/products/automated-test-framework.html",
      "name": "Automated Test Framework"
  },
  {
      "url": "https://www.servicenow.com/products/automation-center.html",
      "name": "Automation Center"
  },
  {
      "url": "https://www.servicenow.com/products/automation-discovery.html",
      "name": "Automation Discovery"
  },
  {
      "url": "https://www.servicenow.com/products/automation-engine.html",
      "name": "Automation Engine"
  },
  {
      "url": "https://www.servicenow.com/products/benchmarks/itsm.html",
      "name": "Benchmarks"
  },
  {
      "url": "https://www.servicenow.com/products/business-continuity-management.html",
      "name": "Business Continuity Management"
  },
  {
      "url": "https://www.servicenow.com/products/capacity-management.html",
      "name": "Capacity and Reservations Management"
  },
  {
      "url": "https://www.servicenow.com/products/hr-case-management.html",
      "name": "Case and Knowledge Management"
  },
  {
      "url": "https://www.servicenow.com/products/certificate-management.html",
      "name": "Certificate Management"
  },
  {
      "url": "https://www.servicenow.com/products/change-management.html",
      "name": "Change Management"
  },
  {
      "url": "https://www.servicenow.com/products/cloud-encryption.html",
      "name": "Cloud Encryption"
  },
  {
      "url": "https://www.servicenow.com/products/cloud-insights.html",
      "name": "Cloud Insights"
  },
  {
      "url": "https://www.servicenow.com/products/cloud-management.html",
      "name": "Cloud Management"
  },
  {
      "url": "https://www.servicenow.com/products/column-level-encryption.html",
      "name": "Column Level Encryption Enterprise"
  },
  {
      "url": "https://www.servicenow.com/products/communities.html",
      "name": "Communities"
  },
  {
      "url": "https://www.servicenow.com/products/servicenow-platform/configuration-management-database.html",
      "name": "Configuration Management Database (CMDB)"
  },
  {
      "url": "https://www.servicenow.com/products/continual-improvement.html",
      "name": "Continual Improvement Management"
  },
  {
      "url": "https://www.servicenow.com/products/continuous-authorization-monitoring.html",
      "name": "Continuous Authorization and Monitoring"
  },
  {
      "url": "https://www.servicenow.com/products/customer-service-management.html",
      "name": "Customer Service Management"
  },
  {
      "url": "https://www.servicenow.com/products/delegated-development.html",
      "name": "Delegated Development"
  },
  {
      "url": "https://www.servicenow.com/products/demand-management.html",
      "name": "Demand Management"
  },
  {
      "url": "https://www.servicenow.com/products/devops.html",
      "name": "DevOps"
  },
  {
      "url": "https://www.servicenow.com/products/agile-team-planning.html",
      "name": "DevOps Agile Team Planning"
  },
  {
      "url": "https://www.servicenow.com/products/devops-change-acceleration.html",
      "name": "DevOps Change Velocity"
  },
  {
      "url": "https://www.servicenow.com/products/devops-configuration.html",
      "name": "DevOps Config"
  },
  {
      "url": "https://www.servicenow.com/products/devops-insights.html",
      "name": "DevOps Insights"
  },
  {
      "url": "https://www.servicenow.com/products/digital-portfolio-management.html",
      "name": "Digital Portfolio Management"
  },
  {
      "url": "https://www.servicenow.com/products/discovery.html",
      "name": "Discovery"
  },
  {
      "url": "https://www.servicenow.com/products/dispatcher-workspace.html",
      "name": "Dispatcher Workspace"
  },
  {
      "url": "https://www.servicenow.com/products/dynamic-scheduling.html",
      "name": "Dynamic Scheduling"
  },
  {
      "url": "https://www.servicenow.com/products/dynamic-translation.html",
      "name": "Dynamic Translation"
  },
  {
      "url": "https://www.servicenow.com/products/edge-encryption.html",
      "name": "Edge Encryption"
  },
  {
      "url": "https://www.servicenow.com/products/employee-center.html",
      "name": "Employee Center"
  },
  {
      "url": "https://www.servicenow.com/products/hr-doc-management.html",
      "name": "Employee Document Management"
  },
  {
      "url": "https://www.servicenow.com/products/employee-journey.html",
      "name": "Employee Journey Management"
  },
  {
      "url": "https://www.servicenow.com/products/engineering-license-manager.html",
      "name": "Engineering License Manager"
  },
  {
      "url": "https://www.servicenow.com/products/enterprise-asset-management.html",
      "name": "Enterprise Asset Management"
  },
  {
      "url": "https://www.servicenow.com/products/employee-onboarding.html",
      "name": "Enterprise Onboarding and Transitions"
  },
  {
      "url": "https://www.servicenow.com/products/event-management.html",
      "name": "Event Management"
  },
  {
      "url": "https://www.servicenow.com/products/field-service-contractor-management.html",
      "name": "Field Service Contractor Management"
  },
  {
      "url": "https://www.servicenow.com/products/field-service-operations.html",
      "name": "Field Service Crew Operations"
  },
  {
      "url": "https://www.servicenow.com/products/field-service-management.html",
      "name": "Field Service Management"
  },
  {
      "url": "https://www.servicenow.com/products/field-service-scheduling.html",
      "name": "Field Service Multi-Day Task Scheduling"
  },
  {
      "url": "https://www.servicenow.com/products/financial-services-operations.html",
      "name": "Financial Services Operations"
  },
  {
      "url": "https://www.servicenow.com/products/firewall-audit-reporting.html",
      "name": "Firewall Audits and Reporting"
  },
  {
      "url": "https://www.servicenow.com/products/platform-flow-designer.html",
      "name": "Flow Designer"
  },
  {
      "url": "https://www.servicenow.com/products/itom-governance.html",
      "name": "Governance"
  },
  {
      "url": "https://www.servicenow.com/products/governance-risk-and-compliance.html",
      "name": "Governance, Risk, and Compliance"
  },
  {
      "url": "https://www.servicenow.com/products/guided-app-creator.html",
      "name": "Guided App Creator"
  },
  {
      "url": "https://www.servicenow.com/products/guided-tour-designer.html",
      "name": "Guided Tour Designer"
  },
  {
      "url": "https://www.servicenow.com/products/hardware-asset-management.html",
      "name": "Hardware Asset Management"
  },
  {
      "url": "https://www.servicenow.com/products/health-safety.html",
      "name": "Health and Safety"
  },
  {
      "url": "https://www.servicenow.com/products/health-log-analytics.html",
      "name": "Health Log Analytics"
  },
  {
      "url": "https://www.servicenow.com/products/healthcare-life-sciences.html",
      "name": "Healthcare and Life Sciences Service Management"
  },
  {
      "url": "https://www.servicenow.com/products/hr-service-delivery.html",
      "name": "HR Service Delivery"
  },
  {
      "url": "https://www.servicenow.com/products/incident-management.html",
      "name": "Incident Management"
  },
  {
      "url": "https://www.servicenow.com/products/innovation-management.html",
      "name": "Innovation Management"
  },
  {
      "url": "https://www.servicenow.com/products/instance-security-center.html",
      "name": "Instance Security Center"
  },
  {
      "url": "https://www.servicenow.com/products/integration-hub.html",
      "name": "Integration Hub"
  },
  {
      "url": "https://www.servicenow.com/products/inventory-management.html",
      "name": "Inventory Management"
  },
  {
      "url": "https://www.servicenow.com/products/it-asset-management.html",
      "name": "IT Asset Management"
  },
  {
      "url": "https://www.servicenow.com/products/it-operations-management.html",
      "name": "IT Operations Management"
  },
  {
      "url": "https://www.servicenow.com/products/itsm.html",
      "name": "IT Service Management"
  },
  {
      "url": "https://www.servicenow.com/products/knowledge-management.html",
      "name": "Knowledge Management"
  },
  {
      "url": "https://www.servicenow.com/products/legal-service-delivery.html",
      "name": "Legal Service Delivery"
  },
  {
      "url": "https://www.servicenow.com/products/manufacturing-connected-workforce.html",
      "name": "Manufacturing Connected Workforce"
  },
  {
      "url": "https://www.servicenow.com/products/metricbase.html",
      "name": "MetricBase"
  },
  {
      "url": "https://www.servicenow.com/products/metric-intelligence.html",
      "name": "Metric Intelligence"
  },
  {
      "url": "https://www.servicenow.com/products/mobile-agent.html",
      "name": "Mobile Agent"
  },
  {
      "url": "https://www.servicenow.com/products/mobile-studio.html",
      "name": "Mobile App Builder"
  },
  {
      "url": "https://www.servicenow.com/products/now-mobile.html",
      "name": "Now Mobile"
  },
  {
      "url": "https://www.servicenow.com/now-platform.html",
      "name": "Now Platform"
  },
  {
      "url": "https://www.servicenow.com/products/operational-resilience.html",
      "name": "Operational Resilience Management"
  },
  {
      "url": "https://www.servicenow.com/products/operational-risk-management.html",
      "name": "Operational Risk Management"
  },
  {
      "url": "https://www.servicenow.com/products/operational-technology-management.html",
      "name": "Operational Technology Management"
  },
  {
      "url": "https://www.servicenow.com/products/orchestration.html",
      "name": "Orchestration"
  },
  {
      "url": "https://www.servicenow.com/products/order-management.html",
      "name": "Order Management"
  },
  {
      "url": "https://www.servicenow.com/products/order-management-tech-providers.html",
      "name": "Order Management for Technology Providers"
  },
  {
      "url": "https://www.servicenow.com/products/telecom-order-management.html",
      "name": "Order Management for Telecommunications"
  },
  {
      "url": "https://www.servicenow.com/products/performance-analytics.html",
      "name": "Performance Analytics"
  },
  {
      "url": "https://www.servicenow.com/products/hr-performance-analytics.html",
      "name": "Performance Analytics for HR Service Delivery"
  },
  {
      "url": "https://www.servicenow.com/products/policy-compliance-management.html",
      "name": "Policy and Compliance Management"
  },
  {
      "url": "https://www.servicenow.com/products/predictive-aiops.html",
      "name": "Predictive AIOps"
  },
  {
      "url": "https://www.servicenow.com/products/predictive-intelligence.html",
      "name": "Predictive Intelligence"
  },
  {
      "url": "https://www.servicenow.com/products/privacy-management.html",
      "name": "Privacy Management"
  },
  {
      "url": "https://www.servicenow.com/products/problem-management.html",
      "name": "Problem Management"
  },
  {
      "url": "https://www.servicenow.com/products/process-automation-designer.html",
      "name": "Process Automation Designer"
  },
  {
      "url": "https://www.servicenow.com/products/process-optimization.html",
      "name": "Process Optimization"
  },
  {
      "url": "https://www.servicenow.com/products/procurement-management.html",
      "name": "Procurement Case Management"
  },
  {
      "url": "https://www.servicenow.com/products/procurement-service-management.html",
      "name": "Procurement Service Management"
  },
  {
      "url": "https://www.servicenow.com/products/project-portfolio-management.html",
      "name": "Project Portfolio Management"
  },
  {
      "url": "https://www.servicenow.com/products/public-sector-digital-services.html",
      "name": "Public Sector Digital Services"
  },
  {
      "url": "https://www.servicenow.com/products/regulatory-change-management.html",
      "name": "Regulatory Change Management"
  },
  {
      "url": "https://www.servicenow.com/products/reporting.html",
      "name": "Reporting"
  },
  {
      "url": "https://www.servicenow.com/products/request-management.html",
      "name": "Request Management"
  },
  {
      "url": "https://www.servicenow.com/products/resource-management.html",
      "name": "Resource Management"
  },
  {
      "url": "https://www.servicenow.com/products/risk-management.html",
      "name": "Risk Management"
  },
  {
      "url": "https://www.servicenow.com/products/robotic-process-automation.html",
      "name": "RPA Hub"
  },
  {
      "url": "https://www.servicenow.com/products/saas-license-management.html",
      "name": "SaaS License Management"
  },
  {
      "url": "https://www.servicenow.com/products/scaled-agile-framework.html",
      "name": "Scaled Agile Framework (SAFe)"
  },
  {
      "url": "https://www.servicenow.com/products/scenario-planning.html",
      "name": "Scenario Planning"
  },
  {
      "url": "https://www.servicenow.com/products/schedule-optimization.html",
      "name": "Schedule Optimization"
  },
  {
      "url": "https://www.servicenow.com/products/security-incident-response.html",
      "name": "Security Incident Response"
  },
  {
      "url": "https://www.servicenow.com/products/security-operations.html",
      "name": "Security Operations (SecOps)"
  },
  {
      "url": "https://www.servicenow.com/products/service-bridge.html",
      "name": "Service Bridge"
  },
  {
      "url": "https://www.servicenow.com/products/it-service-automation-applications/service-catalog.html",
      "name": "Service Catalog"
  },
  {
      "url": "https://www.servicenow.com/products/servicenow-platform/service-creator.html",
      "name": "Service Creator"
  },
  {
      "url": "https://www.servicenow.com/products/service-graph-connectors.html",
      "name": "Service Graph Connectors"
  },
  {
      "url": "https://www.servicenow.com/products/service-level-management.html",
      "name": "Service Level Management"
  },
  {
      "url": "https://www.servicenow.com/products/service-mapping.html",
      "name": "Service Mapping"
  },
  {
      "url": "https://www.servicenow.com/products/service-owner-workspace.html",
      "name": "Service Owner Workspace"
  },
  {
      "url": "https://www.servicenow.com/products/service-portal.html",
      "name": "Service Portal"
  },
  {
      "url": "https://www.servicenow.com/products/platform-encryption.html",
      "name": "ServiceNow Platform Encryption"
  },
  {
      "url": "https://www.servicenow.com/products/vault.html",
      "name": "ServiceNow Vault"
  },
  {
      "url": "https://www.servicenow.com/products/shoppinghub.html",
      "name": "ShoppingHub"
  },
  {
      "url": "https://www.servicenow.com/products/site-reliability-operations.html",
      "name": "Site Reliability Operations"
  },
  {
      "url": "https://www.servicenow.com/products/software-asset-management.html",
      "name": "Software Asset Management"
  },
  {
      "url": "https://www.servicenow.com/products/ci-cd.html",
      "name": "Source Control and CI/CD"
  },
  {
      "url": "https://www.servicenow.com/products/procurement-service-management.html",
      "name": "Sourcing and Procurement Operations"
  },
  {
      "url": "https://www.servicenow.com/products/strategic-planning.html",
      "name": "Strategic Planning"
  },
  {
      "url": "https://www.servicenow.com/products/strategic-portfolio-management.html",
      "name": "Strategic Portfolio Management"
  },
  {
      "url": "https://www.servicenow.com/products/studio.html",
      "name": "Studio IDE"
  },
  {
      "url": "https://www.servicenow.com/products/subscription-management.html",
      "name": "Subscription Management"
  },
  {
      "url": "https://www.servicenow.com/products/supplier-lifecycle-management.html",
      "name": "Supplier Lifecycle Operations"
  },
  {
      "url": "https://www.servicenow.com/products/it-survey-assessment.html",
      "name": "Surveys and Assessments"
  },
  {
      "url": "https://www.servicenow.com/products/task-intelligence.html",
      "name": "Task Intelligence"
  },
  {
      "url": "https://www.servicenow.com/products/technology-provider-service-management.html",
      "name": "Technology Provider Service Management"
  },
  {
      "url": "https://www.servicenow.com/products/telecom-network-inventory.html",
      "name": "Telecommunications Network Inventory"
  },
  {
      "url": "https://www.servicenow.com/products/telecommunications-service-operations.html",
      "name": "Telecommunications Service Operations Management"
  },
  {
      "url": "https://www.servicenow.com/products/telecommunications-service-management.html",
      "name": "Telecommunications Service Management"
  },
  {
      "url": "https://www.servicenow.com/products/ui-builder.html",
      "name": "UI Builder"
  },
  {
      "url": "https://www.servicenow.com/products/vendor-manager-workspace.html",
      "name": "Vendor Management Workspace"
  },
  {
      "url": "https://www.servicenow.com/products/vendor-risk-management.html",
      "name": "Vendor Risk Management"
  },
  {
      "url": "https://www.servicenow.com/products/virtual-agent.html",
      "name": "Virtual Agent"
  },
  {
      "url": "https://www.servicenow.com/products/servicenow-platform/visual-task-boards.html",
      "name": "Visual Task Boards"
  },
  {
      "url": "https://www.servicenow.com/products/it-service-desk.html",
      "name": "Walk-Up Experience"
  },
  {
      "url": "https://www.servicenow.com/products/workforce-optimization.html",
      "name": "Workforce Optimization"
  },
  {
      "url": "https://www.servicenow.com/products/workplace-maintenance-management.html",
      "name": "Workplace Maintenance Management"
  },
  {
      "url": "https://www.servicenow.com/products/workplace-service-delivery.html",
      "name": "Workplace Service Delivery"
  },
  {
      "url": "https://www.servicenow.com/products/space-management.html",
      "name": "Workplace Space Management"
  }
]
