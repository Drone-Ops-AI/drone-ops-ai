import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Target, 
  Calendar, 
  Lock, 
  Camera, 
  CheckCircle, 
  AlertTriangle, 
  LogOut, 
  UserPlus, 
  LogIn, 
  ShieldAlert,
  Loader2,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AccountSettings() {
  const { 
    userProfile, 
    login, 
    register, 
    logout, 
    updateAccountProfile, 
    updateAccountPassword, 
    deleteUserAccount, 
    resetUserPassword 
  } = useAuth();

  // Auth panel states
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authDisplayName, setAuthDisplayName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // Profile forms states
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [studyGoal, setStudyGoal] = useState("");
  const [certificationTargetDate, setCertificationTargetDate] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  // Passwords / security forms
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // UI status elements
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveConfirmation, setSaveConfirmation] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInputEmail, setDeleteInputEmail] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Sync state helpers on mount or when user changes
  useEffect(() => {
    if (userProfile && userProfile.uid !== "unauthenticated") {
      setDisplayName(userProfile.displayName || "");
      setEmail(userProfile.email || "");
      setPhoneNumber(userProfile.phoneNumber || "");
      setLocation(userProfile.location || "");
      setStudyGoal(userProfile.studyGoal || "");
      setCertificationTargetDate(userProfile.certificationTargetDate || "");
      setProfilePhoto(userProfile.profilePhoto || "");
    }
  }, [userProfile]);

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    setProfilePhoto("");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSaveConfirmation("");

    try {
      await updateAccountProfile({
        displayName,
        email,
        phoneNumber,
        location,
        studyGoal,
        certificationTargetDate,
        profilePhoto
      });

      // Handle password update if present
      if (showPasswordFields && newPassword) {
        if (newPassword !== confirmNewPassword) {
          setPasswordError("Aeronautical passcode update error: Passwords do not match.");
          setSavingSettings(false);
          return;
        }
        if (newPassword.length < 6) {
          setPasswordError("Passcode constraint failed: Security requires at least 6 characters.");
          setSavingSettings(false);
          return;
        }
        await updateAccountPassword(newPassword);
        setNewPassword("");
        setConfirmNewPassword("");
        setPasswordError("");
        setShowPasswordFields(false);
      }

      setSaveConfirmation("TACTICAL CONFIGURATION SAVED: Telemetry database updated successfully.");
      setTimeout(() => setSaveConfirmation(""), 6000);
    } catch (err: any) {
      console.error(err);
      setSaveConfirmation(`CRITICAL SAVE FAILURE: ${err.message}`);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");
    setSubmittingAuth(true);

    try {
      if (authMode === "login") {
        await login(authEmail, authPassword);
        setAuthSuccess("AUTHORIZATION ACCEPTED: Connecting flight context...");
      } else if (authMode === "register") {
        if (authPassword !== authConfirmPassword) {
          setAuthError("Passcode mismatch during registration registration.");
          setSubmittingAuth(false);
          return;
        }
        if (authPassword.length < 6) {
          setAuthError("Auth security constraints: Password must exceed 5 characters.");
          setSubmittingAuth(false);
          return;
        }
        await register(authEmail, authPassword, {
          displayName: authDisplayName
        });
        setAuthSuccess("PILOT ACCOUNT BOOTSTRAPPED: Fleet credentials recorded.");
      } else {
        await resetUserPassword(authEmail);
        setAuthSuccess("RECOVERY SENT: Check transmission log signals.");
      }
    } catch (err: any) {
      setAuthError(err.message || "Credential handshake failed. Review active network links.");
    } finally {
      setSubmittingAuth(false);
    }
  };

  const handleDeleteAccountConfirm = async () => {
    if (deleteInputEmail.toLowerCase() !== userProfile.email.toLowerCase()) {
      alert("Verification email does not match. Destruction checklist aborted.");
      return;
    }
    try {
      await deleteUserAccount();
      alert("Pilot profile and historical analytics completely purged from SaaS databases.");
    } catch (err: any) {
      alert(`Account destruction error: ${err.message}`);
    }
  };

  // If user is not authenticated, show elegant interactive auth gateway
  if (!userProfile || userProfile.uid === "unauthenticated") {
    return (
      <div id="auth-unauthenticated-gateway" className="max-w-md mx-auto py-12 space-y-8">
        <div className="text-center space-y-3">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <User className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-display font-black tracking-widest text-zinc-50 uppercase mt-4">
            AEROSOAS CREW PORTAL
          </h2>
          <p className="text-xs text-zinc-400 font-mono tracking-wider uppercase">
            SECURE RECOLLECTION HUB FOR PASSING PART 107 EXAMS
          </p>
        </div>

        <div className="hud-card p-6 rounded-2xl relative overflow-hidden scanline">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500 animate-pulse" />
          
          <div className="flex border-b border-white/5 pb-4 mb-6 text-xs font-mono justify-around">
            <button 
              onClick={() => { setAuthMode("login"); setAuthError(""); setAuthSuccess(""); }}
              className={`pb-2 border-b-2 font-bold tracking-widest uppercase transition-all ${authMode === "login" ? "border-cyan-400 text-cyan-400" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
            >
              SIGN IN
            </button>
            <button 
              onClick={() => { setAuthMode("register"); setAuthError(""); setAuthSuccess(""); }}
              className={`pb-2 border-b-2 font-bold tracking-widest uppercase transition-all ${authMode === "register" ? "border-cyan-400 text-cyan-400" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
            >
              REGISTER CREW
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            {authMode === "register" && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider">Dynamic Full Name / Call Sign</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={authDisplayName}
                    onChange={(e) => setAuthDisplayName(e.target.value)}
                    placeholder="e.g. Captain Mitchell"
                    className="w-full bg-zinc-950 border border-white/5 p-3 pl-10 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider">Crew E-Mail Pin</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@aerosaas.command"
                  className="w-full bg-zinc-950 border border-white/5 p-3 pl-10 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            {authMode !== "forgot" && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider">Passcode Hash</label>
                  {authMode === "login" && (
                    <button 
                      type="button" 
                      onClick={() => setAuthMode("forgot")}
                      className="text-[9px] text-cyan-500 hover:underline font-mono tracking-wider"
                    >
                      Forgot Passcode?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-white/5 p-3 pl-10 pr-10 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {authMode === "register" && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider">Confirm Passcode</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <input
                    type="password"
                    required
                    value={authConfirmPassword}
                    onChange={(e) => setAuthConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-white/5 p-3 pl-10 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none"
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {authError && (
                <motion.div 
                  initial={{ opacity: 0, y: -4 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-red-400 bg-red-950/40 border border-red-500/20 p-3 rounded-xl flex items-center gap-2.5 font-mono text-[10.5px]"
                >
                  <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 animate-bounce" />
                  <span>{authError}</span>
                </motion.div>
              )}
              {authSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -4 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-2.5 font-mono text-[10.5px]"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{authSuccess}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={submittingAuth}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-mono tracking-widest font-extrabold p-3.5 rounded-xl uppercase transition-all shadow-[rgba(6,182,212,0.25)_0px_0px_20px] active:scale-[0.98] flex justify-center items-center gap-2.5 disabled:opacity-50"
            >
              {submittingAuth ? (
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
              ) : authMode === "login" ? (
                <span className="flex items-center gap-2 font-black">LOGIN SITE-HQ <LogIn className="h-4 w-4 inline" /></span>
              ) : authMode === "register" ? (
                <span className="flex items-center gap-2 font-black">BOOTSTRAP ENTRY <UserPlus className="h-4 w-4 inline" /></span>
              ) : (
                <span className="flex items-center gap-2 font-black">EMIT PASSWORD RESET LINK</span>
              )}
            </button>

            {authMode === "forgot" && (
              <button 
                type="button"
                onClick={() => setAuthMode("login")}
                className="w-full text-center text-zinc-500 hover:text-zinc-300 font-mono py-1"
              >
                Back to tactical login
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  // Authenticated state: Show dynamic settings layout
  return (
    <div id="account-settings-form-dashboard" className="space-y-6 font-sans">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-zinc-950/50 backdrop-blur-md border border-white/5 rounded-2xl gap-4 relative overflow-hidden scanline">
        <div className="absolute top-0 left-0 w-2 h-full bg-cyan-400" />
        <div className="flex items-center gap-4 pl-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <User className="h-5.5 w-5.5" />
          </div>
          <div>
            <h2 className="text-xl font-display font-black tracking-widest text-white uppercase">
              CREW MEMBER ACCOUNT SETTINGS
            </h2>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mt-1">
              Configure personal telemetry logs, Part 107 certificate targets, and contact nodes
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-2 px-4 rounded-xl text-xs font-mono tracking-widest uppercase font-bold flex items-center gap-2.5 transition-all self-start md:self-center"
        >
          <LogOut className="h-4 w-4" /> LOG OUT
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Dynamic Bio Avatar Card (Left Column) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="hud-card p-6 rounded-2xl text-center space-y-5 relative overflow-hidden">
            <h3 className="text-xs font-extrabold font-display text-zinc-400 uppercase tracking-widest border-b border-white/5 pb-3">
              Pilot Profile badge
            </h3>

            {/* Profile Avatar Frame */}
            <div className="relative mx-auto w-32 h-32 rounded-2xl bg-zinc-950 border-2 border-dashed border-zinc-700 hover:border-cyan-400 transition-all flex flex-col items-center justify-center overflow-hidden group shadow-inner">
              {profilePhoto ? (
                <>
                  <img 
                    src={profilePhoto} 
                    alt="Pilot dynamic signature avatar screenshot" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="cursor-pointer bg-cyan-500 text-zinc-950 px-3 py-1 rounded-lg text-[10px] font-mono tracking-wider font-extrabold uppercase hover:bg-cyan-400">
                      EDIT
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleProfilePhotoChange} 
                      />
                    </label>
                    <button 
                      onClick={clearPhoto}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-mono tracking-wider font-extrabold uppercase hover:bg-red-500"
                    >
                      DUMP
                    </button>
                  </div>
                </>
              ) : (
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-zinc-500 hover:text-cyan-400 transition-all">
                  <Camera className="h-8 w-8" />
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold">Inject Insignia IMG (Max 2MB)</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleProfilePhotoChange} 
                  />
                </label>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-display font-extrabold text-zinc-100 uppercase tracking-wide truncate">
                {displayName || "Your Crew Designation"}
              </h4>
              <p className="text-[11.5px] font-mono text-zinc-500 tracking-wider truncate">{email}</p>
            </div>

            <div className="bg-zinc-950 border border-white/5 p-4 rounded-xl text-left space-y-2.5 font-mono text-[10px] text-zinc-400">
              <div className="flex justify-between">
                <span className="text-zinc-600 font-bold uppercase">Deployment Zone:</span>
                <span className="font-bold text-zinc-300">{location || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 font-bold uppercase">Exam Target:</span>
                <span className="font-bold text-zinc-300">{certificationTargetDate || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Configurations Form (Right Column) */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="hud-card p-6 rounded-2xl space-y-6">
              <h3 className="text-xs font-bold font-display text-zinc-300 uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-3">
                <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full" />
                Crew Profile Particulars
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Display Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-cyan-500" /> Crew Call Sign / Name
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Cynthia Valenzuela"
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-cyan-500" /> Telecommunication E-Mail
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@aerosaas.internal"
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-cyan-500" /> Secure Terminal Line (Phone)
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 0192"
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-cyan-500" /> Operational Sector (Location)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Seattle Airspace Sector 7D"
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none"
                  />
                </div>

                {/* Study goal */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-cyan-500" /> Dynamic Study Focus Goal
                  </label>
                  <textarea
                    value={studyGoal}
                    onChange={(e) => setStudyGoal(e.target.value)}
                    placeholder="Pass FAA Part 107 in under 3 weeks with over 90% accuracy..."
                    rows={2}
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none resize-none"
                  />
                </div>

                {/* Study Date */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-cyan-500" /> Certification Target Date
                  </label>
                  <input
                    type="date"
                    value={certificationTargetDate}
                    onChange={(e) => setCertificationTargetDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Passcode Security */}
            <div className="hud-card p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="text-xs font-bold font-display text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                  <Lock className="h-4 w-4 text-cyan-500" /> Authenticated passcode parameters
                </h3>
                <button
                  type="button"
                  onClick={() => setShowPasswordFields(!showPasswordFields)}
                  className="text-[10px] font-mono text-cyan-400 hover:underline uppercase font-bold"
                >
                  {showPasswordFields ? "Abort Change" : "Initiate Passcode Reset"}
                </button>
              </div>

              {showPasswordFields && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-2 animate-fadeIn">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase font-mono tracking-wider">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl focus:border-cyan-400 text-white font-mono focus:outline-none"
                    />
                  </div>
                  {passwordError && (
                    <div className="md:col-span-2 text-red-400 bg-red-950/20 border border-red-500/20 p-2.5 rounded-xl text-[10.5px] font-mono flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      {passwordError}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Confirmations & Saving */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  {saveConfirmation && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-3 rounded-xl font-mono text-[11px] border leading-normal ${
                        saveConfirmation.includes("FAILURE") 
                          ? "text-red-400 bg-red-950/40 border-red-500/20" 
                          : "text-emerald-400 bg-emerald-950/40 border-emerald-500/20"
                      }`}
                    >
                      {saveConfirmation.includes("FAILURE") ? (
                        <AlertTriangle className="h-4 w-4 text-red-500 inline mr-2 shrink-0 animate-pulse" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-emerald-400 inline mr-2 shrink-0" />
                      )}
                      {saveConfirmation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                disabled={savingSettings}
                className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-mono tracking-widest font-black py-4 px-8 rounded-xl uppercase transition-all shadow-[rgba(6,182,212,0.25)_0px_0px_20px] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {savingSettings ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> COMMITTING CHIPS...
                  </>
                ) : (
                  <>
                    COMMIT CHANGES CHIPS <CheckCircle className="h-4.5 w-4.5 text-zinc-950" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Core Danger Zone: Destruct trigger */}
          <div className="mt-8 hud-card p-6 rounded-2xl border-red-500/10">
            <h3 className="text-xs font-bold font-display text-red-400 uppercase tracking-widest flex items-center gap-2 border-b border-red-500/10 pb-3 mb-4">
              <ShieldAlert className="h-4 w-4 text-red-500" />
              Pilot Mission Destruction checklist (Danger Zone)
            </h3>
            <p className="text-[11px] text-zinc-400 font-mono leading-relaxed">
              Once you destroy this crew record, your aviation practice histories, weak analytics, exam telemetry, and tutor session records will be irreversibly deleted.
            </p>

            <div className="mt-4">
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-500/10 hover:bg-red-600 hover:text-white text-red-400 border border-red-500/20 px-4 py-2.5 rounded-xl font-mono text-[11px] uppercase font-bold tracking-wider transition-all"
                >
                  DESTRUCT PILOT CREDENTIAL FROM SaaS
                </button>
              ) : (
                <div className="space-y-4 border border-red-500/20 bg-red-950/10 p-4 rounded-xl text-xs font-mono animate-fadeIn">
                  <div className="flex items-center gap-2 text-red-400 font-bold uppercase text-[10.5px]">
                    <AlertTriangle className="h-4 w-4 text-red-500 animate-ping" /> Ensure Target Destruction confirmation
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    To proceed, input your active registration email: <span className="text-zinc-200 underline">{userProfile.email}</span>
                  </p>
                  <input
                    type="email"
                    value={deleteInputEmail}
                    onChange={(e) => setDeleteInputEmail(e.target.value)}
                    placeholder="name@aerosaas.command"
                    className="w-full bg-zinc-950 border border-red-500/20 p-3 rounded-xl focus:border-red-500 text-white font-mono focus:outline-none"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleDeleteAccountConfirm}
                      className="bg-red-600 hover:bg-red-500 text-white border border-transparent px-4 py-2 rounded-xl text-[10.5px] font-bold uppercase hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                    >
                      CONFIRM IRREVERSIBLE DESTRUCTION
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowDeleteConfirm(false); setDeleteInputEmail(""); }}
                      className="bg-zinc-900 text-zinc-400 border border-white/5 px-4 py-2 rounded-xl text-[10.5px] uppercase hover:bg-zinc-800"
                    >
                      ABORT MISSION
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
