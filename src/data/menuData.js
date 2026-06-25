export const menuData = [
  {
    "text": "Quick Access",
    "icon": "fas fa-bolt",
    "children": []
  },
  {
    "text": "IRD Audit",
    "icon": "fas fa-calendar-check",
    "children": [
      { "text": "Audit Trail Report", "href": "/Setup/Security/UserWiseLog" },
      { "text": "Login Log", "href": "/Setup/Security/LoginLog" },
      { "text": "Sales Materialized View", "href": "/Inventory/Reporting/SalesMaterializedView" },
      { "text": "Purchase Invoice Details", "href": "/Inventory/Reporting/PurchaseInvoiceDetails" },
      { "text": "Sales Invoice Details", "href": "/Inventory/Reporting/SalesInvoiceDetails" },
      { "text": "Sales Vat Register", "href": "/Account/Reporting/SalesVatRegister" },
      { "text": "Sales Return Vat Register", "href": "/Account/Reporting/SalesReturnVatRegister" },
      { "text": "Purchase Vat Register", "href": "/Account/Reporting/PurchaseVatRegister" },
      { "text": "Purchase Return Vat Register", "href": "/Account/Reporting/PurchaseReturnVatRegister" },
      { "text": "Excise Register", "href": "/Account/Reporting/ExciseRegister" },
      { "text": "Vat Summary", "href": "/Account/Reporting/VatSummary" },
      { "text": "Account Confirmation", "href": "/Account/Reporting/AccountConfirmationLetter" },
      { "text": "One Lakh Above Purchase", "href": "/Account/Reporting/OneLakhAbovePurchase" },
      { "text": "One Lakh Above Sales", "href": "/Account/Reporting/OneLakhAboveSales" },
      { "text": "TDS Summary", "href": "/Account/Reporting/TDSSummary" },
      { "text": "Stock Report", "href": "/Inventory/Reporting/StockSummaryIRD" },
      { "text": "Cancel Voucher", "href": "/Account/Reporting/CancelDayBook" },
      { "text": "IRD Setup", "href": "/Setup/Security/IRDDetails" }
    ]
  },
  {
    "text": "MIS Reports",
    "icon": "fas fa-tachometer-alt",
    "children": [
      { "text": "Sales Dashboard", "href": "/Dashboard/Inventory/SalesDashboard" },
      { "text": "Sales Metrices Dashboard", "href": "/Dashboard/Inventory/SalesMetricesDashboard" },
      { "text": "Ledger Analysis", "href": "/Account/Reporting/LedgerAnalysis" },
      { "text": "CostCenter Analysis", "href": "/Account/Reporting/CostCenterAnalysis" },
      { "text": "Delivery Analysis", "href": "/Inventory/Reporting/DeliveryAnalysis" },
      { "text": "Sales Analysis", "href": "/Inventory/Reporting/SalesAnalysis" },
      { "text": "ReceiptNote Analysis", "href": "/Inventory/Reporting/ReceiptNoteAnalysis" },
      { "text": "Purchase Analysis", "href": "/Inventory/Reporting/PurchaseAnalysis" },
      { "text": "Sales Order", "href": "/Inventory/Reporting/PendingSalesOrder" },
      { "text": "Delivery Note", "href": "/Inventory/Reporting/PendingDeliveryNote" },
      { "text": "Stock Demand", "href": "/Inventory/Reporting/PendingPartsDemand" },
      { "text": "Pending P.O. Summary", "href": "/Inventory/Reporting/PendingPOSummary" },
      { "text": "Credit Limit Expired Party", "href": "/Inventory/Reporting/CRLimitExpiredParty" },
      { "text": "Party Ageing", "href": "/Inventory/Reporting/PartyAgeing" },
      { "text": "CostCenter Ageing", "href": "/Inventory/Reporting/CostCenterAgeing" },
      { "text": "Party Dues Bill", "href": "/Account/Reporting/PartyWiseDuesBillList" },
      { "text": "Product Ageing", "href": "/Inventory/Reporting/ProductAgeing" }
    ]
  },
  {
    "text": "Accounting",
    "icon": "fas fa-file-invoice-dollar",
    "children": [
      {
        "text": "Creation",
        "href": "#",
        "children": [
          {
            "text": "Ledger",
            "href": "#",
            "children": [
              { "text": "Ledger Group", "href": "/Account/Creation/LedgerGroup" },
              { "text": "Ledger", "href": "/Account/Creation/Ledger" },
              { "text": "Ledger Credit", "href": "/Account/Creation/LedgerCredit" },
              { "text": "Ledger Channel", "href": "/Account/Creation/LedgerChannel" },
              { "text": "Ledger Category", "href": "/Account/Creation/LedgerCategory" },
              { "text": "Project", "href": "/Account/Creation/Project" },
              { "text": "Bank", "href": "/Account/Creation/Bank" },
              { "text": "Payment Terms", "href": "/Account/Creation/PaymentTerms" },
              { "text": "Payment Mode", "href": "/Account/Creation/PaymentMode" },
              { "text": "Department", "href": "/Account/Creation/Department" },
              { "text": "Price Type", "href": "/Account/Creation/Price" },
              { "text": "BillWise Ledger Opening", "href": "/Account/Creation/BillWiseLedgerOpening" }
            ]
          },
          { "text": "Salesman", "href": "/Account/Creation/SalesMan" },
          { "text": "Salesman Target", "href": "/Account/Creation/SalesManTarget" },
          { "text": "Customer Target", "href": "/Account/Creation/LedgerTarget" },
          { "text": "Area Master", "href": "/Account/Creation/AreaMaster" },
          { "text": "Currency", "href": "/Account/Creation/Currency" },
          {
            "text": "Sub Ledger",
            "href": "#",
            "children": [
              { "text": "Cost Category", "href": "/Account/Creation/CostCategory" },
              { "text": "CostCenter", "href": "/Account/Creation/CostCenter" },
              { "text": "Opening", "href": "/Account/Creation/CostCenterLedgerOpening" }
            ]
          },
          { "text": "Narration Master", "href": "/Account/Creation/NarrationMaster" },
          { "text": "Voucher Mode", "href": "/Account/Creation/VoucherMode" },
          {
            "text": "Security Deposit",
            "href": "#",
            "children": [
              { "text": "Bank Guarantee", "href": "/Account/Creation/BankGaurantee" },
              { "text": "LC Details", "href": "/Account/Creation/LCDetails" },
              { "text": "Open Dated Cheque", "href": "/Account/Creation/ODCDetails" },
              { "text": "Post Dated Cheque", "href": "/Account/Creation/PDCDetails" }
            ]
          }
        ]
      },
      {
        "text": "Transaction",
        "href": "#",
        "children": [
          { "text": "Receipt", "href": "/Account/Transaction/Receipt" },
          { "text": "Payment", "href": "/Account/Transaction/Payment" },
          { "text": "Contra", "href": "/Account/Transaction/Contra" },
          { "text": "Journal", "href": "/Account/Transaction/Journal" }
        ]
      },
      {
        "text": "Reporting",
        "href": "#",
        "children": [
          {
            "text": "Master List",
            "href": "#",
            "children": [
              { "text": "Ledger Group", "href": "/Account/Reporting/LedgerGroup" },
              { "text": "Ledger", "href": "/Account/Reporting/Ledger" },
              { "text": "Debtors/Creditors List", "href": "/Account/Reporting/LedgerContactList" },
              { "text": "Cost Category", "href": "/Account/Reporting/CostCategories" },
              { "text": "Cost Center", "href": "/Account/Reporting/CostCenter" },
              { "text": "Area Master", "href": "/Account/Reporting/Area" },
              { "text": "Salesman", "href": "/Account/Reporting/Salesman" },
              { "text": "Currency Master", "href": "/Account/Reporting/Currency" },
              { "text": "Voucher Master", "href": "/Account/Reporting/Voucher" },
              { "text": "Bank Guarantee", "href": "/Account/Reporting/BGDetails" },
              { "text": "Post-Dated Cheque", "href": "/Account/Reporting/PostDatedCheque" },
              { "text": "Open-Dated Cheque", "href": "/Account/Reporting/OpenDatedCheque" },
              { "text": "Ledger Opening", "href": "/Account/Reporting/LedgerOpening" },
              { "text": "Pending Customer For Approval", "href": "/Account/Creation/PendingCustomer" }
            ]
          },
          { "text": "Trial Balance", "href": "/Account/Reporting/TrialBalance" },
          { "text": "DayBook", "href": "/Account/Reporting/DayBook" },
          {
            "text": "Annual Report",
            "href": "#",
            "children": [
              { "text": "Income Expenditure", "href": "/Account/Reporting/IncomeExpenditure" },
              { "text": "Cash/Bank Book", "href": "/Account/Reporting/CashAndBankBook" },
              { "text": "Profit & Loss Account", "href": "/Account/Reporting/ProfitAndLoss" },
              { "text": "Balancesheet", "href": "/Account/Reporting/BalanceSheet" }
            ]
          },
          {
            "text": "Account Book",
            "href": "#",
            "children": [
              { "text": "Ledger Voucher", "href": "/Account/Reporting/ledgerVoucher" },
              { "text": "Multiple Ledger Voucher", "href": "/Account/Reporting/MulLedgerVoucher" },
              { "text": "CashBank Voucher", "href": "/Account/Reporting/CashBankLedgerVoucher" },
              { "text": "Ledger Daily Summary", "href": "/Account/Reporting/LedgerDaily" },
              { "text": "Bank Reconciliation", "href": "/Account/Reporting/BankReconciliation" }
            ]
          },
          {
            "text": "Outstandings Report",
            "href": "#",
            "children": [
              { "text": "Bills Receivable", "href": "/Account/Reporting/BillsReceivable" },
              { "text": "Bills Payable", "href": "/Account/Reporting/BillsPayable" }
            ]
          },
          {
            "text": "Audit Reports",
            "href": "#",
            "children": [
              { "text": "Purchase Vat Register", "href": "/Account/Reporting/PurchaseVatRegister" },
              { "text": "Sales Vat Register", "href": "/Account/Reporting/SalesVatRegister" },
              { "text": "Account Confirmation", "href": "/Account/Reporting/AccountConfirmationLetter" },
              { "text": "TDS/VAT Report", "href": "/Account/Reporting/TDSVat" }
            ]
          }
        ]
      }
    ]
  },
  {
    "text": "Inventory",
    "icon": "fas fa-truck-moving",
    "children": [
      {
        "text": "Creation",
        "href": "#",
        "children": [
          {
            "text": "Product",
            "href": "#",
            "children": [
              { "text": "Product Group", "href": "/Inventory/Creation/ProductGroup" },
              { "text": "Product Company", "href": "/Inventory/Creation/ProductCompany" },
              { "text": "Product Category", "href": "/Inventory/Creation/ProductCategories" },
              { "text": "Product Type", "href": "/Inventory/Creation/ProductType" },
              { "text": "Product Brand", "href": "/Inventory/Creation/ProductBrand" },
              { "text": "Product Unit", "href": "/Inventory/Creation/Unit" },
              { "text": "Product Master", "href": "/Inventory/Creation/Product" }
            ]
          },
          { "text": "Godown", "href": "/Inventory/Creation/Godown" },
          {
            "text": "Product Rate Setting",
            "href": "#",
            "children": [
              { "text": "Partywise Rate", "href": "/Inventory/Creation/PartyWiseProductRate" },
              { "text": "Sales Price List", "href": "/Inventory/Creation/SalesPrice" }
            ]
          }
        ]
      },
      {
        "text": "Transaction",
        "href": "#",
        "children": [
          {
            "text": "Purchase",
            "href": "#",
            "children": [
              { "text": "Material Request (Indent)", "href": "/Inventory/Transaction/Indent" },
              { "text": "Quotation", "href": "/Inventory/Transaction/PurchaseQuotation" },
              { "text": "Order", "href": "/Inventory/Transaction/PurchaseOrder" },
              { "text": "Receipt Note", "href": "/Inventory/Transaction/ReceiptNote" },
              { "text": "Purchase Invoice", "href": "/Inventory/Transaction/PurchaseInvoice" },
              { "text": "Purchase Return", "href": "/Inventory/Transaction/PurchaseReturn" },
              { "text": "Purchase Debit Note", "href": "/Inventory/Transaction/PurchaseDebitNote" }
            ]
          },
          {
            "text": "Sales",
            "href": "#",
            "children": [
              { "text": "Quotation", "href": "/Inventory/Transaction/SalesQuotation" },
              { "text": "Order", "href": "/Inventory/Transaction/SalesOrder" },
              { "text": "Delivery Note", "href": "/Inventory/Transaction/SalesDeliveryNote" },
              { "text": "Sales Invoice", "href": "/Inventory/Transaction/SalesInvoice" },
              { "text": "Sales Return", "href": "/Inventory/Transaction/SalesReturn" },
              { "text": "Sales Debit Note", "href": "/Inventory/Transaction/SalesDebitNote" },
              { "text": "Gate Pass", "href": "/Inventory/Transaction/GatePass" }
            ]
          },
          {
            "text": "Stock",
            "href": "#",
            "children": [
              { "text": "B.O.M.", "href": "/Inventory/Creation/BOM" },
              { "text": "Production Order", "href": "/Inventory/Transaction/ProductionOrder" },
              { "text": "Stock Journal", "href": "/Inventory/Transaction/StockJournal" },
              { "text": "Consumption", "href": "/Inventory/Transaction/Consumption" },
              { "text": "Stock Demand", "href": "/Inventory/Transaction/StockDemand" },
              { "text": "Stock Transfer", "href": "/Inventory/Transaction/StockTransfor" }
            ]
          }
        ]
      },
      {
        "text": "Reporting",
        "href": "#",
        "children": [
          {
            "text": "Master List",
            "href": "#",
            "children": [
              { "text": "Product Group", "href": "/Inventory/Reporting/ProductGroup" },
              { "text": "Product Categories", "href": "/Inventory/Reporting/ProductCategories" },
              { "text": "Product Master", "href": "/Inventory/Reporting/Product" },
              { "text": "Godown", "href": "/Inventory/Reporting/Godown" },
              { "text": "Product Rate List", "href": "/Inventory/Reporting/ProductRateList" },
              { "text": "Product Opening", "href": "/Inventory/Reporting/ProductOpening" }
            ]
          },
          {
            "text": "Purchase Book",
            "href": "#",
            "children": [
              { "text": "ProductWise Analysis", "href": "/Inventory/Reporting/PurchaseAnalysisProductWise" },
              { "text": "Pending Purchase Order", "href": "/Inventory/Reporting/PendingPurchaseOrder" },
              { "text": "Purchase Invoice Details", "href": "/Inventory/Reporting/PurchaseInvoiceDetails" }
            ]
          },
          {
            "text": "SalesBook",
            "href": "#",
            "children": [
              { "text": "ProductWise Analysis", "href": "/Inventory/Reporting/SalesAnalysisProductWise" },
              { "text": "Pending Sales Order", "href": "/Inventory/Reporting/PendingSalesOrder" }
            ]
          },
          { "text": "Product Wise Summary", "href": "/Inventory/Reporting/ProductMonthlySummary" },
          { "text": "Near Expiry", "href": "/Inventory/Reporting/NearExpiry" },
          { "text": "Stock Transfer Register", "href": "/Inventory/Reporting/StockTransfer" },
          { "text": "Stock Summary", "href": "/Inventory/Reporting/StockSummary" }
        ]
      }
    ]
  },
  {
    "text": "Repair & maintaince",
    "icon": "fas fa-tools",
    "children": [
      {
        "text": "Creation",
        "href": "#",
        "children": [
          { "text": "Device Type", "href": "/service/techtran/devicetype" },
          { "text": "Device Model", "href": "/service/techtran/devicemodel" },
          { "text": "Device Color", "href": "/service/techtran/devicecolor" },
          { "text": "Job Type", "href": "/Service/Creation/JobType" },
          { "text": "JobCard For", "href": "/Service/Creation/JobCardType" },
          { "text": "Service Type", "href": "/Service/Creation/JobServiceType" },
          { "text": "JobCard Type Mapping", "href": "/Service/Creation/JobTypeMapping" },
          { "text": "Service Members", "href": "/Service/Transaction/ServiceMembers" }
        ]
      },
      {
        "text": "Transaction",
        "href": "#",
        "children": [
          { "text": "Job Card", "href": "/service/techtran/jobcard" }
        ]
      },
      {
        "text": "Report",
        "href": "#",
        "children": [
          { "text": "JobCard List", "href": "/Service/Reporting/JobCardList" },
          { "text": "Service Reminder", "href": "/Service/Reporting/ServiceRemainder" },
          { "text": "Vehicle List", "href": "/Service/Reporting/VehicleList" },
          { "text": "Spare Parts", "href": "/Service/Reporting/ServiceSpareParts" },
          { "text": "JobCard Status", "href": "/Service/Reporting/JobCardStatus" }
        ]
      }
    ]
  },
  {
    "text": "Setup",
    "icon": "fas fa-user-cog",
    "children": [
      {
        "text": "Log Report",
        "href": "#",
        "children": [
          { "text": "UserWise Log", "href": "/Setup/Security/UserWiseLog" },
          { "text": "Web Api Log", "href": "/Setup/Security/WebApiLog" },
          { "text": "Sql Error Log", "href": "/Setup/Security/SqlErrorLog" },
          { "text": "IRD Api Log", "href": "/Setup/Security/IRDApiLog" },
          { "text": "Login Log", "href": "/Setup/Security/LoginLog" },
          { "text": "Notification Log", "href": "/Setup/Security/NotificationLog" },
          { "text": "Email Log", "href": "/Setup/Security/EmailLog" }
        ]
      },
      {
        "text": "New User/UserGroup",
        "href": "#",
        "children": [
          { "text": "User Group", "href": "/Setup/Security/UserGroup" },
          { "text": "User", "href": "/Setup/Security/NewUser" },
          { "text": "Users List", "href": "/Setup/Security/AllUser" },
          { "text": "Password Reset", "href": "/Setup/Security/ResetPassword" }
        ]
      },
      {
        "text": "Security",
        "href": "#",
        "children": [
          { "text": "IP Restrictions", "href": "/Setup/Security/IPRestrictions" },
          { "text": "Security Console", "href": "/Setup/Security/SecurityConsole" },
          { "text": "Allow Backdate Entry", "href": "/Setup/Security/AllowBackdateEntry" },
          { "text": "Allow Voucher", "href": "/Setup/Security/AllowVoucher" },
          { "text": "Branch", "href": "/Setup/Security/Branch" },
          { "text": "Allow Module", "href": "/Setup/Security/UserWiseModule" },
          { "text": "Copy User Security", "href": "/Setup/Security/CopyUserSecurity" }
        ]
      },
      {
        "text": "General Setup",
        "href": "#",
        "children": [
          { "text": "Company Detail", "href": "/Setup/Security/CompanyDetail" },
          { "text": "Year Closing", "href": "/Setup/Security/YearClosing" },
          { "text": "Document Type", "href": "/Setup/Security/DocumentType" },
          { "text": "Report Template", "href": "/Setup/Security/ReportTemplate" },
          { "text": "General Configuration", "href": "/Setup/Security/GeneralConfiguration" },
          { "text": "Email Setup", "href": "/Setup/Security/EmailSetup" },
          { "text": "IRD Setup", "href": "/Setup/Security/IRDDetails" },
          { "text": "Entity Properties", "href": "/Setup/Security/EntityProperties" },
          { "text": "Dynamic AI", "href": "/Setup/ReportWriter/DynamicAI" }
        ]
      },
      {
        "text": "Import Export",
        "href": "#",
        "children": [
          { "text": "JSON Format", "href": "/Setup/Security/ImportExportTran" },
          { "text": "Tally Format", "href": "/Setup/Security/TallyTran" },
          { "text": "Excel Format", "href": "/Setup/Security/ImportData" }
        ]
      }
    ]
  },
  {
    "text": "Expenses",
    "icon": "fas fa-money-bill-alt",
    "children": [
      { "text": "Travel Mode", "href": "/HR/Expenses/TravelMode" },
      { "text": "Expense Claim", "href": "/HR/Expenses/ExpenseClaim" },
      { "text": "Expense Detail", "href": "/HR/Expenses/ExpenseDetail" },
      { "text": "Monthly Expense Summary", "href": "/HR/Expenses/MonthlyExpenseSummary" }
    ]
  },
  {
    "text": "Assets Management",
    "icon": "fas fa-file-invoice-dollar",
    "children": [
      {
        "text": "Master Data",
        "href": "#",
        "children": [
          { "text": "Assets Group", "href": "/AssetsManagement/Creation/AssetGroup" },
          { "text": "Assets Type", "href": "/AssetsManagement/Creation/AssetType" },
          { "text": "Assets Model", "href": "/AssetsManagement/Creation/AssetModel" },
          { "text": "Assets Master", "href": "/AssetsManagement/Creation/AssetsMaster" },
          { "text": "Assets Opening", "href": "/AssetsManagement/Creation/AssetOpening" }
        ]
      },
      {
        "text": "Assets Information",
        "href": "#",
        "children": [
          { "text": "Assets Inward", "href": "/AssetsManagement/Creation/AssetsInward" },
          { "text": "Assets Transfer", "href": "/AssetsManagement/Creation/AssetTransfer" },
          { "text": "Assets Request", "href": "/AssetsManagement/Creation/AssetRequest" },
          { "text": "Assets Issue", "href": "/AssetsManagement/Creation/AssetIssue" },
          { "text": "Assets Return", "href": "/AssetsManagement/Creation/AssetsReturn" },
          { "text": "Assets Damage", "href": "/AssetsManagement/Creation/AssetsDamage" }
        ]
      },
      {
        "text": "Assets Report",
        "href": "#",
        "children": [
          { "text": "Vendor Wise Assets", "href": "/AssetsManagement/Reporting/VendorWiseAsset" },
          { "text": "Request Status", "href": "/AssetsManagement/Reporting/RequestStatus" },
          { "text": "Assets Issue Status", "href": "/AssetsManagement/Reporting/AssetIssueStatus" },
          { "text": "Assets Stock Report", "href": "/AssetsManagement/Reporting/AssetStockReport" },
          { "text": "Assets Use Details", "href": "/AssetsManagement/Reporting/AssetsUseDetails" },
          { "text": "Employee Wise Assets Details", "href": "/AssetsManagement/Reporting/EmployeeWiseAssetsDetails" }
        ]
      }
    ]
  },
  {
    "text": "Task",
    "icon": "fas fa-tasks",
    "children": [
      { "text": "Task Type", "href": "/Task/Creation/TaskType" },
      { "text": "Assign Task", "href": "/Task/Creation/CreateTask" },
      { "text": "Task List", "href": "/Task/Creation/ViewTask" },
      { "text": "Monthly Summary", "href": "/Task/Creation/MonthlyTask" }
    ]
  },
  {
    "text": "Support",
    "icon": "fas fa-life-ring",
    "children": [
      { "text": "Dashboard", "href": "/Support/Creation/SupportDashboard" },
      { "text": "Support Executive", "href": "/Support/Creation/SupportExecutive" },
      { "text": "Create Ticket", "href": "/Support/Creation/CreateTicket" }
    ]
  }
];