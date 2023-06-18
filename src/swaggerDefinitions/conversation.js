const conversation = {
    "/v1/conversation": {
        post: {
            tags: ["conversation"],
            description: "Add new conversation",
            operationId: "create conversation",
            requestBody: {
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Conversation", // todo input data model
                        },
                    },
                },
            },
            parameters: [],
            responses: {
                200: {
                    description: "Post successfully",
                },
                404: {
                    description: "Not found",
                },
                500: {
                    description: "Server error",
                },
            },
        }
    },
    "/v1/conversation/{id}?name={name}": {
        get: {
            tags: ["conversation"],
            description: "search conversation by userid and name ",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/id",
                    },
                    required: true,
                    description: "search conversation by userid and name ",
                },
                {
                    name: "name",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/name",
                    },
                    required: true,
                    description: "search conversation by userid and name ",
                }
            ],
            responses: {
                200: {
                    description: "Get successfully",
                },
                404: {
                    description: "Not found",
                },
                500: {
                    description: "Server error",
                },
            },

        }
    },
    "/v1/conversation/{id}": {
        get: {
            tags: ["conversation"],
            description: "Get conversation by user id ",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/id",
                    },
                    required: true,
                    description: "User ID",
                },
            ],
            responses: {
                200: {
                    description: "Get successfully",
                },
                404: {
                    description: "Not found",
                },
                500: {
                    description: "Server error",
                },
            },
        },
        put: {
            tags: ["conversation"],
            description: "Update conversation by Conversation id.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/id",
                    },
                    required: true,
                    description: "Conversation ID",
                },
            ],
            requestBody: {
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Conversation", // todo input data model
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Updated successfully",
                },
                404: {
                    description: "Not found",
                },
                500: {
                    description: "Server error",
                },
            },
        },
        delete: {
            tags: ["conversation"],
            description: "Delete conversation by Partner id.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/id",
                    },
                    required: true,
                    description: "Conversation ID",
                },
            ],
            responses: {
                200: {
                    description: "Delete successfully",
                },
                404: {
                    description: "Not found",
                },
                500: {
                    description: "Server error",
                },
            },
        }
    }
}

module.exports = conversation