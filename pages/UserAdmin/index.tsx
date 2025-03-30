import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ExclamationTriangle } from 'react-bootstrap-icons';

interface User {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
}

const UserAdminManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to load users');
        
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    if (userId === currentUser?.id || updatingId) {
      toast.error("You cannot change your own admin status");
      return;
    }
  
    const newStatus = !currentStatus;
    const originalUsers = [...users];
    setUpdatingId(userId);
  
    try {
      // Atualização otimista
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_admin: newStatus } : user
      ));
  
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/admin-status', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          userId,
          isAdmin: newStatus
        })
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update database');
      }
  
      toast.success(`Admin status ${newStatus ? 'granted' : 'revoked'}`);
    } catch (error) {
      // Rollback em caso de erro
      setUsers(originalUsers);
      console.error('Error:', error);
      toast.error(error.message || 'Failed to update admin status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container py-5">
      <button 
        onClick={() => router.push('/admin')}
        className="btn btn-outline-secondary mb-4"
      >
        ← Back to Admin Panel
      </button>
      
      <div className="card shadow border-primary">
        <div className="card-header bg-primary bg-opacity-10">
          <div className="d-flex align-items-center gap-3">
            <Shield className="text-primary fs-4" />
            <div>
              <h2 className="h4 fw-bold mb-1">Administrator Management</h2>
              <p className="text-muted mb-0">
                Manage user administrator privileges
              </p>
            </div>
          </div>
        </div>
        
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="alert alert-warning d-flex align-items-start gap-3 mb-4">
                <ExclamationTriangle className="mt-1 flex-shrink-0" />
                <div>
                  <h5 className="alert-heading">Important Note</h5>
                  <p className="mb-0">
                    Administrator changes affect system access immediately.
                    You cannot modify your own admin status.
                  </p>
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{width: '60px'}}>Admin</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className={user.id === currentUser?.id ? 'table-active' : ''}>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={user.is_admin}
                              onChange={() => toggleAdminStatus(user.id, user.is_admin)}
                              disabled={user.id === currentUser?.id || updatingId === user.id}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            {user.name}
                            {user.id === currentUser?.id && (
                              <span className="badge bg-secondary">You</span>
                            )}
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${user.is_admin ? 'bg-primary' : 'bg-secondary'}`}>
                            {user.is_admin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            className={`btn btn-sm ${user.is_admin ? 'btn-outline-danger' : 'btn-outline-success'}`}
                            onClick={() => toggleAdminStatus(user.id, user.is_admin)}
                            disabled={user.id === currentUser?.id || updatingId === user.id}
                          >
                            {updatingId === user.id ? (
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                              user.is_admin ? 'Revoke Admin' : 'Make Admin'
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>  
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAdminManagement;