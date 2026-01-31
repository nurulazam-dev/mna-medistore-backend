var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express6 from "express";
import cors from "cors";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String   @id\n  name          String?\n  email         String\n  emailVerified Boolean  @default(false)\n  image         String?\n  role          String?  @default("CUSTOMER")\n  phone         String?\n  status        String?  @default("ACTIVE")\n  address       String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n\n  medicines  Medicine[]\n  orders     Order[]\n  reviews    Review[]\n  orderItems OrderItem[]\n\n  sessions Session[]\n  accounts Account[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Category {\n  id        String   @id @default(uuid())\n  name      String   @unique @db.VarChar(100)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  medicines Medicine[]\n\n  @@map("categories")\n}\n\nmodel Medicine {\n  id           String   @id @default(uuid())\n  name         String   @unique @db.VarChar(150)\n  sellerId     String\n  seller       User     @relation(fields: [sellerId], references: [id], onDelete: Cascade)\n  categoryId   String\n  category     Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n  description  String   @db.Text\n  image        String?\n  price        Decimal  @db.Decimal(10, 2)\n  stock        Int?\n  manufacturer String   @db.VarChar(150)\n  isActive     Boolean? @default(true)\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  orderItems OrderItem[]\n  reviews    Review[]\n\n  @@index([sellerId])\n  @@index([categoryId])\n  @@map("medicines")\n}\n\nmodel Order {\n  id               String        @id @default(uuid())\n  customerId       String\n  customer         User          @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  status           OrderStatus   @default(PLACED)\n  payment_method   PaymentMethod @default(CASH_ON_DELIVERY)\n  shipping_address String        @db.Text\n  total_amount     Decimal       @db.Decimal(10, 2)\n  createdAt        DateTime      @default(now())\n  updatedAt        DateTime      @updatedAt\n\n  items OrderItem[]\n\n  @@index([customerId])\n  @@map("orders")\n}\n\nenum OrderStatus {\n  PLACED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentMethod {\n  CASH_ON_DELIVERY\n}\n\nmodel OrderItem {\n  id         String   @id @default(uuid())\n  orderId    String\n  order      Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n  sellerId   String\n  seller     User     @relation(fields: [sellerId], references: [id], onDelete: Cascade)\n  quantity   Int\n  unit_price Decimal  @db.Decimal(10, 2)\n  sub_total  Decimal  @db.Decimal(10, 2)\n\n  @@index([orderId])\n  @@index([sellerId])\n  @@index([medicineId])\n  @@map("orderItems")\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n  customerId String\n  customer   User     @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  rating     Int\n  comment    String   @db.Text\n  createdAt  DateTime @default(now())\n\n  @@index([medicineId])\n  @@index([customerId])\n  @@map("reviews")\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n  // url      = env("DATABASE_URL")\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"MedicineToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"}],"dbName":"categories"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"seller","kind":"object","type":"User","relationName":"MedicineToUser"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"description","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"}],"dbName":"medicines"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"payment_method","kind":"enum","type":"PaymentMethod"},{"name":"shipping_address","kind":"scalar","type":"String"},{"name":"total_amount","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"seller","kind":"object","type":"User","relationName":"OrderItemToUser"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"unit_price","kind":"scalar","type":"Decimal"},{"name":"sub_total","kind":"scalar","type":"Decimal"}],"dbName":"orderItems"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MedicineScalarFieldEnum: () => MedicineScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Category: "Category",
  Medicine: "Medicine",
  Order: "Order",
  OrderItem: "OrderItem",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  role: "role",
  phone: "phone",
  status: "status",
  address: "address",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MedicineScalarFieldEnum = {
  id: "id",
  name: "name",
  sellerId: "sellerId",
  categoryId: "categoryId",
  description: "description",
  image: "image",
  price: "price",
  stock: "stock",
  manufacturer: "manufacturer",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  status: "status",
  payment_method: "payment_method",
  shipping_address: "shipping_address",
  total_amount: "total_amount",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  medicineId: "medicineId",
  sellerId: "sellerId",
  quantity: "quantity",
  unit_price: "unit_price",
  sub_total: "sub_total"
};
var ReviewScalarFieldEnum = {
  id: "id",
  medicineId: "medicineId",
  customerId: "customerId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var OrderStatus = {
  PLACED: "PLACED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};
var PaymentMethod = {
  CASH_ON_DELIVERY: "CASH_ON_DELIVERY"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false
      },
      emailVerified: {
        type: "boolean",
        defaultValue: false,
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      address: {
        type: "string",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/app.ts
import { toNodeHandler } from "better-auth/node";

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `${req.originalUrl} - Route not found!`
  });
}

// src/modules/category/category.router.ts
import express from "express";

// src/helpers/ApiErrorHandler.ts
var ApiErrorHandler = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var ApiErrorHandler_default = ApiErrorHandler;

// src/middleware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        throw new ApiErrorHandler_default(401, "You are unauthorize!");
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified,
        status: session.user.status,
        phone: session.user.phone,
        address: session.user.address
      };
      if (roles.length && !roles.includes(req.user.role)) {
        throw new ApiErrorHandler_default(
          403,
          "Forbidden! You don't have permission to access!"
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var auth_default = auth2;

// src/modules/category/category.service.ts
var createCategory = async (data) => {
  const result = await prisma.category.create({
    data
  });
  return result;
};
var getAllCategory = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: { medicines: true }
      }
    }
  });
  return result;
};
var getCategoryById = async (id) => {
  const result = await prisma.category.findUniqueOrThrow({
    where: {
      id
    },
    include: {
      medicines: {
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          isActive: true,
          seller: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }
    }
  });
  return result;
};
var updateCategory = async (id, data) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true
    }
  });
  const result = await prisma.category.update({
    where: {
      id: category.id
    },
    data
  });
  return result;
};
var deleteCategory = async (id) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true
    }
  });
  return await prisma.category.delete({
    where: {
      id: category.id
    }
  });
};
var categoryService = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};

