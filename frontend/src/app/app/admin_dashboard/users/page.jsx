"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UsersPage() {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const updateRole = async (clerkId, newRole) => {
    setUpdatingUserId(clerkId);
    try {
      const res = await fetch("http://localhost:5000/api/admin/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId, role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.clerkId === clerkId ? { ...u, role: newRole } : u))
        );
      }
    } catch (err) {
      console.error("Error updating role:", err);
    } finally {
      setUpdatingUserId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!user) return <p className="text-purple-300">Loading...</p>;
  if (user.publicMetadata.role !== "admin")
    return <p className="text-red-600">Access denied</p>;

  const filteredUsers = users.filter(
    (u) =>
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Manage Users</h1>
      <Input
        placeholder="Search by name, email, or role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 bg-gray-800 text-white border-purple-700"
      />
      {loadingUsers ? (
        <p className="text-purple-300">Loading users...</p>
      ) : (
        <Table className="bg-gray-900 text-white border-purple-700">
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Update Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((u) => (
              <TableRow key={u.clerkId} className="hover:bg-purple-900">
                <TableCell>{u.full_name || u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={u.role}
                    onValueChange={(val) => updateRole(u.clerkId, val)}
                    disabled={updatingUserId === u.clerkId}
                  >
                    <SelectTrigger className="bg-gray-800 text-white border-purple-700">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-purple-700">
                      <SelectItem value="attendee">Attendee</SelectItem>
                      <SelectItem value="organiser">Organiser</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
