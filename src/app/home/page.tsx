"use client";
import React, { useEffect, useState } from "react";
import API, { deleteUser } from "../../utils/api";

const Navbar: React.FC<{ darkMode: boolean, toggleDarkMode: () => void }> = ({ darkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 700);
      if (window.innerWidth > 700) setMenuOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const handleLinkClick = () => {
    if (isMobile) setMenuOpen(false);
  };
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "60px",
      background: darkMode ? "#ad1457" : "#ad1457",
      color: "#fff",
      padding: "0 20px",
      position: "relative"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div className="navbar-hamburger" style={{ display: isMobile ? "block" : "none", cursor: "pointer" }}
          onClick={() => setMenuOpen(m => !m)}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect y="6" width="32" height="4" rx="2" fill="#fff" />
            <rect y="14" width="32" height="4" rx="2" fill="#fff" />
            <rect y="22" width="32" height="4" rx="2" fill="#fff" />
          </svg>
        </div>
        <div
          className={`navbar-links${menuOpen && isMobile ? ' menu-open' : ''}`}
          style={{
            display: !isMobile ? "flex" : (menuOpen ? "flex" : "none"),
            gap: 20,
            position: !isMobile ? "relative" : "absolute",
            top: !isMobile ? undefined : 60,
            left: !isMobile ? undefined : 0,
            background: !isMobile ? undefined : (darkMode ? "#222" : "#ad1457"),
            width: !isMobile ? undefined : "100vw",
            padding: !isMobile ? undefined : 20,
            zIndex: !isMobile ? undefined : 100,
            flexDirection: !isMobile ? "row" : "column"
          }}
        >
          <a href="/home" onClick={handleLinkClick} style={{ color: "#fff", textDecoration: "none", fontSize: 18 }}>Home</a>
          <a href="/add" onClick={handleLinkClick} style={{ color: "#fff", textDecoration: "none", fontSize: 18 }}>Add</a>
        </div>
      </div>
      <div>
        <div
          onClick={toggleDarkMode}
          style={{
            width: 60,
            height: 32,
            borderRadius: 20,
            background: darkMode ? "#192734" : "#fff",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            position: "relative",
            boxShadow: "0 1px 4px #2222"
          }}
        >
          <div
            style={{
              position: "absolute",
              left: darkMode ? 32 : 4,
              top: 4,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: darkMode ? "#fff" : "#192734",
              transition: "left 0.3s"
            }}
          >
            {!darkMode ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" fill="#fff" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 12.5A5.5 5.5 0 0 1 12.5 7c0-2.485 2.015-4.5 4.5-4.5a5.5 5.5 0 1 0 0 11z" fill="#FFD700" />
                <circle cx="17" cy="12.5" r="1" fill="#FFD700" />
                <circle cx="15" cy="15" r="1" fill="#FFD700" />
                <circle cx="19" cy="14" r="1" fill="#FFD700" />
              </svg>
            )}
          </div>
          {darkMode && (
            <div style={{ position: "absolute", right: 8, top: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M17 12.5A5.5 5.5 0 0 1 12.5 7c0-2.485 2.015-4.5 4.5-4.5a5.5 5.5 0 1 0 0 11z" fill="#FFD700" />
                <circle cx="17" cy="12.5" r="1" fill="#FFD700" />
                <circle cx="15" cy="15" r="1" fill="#FFD700" />
                <circle cx="19" cy="14" r="1" fill="#FFD700" />
              </svg>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .navbar-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

type Favorite = {
  id: string;
  lagu: string;
  nama: string;
  pekerjaan?: string;
  foto?: string;
  addedAt?: string;
};

const ProfileModal: React.FC<{ fav: Favorite; photo: string; onClose: () => void; onEdit: (fav: Favorite) => void }> = ({ fav, photo, onClose, onEdit }) => (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  }}>
    <div style={{
      background: "#fff",
      borderRadius: 16,
      padding: 32,
      minWidth: 320,
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      color: "#222",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <a
        href="#"
        onClick={e => { e.preventDefault(); onEdit(fav); }}
        style={{
          color: "#1976d2",
          fontWeight: "bold",
          textDecoration: "underline",
          marginBottom: 8,
          alignSelf: "flex-start"
        }}
      >
        Edit
      </a>
      <img
        src={photo || "https://via.placeholder.com/100"}
        alt={fav.nama}
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          objectFit: "cover",
          border: "3px solid #2196f3",
          marginBottom: 16
        }}
      />
      <h2 style={{ margin: 0 }}>{fav.nama}</h2>
      <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8, color: "#444" }}>{fav.pekerjaan || "-"}</div>
      <div style={{ fontSize: 16, marginBottom: 8, color: "#ad1457" }}>{fav.lagu || "-"}</div>
      <p style={{ color: "#888" }}>Waktu menambahkan lagu: {fav.addedAt || "Tidak tersedia"}</p>
      <button onClick={onClose} style={{ marginTop: 24, background: "#e74c3c", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, fontWeight: "bold", fontSize: 16, cursor: "pointer" }}>Tutup</button>
    </div>
  </div>
);