// src/helpers/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
var catchAsync_default = catchAsync;

// src/helpers/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message || null,
    data: data.data || null
  });
};
var sendResponse_default = sendResponse;

// src/modules/category/category.controller.ts
var createCategory2 = catchAsync_default(async (req, res) => {
  const result = await categoryService.createCategory(req.body);
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully!",
    data: result
  });
});
var getAllCategory2 = catchAsync_default(async (req, res) => {
  const result = await categoryService.getAllCategory();
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Category fetch successfully!",
    data: result
  });
});
var getCategoryById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiErrorHandler_default(404, "CategoryId is required!");
  }
  const result = await categoryService.getCategoryById(id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Get Category successfully!",
    data: result
  });
});
var updateCategory2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.updateCategory(id, req.body);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Category updated successfully!",
    data: result
  });
});
var deleteCategory2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.deleteCategory(id);
  sendResponse_default(res, {
    statusCode: 204,
    success: true,
    message: "Category deleted successfully!",
    data: result
  });
});
var CategoryController = {
  createCategory: createCategory2,
  getAllCategory: getAllCategory2,
  getCategoryById: getCategoryById2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.router.ts
var router = express.Router();
router.get("/", CategoryController.getAllCategory);
router.get("/:id", CategoryController.getCategoryById);
router.patch("/:id", auth_default("ADMIN" /* ADMIN */), CategoryController.updateCategory);
router.delete("/:id", auth_default("ADMIN" /* ADMIN */), CategoryController.deleteCategory);
router.post("/", auth_default("ADMIN" /* ADMIN */), CategoryController.createCategory);
var categoryRouter = router;

// src/modules/medicine/medicine.router.ts
import express2 from "express";

// src/modules/medicine/medicine.service.ts
var createMedicine = async (data) => {
  const result = await prisma.medicine.create({
    data
  });
  return result;
};
var getAllMedicine = async ({
  search,
  isActive,
  sellerId,
  categoryId,
  price,
  stock,
  manufacturer,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  const conditions = [];
  if (search) {
    conditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          manufacturer: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (isActive !== void 0) {
    conditions.push({
      isActive
    });
  }
  if (sellerId) {
    conditions.push({
      sellerId
    });
  }
  if (categoryId) {
    conditions.push({
      categoryId
    });
  }
  if (price) {
    conditions.push({
      price
    });
  }
  if (stock) {
    conditions.push({
      stock
    });
  }
  if (manufacturer) {
    conditions.push({
      manufacturer
    });
  }
  const allMedicine = await prisma.medicine.findMany({
    take: limit,
    skip,
    where: {
      AND: conditions
    },
    include: {
      reviews: {
        select: {
          customerId: true,
          rating: true,
          comment: true
        }
      }
    },
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const total = await prisma.medicine.count({
    where: {
      AND: conditions
    }
  });
  return {
    data: allMedicine,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var getMyMedicines = async ({
  search,
  isActive,
  sellerId,
  categoryId,
  stock,
  price,
  manufacturer,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  const conditions = [];
  conditions.push({ sellerId });
  if (search) {
    conditions.push({
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { manufacturer: { contains: search, mode: "insensitive" } }
      ]
    });
  }
  if (isActive !== void 0) {
    conditions.push({ isActive });
  }
  if (categoryId) {
    conditions.push({ categoryId });
  }
  if (price) {
    conditions.push({
      price
    });
  }
  if (stock) {
    conditions.push({
      stock
    });
  }
  const medicines = await prisma.medicine.findMany({
    take: limit,
    skip,
    where: {
      AND: conditions
    },
    include: {
      category: {
        select: {
          name: true
        }
      },
      reviews: {
        select: {
          customerId: true,
          rating: true,
          comment: true
        }
      }
    },
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const total = await prisma.medicine.count({
    where: {
      AND: conditions
    }
  });
  return {
    data: medicines,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var getMedicineById = async (id) => {
  const result = await prisma.medicine.findUniqueOrThrow({
    where: {
      id
    },
    include: {
      seller: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      },
      category: {
        select: {
          id: true,
          name: true
        }
      },
      reviews: {
        select: {
          customerId: true,
          rating: true,
          comment: true
        }
      }
    }
  });
  return result;
};
var updateMedicine = async (id, data, sellerId) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true,
      sellerId: true
    }
  });
  if (medicineData.sellerId !== sellerId) {
    throw new ApiErrorHandler_default(404, "You aren't seller of this medicine!");
  }
  const result = await prisma.medicine.update({
    where: {
      id: medicineData.id
    },
    data
  });
  return result;
};
var deleteMedicine = async (id, sellerId) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true,
      sellerId: true
    }
  });
  if (medicineData.sellerId !== sellerId) {
    throw new ApiErrorHandler_default(404, "You aren't seller of this medicine!");
  }
  return await prisma.medicine.delete({
    where: {
      id: medicineData.id
    }
  });
};
var medicineService = {
  createMedicine,
  getAllMedicine,
  getMyMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
};

// src/helpers/paginationHelper.ts
var paginationHelper = (option) => {
  const page = Number(option.page) || 1;
  const limit = Number(option.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = option.sortBy || "createdAt";
  const sortOrder = option.sortOrder || "desc";
  return { page, limit, skip, sortBy, sortOrder };
};
var paginationHelper_default = paginationHelper;

// src/modules/medicine/medicine.controller.ts
var createMedicine2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler_default(403, "Your account isn't active!");
  }
  if (!user.emailVerified) {
    throw new ApiErrorHandler_default(403, "You aren't verified Seller!");
  }
  const result = await medicineService.createMedicine(req.body);
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Medicine created successfully!",
    data: result
  });
});
var getAllMedicine2 = catchAsync_default(async (req, res) => {
  const { search } = req.query;
  const searchContent = typeof search === "string" ? search : void 0;
  const isActive = req.query.isActive ? req.query.isActive === "true" ? true : req.query.isActive === "false" ? false : void 0 : void 0;
  const sellerId = req.query.sellerId;
  const categoryId = req.query.categoryId;
  const price = Number(req.query.price);
  const stock = Number(req.query.stock);
  const manufacturer = req.query.manufacturer;
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper_default(req.query);
  const result = await medicineService.getAllMedicine({
    search: searchContent,
    isActive,
    sellerId,
    categoryId,
    price,
    stock,
    manufacturer,
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  });
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Medicine fetch successfully!",
    data: result
  });
});
var getMyMedicines2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  if (user.role !== "SELLER" /* SELLER */) {
    throw new ApiErrorHandler_default(403, "You don't have access!");
  }
  const { search } = req.query;
  const searchContent = typeof search === "string" ? search : void 0;
  const categoryId = req.query.categoryId;
  const isActive = req.query.isActive ? req.query.isActive === "true" : void 0;
  const price = Number(req.query.price);
  const stock = Number(req.query.stock);
  const manufacturer = req.query.manufacturer;
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper_default(req.query);
  const result = await medicineService.getMyMedicines({
    sellerId: user.id,
    search: searchContent,
    isActive,
    categoryId,
    stock,
    price,
    manufacturer,
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  });
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "My medicines fetched successfully!",
    data: result
  });
});
var getMedicineById2 = catchAsync_default(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiErrorHandler_default(404, "Medicine Id is required!");
  }
  const result = await medicineService.getMedicineById(id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Get Medicine successfully!",
    data: result
  });
});
var updateMedicine2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  const { id } = req.params;
  const result = await medicineService.updateMedicine(
    id,
    req.body,
    user.id
  );
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Medicine updated successfully!",
    data: result
  });
});
var deleteMedicine2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  const { id } = req.params;
  const result = await medicineService.deleteMedicine(id, user.id);
  sendResponse_default(res, {
    statusCode: 204,
    success: true,
    message: "Medicine deleted successfully!",
    data: result
  });
});
var MedicineController = {
  createMedicine: createMedicine2,
  getAllMedicine: getAllMedicine2,
  getMyMedicines: getMyMedicines2,
  getMedicineById: getMedicineById2,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2
};

