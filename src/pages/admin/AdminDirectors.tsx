import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOrg } from '../../context/OrgContext';
import { AdminHeader } from '../../components/common/AdminHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { ImageUpload } from '../../components/common/ImageUpload';
import { Director } from '../../types/database';
import { 
  PlusCircle, ArrowUp, ArrowDown, Edit3, Trash2, 
  CheckCircle2, XCircle, Users, Mail, Move 
} from 'lucide-react';

export const AdminDirectors: React.FC = () => {
  const { directors, saveDirectorItem, deleteDirectorItem, reorderDirectorList, showToast } = useOrg();
  const [searchParams, setSearchParams] = useSearchParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDirector, setEditingDirector] = useState<Director | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [biography, setBiography] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState(true);
  const [committee, setCommittee] = useState('Executive Board');
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [termStart, setTermStart] = useState('');
  const [termEnd, setTermEnd] = useState('');

  // Check URL query param ?action=new to automatically pop open modal
  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      openAddModal();
      searchParams.delete('action');
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  const openAddModal = () => {
    setEditingDirector(null);
    setName('');
    setPosition('');
    setBiography('');
    setPhotoUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600');
    setDisplayOrder(directors.length + 1);
    setIsActive(true);
    setCommittee('Executive Board');
    setEmail('');
    setLinkedinUrl('');
    setTermStart(new Date().getFullYear().toString());
    setTermEnd('');
    setModalOpen(true);
  };

  const openEditModal = (dir: Director) => {
    setEditingDirector(dir);
    setName(dir.name);
    setPosition(dir.position);
    setBiography(dir.biography);
    setPhotoUrl(dir.photo_url);
    setDisplayOrder(dir.display_order);
    setIsActive(dir.is_active);
    setCommittee(dir.committee || 'Executive Board');
    setEmail(dir.email || '');
    setLinkedinUrl(dir.linkedin_url || '');
    setTermStart(dir.term_start || '');
    setTermEnd(dir.term_end || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !position.trim() || !biography.trim()) {
      showToast('Please fill out name, position, and biography.', 'error');
      return;
    }

    try {
      await saveDirectorItem({
        id: editingDirector?.id,
        name: name.trim(),
        position: position.trim(),
        biography: biography.trim(),
        photo_url: photoUrl,
        display_order: Number(displayOrder),
        is_active: isActive,
        committee,
        email: email.trim() || undefined,
        linkedin_url: linkedinUrl.trim() || undefined,
        term_start: termStart.trim() || undefined,
        term_end: termEnd.trim() || undefined,
      });
      setModalOpen(false);
    } catch {
      // Handled in context
    }
  };

  const handleToggleActive = async (dir: Director) => {
    await saveDirectorItem({
      ...dir,
      is_active: !dir.is_active
    });
    showToast(`${dir.name} is now marked as ${!dir.is_active ? 'Active' : 'Inactive/Emeritus'}`, 'info');
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === directors.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...directors];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    const orderedIds = reordered.map(d => d.id);
    await reorderDirectorList(orderedIds);
  };

  const confirmDelete = async () => {
    if (deleteTargetId) {
      await deleteDirectorItem(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto pb-24">
      <AdminHeader
        title="Board of Directors Management"
        subtitle="Appoint new directors, update profiles, replace photos, adjust governing hierarchy, or mark former members as emeritus."
        actionButton={
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/20 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Director</span>
          </button>
        }
      />

      {/* Info notice about ordering and active/inactive status */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-900">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <span>
            <strong>Display Hierarchy:</strong> Directors appear on the public website in the exact order listed below (e.g. Chairman first). Use the Up/Down buttons to reorder positions.
          </span>
        </div>
        <span className="text-[11px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold whitespace-nowrap">
          {directors.filter(d => d.is_active).length} Active / {directors.length} Total
        </span>
      </div>

      {/* Directors Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="py-3 px-4 w-14 text-center">Order</th>
                <th className="py-3 px-4">Director</th>
                <th className="py-3 px-4">Position / Title</th>
                <th className="py-3 px-4">Committee</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {directors.map((dir, idx) => (
                <tr key={dir.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Order column with Up/Down buttons */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-mono font-bold text-slate-600 text-xs w-5">
                        #{dir.display_order}
                      </span>
                      <div className="flex flex-col">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveOrder(idx, 'up')}
                          className="p-1 text-slate-400 hover:text-brand-600 disabled:opacity-20 hover:bg-slate-200 rounded"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === directors.length - 1}
                          onClick={() => handleMoveOrder(idx, 'down')}
                          className="p-1 text-slate-400 hover:text-brand-600 disabled:opacity-20 hover:bg-slate-200 rounded"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Photo & Name */}
                  <td className="py-3 px-4 min-w-[240px]">
                    <div className="flex items-center gap-3">
                      <img
                        src={dir.photo_url}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-200 shadow-xs"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm font-heading">
                          {dir.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate max-w-xs">
                          {dir.email || 'No direct email'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Position */}
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-800 text-xs">
                    {dir.position}
                  </td>

                  {/* Committee */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                      {dir.committee || 'Executive Board'}
                    </span>
                  </td>

                  {/* Active / Inactive Status + Toggle */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={dir.is_active ? 'active' : 'inactive'} size="sm" />
                      <button
                        type="button"
                        onClick={() => handleToggleActive(dir)}
                        className="text-[10px] text-slate-400 hover:text-brand-600 underline font-medium"
                        title="Toggle Active / Emeritus"
                      >
                        {dir.is_active ? 'Mark Emeritus' : 'Activate'}
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(dir)}
                        className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition"
                        title="Edit profile & photo"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(dir.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Director Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingDirector ? `Edit Director: ${editingDirector.name}` : 'Appoint New Board Member'}
        subtitle="Director profiles are immediately visible on the public website."
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Full Name with Titles *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Dr. Senaka Wickramasinghe"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Board Position / Title *
              </label>
              <input
                type="text"
                required
                value={position}
                onChange={e => setPosition(e.target.value)}
                placeholder="e.g. Chairman of the Board"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Subcommittee
              </label>
              <input
                type="text"
                value={committee}
                onChange={e => setCommittee(e.target.value)}
                placeholder="e.g. Executive Board"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Display Order #
              </label>
              <input
                type="number"
                min="1"
                value={displayOrder}
                onChange={e => setDisplayOrder(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Status
              </label>
              <select
                value={isActive ? 'active' : 'inactive'}
                onChange={e => setIsActive(e.target.value === 'active')}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="active">Active Board Member</option>
                <option value="inactive">Past / Emeritus Member</option>
              </select>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="pt-2">
            <ImageUpload
              value={photoUrl}
              onChange={setPhotoUrl}
              bucket="director-photos"
              label="Director Portrait Photo"
              aspectRatio="portrait"
            />
          </div>

          {/* Executive Biography */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Executive Biography *
            </label>
            <textarea
              required
              rows={4}
              value={biography}
              onChange={e => setBiography(e.target.value)}
              placeholder="Provide a detailed summary of career accomplishments, public service experience, and academic distinctions..."
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Official Email (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="director@organization.lk"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                LinkedIn Profile URL (Optional)
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={e => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/director"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-lg bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
            >
              {editingDirector ? 'Save Profile Updates' : 'Add Board Member'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        title="Confirm Removal of Director Record"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this director record?
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <strong>Recommended alternative:</strong> Instead of deleting, edit the director and change their status to <em>Past / Emeritus Member</em> to preserve historical records.
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteTargetId(null)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white"
            >
              Delete Record
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
