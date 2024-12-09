import Link from "next/link";

const DashboardSidebar = () => (
    <aside className="w-60 bg-secondary text-accent h-full p-6">
      <ul>
        <li><Link href="/dashboard">Dashboard Home</Link></li>
        <li><Link href="/dashboard/orders">Orders</Link></li>
        <li><Link href="/dashboard/products">Products</Link></li>
        <li><Link href="/dashboard/settings">Settings</Link></li>
      </ul>
    </aside>
  );
  
  export default DashboardSidebar;
  