// src/modules/medicine/medicine.router.ts
var router2 = express2.Router();
router2.get("/", MedicineController.getAllMedicine);
router2.get(
  "/my-medicines",
  auth_default("SELLER" /* SELLER */),
  MedicineController.getMyMedicines
);
router2.get("/:id", MedicineController.getMedicineById);
router2.patch("/:id", auth_default("SELLER" /* SELLER */), MedicineController.updateMedicine);
router2.delete("/:id", auth_default("SELLER" /* SELLER */), MedicineController.deleteMedicine);
router2.post("/", auth_default("SELLER" /* SELLER */), MedicineController.createMedicine);
var medicineRouter = router2;

// src/modules/user/user.router.ts
import express3 from "express";

// src/modules/user/user.service.ts
var getAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};
var updateUserStatus = async (id, data) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true,
      emailVerified: true,
      status: true
    }
  });
  const result = await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      emailVerified: user.emailVerified,
      status
    }
  });
  return result;
};
var updateProfile = async (id, data) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true
    }
  });
  const result = await prisma.user.update({
    where: {
      id: user.id
    },
    data
  });
  return result;
};
var userService = {
  getAllUser,
  updateUserStatus,
  updateProfile
};

// src/modules/user/user.controller.ts
var getAllUser2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler_default(403, "Your account isn't active!");
  }
  const result = await userService.getAllUser();
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Get users successfully!",
    data: result
  });
});
var updateUserStatus2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler_default(403, "Your account isn't active!");
  }
  const { id } = req.params;
  const result = await userService.updateUserStatus(id, req.body);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully!",
    data: result
  });
});
var updateProfile2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler_default(403, "Your account isn't active!");
  }
  const result = await userService.updateProfile(user?.id, req.body);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully!",
    data: result
  });
});
var UserController = {
  getAllUser: getAllUser2,
  updateUserStatus: updateUserStatus2,
  updateProfile: updateProfile2
};

