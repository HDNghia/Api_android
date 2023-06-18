const swaggerJSDoc = require('swagger-jsdoc');
const conver = require('./src/swaggerDefinitions/conversation')
const courses = require('./src/swaggerDefinitions/courses')
const foods = require('./src/swaggerDefinitions/foods')
const groups = require('./src/swaggerDefinitions/groups')
const message = require('./src/swaggerDefinitions/message')
const post = require('./src/swaggerDefinitions/post')
const service = require('./src/swaggerDefinitions/serviceType')
const invoice = require('./src/swaggerDefinitions/invoice')
const user = require('./src/swaggerDefinitions/user')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: "Nodejs api project for mongoDB",
        version: '1.0.0'
    },
    servers: [
        {
            url: "http://localhost:3000/"
        }
    ],
    paths: {
        ...conver,
        ...courses,
        ...foods,
        ...groups,
        ...message,
        ...post,
        ...service,
        ...invoice,
        ...user
    },
    components: {
        schemas: {
            Invoice: {
                type: "object",
                properties: {
                    userId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 10,
                    },
                    tranQty: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    courseId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 0,
                    },
                    tranDate: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 0,
                    },
                    status: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 0,
                    },
                    tranContent: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    note: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    tranType: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 0,
                    },
                }
            },
            User: {
                type: "object",
                properties: {
                    firstname: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    lastname: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    birthday: {
                        type: "integer",
                        description: "",
                        format: "int64",
                        example: 1,
                    },
                    gender: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    email: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    phonenumber: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    address: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    age: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 18,
                    },
                    height: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 18,
                    },
                    weight: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 18,
                    },
                    workingLevel: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 18,
                    },
                    avt: {
                        type: "string",
                        description: "",
                        example: "https://chuvoiconabondon",
                    },
                    coverId: {
                        type: "string",
                        description: "",
                        example: "https://chuvoiconabondon",
                    },
                    role: {
                        type: "integer",
                        description: "",
                        format: "int64",
                        example: 1,
                    },
                    wallet: {
                        type: "integer",
                        description: "",
                        format: "int64",
                        example: 1,
                    },
                    bankAccount: {
                        type: "string",
                        description: "",
                        example: "1234567890",
                    },
                    bankName: {
                        type: "string",
                        description: "",
                        example: "Pham Phu Tuan",
                    },
                    description1: {
                        type: "string",
                        description: "",
                        example: "Pham Phu Tuan",
                    },
                    description2: {
                        type: "string",
                        description: "",
                        example: "Pham Phu Tuan",
                    },
                    description3: {
                        type: "string",
                        description: "",
                        example: "Pham Phu Tuan",
                    },
                    specialize: {
                        type: "string",
                        description: "",
                        example: "Pham Phu Tuan",
                    },
                }
            },
            Conversation: {
                type: "object",
                properties: {
                    userId: {
                        type: "integer",
                        description: "",
                        format: "int64",
                        example: 1,
                    },
                    partnerId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 2,
                    },
                    isGroupConver: {
                        type: "boolean",
                        description: "",
                        example: false,
                    },
                    isBlock: {
                        type: "boolean",
                        description: "",
                        example: false,
                    },
                    lastActive: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    nickname: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                },
            },
            GroupMember: {
                type: "object",
                properties: {
                    userId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    nickname: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    joinDate: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    role: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                },
            },
            Group: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "",
                        example: "Group 1",
                    },
                    avtId: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    description: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    createdDate: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    createdBy: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                },
            },
            Invoice: {
                type: "object",
                properties: {
                    userId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    tranQty: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 20000,
                    },
                    tranDate: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    status: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 0,
                    },
                    tranContent: {
                        type: "string",
                        description: "",
                        example: "",
                    },
                    note: {
                        type: "string",
                        description: "",
                        example: "",
                    },
                    tranType: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 0,
                    },
                },
            },
            Message: {
                type: "object",
                properties: {
                    conversationId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    senderId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    attachmentId: {
                        type: "string",
                        description: "",
                        example: "",
                    },
                    messageContent: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    sentDate: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    status: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                },
            },
            Course: {
                type: "object",
                properties: {
                    trainerId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    title: {
                        type: "string",
                        description: "",
                        example: "",
                    },
                    description: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    location: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    status: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    startDate: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    endDate: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    capacity: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    attachment: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    fee: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 20,
                    },
                    serviceTypeId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                },
            },
            CourseSchedule: {
                type: "object",
                properties: {
                    courseId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    note: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    fromDateTime: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    toDateTime: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                }
            },
            CourseUser: {
                type: "object",
                properties: {
                    courseId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    userId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    registerDateTime: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    status: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                }
            },
            ServiceType: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    description: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                }
            },
            Food: {
                type: "object",
                properties: {
                    attachment: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    ingredients: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    name: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    nutrition: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    recipe: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    kcal: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                }
            },
            FoodUser: {
                type: "object",
                properties: {
                    foodId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    userId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    useDatetime: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    session: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    }
                }
            },
            Post: {
                type: "object",
                properties: {
                    ownerId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    caption: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    attachmentId1: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    attachmentId2: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    createdDate: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    lastModifyDate: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1988310,
                    },
                }
            },
            PostReaction: {
                type: "object",
                properties: {
                    postId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    userId: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    typeReact: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1,
                    },
                    reactedDate: {
                        type: "integer",
                        format: "int64",
                        description: "",
                        example: 1683103370,
                    },
                    attachment: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    },
                    comment: {
                        type: "string",
                        description: "",
                        example: "Teo",
                    }
                }
            },
            id: {
                type: "integer",
                description: "",
                example: 1,
            },
            name: {
                type: "string",
                description: "",
                example: "nghia2",
            },
            session: {
                type: "string",
                description: "",
                example: "breakfast",
            }
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ["./src/index.js"]
}

const swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec 