import { systemRoles } from "../../utils/systemRoles.js";


export const endPointsRoles = {
    admin: [systemRoles.ADMIN],
    ADD_PRODUCT: [systemRoles.ADMIN, systemRoles.USER],
    delte_product:[systemRoles.ADMIN,systemRoles.USER],
    all:[systemRoles.ADMIN,systemRoles.USER]

}