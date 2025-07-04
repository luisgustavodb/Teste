
import React, { useState, useEffect, useRef } from 'react';
import { CameraIcon } from '../constants';

interface SettingsProps {
  currentName: string;
  currentAvatar: string;
  onSave: (newName: string, newAvatar: string) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ currentName, currentAvatar, onSave, onBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(currentAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const nameParts = currentName.split(' ');
    setFirstName(nameParts[0] || '');
    setLastName(nameParts.slice(1).join(' ') || '');
    setAvatarPreview(currentAvatar);
  }, [currentName, currentAvatar]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(`${firstName} ${lastName}`, avatarPreview);
  };

  return (
    <div className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Configurações de Perfil</h2>
                <p className="text-gray-600 text-lg mt-2">Atualize seu nome e foto de perfil.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200/80">
                <form onSubmit={handleSave} className="space-y-8">
                    {/* Profile Picture Section */}
                    <div className="flex items-center space-x-6">
                        <img src={avatarPreview} alt="Profile preview" className="w-24 h-24 rounded-full object-cover" />
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center justify-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <CameraIcon />
                                Alterar Foto
                            </button>
                            <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF até 10MB</p>
                        </div>
                    </div>

                    {/* Name Section */}
                    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2">
                            <label htmlFor="first-name" className="text-sm font-medium text-gray-700">Primeiro Nome</label>
                            <div className="mt-1">
                                <input
                                    id="first-name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 bg-white text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Sobrenome</label>
                            <div className="mt-1">
                                <input
                                    id="last-name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 bg-white text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end items-center space-x-4 pt-4">
                        <button
                            type="button" onClick={onBack}
                            className="rounded-lg border border-gray-300 bg-white py-2 px-5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="group relative flex justify-center rounded-lg border border-transparent bg-brand-blue py-2 px-5 text-sm font-semibold text-white hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-colors"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Settings;
