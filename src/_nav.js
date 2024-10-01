export const customNav1 = {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Settings',
      url: '/base',
      icon: 'icon-drop',
      children: [
        {
          name: 'Transaction Settings',
          url: '/transactionsettings',
          icon: 'icon-puzzle',
        },
        {
          name: 'Settings List',
          url: '/settingslist',
          icon: 'icon-puzzle',
        }
      ],
    },
    {
      name: 'Masters',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Users',
          url: '/listusers',
          icon: 'icon-puzzle',
        },

        {
          name: 'Bank',
          url: '/listbanks',
          icon: 'icon-puzzle',
        },
        {
          name: 'Dairy',
          url: '/dairymaster',
          icon: 'icon-puzzle',
        },
        {
         name: 'Society',
         url: '/listsociety',
         icon: 'icon-puzzle',
       },
       {
         name: 'Center',
         url: '/listcenter',
         icon: 'icon-puzzle',
       },
       {
         name: 'Farmer',
         url: '/listfarmers',
         icon: 'icon-puzzle',
       },
       {
         name: 'Rate Chart',
         url: '/listratechart',

         icon:'icon-puzzle'
       },
       {
         name: 'Deduction type master',
         url: '/deductionlist',
         icon: 'icon-puzzle',
       },

        // {
        //   name: 'Device',
        //   url: '/listdevice',
        //   icon: 'icon-puzzle',
        // },
        {
          name: 'Supplier',
          url: '/listsupplier',
          icon: 'icon-puzzle',
        },
        {
          name: 'Product',
          url: '/listproduct',
          icon: 'icon-puzzle',
        },
        {
          name: 'Unit',
          url: '/listunit',
          icon: 'icon-puzzle',
        },

      ],
    },

    {
      name: 'Transaction',
      url: '/base',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Collection Transaction',
          url: '/collectiontransaction',
          icon: 'icon-cursor',
        },
        {
          name: 'Deduction Transaction',
          url: '/deductiontransaction',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Product Sale/Purchase',
      url: '/base',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Stock Inventory',
          url: '/stockinventory',
          icon: 'icon-cursor',
        },
        // {
        //   name: 'Requisition Stock Allowcation',
        //   url: '/purchaserequisition',
        //   icon: 'icon-cursor',
        // },
        {
          name: 'Purchase Requisition',
          url: '/purchaserequisition',
          icon: 'icon-cursor',
        },
      ],
    },

    {
      name: 'Billing',
      url: '/base',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Billing Transaction',
          url: '/billingmaster',
          icon: 'icon-cursor',
        }
      ],
    },

    {
      name: 'Reports',
      url: '/base',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Shift End Summary Report',
          url: '/shiftreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Member Passbook',
          url: '/memberreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Deduction Report',
          url: '/deductionreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Collection Report',
          url: '/base',
          icon: 'icon-cursor',
          children: [
            {
              name: 'Collection',
              url: '/collectionreport',
              icon: 'icon-cursor',
            },
            {
              name: 'Collection History Report',
              url: '/collectionhistoryreport',
              icon: 'icon-cursor',
            },
            {
              name: 'Cattle Wise Collection Report',
              url: '/collectionhistoryreport',
              icon: 'icon-cursor',
            },            
          ]
        },
        {
          name: 'No of Days Milk Supplied',
          url: '/daysreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Society Report',
          url: '/societyreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Cattle Wise Report',
          url: '/cattlewisereport',
          icon: 'icon-cursor',
        },
        {
          name: 'Truck Sheet Report',
          url: '/trucksheetreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Product Purchase Report',
          url: '/productpurchasereport',
          icon: 'icon-cursor',
        },
        {
          name: 'Product Sale Report',
          url: '/productsalereport',
          icon: 'icon-cursor',
        },
        {
          name: 'Producer Bill Report',
          url: '/producerbillreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Pending Bill Report',
          url: '/pendingbillreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Graph Report',
          url: '/graphreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Annual Report',
          url: '/annualreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Analytical Report',
          url: '/analyticalreport',
          icon: 'icon-cursor',
        },
        {
          name: 'Conversion Report',
          url: '/conversionreport',
          icon: 'icon-cursor',
        },

        {
          name: 'Stock Report',
          url: '/stockreport',
          icon: 'icon-cursor',
        },
      ]
     
    },
  ],
}


export const customNav2 = {
  items: [
    {
      name: 'Settings',
      url: '/superdashboard',
      icon: 'icon-star',
    },
  ]
};