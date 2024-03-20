

export const navs_options = [
    {
        title : "DashBoard",
        route :"/dashboard/fci"
    },
    {
        title : "Verify Farmer",
        route : "verify-farmer"
    },{
        title : "Verify Apmc Officer",
        route : "verify-apmc-officer",
    },
    {
        title : "Notifications",
        route : "notification"
    }
]

export const States = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];

export const mandisList = [
    {
        state : "Maharashtra",
        mandis : [
            {title : "APMC-1" , value : "APMC 1"},
            {title : "APMC-2" , value : "APMC 2"},
            {title : "APMC-3" , value : "APMC 3"},
            {title : "APMC-4" , value : "APMC 4"},
            {title : "APMC-5" , value : "APMC 5"},
            {title : "APMC-6" , value : "APMC 6"},
        ]
    }
]
  
export const Commodities = [
    {title : "rice" , value : "Rice"},
    {title : "wheat" , value : "Wheat"},
    {title : "tur" , value : "Tur"},
    {title : "soyabean" , value : "Soyabean"},
    {title : "chana" , value : "Chana"},
]

export const dashboardDetails = [
    {
      State: "Maharashtra",
      APMCS: "Pune",
      Commodity: "Onion",
      "Price": 25,
      CommodityTraded: 1000, // Amount traded in kilograms
      Unit: "Kg",
      Date: "2024-03-01"
    },
    {
      State: "Gujarat",
      APMCS: "Ahmedabad",
      Commodity: "Potato",
      "Price": 20,
      CommodityTraded: 800, // Amount traded in kilograms
      Unit: "Kg",
      Date: "2024-03-01"
    },
    {
      State: "Uttar Pradesh",
      APMCS: "Lucknow",
      Commodity: "Tomato",
      "Price": 30,
      CommodityTraded: 1200, // Amount traded in kilograms
      Unit: "Kg",
      Date: "2024-03-01"
    },
    {
      State: "Karnataka",
      APMCS: "Bangalore",
      Commodity: "Rice",
      "Price": 40,
      CommodityTraded: 1500, // Amount traded in kilograms
      Unit: "Kg",
      Date: "2024-03-01"
    },
    {
      State: "Punjab",
      APMCS: "Amritsar",
      Commodity: "Wheat",
      "Price": 35,
      CommodityTraded: 1100, // Amount traded in kilograms
      Unit: "Kg",
      Date: "2024-03-01"
    },
    {
      State: "Tamil Nadu",
      APMCS: "Chennai",
      Commodity: "Mango",
      "Price": 50,
      CommodityTraded: 2000, // Amount traded in kilograms
      Unit: "Kg",
      Date: "2024-03-01"
    }
  ];
  export const detailsHeader = [
    
    { Header: 'State', accessor: 'State' },
    { Header: 'APMCS', accessor: 'APMCS' },
    { Header: 'Commodity', accessor: 'Commodity' },
    { Header: 'CommodityTraded', accessor: 'CommodityTraded' },
    { Header: 'Price', accessor: 'Price' },
    { Header: 'Unit', accessor: 'Unit' },
    {Header : "Date" , accessor : 'Date'}
    ];  
  