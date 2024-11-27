export default {
    openapi: "3.0.0",
    info: {
        title: "Experience API",
        version: "1.0.0",
        description: "API for managing experiences",
    },
    paths: {
        "/experiences": {
            post: {
                tags: ["Experience"],
                summary: "Add a new experience",
                description: "Adds a new experience to the database. Validates input fields and handles errors.",
                operationId: "addExperience",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "Name of the experience.",
                                    },
                                    description: {
                                        type: "string",
                                        description: "Description of the experience.",
                                    },
                                    original_price: {
                                        type: "number",
                                        format: "float",
                                        description: "Original price of the experience.",
                                    },
                                    actual_price: {
                                        type: "number",
                                        format: "float",
                                        description: "Actual price of the experience.",
                                    },
                                    duration: {
                                        type: "string",
                                        description: "Duration of the experience in HH:MM format.",
                                    },
                                    star_rating: {
                                        type: "number",
                                        format: "float",
                                        description: "Star rating of the experience.",
                                    },
                                    destination_id: {
                                        type: "integer",
                                        description: "ID of the destination.",
                                    },
                                    location_id: {
                                        type: "integer",
                                        description: "ID of the location.",
                                    },
                                    activity_provider_id: {
                                        type: "integer",
                                        description: "ID of the activity provider.",
                                    },
                                    min_age: {
                                        type: "integer",
                                        description: "Minimum age required for the experience.",
                                    },
                                    max_age: {
                                        type: "integer",
                                        description: "Maximum age allowed for the experience.",
                                    },
                                },
                                required: [
                                    "name",
                                    "description",
                                    "original_price",
                                    "actual_price",
                                    "duration",
                                    "star_rating",
                                    "destination_id",
                                    "location_id",
                                    "activity_provider_id",
                                    "min_age",
                                    "max_age",
                                ],
                                example: {
                                    name: "Beach Adventure",
                                    description: "A thrilling beach adventure with surfing and sand activities.",
                                    original_price: 100.0,
                                    actual_price: 80.0,
                                    duration: "02:00",
                                    star_rating: 4.5,
                                    destination_id: 1,
                                    location_id: 2,
                                    activity_provider_id: 3,
                                    min_age: 12,
                                    max_age: 60,
                                },
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Experience created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Experience created successfully",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '400': {
                        description: "Bad request due to validation errors",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        error: {
                                            type: "string",
                                            description: "Error message describing what went wrong.",
                                        },
                                        example: {
                                            error: "duration needs to be a valid time",
                                            // error: "destination id provided is not a number",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '500': {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        error: {
                                            type: "string",
                                            description: "Error message describing the server issue.",
                                        },
                                    },
                                },
                            },
                        },
                    },
                }
            },
            get: {
                tags: ["Experience"],
                description: "Get all experiences",
                operationId: "listExperiences",
                parameters: [
                    {
                        in: "query",
                        name: "ItemsPerPage",
                        required: false,
                        schema: { type: "integer" },
                        example: 20,
                        description: "Number of items per page",
                    },
                    {
                        in: "query",
                        name: "Page",
                        required: false,
                        schema: { type: "integer" },
                        example: 1,
                        description: "Page number for pagination",
                    },
                ],
                responses: {
                    200: {
                        description: "A list of experiences",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer" },
                                            name: { type: "string" },
                                            description: { type: "string" },
                                            original_price: { type: "number", format: "float" },
                                            actual_price: { type: "number", format: "float" },
                                            duration: { type: "integer" },
                                            star_rating: { type: "number", format: "float" },
                                            destination_id: { type: "integer" },
                                            location_id: { type: "integer" },
                                            activity_provider_id: { type: "integer" },
                                            min_age: { type: "integer" },
                                            max_age: { type: "integer" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Error retrieving experiences",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/errorresponse" },
                            },
                        },
                    },
                },
            },
        },
        "/experiences/{id}": {
            get: {
                tags: ["Experience"],
                description: "Get an experience by ID",
                operationId: "getExperienceById",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID of the experience to retrieve",
                    },
                ],
                responses: {
                    200: {
                        description: "Experience details",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer" },
                                        name: { type: "string" },
                                        description: { type: "string" },
                                        original_price: { type: "number", format: "float" },
                                        actual_price: { type: "number", format: "float" },
                                        duration: { type: "integer" },
                                        star_rating: { type: "number", format: "float" },
                                        destination_id: { type: "integer" },
                                        location_id: { type: "integer" },
                                        activity_provider_id: { type: "integer" },
                                        min_age: { type: "integer" },
                                        max_age: { type: "integer" },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: "Experience not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/errorresponse" },
                            },
                        },
                    },
                    500: {
                        description: "Error retrieving experience",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/errorresponse" },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ["Experience"],
                description: "Update an experience by ID",
                operationId: "updateExperienceById",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID of the experience to update",
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    description: { type: "string" },
                                    original_price: { type: "number", format: "float" },
                                    actual_price: { type: "number", format: "float" },
                                    duration: { type: "integer" },
                                    star_rating: { type: "number", format: "float" },
                                    destination_id: { type: "integer" },
                                    location_id: { type: "integer" },
                                    min_age: { type: "integer" },
                                    max_age: { type: "integer" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Experience updated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer" },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: "Experience not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/errorresponse" },
                            },
                        },
                    },
                    500: {
                        description: "Error updating experience",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/errorresponse" },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ["Experience"],
                description: "Delete an experience by ID",
                operationId: "deleteExperienceById",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID of the experience to delete",
                    },
                ],
                responses: {
                    200: {
                        description: "Experience deleted successfully",
                    },
                    404: {
                        description: "Experience not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/errorresponse" },
                            },
                        },
                    },
                    500: {
                        description: "Error deleting experience",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/errorresponse" },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            errorresponse: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    code: { type: "integer" },
                },
            },
        },
    },
};