const getRandomHumanPhoto = async () => {
  try {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    return data.results[0].picture.large;
  } catch {
    return "https://via.placeholder.com/100";
  }
};

const HomePage: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userPhotos, setUserPhotos] = useState<{[key: string]: string}>({});
  const [selectedFav, setSelectedFav] = useState<Favorite | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [editFav, setEditFav] = useState<Favorite | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingEdit, setPendingEdit] = useState<Favorite | null>(null);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode) setDarkMode(storedMode === "true");
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await API.get("/users");
      const filtered = res.data.filter((item: any) => item.lagu && item.nama).map((item: any) => ({
        ...item
      }));
      setFavorites(filtered);
    } catch {
      setFavorites([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setMounted(true);
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photos: {[key: string]: string} = {};
      for (const fav of favorites) {
        if (fav.foto) {
          photos[fav.id] = fav.foto;
        } else {
          photos[fav.id] = await getRandomHumanPhoto();
        }
      }
      setUserPhotos(photos);
    };
    if (favorites.length > 0) fetchPhotos();
  }, [favorites]);

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
    setShowLogin(true);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "nimda") {
      setAdminError("");
      setShowLogin(false);
      if (pendingDeleteId) {
        if (confirm("Yakin ingin menghapus data ini?")) {
          await deleteUser(pendingDeleteId);
          fetchFavorites();
        }
        setPendingDeleteId(null);
      }
      if (pendingEdit) {
        setEditFav(pendingEdit);
        setPendingEdit(null);
      }
      setAdminUser("");
      setAdminPass("");
    } else {
      setAdminError("Username atau password salah.");
    }
  };

  const filteredFavorites = favorites.filter(fav =>
    (fav.lagu?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (fav.nama?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
  );

  const toggleDarkMode = () => {
    setDarkMode(dm => {
      localStorage.setItem("darkMode", (!dm).toString());
      return !dm;
    });
  };

  const handleProfileClick = (fav: Favorite) => {
    setSelectedFav(fav);
    setSelectedPhoto(userPhotos[fav.id] || "https://via.placeholder.com/100");
  };

  const handleEdit = (fav: Favorite) => {
    setPendingEdit(fav);
    setSelectedFav(null);
    setShowLogin(true);
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFav) return;
    try {
      await API.put(`/users/${editFav.id}`, {
        nama: editFav.nama,
        pekerjaan: editFav.pekerjaan,
        lagu: editFav.lagu,
        addedAt: editFav.addedAt
      });
      setEditFav(null);
      fetchFavorites();
    } catch {
      alert("Gagal menyimpan perubahan.");
    }

  };

  if (!mounted) return null;

  return (
    <div style={{
      background: darkMode ? "#222" : "#fce4ec",
      minHeight: "100vh",
      color: darkMode ? "#f8bbd0" : "#000",
      transition: "background 0.3s, color 0.3s"
    }}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, background: darkMode ? "#333" : "#f8bbd0", borderRadius: 8, boxShadow: darkMode ? "0 2px 8px #111" : "0 2px 8px #ccc" }}>
        <h2 style={{ color: darkMode ? "#f8bbd0" : undefined }}>Daftar Nama</h2>
        <input
          type="text"
          placeholder="Cari lagu atau nama..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 20, borderRadius: 4, border: "1px solid #ccc", background: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000" }}
        />
        {loading ? (
          <div>Loading...</div>
        ) : filteredFavorites.length === 0 ? (
          <div>Tidak ditemukan data yang cocok.</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredFavorites.map(fav => (
              <li key={fav.id} style={{
                marginBottom: 16,
                padding: 12,
                background: darkMode ? "#444" : "#fff",
                borderRadius: 6,
                boxShadow: "0 1px 4px #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 12 }}>
                  <img
                    src={userPhotos[fav.id] || "https://via.placeholder.com/48"}
                    alt={fav.nama}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #2196f3"
                    }}
                    onClick={() => handleProfileClick(fav)}
                  />
                  <div>
                    <strong style={{ color: darkMode ? "#fff" : undefined, display: "block" }}>{fav.nama}</strong>
                    <span style={{ fontSize: 14, color: darkMode ? "#f8bbd0" : "#ad1457", display: "block" }}>{fav.pekerjaan || "-"}</span>
                    <span style={{ fontSize: 12, color: darkMode ? "#bbb" : "#666", display: "block" }}>{fav.lagu}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(fav.id)}
                  style={{
                    padding: "6px 10px",
                    background: "#e53935",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer"
                  }}
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}
        {selectedFav && (
          <ProfileModal fav={selectedFav} photo={selectedPhoto} onClose={() => setSelectedFav(null)} onEdit={handleEdit} />
        )}
        {editFav && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}>
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 32,
              minWidth: 320,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              color: "#222",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <h2>Edit Data</h2>
              <form
                onSubmit={handleEditSave}
                style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}
              >
                <label>Nama:
                  <input
                    type="text"
                    value={editFav.nama}
                    onChange={e => setEditFav({ ...editFav, nama: e.target.value })}
                    style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    required
                  />
                </label>
                <label>Status:
                  <input
                    type="text"
                    value={editFav.pekerjaan || ""}
                    onChange={e => setEditFav({ ...editFav, pekerjaan: e.target.value })}
                    style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    required
                  />
                </label>
                <label>Lagu Favorit:
                  <input
                    type="text"
                    value={editFav.lagu || ""}
                    onChange={e => setEditFav({ ...editFav, lagu: e.target.value })}
                    style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    required
                  />
                </label>
                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  <button type="submit" style={{ background: "#1976d2", color: "#fff", border: "none", padding: "8px 24px", borderRadius: 6, fontWeight: "bold", cursor: "pointer" }}>Simpan</button>
                  <button type="button" onClick={() => setEditFav(null)} style={{ background: "#e74c3c", color: "#fff", border: "none", padding: "8px 24px", borderRadius: 6, fontWeight: "bold", cursor: "pointer" }}>Batal</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showLogin && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
          }}>
            <div style={{ background: darkMode ? "#222" : "#fff", padding: 32, borderRadius: 8, minWidth: 320, boxShadow: "0 2px 12px #2224" }}>
              <h3 style={{ color: darkMode ? "#f8bbd0" : "#ad1457", marginBottom: 16 }}>Hanya admin yang dapat menambahkan</h3>
              <p style={{ marginBottom: 16 }}>Jika anda admin masukan username dan password:</p>
              <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  type="text"
                  placeholder="username admin"
                  value={adminUser}
                  onChange={e => setAdminUser(e.target.value)}
                  style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                  autoFocus
                />
                <input
                  type="password"
                  placeholder="password admin"
                  value={adminPass}
                  onChange={e => setAdminPass(e.target.value)}
                  style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                />
                {adminError && <div style={{ color: "red", fontSize: 14 }}>{adminError}</div>}
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button type="submit" style={{ flex: 1, padding: 8, background: "#ad1457", color: "#fff", border: "none", borderRadius: 4 }}>Login</button>
                  <button type="button" style={{ flex: 1, padding: 8, background: "#ccc", color: "#222", border: "none", borderRadius: 4 }} onClick={() => { setShowLogin(false); setAdminUser(""); setAdminPass(""); setAdminError(""); setPendingDeleteId(null); setPendingEdit(null); }}>Batal</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div style={{
          marginTop: 40,
          textAlign: "center",
          fontSize: 12,
          color: darkMode ? "#bbb" : "#888"
        }}>
          &copy; 2025 MyMusicList | Jl. Mawar No. 123, Bandung | Telp: 0822-4567-8900
        </div>
      </div>
    </div>
  );
};

export default HomePage;