// src/modules/user/user.router.ts
var router3 = express3.Router();
router3.get("/", auth_default("ADMIN" /* ADMIN */), UserController.getAllUser);
router3.patch(
  "/update-profile",
  auth_default("CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */, "ADMIN" /* ADMIN */),
  UserController.updateProfile
);
router3.patch("/:id", auth_default("ADMIN" /* ADMIN */), UserController.updateUserStatus);
var userRouter = router3;

// src/modules/order/order.router.ts
import express4 from "express";

// src/modules/order/order.service.ts
var createOrder = async (userId, payload) => {
  const { items, shipping_address, total_amount } = payload;
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId: userId,
        status: OrderStatus.PLACED,
        payment_method: PaymentMethod.CASH_ON_DELIVERY,
        total_amount: Number(total_amount),
        shipping_address
      }
    });
    const orderItemsData = [];
    for (const item of items) {
      const medicine = await tx.medicine.findUnique({
        where: {
          id: item.medicineId
        }
      });
      if (!medicine) {
        throw new ApiErrorHandler_default(404, "Medicine not found!");
      }
      const unitPrice = Number(medicine.price);
      const quantity = Number(item.quantity);
      const availableStock = Number(medicine.stock || 0);
      if (quantity > availableStock) {
        throw new ApiErrorHandler_default(
          404,
          `You can't order more than available stock!`
        );
      }
      orderItemsData.push({
        orderId: order.id,
        medicineId: item.medicineId,
        sellerId: item.sellerId,
        quantity,
        unit_price: unitPrice,
        sub_total: unitPrice * quantity
      });
      await tx.medicine.update({
        where: {
          id: item.medicineId
        },
        data: {
          stock: {
            decrement: quantity
          }
        }
      });
    }
    await tx.orderItem.createMany({
      data: orderItemsData
    });
    return order;
  });
};
var getMyAllOrder = async (userId) => {
  return await prisma.order.findMany({
    where: {
      customerId: userId
    },
    include: {
      items: {
        include: {
          medicine: {
            select: {
              name: true,
              image: true,
              sellerId: true,
              categoryId: true,
              price: true,
              stock: true,
              manufacturer: true,
              isActive: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getOrderById = async (orderId, userId) => {
  return await prisma.order.findUniqueOrThrow({
    where: {
      id: orderId,
      customerId: userId
    },
    include: {
      items: {
        include: {
          medicine: {
            select: {
              name: true,
              image: true,
              sellerId: true,
              categoryId: true,
              price: true,
              stock: true,
              manufacturer: true,
              isActive: true
            }
          }
        }
      }
    }
  });
};
var cancelMyOrder = async (orderId, userId) => {
  return await prisma.$transaction(async (tx) => {
    const orderData = await prisma.order.findUnique({
      where: {
        id: orderId
      },
      include: {
        items: true
      }
    });
    if (!orderData) {
      throw new ApiErrorHandler_default(404, "Order not found!");
    }
    if (orderData.customerId !== userId) {
      throw new ApiErrorHandler_default(404, "You aren't customer of this order!");
    }
    if (orderData.status !== OrderStatus.PLACED) {
      throw new ApiErrorHandler_default(404, "You can't cancel this order!");
    }
    for (const item of orderData.items) {
      await tx.medicine.update({
        where: {
          id: item.medicineId
        },
        data: {
          stock: {
            increment: item.quantity
          }
        }
      });
    }
    const result = await tx.order.update({
      where: {
        id: orderId
      },
      data: {
        status: OrderStatus.CANCELLED
      }
    });
    return result;
  });
};
var getMyMedicinesOrder = async (sellerId) => {
  return await prisma.orderItem.findMany({
    where: {
      sellerId
    },
    include: {
      order: true,
      medicine: {
        select: {
          name: true,
          image: true,
          categoryId: true,
          price: true,
          manufacturer: true,
          isActive: true
        }
      }
    }
  });
};
var updateMyMedicinesOrder = async (orderItemId, status2, userId) => {
  const orderItem = await prisma.orderItem.findUniqueOrThrow({
    where: {
      id: orderItemId
    },
    select: {
      id: true,
      orderId: true,
      sellerId: true
    }
  });
  if (orderItem.sellerId !== userId) {
    throw new ApiErrorHandler_default(404, "You aren't seller of this medicine order!");
  }
  return await prisma.order.update({
    where: {
      id: orderItem.orderId
    },
    data: {
      status: status2
    }
  });
};
var getAllOrders = async ({
  status: status2,
  categoryId,
  customerId,
  sellerId,
  medicineId,
  manufacturer,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  const conditions = [];
  if (status2) {
    conditions.push({
      status: status2
    });
  }
  if (customerId) {
    conditions.push({
      customerId
    });
  }
  if (medicineId) {
    conditions.push({
      items: {
        some: {
          medicineId
        }
      }
    });
  }
  if (sellerId) {
    conditions.push({
      items: {
        some: {
          sellerId
        }
      }
    });
  }
  if (categoryId) {
    conditions.push({
      items: {
        some: {
          medicine: {
            categoryId
          }
        }
      }
    });
  }
  if (manufacturer) {
    conditions.push({
      items: {
        some: {
          medicine: {
            manufacturer: {
              contains: manufacturer,
              mode: "insensitive"
            }
          }
        }
      }
    });
  }
  const allOrder = await prisma.order.findMany({
    take: limit,
    skip,
    where: {
      AND: conditions
    },
    include: {
      customer: {
        select: {
          name: true,
          email: true,
          phone: true
        }
      },
      items: {
        include: {
          medicine: {
            select: {
              name: true,
              image: true,
              sellerId: true,
              categoryId: true,
              price: true,
              stock: true,
              manufacturer: true,
              isActive: true
            }
          }
        }
      }
    },
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const total = await prisma.order.count({
    where: {
      AND: conditions
    }
  });
  return {
    data: allOrder,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var orderService = {
  createOrder,
  getMyAllOrder,
  getOrderById,
  cancelMyOrder,
  getMyMedicinesOrder,
  updateMyMedicinesOrder,
  getAllOrders
};

// src/modules/order/order.controller.ts
var createOrder2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler_default(403, "Your account isn't active!");
  }
  const result = await orderService.createOrder(user.id, req.body);
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Order placed successfully!",
    data: result
  });
});
var getMyAllOrder2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  const result = await orderService.getMyAllOrder(user.id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "My all orders fetched successfully!",
    data: result
  });
});
var getOrderById2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  const { id } = req.params;
  if (!id) {
    throw new ApiErrorHandler_default(404, "Order Id is required!");
  }
  const result = await orderService.getOrderById(id, user.id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Get order successfully!",
    data: result
  });
});
var cancelMyOrder2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  const { id } = req.params;
  const result = await orderService.cancelMyOrder(id, user.id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Order cancelled",
    data: result
  });
});
var getMyMedicinesOrder2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  const result = await orderService.getMyMedicinesOrder(user.id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Medicines order get successfully!",
    data: result
  });
});
var updateMyMedicinesOrder2 = catchAsync_default(
  async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    if (!user) {
      throw new ApiErrorHandler_default(401, "You are unauthorize!");
    }
    const result = await orderService.updateMyMedicinesOrder(
      id,
      req.body.status,
      user.id
    );
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Order status updated",
      data: result
    });
  }
);
var getAllOrders2 = catchAsync_default(async (req, res) => {
  const status2 = req.query.status;
  const sellerId = req.query.sellerId;
  const customerId = req.query.customerId;
  const medicineId = req.query.medicineId;
  const categoryId = req.query.categoryId;
  const manufacturer = req.query.manufacturer;
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper_default(req.query);
  const result = await orderService.getAllOrders({
    status: status2,
    sellerId,
    medicineId,
    customerId,
    categoryId,
    manufacturer,
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  });
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetch successfully!",
    data: result
  });
});
var OrderController = {
  createOrder: createOrder2,
  getMyAllOrder: getMyAllOrder2,
  getOrderById: getOrderById2,
  cancelMyOrder: cancelMyOrder2,
  getMyMedicinesOrder: getMyMedicinesOrder2,
  updateMyMedicinesOrder: updateMyMedicinesOrder2,
  getAllOrders: getAllOrders2
};

