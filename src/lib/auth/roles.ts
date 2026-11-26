import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const accessControl = createAccessControl(defaultStatements);

export const authRoles = {
  admin: accessControl.newRole({ ...adminAc.statements }),
  editor: accessControl.newRole({}),
  intercessor: accessControl.newRole({}),
  treasurer: accessControl.newRole({}),
};
