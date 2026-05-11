// src/components/OrganizationStructure.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Loader, AlertCircle, User, Mail, Phone } from 'lucide-react';
import { getAllOrganizationStructures, getCurrentOrganizationStructure } from '../services/organizationStructureService';
import type { OrganizationStructure, Sektor, Posisi, OrganisasiMember } from '../types';

/**
 * Member Avatar Component
 */
const MemberAvatar = ({ member }: { member: OrganisasiMember }) => {
  const [imageError, setImageError] = useState(false);

  if (member.foto && !imageError) {
    return (
      <img
        src={member.foto}
        alt={member.nama}
        className="w-full h-64 object-cover rounded-t-lg"
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div className="w-full h-64 bg-lspi-main/10 flex items-center justify-center border-b-2 border-lspi-main/20 rounded-t-lg">
      <User className="w-20 h-20 text-lspi-main" />
    </div>
  );
};

/**
 * Member Card Component
 */
const MemberCard = ({ member }: { member: OrganisasiMember; position: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col w-56 h-full"
    >
      <MemberAvatar member={member} />
      <div className="px-3 py-2 flex-1 flex flex-col">
        <h4 className="font-semibold text-gray-900 text-sm">{member.nama}</h4>
        
        {member.bio && (
          <p className="text-xs text-gray-600 mb-1">{member.bio}</p>
        )}

        <div className="space-y-0.5 text-xs mt-auto">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="block text-blue-600 hover:text-blue-700 truncate"
              title={member.email}
            >
              <Mail className="w-3 h-3 inline mr-1" />
              {member.email}
            </a>
          )}
          {member.phone && (
            <a
              href={`tel:${member.phone}`}
              className="block text-blue-600 hover:text-blue-700 truncate"
              title={member.phone}
            >
              <Phone className="w-3 h-3 inline mr-1" />
              {member.phone}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Position Section Component
 */
const PositionSection = ({ position }: { position: Posisi }) => {
  const isLeadership = ['Ketua Umum', 'Sekretaris Jendral', 'Bendahara Umum'].includes(
    position.nama_posisi
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${isLeadership ? 'mb-6' : 'mb-4'}`}
    >
      <div
        className={`${
          isLeadership
            ? 'bg-linear-to-r from-lspi-main/10 to-lspi-light-accent/10 border-l-4 border-lspi-main px-4 py-3'
            : 'bg-gray-50 px-3 py-2'
        } rounded-lg mb-3`}
      >
        <h4 className={`${isLeadership ? 'font-bold text-lg text-lspi-main' : 'font-semibold text-gray-800'}`}>
          {position.nama_posisi}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-2">
        {position.anggota && position.anggota.length > 0 ? (
          position.anggota.map(member => (
            <MemberCard
              key={member.id}
              member={member}
              position={position.nama_posisi}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">Belum ada anggota</p>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Sector Column Component
 */
const SectorColumn = ({ sector }: { sector: Sektor }) => {
  const sectorLabel = sector.nama_sektor === 'Rijal' ? 'Divisi Rijal' : 'Divisi Nisa';

  return (
    <motion.div
      initial={{ opacity: 0, x: sector.nama_sektor === 'Rijal' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-lspi-light-accent/5 rounded-xl border-2 border-lspi-main/20 p-6"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-lspi-main mb-2">{sectorLabel}</h3>
        <div className="h-1 w-12 bg-lspi-main"></div>
      </div>

      <div className="space-y-4">
        {sector.posisi && sector.posisi.length > 0 ? (
          sector.posisi
            .sort((a, b) => a.order - b.order)
            .map(posisi => (
              <PositionSection key={posisi.id} position={posisi} />
            ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada data posisi</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Main Organization Structure Component
 */
const OrganizationStructureComponent = () => {
  const [organizations, setOrganizations] = useState<OrganizationStructure[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const data = await getAllOrganizationStructures();

        if (data.length === 0) {
          setError('Tidak ada data struktur organisasi');
          return;
        }

        setOrganizations(data);

        // Auto-select current period
        const current = getCurrentOrganizationStructure(data);
        setSelectedOrg(current);
      } catch (err) {
        console.error('Failed to fetch organizations:', err);
        setError('Gagal mengambil data struktur organisasi');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader className="w-8 h-8 text-lspi-main animate-spin mb-3" />
        <p className="text-gray-600">Memuat struktur organisasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Kesalahan</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedOrg) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
        <p className="text-yellow-900">Tidak ada data struktur organisasi yang tersedia</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Struktur Organisasi</h2>
        <p className="text-gray-600">Lihat struktur organisasi LSPI untuk periode yang berbeda</p>
      </div>

      {/* Period Selector */}
      {organizations.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full sm:w-64 bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-left font-medium text-gray-900 hover:border-lspi-main transition-colors flex items-center justify-between"
          >
            <span>Periode: {selectedOrg.periode}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 sm:w-64 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10"
              >
                {organizations.map((org, index) => (
                  <button
                    key={org.id}
                    onClick={() => {
                      setSelectedOrg(org);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 font-medium transition-colors ${
                      selectedOrg.id === org.id
                        ? 'bg-lspi-main text-white'
                        : 'text-gray-900 hover:bg-gray-100'
                    } ${index !== 0 ? 'border-t border-gray-200' : ''}`}
                  >
                    Periode {org.periode}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Organization Structure Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedOrg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {selectedOrg.sektors && selectedOrg.sektors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedOrg.sektors
                .sort((a, b) => {
                  // Rijal first, then Nisa
                  if (a.nama_sektor === 'Rijal') return -1;
                  if (b.nama_sektor === 'Rijal') return 1;
                  return 0;
                })
                .map(sektor => (
                  <SectorColumn key={sektor.id} sector={sektor} />
                ))}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-xl p-12 text-center">
              <p className="text-gray-600 text-lg">
                Tidak ada data organisasi untuk periode {selectedOrg.periode}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OrganizationStructureComponent;
