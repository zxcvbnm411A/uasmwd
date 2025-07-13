"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addUsers } from "../../utils/api";

const Navbar: React.FC<{ darkMode: boolean, toggleDarkMode: () => void }> = ({ darkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
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
            background: !isMobile ? undefined : "#ad1457",
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


const Add: React.FC = () => {
  const [nama, setNama] = useState("");
  const [lagu, setLagu] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  // Tidak perlu isAdmin
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("darkMode");
      if (storedMode) setDarkMode(storedMode === "true");
    }
  }, []);

  
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setShowLogin(true);
  };

  // Submit data hanya jika admin benar
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "nimda") {
      setAdminError("");
      setShowLogin(false);
      setLoading(true);
      const now = new Date();
      const addedAt = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")} ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
      try {
        await addUsers({ nama, lagu, pekerjaan, addedAt });
        setMsg("Berhasil ditambahkan!");
        setNama("");
        setLagu("");
        setPekerjaan("");
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } catch {
        setMsg("Gagal menambah data.");
      }
      setLoading(false);
      setAdminUser("");
      setAdminPass("");
    } else {
      setAdminError("Username atau password salah.");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(dm => {
      localStorage.setItem("darkMode", (!dm).toString());
      return !dm;
    });
  };

  return (
    <div style={{
      background: darkMode ? "#222" : "#fce4ec",
      minHeight: "100vh",
      color: darkMode ? "#f8bbd0" : "#000",
      transition: "background 0.3s, color 0.3s"
    }}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, background: darkMode ? "#333" : "#f8bbd0", borderRadius: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
              background: darkMode ? "#444" : "#fff",
              border: darkMode ? "3px solid #f8bbd0" : "3px solid #ad1457",
              marginBottom: 16
            }}
          />
        </div>
        <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label>
            Nama:
            <input
              type="text"
              value={nama}
              onChange={e => setNama(e.target.value)}
              required
              placeholder="Cho Yi Hyun"
              style={{ width: "100%", padding: 8, marginTop: 4, background: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000", border: "1px solid #ccc", borderRadius: 4 }}
            />
          </label>

          <label>
            Status:
            <input
              type="text"
              value={pekerjaan}
              onChange={e => setPekerjaan(e.target.value)}
              required
              placeholder="Mahasiswa, Penyanyi, dll"
              style={{ width: "100%", padding: 8, marginTop: 4, background: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000", border: "1px solid #ccc", borderRadius: 4 }}
            />
          </label>

          <label>
            Lagu Favorit:
            <input
              type="text"
              value={lagu}
              onChange={e => setLagu(e.target.value)}
              required
              placeholder="Jumping Machine"
              style={{ width: "100%", padding: 8, marginTop: 4, background: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000", border: "1px solid #ccc", borderRadius: 4 }}
            />
          </label>

          <button type="submit" disabled={loading} style={{ padding: 10, background: darkMode ? "#444" : "#ad1457", color: "#fff", border: "none", borderRadius: 4 }}>
            {loading ? "Menambah..." : "Add"}
          </button>
        </form>
        {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
        {showLogin && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
          }}>
            <div style={{ background: darkMode ? "#222" : "#fff", padding: 32, borderRadius: 8, minWidth: 320, boxShadow: "0 2px 12px #2224" }}>
              <h3 style={{ color: darkMode ? "#f8bbd0" : "#ad1457", marginBottom: 16 }}>Hanya admin yang dapat menambahkan</h3>
              <p style={{ marginBottom: 16 }}>Jika anda admin, masukkan username dan password:</p>
              <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  type="text"
                  placeholder="Username admin"
                  value={adminUser}
                  onChange={e => setAdminUser(e.target.value)}
                  style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                  autoFocus
                />
                <input
                  type="password"
                  placeholder="Password admin"
                  value={adminPass}
                  onChange={e => setAdminPass(e.target.value)}
                  style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                />
                {adminError && <div style={{ color: "red", fontSize: 14 }}>{adminError}</div>}
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button type="submit" style={{ flex: 1, padding: 8, background: "#ad1457", color: "#fff", border: "none", borderRadius: 4 }}>Login</button>
                  <button type="button" style={{ flex: 1, padding: 8, background: "#ccc", color: "#222", border: "none", borderRadius: 4 }} onClick={() => { setShowLogin(false); setAdminUser(""); setAdminPass(""); setAdminError(""); }}>Batal</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
