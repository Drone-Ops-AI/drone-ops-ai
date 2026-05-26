import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updatePassword as fbUpdatePassword, 
  deleteUser as fbDeleteUser, 
  sendPasswordResetEmail as fbSendPasswordResetEmail,
  User as FirebaseUser
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseReady, OperationType, handleFirestoreError } from "../lib/firebase";

export interface UserProfileData {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  location: string;
  studyGoal: string;
  certificationTargetDate: string;
  profilePhoto: string;
}

export interface UserProgressData {
  uid: string;
  completedQuestions: Record<string, number>;
  examAttempts: { score: number; date: string }[];
  studyProgress: Record<string, boolean>;
  studyConfidence: Record<string, "Low" | "Medium" | "High">;
  studyNotes: Record<string, string>;
  tutorHistory: { role: "user" | "model"; text: string }[];
  bookmarks: string[];
  airspaceMastery: Record<string, boolean>;
  nightOpsProgress: number;
  remoteIdProgress: number;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfileData;
  userProgress: UserProgressData;
  loading: boolean;
  isFirebase: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, additionalData?: Partial<UserProfileData>) => Promise<void>;
  logout: () => Promise<void>;
  updateAccountProfile: (updatedProfile: Partial<UserProfileData>) => Promise<void>;
  updateAccountPassword: (password: string) => Promise<void>;
  deleteUserAccount: () => Promise<void>;
  resetUserPassword: (email: string) => Promise<void>;
  saveProgress: (updatedProgress: Partial<UserProgressData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultProfile = (uid: string = "unauthenticated", email: string = ""): UserProfileData => ({
  uid,
  displayName: "",
  email: email || "",
  phoneNumber: "",
  location: "",
  studyGoal: "Master FAA Part 107 Commercial Flight Readiness",
  certificationTargetDate: "",
  profilePhoto: ""
});

const defaultProgress = (uid: string = "unauthenticated"): UserProgressData => ({
  uid,
  completedQuestions: {},
  examAttempts: [],
  studyProgress: {},
  studyConfidence: {},
  studyNotes: {},
  tutorHistory: [
    {
      role: "model",
      text: "### 🎓 Welcome Pilot! I am your FAA Part 107 Operational Learning Specialist.\n\nI can help you pass the remote pilot exam, understand airspace regulations, or answer questions of commercial operations. Ask me anything, or click one of the quick study triggers below!"
    }
  ],
  bookmarks: [],
  airspaceMastery: {},
  nightOpsProgress: 0,
  remoteIdProgress: 0
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData>(defaultProfile());
  const [userProgress, setUserProgress] = useState<UserProgressData>(defaultProgress());
  const [loading, setLoading] = useState(true);

  // Load active local users from localStorage when Firebase isn't ready
  const getLocalUsers = (): Record<string, { profile: UserProfileData; progress: UserProgressData; password?: string }> => {
    try {
      const stored = localStorage.getItem("aerosaas_local_users");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const saveLocalUsers = (users: Record<string, any>) => {
    try {
      localStorage.setItem("aerosaas_local_users", JSON.stringify(users));
    } catch (e) {
      console.error("Local storage sync error: ", e);
    }
  };

  const getLocalSession = (): string | null => {
    return localStorage.getItem("aerosaas_active_session_uid");
  };

  const setLocalSession = (uid: string | null) => {
    if (uid) {
      localStorage.setItem("aerosaas_active_session_uid", uid);
    } else {
      localStorage.removeItem("aerosaas_active_session_uid");
    }
  };

  // Synchronize dynamic updates directly to DB/storage
  const saveProgress = async (updatedProgress: Partial<UserProgressData>) => {
    const nextProgress = { ...userProgress, ...updatedProgress };
    setUserProgress(nextProgress);

    if (isFirebaseReady && auth?.currentUser && db) {
      const path = `progress/${auth.currentUser.uid}`;
      try {
        await setDoc(doc(db, "progress", auth.currentUser.uid), nextProgress);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    } else {
      // Offline LocalStorage simulation backup matching rules
      const uid = userProfile.uid;
      if (uid !== "unauthenticated") {
        const localUsers = getLocalUsers();
        if (localUsers[uid]) {
          localUsers[uid].progress = nextProgress;
          saveLocalUsers(localUsers);
        }
      }
    }
  };

  const updateAccountProfile = async (updatedProfile: Partial<UserProfileData>) => {
    const nextProfile = { ...userProfile, ...updatedProfile };
    setUserProfile(nextProfile);

    if (isFirebaseReady && auth?.currentUser && db) {
      const path = `users/${auth.currentUser.uid}`;
      try {
        await setDoc(doc(db, "users", auth.currentUser.uid), nextProfile);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    } else {
      const uid = userProfile.uid;
      if (uid !== "unauthenticated") {
        const localUsers = getLocalUsers();
        if (localUsers[uid]) {
          localUsers[uid].profile = nextProfile;
          saveLocalUsers(localUsers);
        }
      }
    }
  };

  // Auth: Email login
  const login = async (email: string, password: string) => {
    if (isFirebaseReady && auth) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      // Local check
      const localUsers = getLocalUsers();
      const existingUser = Object.values(localUsers).find(
        (u) => u.profile?.email.toLowerCase() === email.toLowerCase()
      );

      if (!existingUser || existingUser.password !== password) {
        throw new Error("Authentication failure. Invalid email credentials or password match.");
      }

      const uid = existingUser.profile.uid;
      setLocalSession(uid);
      setUserProfile(existingUser.profile);
      setUserProgress(existingUser.progress);
      setCurrentUser(null); // Simulated is fine
    }
  };

  // Auth: Register
  const register = async (email: string, password: string, additionalData?: Partial<UserProfileData>) => {
    if (isFirebaseReady && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      
      const newProf = {
        ...defaultProfile(uid, email),
        ...additionalData
      };
      const newProg = defaultProgress(uid);

      if (db) {
        await setDoc(doc(db, "users", uid), newProf);
        await setDoc(doc(db, "progress", uid), newProg);
      }
      setUserProfile(newProf);
      setUserProgress(newProg);
    } else {
      const localUsers = getLocalUsers();
      const lowerEmail = email.toLowerCase();
      
      const existingUser = Object.values(localUsers).find(
        (u) => u.profile?.email.toLowerCase() === lowerEmail
      );
      if (existingUser) {
        throw new Error("Target registration failed: Email already registered.");
      }

      const uid = `local_${Date.now()}`;
      const newProf = {
        ...defaultProfile(uid, email),
        ...additionalData
      };
      const newProg = defaultProgress(uid);

      localUsers[uid] = {
        profile: newProf,
        progress: newProg,
        password
      };
      
      saveLocalUsers(localUsers);
      setLocalSession(uid);
      setUserProfile(newProf);
      setUserProgress(newProg);
    }
  };

  // Auth: Sign out
  const logout = async () => {
    if (isFirebaseReady && auth) {
      await signOut(auth);
    }
    setLocalSession(null);
    setUserProfile(defaultProfile());
    setUserProgress(defaultProgress());
    setCurrentUser(null);
  };

  // Change Profile Password
  const updateAccountPassword = async (password: string) => {
    if (isFirebaseReady && auth?.currentUser) {
      await fbUpdatePassword(auth.currentUser, password);
    } else {
      const uid = userProfile.uid;
      if (uid !== "unauthenticated") {
        const localUsers = getLocalUsers();
        if (localUsers[uid]) {
          localUsers[uid].password = password;
          saveLocalUsers(localUsers);
        }
      }
    }
  };

  // Reset password
  const resetUserPassword = async (email: string) => {
    if (isFirebaseReady && auth) {
      await fbSendPasswordResetEmail(auth, email);
    } else {
      const localUsers = getLocalUsers();
      const userEx = Object.values(localUsers).find(
        (u) => u.profile?.email.toLowerCase() === email.toLowerCase()
      );
      if (!userEx) {
        throw new Error("Specified user profile email not registered in local database.");
      }
      // Simulate safe recovery email dispatcher
      console.log(`Password reset link dispatched mock-to: ${email}`);
    }
  };

  // Delete User Account
  const deleteUserAccount = async () => {
    const uid = userProfile.uid;
    if (isFirebaseReady && auth?.currentUser) {
      await fbDeleteUser(auth.currentUser);
    }
    
    if (uid !== "unauthenticated") {
      const localUsers = getLocalUsers();
      delete localUsers[uid];
      saveLocalUsers(localUsers);
    }
    
    await logout();
  };

  // Sync effect for active databases (Firebase hook vs local session sync)
  useEffect(() => {
    let unsubscribe = () => {};

    if (isFirebaseReady && auth && db) {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setCurrentUser(firebaseUser);
          
          try {
            // Load user profile config from firestore
            const userRef = doc(db, "users", firebaseUser.uid);
            const userSnap = await getDoc(userRef);

            // Load progress stats
            const progRef = doc(db, "progress", firebaseUser.uid);
            const progSnap = await getDoc(progRef);

            let profileData = defaultProfile(firebaseUser.uid, firebaseUser.email || "");
            let progressData = defaultProgress(firebaseUser.uid);

            if (userSnap.exists()) {
              profileData = { ...profileData, ...(userSnap.data() as UserProfileData) };
            } else {
              // Create default profile document if not found in db
              await setDoc(userRef, profileData);
            }

            if (progSnap.exists()) {
              progressData = { ...progressData, ...(progSnap.data() as UserProgressData) };
            } else {
              await setDoc(progRef, progressData);
            }

            setUserProfile(profileData);
            setUserProgress(progressData);
          } catch (e) {
            console.error("Firestore sync fetch failure on signup profile context load:", e);
          }
        } else {
          setCurrentUser(null);
          setUserProfile(defaultProfile());
          setUserProgress(defaultProgress());
        }
        setLoading(false);
      });
    } else {
      // Hydrate local session from storage
      const activeUid = getLocalSession();
      if (activeUid) {
        const localUsers = getLocalUsers();
        if (localUsers[activeUid]) {
          setUserProfile(localUsers[activeUid].profile);
          setUserProgress(localUsers[activeUid].progress);
        } else {
          setLocalSession(null);
        }
      }
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        userProgress,
        loading,
        isFirebase: isFirebaseReady,
        login,
        register,
        logout,
        updateAccountProfile,
        updateAccountPassword,
        deleteUserAccount,
        resetUserPassword,
        saveProgress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be mounted under an AuthProvider context scope.");
  }
  return context;
};
