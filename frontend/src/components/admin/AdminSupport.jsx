import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiClock, FiCheckCircle, FiAlertCircle, FiSearch, FiUser, FiHash, FiMoreVertical, FiEdit3, FiSave, FiX } from 'react-icons/fi';
import api from '../../utils/api';

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTicket, setEditingTicket] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tickets');
      setTickets(res.data.data.tickets);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUpdate = async (id) => {
    try {
      setUpdateLoading(true);
      await api.patch(`/tickets/${id}`, {
        status: editingTicket.status,
        adminNote: editingTicket.adminNote
      });
      setEditingTicket(null);
      fetchTickets();
    } catch (err) {
      alert('Failed to update ticket');
    } finally {
      setUpdateLoading(false);
    }
  };

  const filteredTickets = tickets.filter(t => 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-pink transition-colors" size={16} />
          <input
            type="text"
            placeholder="SEARCH BY SUBJECT, USER OR RITUAL ID..."
            className="w-full h-11 bg-white border border-brand-pink/10 pl-11 pr-4 text-[10px] font-bold outline-none focus:border-brand-pink focus:bg-white transition-all uppercase tracking-widest text-[#5C2E3E]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Archives:</span>
          <span className="text-[10px] font-black text-[#5C2E3E] bg-brand-pink/10 px-3 py-1 uppercase">{filteredTickets.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 opacity-20">
          <FiClock size={40} className="animate-spin mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest italic">Syncing with Sanctuary Support Vault...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredTickets.map((ticket) => (
              <motion.div
                key={ticket._id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-white border rounded-none p-5 relative group transition-all ${
                  editingTicket?._id === ticket._id ? 'border-brand-pink/40 shadow-xl' : 'border-brand-pink/5 hover:border-brand-pink/20 shadow-sm'
                }`}
              >
                {/* Status Badge Group */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] shadow-sm ${
                      ticket.priority === 'High' ? 'bg-red-500 text-white' :
                      ticket.priority === 'Medium' ? 'bg-orange-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] shadow-sm ${
                      ticket.status === 'Open' ? 'bg-green-500 text-white' :
                      ticket.status === 'Resolved' ? 'bg-[#3D2522] text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest">{new Date(ticket.createdAt).toLocaleString()}</p>
                    <p className="text-[9px] font-black text-[#5C2E3E] mt-0.5">#{ticket._id.slice(-6).toUpperCase()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Content */}
                  <div>
                    <h3 className="text-[12px] font-black text-[#5C2E3E] uppercase tracking-tight leading-tight mb-2">{ticket.subject}</h3>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed bg-[#F9F6F4]/50 p-3 italic">"{ticket.description}"</p>
                  </div>

                  {/* User & Order Meta */}
                  <div className="grid grid-cols-2 gap-4 border-t border-brand-pink/5 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-light rounded-none flex items-center justify-center text-brand-dark">
                        <FiUser size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Patron</p>
                        <p className="text-[10px] font-bold text-[#5C2E3E] truncate">{ticket.user?.name || 'Unknown'}</p>
                      </div>
                    </div>
                    {ticket.orderId && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-light rounded-none flex items-center justify-center text-brand-gold">
                          <FiHash size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Ritual ID</p>
                          <p className="text-[10px] font-bold text-[#5C2E3E] truncate">{ticket.orderId}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Resolution / Admin Section */}
                  <div className="bg-[#FAF7F8] p-4 space-y-3">
                    {editingTicket?._id === ticket._id ? (
                      <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[7px] font-black uppercase tracking-widest text-[#5C2E3E]/60 mb-1 block">New Status</label>
                            <select 
                              className="w-full bg-white border border-brand-pink/10 h-9 px-2 text-[9px] font-bold outline-none uppercase"
                              value={editingTicket.status}
                              onChange={(e) => setEditingTicket({...editingTicket, status: e.target.value})}
                            >
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-[7px] font-black uppercase tracking-widest text-[#5C2E3E]/60 mb-1 block">Ritual Master Note</label>
                          <textarea 
                            className="w-full bg-white border border-brand-pink/10 p-2 text-[10px] font-medium outline-none h-20 resize-none italic"
                            placeholder="Add resolution notes for the patron..."
                            value={editingTicket.adminNote}
                            onChange={(e) => setEditingTicket({...editingTicket, adminNote: e.target.value})}
                          ></textarea>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleUpdate(ticket._id)}
                            disabled={updateLoading}
                            className="flex-1 bg-[#5C2E3E] text-white h-9 text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50"
                          >
                            <FiSave /> {updateLoading ? 'Archiving...' : 'Save Resolution'}
                          </button>
                          <button 
                            onClick={() => setEditingTicket(null)}
                            className="w-10 h-9 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                          >
                            <FiX />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div className="min-w-0 flex-1 pr-4">
                          <p className="text-[7px] font-black text-brand-gold uppercase tracking-widest mb-1">Current Master Note:</p>
                          <p className="text-[10px] text-gray-500 font-medium italic truncate">{ticket.adminNote || 'No notes currently archived.'}</p>
                        </div>
                        <button 
                          onClick={() => setEditingTicket({...ticket, adminNote: ticket.adminNote || ''})}
                          className="w-10 h-10 bg-white border border-brand-pink/5 text-brand-dark flex items-center justify-center hover:bg-brand-pink hover:text-white transition-all shadow-sm"
                        >
                          <FiEdit3 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;
