/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as addresses_addresses from "../addresses/addresses.js";
import type * as orders_orders from "../orders/orders.js";
import type * as payments_payments from "../payments/payments.js";
import type * as paytm_paytm from "../paytm/paytm.js";
import type * as users_users from "../users/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "addresses/addresses": typeof addresses_addresses;
  "orders/orders": typeof orders_orders;
  "payments/payments": typeof payments_payments;
  "paytm/paytm": typeof paytm_paytm;
  "users/users": typeof users_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
