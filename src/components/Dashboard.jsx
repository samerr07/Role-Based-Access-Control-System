import React, { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { PlusCircle, Pencil, Trash2, Users, Shield, Search, Filter, ArrowUpDown } from 'lucide-react';



const Dashboard = () => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) ||
    [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', lastLogin: '2024-03-20', createdAt: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', lastLogin: '2024-03-21', createdAt: '2024-02-01' },
    ]);

  const [roles, setRoles] = useState([
    { id: 1, name: 'admin', permissions: ['read', 'write', 'delete'], description: 'Full system access' },
    { id: 2, name: 'user', permissions: ['read'], description: 'Basic access' },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    status: 'all',
    role: 'all',
    dateRange: 'all'
  });


  const [showFilters, setShowFilters] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'active' });
  const [newRole, setNewRole] = useState({ name: '', permissions: [], description: '' });
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const handleUserSubmit = () => {
    const date = new Date();
    if (editingId) {
      setUsers(users.map(user =>
        user.id === editingId ? { ...newUser, id: editingId, lastLogin: date } : user
      ));
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1, lastLogin: date }]);
    }
    setNewUser({ name: '', email: '', role: '', status: 'active' });
    setIsUserDialogOpen(false);
    setEditingId(null);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const editUser = (user) => {
    setNewUser(user);
    setEditingId(user.id);
    setIsUserDialogOpen(true);
  };

  const handleRoleSubmit = () => {
    if (editingId) {
      setRoles(roles.map(role =>
        role.id === editingId ? { ...newRole, id: editingId } : role
      ));
    } else {
      setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
    }
    setNewRole({ name: '', permissions: [], description: '' });
    setIsRoleDialogOpen(false);
    setEditingId(null);
  };

  const deleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const editRole = (role) => {
    setNewRole(role);
    setEditingId(role.id);
    setIsRoleDialogOpen(true);
  };



  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Apply filters
    if (filters.status !== 'all') {
      result = result.filter(user => user.status === filters.status);
    }
    if (filters.role !== 'all') {
      result = result.filter(user => user.role === filters.role);
    }
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      if (filters.dateRange === 'recent') {
        result = result.filter(user => new Date(user.createdAt) >= thirtyDaysAgo);
      }
    }

    // Apply search
    if (searchTerm) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [users, sortConfig, filters, searchTerm]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };


  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-600">Manage your organization's users and roles</p>
        </div>

        <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-slate-200">
          <CardHeader className="space-y-1 border-b border-slate-100 bg-white/50">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              User & Role Management
            </CardTitle>
            <CardDescription className="text-slate-600">
              Comprehensive system access control
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 gap-4 p-1 h-14 bg-slate-100/50">
                <TabsTrigger
                  value="users"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md transition-all"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Users({users.length})
                </TabsTrigger>
                <TabsTrigger
                  value="roles"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md transition-all"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Roles({roles.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-6">
                <div className="flex justify-between items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 border-slate-200 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                  <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingId ? 'Edit User' : 'Add New User'}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="Enter full name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select
                            value={newUser.role}
                            onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map(role => (
                                <SelectItem key={role.id} value={role.name}>
                                  {role.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={newUser.status}
                            onValueChange={(value) => setNewUser({ ...newUser, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleUserSubmit} className="w-full">
                          {editingId ? 'Update User' : 'Add User'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                </div>

                {showFilters && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <Label className="mb-2">Status</Label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => setFilters({ ...filters, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2">Role</Label>
                      <Select
                        value={filters.role}
                        onValueChange={(value) => setFilters({ ...filters, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          {roles.map(role => (
                            <SelectItem key={role.id} value={role.name}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2">Date Range</Label>
                      <Select
                        value={filters.dateRange}
                        onValueChange={(value) => setFilters({ ...filters, dateRange: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="recent">Last 30 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="rounded-xl border border-slate-200 overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm">
                  <div className="grid grid-cols-6 gap-4 items-center bg-slate-50 px-6 py-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSort('name')}
                        className="flex items-center text-sm font-medium text-slate-600"
                      >
                        Sort by Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </div>

                    
                  </div>

                  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-200">
                    <div className="grid grid-cols-6 gap-4 text-sm font-medium text-slate-600">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Role</div>
                      <div>Status</div>
                      <div>Actions</div>
                      <div>Last Login</div>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">


                    {filteredAndSortedUsers.map(user => (
                      <div key={user.id} className="px-6 py-4 hover:bg-slate-50/50 transition-colors">
                        <div className="grid grid-cols-6 gap-4 items-center">
                          <div className="font-medium text-slate-800">{user.name}</div>
                          <div className="text-slate-600">{user.email}</div>
                          <div>
                            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                              {user.role}
                            </Badge>
                          </div>
                          <div>
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="bg-emerald-100 text-emerald-700">
                              {user.status}
                            </Badge>
                          </div>


                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="bg-red-100 hover:bg-red-200 text-blue-600 border-0"
                              onClick={() => editUser(user)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="bg-red-100 hover:bg-red-200 text-red-600 border-0"
                              onClick={() => deleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-slate-600">
                            {new Date(user.lastLogin).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              hour12: true,
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="roles" className="space-y-6">
                <div className="flex justify-end">


                  <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Role
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingId ? 'Edit Role' : 'Add New Role'}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="roleName">Role Name</Label>
                          <Input
                            id="roleName"
                            placeholder="Enter role name"
                            value={newRole.name}
                            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-3">
                          <Label>Permissions</Label>
                          <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
                            {['read', 'write', 'delete'].map(permission => (
                              <div key={permission} className="flex items-center space-x-2">
                                <Checkbox
                                  id={permission}
                                  checked={newRole.permissions.includes(permission)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setNewRole({
                                        ...newRole,
                                        permissions: [...newRole.permissions, permission]
                                      });
                                    } else {
                                      setNewRole({
                                        ...newRole,
                                        permissions: newRole.permissions.filter(p => p !== permission)
                                      });
                                    }
                                  }}
                                />
                                <Label htmlFor={permission} className="capitalize">
                                  {permission}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            placeholder="Enter role description"
                            value={newRole.description}
                            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleRoleSubmit} className="w-full">
                          {editingId ? 'Update Role' : 'Add Role'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>


                <div className="rounded-xl border border-slate-200 overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm">
                  <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-200">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium text-slate-600">
                      <div>Role Name</div>
                      <div>Permissions</div>
                      <div>Description</div>
                      <div>Actions</div>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                   
                    {roles.map(role => (
                      <div key={role.id} className="px-6 py-4 hover:bg-slate-50/50 transition-colors">
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <div className="font-medium text-slate-800 capitalize">{role.name}</div>
                          <div className="flex gap-1 flex-wrap">
                            {role.permissions.map(permission => (
                              <Badge className={`bg-blue-100  capitalize ${permission === 'read' ? 'text-blue-700' : permission === 'write' ? 'text-green-700' : 'text-purple-700'}`}>{permission}</Badge>

                            ))}
                          </div>
                          <div className="text-slate-600">{role.description}</div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-slate-200 hover:bg-slate-100 text-slate-600"
                              onClick={() => editRole(role)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="bg-red-100 hover:bg-red-200 text-red-600 border-0"
                              onClick={() => deleteRole(role.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;