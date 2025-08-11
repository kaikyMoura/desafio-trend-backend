import { ClientOptionsDto } from "@/application/dtos/client-options";
import { CreateClientDto } from "@/application/dtos/create-client.dto";
import { UpdateClientDto } from "@/application/dtos/update-client.dto";
import { NextFunction, Request, Response, Router } from "express";
import { clientController } from "../controllers/client.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the client
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: The name of the client
 *           example: "João Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the client
 *           example: "joao@example.com"
 *         cnpj:
 *           type: string
 *           description: The CNPJ of the client's company
 *           example: "12.345.678/0001-90"
 *         phone:
 *           type: string
 *           description: The phone number of the client
 *           example: "(11) 99999-9999"
 *         sector:
 *           type: string
 *           description: The sector of the client's company
 *           example: "Technology"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the client was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the client was last updated
 *     
 *     CreateClientRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           format: email
 *           example: "joao@example.com"
 *         cnpj:
 *           type: string
 *           example: "12.345.678/0001-90"
 *         phone:
 *           type: string
 *           example: "(11) 99999-9999"
 *         sector:
 *           type: string
 *           example: "Technology"
 *         cep:
 *           type: string
 *           example: "1234567890"
 *         address:
 *           type: string
 *           example: "Rua das Flores, 123"
 *         number:
 *           type: string
 *           example: "123"
 *         neighborhood:
 *           type: string
 *           example: "Bairro das Flores"
 *         city:
 *           type: string
 *           example: "São Paulo"
 *         state:
 *           type: string
 *           example: "SP"
 *         complement:
 *           type: string
 *           example: "Apto 101"
 *     
 *     UpdateClientRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Client updated successfully"
 *         email:
 *           type: string
 *           format: email
 *           example: "joao.novo@example.com"
 *         cnpj:
 *           type: string
 *           example: "98.765.432/0001-10"
 *         phone:
 *           type: string
 *           example: "(11) 88888-8888"
 *         sector:
 *           type: string
 *           example: "Finance"
 *         cep:
 *           type: string
 *           example: "1234567890"
 *         address:
 *           type: string
 *           example: "Rua das Flores, 123"
 *     
 *     ClientOptions:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           description: Page number for pagination
 *           example: 1
 *         limit:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *           description: Number of items per page
 *           example: 10
 *         search:
 *           type: string
 *           description: Search term for filtering clients
 *           example: "joão"
 *         sort:
 *           type: string
 *           enum: [name, email, createdAt, updatedAt]
 *           default: "createdAt"
 *           description: Field to sort by
 *         order:
 *           type: string
 *           enum: [asc, desc]
 *           default: "desc"
 *           description: Sort order
 *         filter:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "João"
 *             email:
 *               type: string
 *               example: "joao@"
 *             cnpj:
 *               type: string
 *               example: "12.345"
 *             phone:
 *               type: string
 *               example: "99999"
 *             sector:
 *               type: string
 *               example: "Technology"
 *             cep:
 *               type: string
 *               example: "1234567890"
 *             address:
 *               type: string
 *               example: "Rua das Flores, 123"
 *     
 *     PaginatedResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Client'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             total:
 *               type: integer
 *               example: 100
 *             totalPages:
 *               type: integer
 *               example: 10
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *         code:
 *           type: string
 *           description: Error code
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *               message:
 *                 type: string
 *     
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *         data:
 *           type: object
 *           description: Response data
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management endpoints
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     description: Create a new client with the provided information
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClientRequest'
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict - email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/clients", validationMiddleware(CreateClientDto), (req: Request, res: Response, next: NextFunction) => {
  clientController.create(req, res, next);
});

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     description: Retrieve a paginated list of clients with optional filtering and sorting
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering clients
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [name, email, createdAt, updatedAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *       - in: query
 *         name: filter[name]
 *         schema:
 *           type: string
 *         description: Filter by name
 *       - in: query
 *         name: filter[email]
 *         schema:
 *           type: string
 *         description: Filter by email
 *       - in: query
 *         name: filter[cnpj]
 *         schema:
 *           type: string
 *         description: Filter by CNPJ
 *       - in: query
 *         name: filter[phone]
 *         schema:
 *           type: string
 *         description: Filter by phone
 *       - in: query
 *         name: filter[sector]
 *         schema:
 *           type: string
 *         description: Filter by sector
 *       - in: query
 *         name: filter[cep]
 *         schema:
 *           type: string
 *         description: Filter by CEP
 *       - in: query
 *         name: filter[address]
 *         schema:
 *           type: string
 *         description: Filter by address
 *       - in: query
 *         name: filter[number]
 *         schema:
 *           type: string
 *         description: Filter by number
 *       - in: query
 *         name: filter[neighborhood]
 *         schema:
 *           type: string
 *         description: Filter by neighborhood
 *       - in: query
 *         name: filter[city]
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: filter[state]
 *         schema:
 *           type: string
 *         description: Filter by state
 * 
 *     responses:
 *       200:
 *         description: List of clients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       400:
 *         description: Bad request - invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/clients", validationMiddleware(ClientOptionsDto), (req: Request, res: Response, next: NextFunction) => {
  clientController.findAll(req, res, next);
});

/**
 * @swagger
 * /api/clients/email/{email}:
 *   get:
 *     summary: Get client by email
 *     description: Retrieve a client by their email address
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Client's email address
 *         example: "joao@example.com"
 *     responses:
 *       200:
 *         description: Client found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client found successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/clients/email/:email", (req: Request, res: Response, next: NextFunction) => {
  clientController.findByEmail(req, res, next);
});

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     description: Retrieve a client by their unique identifier
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client's unique identifier
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Client found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client found successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/clients/:id", (req: Request, res: Response, next: NextFunction) => {
  clientController.findById(req, res, next);
});

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Update client
 *     description: Update an existing client's information
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client's unique identifier
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClientRequest'
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict - email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/clients/:id", validationMiddleware(UpdateClientDto), (req: Request, res: Response, next: NextFunction) => {
  clientController.update(req, res, next);
});

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete client
 *     description: Remove a client from the system
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client's unique identifier
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client deleted successfully"
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/clients/:id", (req: Request, res: Response, next: NextFunction) => {
  clientController.delete(req, res, next);
});

export default router;