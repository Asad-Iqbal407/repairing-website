'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Users,
  MessageSquare,
  Image as ImageIcon,
  TrendingUp,
  LogOut,
  Eye,
  Download,
  Calendar,
  Phone,
  Mail,
  Wrench
} from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  deviceType: string;
  serviceType: string;
  message: string;
  images?: Array<{
    filename: string;
    originalName: string;
    mimetype: string;
    size: number;
    url: string;
    uploadedAt: string;
  }>;
  status: string;
  createdAt: string;
}

interface DashboardStats {
  totalContacts: number;
  pendingContacts: number;
  completedContacts: number;
  totalImages: number;
}

const AdminDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    pendingContacts: 0,
    completedContacts: 0,
    totalImages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
        calculateStats(data.contacts);
      } else if (response.status === 401) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (contactsData: Contact[]) => {
    const totalContacts = contactsData.length;
    const pendingContacts = contactsData.filter(c => c.status === 'pending').length;
    const completedContacts = contactsData.filter(c => c.status === 'completed').length;
    const totalImages = contactsData.reduce((sum, c) => sum + (c.images?.length || 0), 0);

    setStats({
      totalContacts,
      pendingContacts,
      completedContacts,
      totalImages,
    });
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateContactStatus = async (contactId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchContacts(); // Refresh data
        if (selectedContact && selectedContact._id === contactId) {
          setSelectedContact({ ...selectedContact, status });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Wrench className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingContacts}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedContacts}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ImageIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Images</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalImages}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contacts List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Contacts</h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {contacts.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No contacts found
                  </div>
                ) : (
                  contacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {contact.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {contact.deviceType} - {contact.serviceType}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            contact.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : contact.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {contact.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(contact.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border sticky top-8">
              {selectedContact ? (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-sm text-gray-900">{selectedContact.name}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedContact.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-sm text-gray-900">{selectedContact.phone}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Device Type</label>
                      <p className="text-sm text-gray-900">{selectedContact.deviceType}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Service Type</label>
                      <p className="text-sm text-gray-900">{selectedContact.serviceType}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={selectedContact.status}
                        onChange={(e) => updateContactStatus(selectedContact._id, e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                        {selectedContact.message}
                      </p>
                    </div>

                    {selectedContact.images && selectedContact.images.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Images ({selectedContact.images.length})
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedContact.images.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image.url}
                                alt={`Uploaded ${index + 1}`}
                                className="w-full h-20 object-cover rounded-md border"
                                onError={(e) => {
                                  console.error('Image failed to load:', image.url);
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <a
                                href={image.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center rounded-md"
                              >
                                <Eye className="h-5 w-5 text-white opacity-0 hover:opacity-100" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Submitted</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedContact.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a contact to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;