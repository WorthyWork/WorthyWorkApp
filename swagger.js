const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'WorthyWork Web API',
      description: 'opendata-contest project used.',
    },
    host: 'localhost:5000',
    schemes: ['http'],
    tags: [
      {
        name: "Job",
        description: "職缺列表相關操作"
      },
      {
        name: "Illegal",
        description: "查詢違法勞動法令事業單位相關操作"
      },
      {
        name: "Company",
        description: "查詢公司資本資料"
      },
      {
        name: "Data",
        description: "資料蒐集/數據分析"
      }
    ]
  };

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