// src/modules/order/order.router.ts
var router4 = express4.Router();
router4.post("/", auth_default("CUSTOMER" /* CUSTOMER */), OrderController.createOrder);
router4.get(
  "/my-orders",
  auth_default("CUSTOMER" /* CUSTOMER */),
  OrderController.getMyAllOrder
);
router4.get(
  "/my-orders/:id",
  auth_default("CUSTOMER" /* CUSTOMER */),
  OrderController.getOrderById
);
router4.patch(
  "/my-orders/cancel/:id",
  auth_default("CUSTOMER" /* CUSTOMER */),
  OrderController.cancelMyOrder
);
router4.get(
  "/seller/my-medicine-orders",
  auth_default("SELLER" /* SELLER */),
  OrderController.getMyMedicinesOrder
);
router4.patch(
  "/seller/update-my-medicine-orders/:id",
  auth_default("SELLER" /* SELLER */),
  OrderController.updateMyMedicinesOrder
);
router4.get("/admin/orders", auth_default("ADMIN" /* ADMIN */), OrderController.getAllOrders);
var orderRouter = router4;

// src/modules/review/review.router.ts
import express5 from "express";

// src/modules/review/review.service.ts
var createReview = async (userId, payload) => {
  const { medicineId, rating, comment } = payload;
  const hasOrdered = await prisma.order.findFirst({
    where: {
      customerId: userId,
      status: OrderStatus.DELIVERED,
      items: {
        some: {
          medicineId
        }
      }
    }
  });
  if (!hasOrdered) {
    throw new ApiErrorHandler_default(
      403,
      "You can only review medicine that you have successfully purchased!"
    );
  }
  const result = await prisma.review.create({
    data: {
      medicineId,
      customerId: userId,
      rating: Number(rating),
      comment
    }
  });
  return result;
};
var reviewService = {
  createReview
};

