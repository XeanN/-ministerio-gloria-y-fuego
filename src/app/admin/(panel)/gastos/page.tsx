import { AdminModulePage } from "@/components/admin/module-page";
export default function ExpensesAdminPage() { return <AdminModulePage title="Gastos" description="Registra gastos y fechas para llevar una cuenta transparente." permission="finance:manage" module="expenses" />; }
