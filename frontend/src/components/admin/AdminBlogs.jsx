import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiLayers, FiCalendar, FiUser, FiClock, FiUploadCloud, FiImage } from 'react-icons/fi';
import api from '../../utils/api';
import { uploadToCloudinary } from '../../utils/cloudinary';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '', category: '', excerpt: '', content: '', image: '', author: 'Saundarya Team', status: 'Published'
    });

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await api.get('/blogs/admin');
            setBlogs(res.data.data.blogs);
        } catch (err) {
            console.error('Failed to fetch blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            setFormData(prev => ({ ...prev, image: url }));
        } catch (err) {
            alert('Upload failed: ' + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.patch(`/blogs/${editingId}`, formData);
            } else {
                await api.post('/blogs', formData);
            }
            setIsModalOpen(false);
            setEditingId(null);
            setFormData({ title: '', category: '', excerpt: '', content: '', image: '', author: 'Saundarya Team', status: 'Published' });
            fetchBlogs();
        } catch (err) {
            alert('Operation failed: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this blog post?')) return;
        try {
            await api.delete(`/blogs/${id}`);
            fetchBlogs();
        } catch (err) {
            alert('Delete failed');
        }
    };

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-black text-brand-dark uppercase tracking-widest flex items-center gap-3">
                        <FiLayers className="text-brand-pink" /> Journal Management
                    </h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Editorial Content & Storytelling</p>
                </div>
                <button
                    onClick={() => { setEditingId(null); setFormData({ title: '', category: '', excerpt: '', content: '', image: '', author: 'Saundarya Team', status: 'Published' }); setIsModalOpen(true); }}
                    className="bg-brand-dark text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl"
                >
                    <FiPlus /> New Article
                </button>
            </div>

            {loading ? (
                <div className="py-20 text-center animate-pulse">
                    <div className="w-10 h-10 border-4 border-brand-pink border-t-brand-gold rounded-full mx-auto mb-4 animate-spin"></div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Accessing Archives...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <div key={blog._id} className="bg-white group relative overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                            <div className="aspect-video overflow-hidden">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 bg-brand-gold text-white text-[8px] font-black px-3 py-1 uppercase tracking-tighter shadow-lg">{blog.category}</div>
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-center gap-4 text-[8px] text-gray-400 font-bold uppercase tracking-widest pt-1">
                                    <span className="flex items-center gap-1"><FiCalendar className="text-brand-pink" /> {blog.date}</span>
                                    <span className="flex items-center gap-1"><FiClock className="text-brand-gold" /> {blog.readTime}</span>
                                </div>
                                <h3 className="text-lg font-serif font-bold text-brand-dark line-clamp-1">{blog.title}</h3>
                                <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{blog.excerpt}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-sm ${blog.status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>{blog.status}</span>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => { setEditingId(blog._id); setFormData(blog); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-brand-pink transition-colors"><FiEdit2 size={14} /></button>
                                        <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><FiTrash2 size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-brand-dark/95 backdrop-blur-sm z-[2000] overflow-y-auto flex justify-center py-10 px-4">
                    <div className="bg-white w-full max-w-4xl rounded-none shadow-2xl relative h-fit mb-10">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                            <h2 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest">{editingId ? 'Refine Article' : 'Compose New Story'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-brand-dark">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-1.5 border-b border-gray-50 pb-6">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Article Header Image</label>
                                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                                        <div
                                            onClick={() => document.getElementById('blog-image-upload').click()}
                                            className="relative w-full md:w-1/3 aspect-video bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-brand-pink/[0.02] transition-all overflow-hidden group rounded-sm shadow-inner"
                                        >
                                            {isUploading ? (
                                                <div className="flex flex-col items-center gap-1 animate-pulse">
                                                    <FiUploadCloud className="text-brand-pink animate-bounce" size={24} />
                                                    <span className="text-[8px] font-black text-brand-pink uppercase tracking-widest">Uploading...</span>
                                                </div>
                                            ) : formData.image ? (
                                                <div className="w-full h-full relative">
                                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <FiUploadCloud className="text-white" size={24} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-gray-300">
                                                    <FiUploadCloud size={24} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest">Click to Upload</span>
                                                </div>
                                            )}
                                            <input id="blog-image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </div>
                                        <div className="flex-1 space-y-1.5 flex flex-col justify-center">
                                            <label className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Manual URL Override (Optional)</label>
                                            <input name="image" value={formData.image} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent p-4 text-xs font-bold font-mono text-gray-400 outline-none focus:bg-white focus:border-brand-pink-lite transition-all" placeholder="https://res.cloudinary.com/..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Article Title</label>
                                    <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent p-4 text-xs font-bold outline-none focus:bg-white focus:border-brand-pink-lite transition-all" placeholder="Enter a captivating headline..." />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Editorial Category</label>
                                    <input name="category" value={formData.category} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent p-4 text-xs font-bold outline-none focus:bg-white focus:border-brand-pink-lite transition-all" placeholder="e.g., BRIDAL, SKINCARE..." />
                                </div>
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Editorial Excerpt</label>
                                    <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent p-4 text-xs font-bold outline-none focus:bg-white focus:border-brand-pink-lite transition-all h-20 resize-none" placeholder="Brief summary of the article..."></textarea>
                                </div>
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Article Content</label>
                                    <textarea name="content" value={formData.content} onChange={handleChange} required className="w-full bg-gray-50 border border-transparent p-4 text-xs font-bold outline-none focus:bg-white focus:border-brand-pink-lite transition-all h-40" placeholder="Write your brand story here..."></textarea>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Journal Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-50 border border-transparent p-4 text-xs font-bold outline-none focus:bg-white focus:border-brand-pink-lite transition-all">
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-8 flex justify-end gap-5">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-bold uppercase text-gray-400 hover:text-brand-dark tracking-widest transition-colors">Discard</button>
                                <button type="submit" className="bg-brand-dark text-white px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all">Save To Archive</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogs;