// src/modules/review/review.controller.ts
var createReview2 = catchAsync_default(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler_default(401, "You are unauthorize!");
  }
  if (user.status !== "ACTIVE") {
    throw new ApiErrorHandler_default(403, "Your account isn't active!");
  }
  const result = await reviewService.createReview(user.id, req.body);
  sendResponse_default(res, {
    statusCode: 201,
    success: true,
    message: "Review added successfully!",
    data: result
  });
});
var ReviewController = {
  createReview: createReview2
};

// src/modules/review/review.router.ts
var router5 = express5.Router();
router5.post("/", auth_default("CUSTOMER" /* CUSTOMER */), ReviewController.createReview);
var reviewRouter = router5;

// src/middleware/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    message = "Validation error: Check your input fields!";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      message = "Duplicate entry found!";
    } else if (err.code === "P2003") {
      statusCode = 400;
      message = "Foreign key constraint fail!";
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Record not found!";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    statusCode = 500;
    message = "DB connection fail!";
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: process.env.NODE_ENV === "development" ? errorDetails : void 0,
    stack: process.env.NODE_ENV === "development" ? err.stack : void 0
  });
};
var globalErrorHandler_default = globalErrorHandler;

// src/app.ts
var app = express6();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express6.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/medicines", medicineRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);
app.get("/", (req, res) => {
  res.send("Running the MNA_MediStore_Server");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    app_default.listen(PORT, () => {
      console.log(`MNA_MediStore_Server running on port:${PORT}`);
    });
  } catch (error) {
    console.log("Database connection fail", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
